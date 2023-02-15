const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 

{
    "_id":{"$oid":"6358cf0284468db96376ff62"},
    "fname":"Chaminda Silva",
    "lname":"","cpse":"",
    "active":"Y","
    numbers ":[
        {"id":"0","number":"0777312952","type":null},
        {"id":"1","number":"0725353545","type":null}
    ],"
    addres":{   "no":null,
                "street":null,
                "city":null
            }
}

const blogSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

{ fname :  'Chaminda Silva' }
{ id :  '631977da9b7d7339f05f8f06' }

*/

const numSchema = new Schema({
        id: String,
        number: String,
        type: String
});

const contactSchema = new Schema({
    fname:  String, // String is shorthand for {type: String}
    lname: String,
    cpse: String,
    active:   String,
    //numbers: [{ id: String, number: String, type: String }],
    //numbers: [],
    numbers: [numSchema],
    addres: {
        no: String,
        street: String,
        city: String
    }
});

module.exports = mongoose.model('contacts', contactSchema);