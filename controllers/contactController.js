const Contact = require('../model/Contact');

const getAllContacts = async (req, res) => {
    //console.log('========================================');
    //console.log(req.body);
    //console.log('=========================================');
    const contacts = await Contact.find();
    if (!contacts) return res.status(204).json({ 'message': 'No contacts found.' });
    res.json(contacts);
}

// updateContact: method two

// const updateContact = async (req, res) => {
//     if (!req?.body?.id) {
//         return res.status(400).json({ 'message': 'ID parameter is required.' });
//     }

//     const contact = await Contact.findOne({ _id: req.body.id }).exec();
//     if (!contact) {
//         return res.status(204).json({ "message": `No contact matches ID ${req.body.id}.` });
//     }
//     console.log(req.body);
//     if (req.body?.fname) contact.fname = req.body.fname;
//     if (req.body?.lname) contact.lname = req.body.lname;
//     //contact = req.body;
//     const result = await contact.save();
//     res.json(result);
// }

const updateContact = async (req, res) => {

    /*  req.body sample : {"$set" : req.body }

        {
        "addres": {
            "no": null,
            "street": null,
            "city": null
        },
        "id": "631977da9b7d7339f05f8f06",
        "fname": "FName AKK",
        "lname": "LName AKK",
        "cpse": "z",
        "active": "Y",
        "numbers": [
            {
            "id": "0",
            "number": "11982182123",
            "type": "0omx"
            },
            {
            "id": "1",
            "number": "+9411112222",
            "type": "0omx"
            },
            {
            "id": "2",
            "number": "+9477777777",
            "type": "0omx"
            }    
        ]
        }

    */

    console.log(req?.body)    
 
    if (!req?.body?.contact?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    Contact.updateOne({ _id : req.body.contact.id }, 
        {"$set" : req.body.contact }, function (err, docs) {
            if (err){
                console.log(err)
            }   
            else{
                console.log("Updated Docs : ", docs);
                res.json(docs);
            }
    });

}


module.exports = {
    getAllContacts,
    updateContact
}