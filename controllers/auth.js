const bcrypt = require('bcryptjs');
const User = require('../model/user');

exports.loginAdmin = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/adminlogin', {
        pageTitle: 'Admin Login',
        path: '/login-admin',
        errorMessage: message
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        email: email
    }).then(user => {
        if(!user) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login-admin')
        }
        bcrypt.compare(password, user.password).then(doMatch => {
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user; 
               return req.session.save(err => {
                    console.log(err);
                res.redirect('/admin/data-pelanggan')
                })
            }
            res.redirect('/login-admin')
        }).catch(err => {
            console.log(err);
            res.redirect('/login-admin')
        })
    }).catch(err => console.log(err))
    
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/')
    });
}

exports.getSignup = (req, res, next) => {
    res.render('auth/authsignup', {
        pageTitle: 'Admin Signup',
        path: '/signup-admin',
        isAuthenticated: false
    })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confpassword = req.body.confpassword;
    User.findOne({email: email}).then(userDoc => {
        if(userDoc) {
            return res.redirect('/signup-admin');
        }
       return bcrypt.hash(password, 12).then(hashedPassword => {
        const user = new User({
            email: email,
            password: hashedPassword
        });
        return user.save()
    })
    .then(result => {
        res.redirect('/login-admin')
    });
})
    .catch(err => {
        console.log(err); 
    });
}