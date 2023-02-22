const Contact = require('../model/Contact');

   /*  req.body sample : {"$set" : req.body }

   
   {
        // "_id": "631977da9b7d7339f05f8f06",
        
        "addres": {
            "no": null,
            "street": null,
            "city": null
        },
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

const getAllContacts = async (req, res) => {
    //console.log(req.body);
    const contacts = await Contact.find();
    if (!contacts) return res.status(204).json({ 'message': 'No contacts found.' });
    res.json(contacts);
}

const addContact = async (req, res) => {

    //console.log(req?.body)    
 
    const { fname } = req.body.contact;
    if (!fname) return res.status(400).json({ 'message': 'Contact name required.' });


    try {
        const result = await Contact.create(req.body.contact);

        //console.log(result);

        res.status(201).json({ 'success': `New contact < ${fname} > created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

const updateContact = async (req, res) => {

    //console.log(req?.body)    
 
    if (!req?.body?.contact?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    Contact.updateOne({ _id : req.body.contact._id }, 
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

const deleteContact = async (req, res) => {
    //console.log(req?.body)

    if (!req.body.contact._id) return res.status(400).json({ 'message': 'Contact ID required.' });

    const contact = await Contact.findOne({ _id: req.body.contact._id }).exec();
    if (!contact) {
        return res.status(204).json({ "message": `No contact matches ID ${req.body.contact._id}.` });
    }
    const result = await contact.deleteOne();
    res.json(result);
}


module.exports = {
    getAllContacts,
    addContact,
    updateContact,
    deleteContact
}