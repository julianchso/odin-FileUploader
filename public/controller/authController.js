import { genPassword } from '../utils/passwordUtils.js';
import prisma from '../database/prismaClient.js';
import passport from 'passport';
const homeGet = async (req, res) => {
    let user = req.session.passport?.user;
    // let userId;
    // if (req.session.passport) {
    //   userId = req.session.passport.user;
    // } else {
    //   userId = null;
    // }
    res.render('folders', {
        title: 'Home',
        user: user,
    });
};
const signUpGet = (req, res) => {
    if (req.isAuthenticated())
        return res.redirect('/');
    res.render('signUp', {
        title: 'Sign Up',
    });
};
const signUpPost = async (req, res) => {
    try {
        const saltHash = genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                salt: salt,
                hash: hash,
            },
        });
        res.redirect('/login');
    }
    catch (err) {
        console.log(err);
    }
    // console.log(user);
};
const loginGet = (req, res) => {
    if (req.isAuthenticated())
        return res.redirect('/');
    res.render('login', {
        title: 'Log In',
    });
};
const loginPost = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })(req, res, next);
};
const logout = (req, res, next) => {
    req.logOut(function (err) {
        if (err) {
            return next(err);
        }
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });
};
export { homeGet, signUpGet, signUpPost, loginGet, loginPost, logout };
