var easyinvoice = require('easyinvoice');
const router = require('express').Router()
router.get('/invoice', createInvoice)
var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
    "currency": "USD", //See documentation 'Locales and Currency' for more info
    "taxNotation": "vat", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png", //or base64
    "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64 //img or pdf
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
    const result = await easyinvoice.createInvoice(data);
    return res.status(200).send(result.pdf);
};

module.exports = router;