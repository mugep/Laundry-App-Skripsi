const fs = require('fs');
const path = require('path');
const PDFDocument = require('../pdfkit-tables');
// const PDFDocument = require('pdfkit');

const Pelanggan = require('../model/datapelanggan');

exports.getAddPelanggan = (req, res, next) => {
    res.render('admin/admininput', {
        pageTitle: 'Input Pelanggan',
        path: '/add-pelanggan',
        isAuthenticated: req.isLoggedIn
    })
}

exports.getPelanggan = (req, res, next) => {
    const custId = req.params.pelangganId;
    Pelanggan.findById(custId)
    .then(data => {
        res.render('admin/rincidata', {
            data: data,
            pageTitle: 'Data Pelanggan',
            isAuthenticated: req.isLoggedIn
        });
    })
    .catch(err => console.log(err))
}

exports.updatePelanggan = (req, res, next) => {
    console.log(req.body);
    const prodId = req.body.dataId;
    const updatedStatus = req.body.status;
    const updatedPembayaran = req.body.pembayaran; 
    Pelanggan.findById(prodId).then(pelanggan => {
        pelanggan.status = updatedStatus;
        pelanggan.pembayaran = updatedPembayaran;
        return pelanggan.save()
    }).then(result => {
        console.log('UPDATED PRODUCT');
        res.redirect('/admin/data-pelanggan')
    }) 
   .catch(err => console.log(err)
   )
}

exports.postAddPelanggan = (req, res, next) => {
    console.log(req.body);
    const nama = req.body.nama;
    const email = req.body.email;
    const alamat = req.body.alamat;
    const layanan = req.body.layanan;
    const paket = req.body.paket;
    const status = req.body.status;
    const berat = req.body.berat;
    const harga = req.body.harga;
    const tanggal = req.body.tanggal;
    const pembayaran = req.body.pembayaran;

    const dataPelanggan = new Pelanggan({
       nama: nama, 
       email: email, 
       alamat: alamat, 
       layanan: layanan, 
       paket: paket, 
       status: status, 
       berat: berat, 
       harga: harga, 
       tanggal: tanggal, 
       pembayaran: pembayaran, 
       userId: req.user
    });
    dataPelanggan.save().then(result => {
        console.log('Created Pelanggan');
        res.redirect('/admin/data-pelanggan');
    }).catch(err => {
        console.log(err);
        
    })
}

exports.hapusPelanggan = (req, res, next) => {
    const prodId = req.body.dataId;
    Pelanggan.findByIdAndRemove(prodId)
    .then(() => {
        console.log('DELETE DATA PELANGGAN');
        res.redirect('/admin/data-pelanggan')
    })
    .catch(err => console.log(err))
}

exports.getDataPelanggan = (req, res, next) => {
    Pelanggan.find()
    .then(pelanggans => {
        res.render('admin/datapelanggan', {
            pageTitle: 'Data Pelanggan',
            path: '/data-pelanggan',
            data: pelanggans,
            isAuthenticated: req.isLoggedIn
        })
    }).catch(err => {
        console.log(err);
})
    
}

exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;
    Pelanggan.findById(orderId).then(pelanggans => {
        // console.log(pelanggans);  
    const invoiceName = 'invoice-' + orderId + '.pdf'; 
    const invoicePath = path.join('data', 'invoices', invoiceName);
    const pdfDoc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res)
    pdfDoc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Infromasi Pelanggan.", 110, 57)
    .text("Pasti Laundry", 110, 80)
    .fontSize(10)
    .text("Jl. Edelweis II E3/30", 200, 65, { align: "right" })
    .text("Kebalen, Bekasi 17610", 200, 80, { align: "right" })
    .moveDown();
    const table = {
        headers: ["Nama", "Email", "Alamat", "Layanan", "Paket", "Harga", "Tanggal"],
        rows: [
            [pelanggans.nama, pelanggans.email, pelanggans.email, pelanggans.layanan, pelanggans.paket, pelanggans.harga, pelanggans.tanggal]
        ]
    };

    // Draw the table
    pdfDoc.moveDown().table(table, 10, 125, { width: 590 });

    // Finalize the PDF and end the stream
    pdfDoc.end();
    }).catch(err => {
        console.log(err);
        
    })
}

exports.getLaporan = (req, res, next) => {
    res.render('admin/adminlaporan', {
        pageTitle: 'Laporan Pelanggan',
        path: '/laporan-pelanggan',
        isAuthenticated: req.isLoggedIn
    })
} 

exports.printLaporan = (req, res, next) => {
    Pelanggan.find()
    .then(pelanggans => {
    console.log(pelanggans);
        
    const laporanName = 'laporan-' + Date.now() + '.pdf'; 
    const laporanPath = path.join('data', 'laporan', laporanName);
    const pdfDoc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="' + laporanName + '"');
    pdfDoc.pipe(fs.createWriteStream(laporanPath));
    pdfDoc.pipe(res)
    pdfDoc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Laporan Pelanggan.", 110, 57)
    .text("Pasti Laundry", 110, 80)
    .fontSize(10)
    .text("Jl. Edelweis II E3/30", 200, 65, { align: "right" })
    .text("Kebalen, Bekasi 17610", 200, 80, { align: "right" })
    .moveDown();

    const table = {
        headers: ["Nama", "Email", "Alamat", "Layanan", "Paket", "Status", "Berat", "Harga", "Tanggal", "Pembayaran"],
        rows: []
    }

    for(const pelanggan of pelanggans) {
        table.rows.push([pelanggan.nama, pelanggan.email, pelanggan.alamat, pelanggan.layanan, pelanggan.paket, pelanggan.status, pelanggan.berat, pelanggan.harga, pelanggan.tanggal, pelanggan.pembayaran])
    }

    // Draw the table
    pdfDoc.moveDown().table(table, 10, 125, { width: 590 });

    // Finalize the PDF and end the stream
    pdfDoc.end();
    }).catch(err => {
        console.log(err);  
    })
}