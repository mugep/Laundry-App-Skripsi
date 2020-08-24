const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// const ObjectId = mongodb.ObjectId;

// class User {
//     constructor(username, email) {
//         this.name = username;
//         this.email = email;
//     }
//     save() {
//         const db = getDb();
//        return db.collection('users').insertOne(this);
//     }
//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users').findOne({_id: new ObjectId(userId)});
//     }
// }

// module.exports = User;