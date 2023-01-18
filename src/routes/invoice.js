const dailySell = require("../models/dailySell");
const product = require("../models/product");
var easyinvoice = require('easyinvoice');
const router = require('express').Router()
const ObjectID = require("mongodb").ObjectID;
const fs = require('fs');
router.get('/invoice/(:id)', createInvoice)
var html;
try {
     html = fs.readFileSync('src/routes/invoice.html', 'utf8');
  } catch (err) {
    console.error(err);
  }
var data = {
    customize: {
        // btoa === base64 encode
        template: Buffer.from(html).toString('base64') // Your template must be base64 encoded
    },
    information: {
        'number': '2023.0001',
        'date': '18 Jan 2023',
        'due-date': '18 Feb 2023'
    },
    "images": {
        // The logo on top of your invoice
        "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
        // The invoice background
        // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
    },
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
    "currency": "USD", //See documentation 'Locales and Currency' for more info
    "taxNotation": "VAT", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "sender": {
        "company": "Sample Corp",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "Sampletown",
        "country": "Samplecountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
       	"company": "Client Corp",
       	"address": "Clientstreet 456",
       	"zip": "4567 CD",
       	"city": "Clientcity",
       	"country": "Clientcountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "invoiceNumber": "2021.0001",
    "invoiceDate": "1.1.2021",
    "products": [
        {
            "quantity": "2",
            "description": "First Product",
            "tax": 6,
            "price": 33.87
        },
        {
            "quantity": "4",
            "description": "Second Prodcut",
            "tax": 21,
            "price": 10.45
        },
        {
            "quantity": "5",
            "description": "Third Product",
            "tax": 21,
            "price": 7.5
        }
    ],
    "bottomNotice": "Kindly pay your invoice within 15 days.",
    //Used for translating the headers to your preferred language
    //Defaults to English. Below example is translated to Dutch
    // "translate": { 
    //     "invoiceNumber": "Factuurnummer",
    //     "invoiceDate": "Factuurdatum",
    //     "products": "Producten", 
    //     "quantity": "Aantal", 
    //     "price": "Prijs",
    //     "subtotal": "Subtotaal",
    //     "total": "Totaal" 
    // }
};

async function createInvoice(req, res) {
    const id = req.params.id;
    /* {
        "quantity": "2",
        "description": "First Product",
        "tax": 6,
        "price": 33.87
    }*/
    products = [];
    const sales = await dailySell.find({ tableId: ObjectID(id),status: "active" }).populate('productId');

    sales.forEach(async ele => {
        line = {
            "quantity": ele['quantity'],
            "description": ele['productId']['productName'],
            "price": ele['quantity']*ele['productId']['price']
        }
        products.push(line)
    })
    data['products'] = products;
    const result = await easyinvoice.createInvoice(data);
    var fs = require('fs');
    await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
    return res.status(200).send(result.pdf);
};

module.exports = router;