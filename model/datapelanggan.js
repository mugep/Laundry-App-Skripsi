const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pelangganSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    alamat: {
        type: String,
        required: true
    },
    layanan: {
        type: String,
        required: true
    },
    paket: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    berat: {
        type: Number
    },
    harga: {
        type: Number,
        required: true
    },
    tanggal: {
        type: Date,
        required: true
    },
    pembayaran: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Pelanggan', pelangganSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Pelanggan {
//     constructor(nama, email, alamat, layanan, paket, status, berat, harga, tanggal, pembayaran, id, userId) {
//         this.nama = nama;
//         this.email = email;
//         this.alamat = alamat;
//         this.layanan = layanan;
//         this.paket = paket;
//         this.status = status;
//         this.berat = berat;
//         this.harga = harga;
//         this.tanggal = tanggal;
//         this.pembayaran = pembayaran;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }
//     save() {
//         const db = getDb();
//         let dbOp;
//         if(this._id) {
//             dbOp = db.collection('pelanggan').updateOne({_id: this._id}, {$set: {status: this.status, pembayaran: this.pembayaran}});
//         } else {
//             dbOp = db.collection('pelanggan').insertOne(this);
//         }
//         return dbOp
//       .then(result => {
//           console.log(result);
//       }).catch(err => {
//           console.log(err);
//       }); 
//     }
//     static fetchAll() {
//         const db = getDb();
//         return db
//         .collection('pelanggan')
//         .find()
//         .toArray()
//         .then(pelanggans => {
//             // console.log(pelanggans);
//             return pelanggans
//         }).catch(err => {
//             console.log(err);
            
//         })
//     }
//     static findById(prodId) {
//         const db = getDb();
//         return db.collection('pelanggan')
//         .find({_id: new mongodb.ObjectId(prodId)})
//         .next()
//         .then(pelanggan => {
//             console.log(pelanggan);
//             return pelanggan;
            
//         }).catch(err => {
//             console.log(err);
            
//         })
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         return db.collection('pelanggan')
//         .deleteOne({_id: new mongodb.ObjectId(prodId)})
//         .then(result => console.log('Deleted'))
//         .catch(err => console.log(err))
//     }
// }

// module.exports = Pelanggan;