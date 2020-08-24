const Pelanggan = require('../model/datapelanggan');

exports.getIndexClient = (req, res, next) => {
    res.render('client/index', {
        pageTitle: 'Beranda',
        path: '/'
    })
}

exports.getTentangClient = (req, res, next) => {
    res.render('client/tentang', {
        pageTitle: 'Tentang Kami',
        path: '/tentang-pastilaundry',
        isAuthenticated: req.isLoggedIn
    })
}

exports.getLayanan = (req, res, next) => {
    res.render('client/layanan', {
        pageTitle: 'Layanan & Promo',
        path: '/layanan-promo',
        isAuthenticated: req.isLoggedIn
    })
}

exports.cekStatus = (req, res, next) => {
    Pelanggan.find()
    .then(pelanggans => {
        res.render('client/cekstatus', {
            pageTitle: 'Cek Status Laundry',
            path: '/cek-status',
            data: pelanggans,
            isAuthenticated: req.isLoggedIn
        })
    }).catch(err => {
        console.log(err);
})
}
