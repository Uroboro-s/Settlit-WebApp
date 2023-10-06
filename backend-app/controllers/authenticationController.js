const User = require('../models/user');
const Credential = require('../models/credential');

const app = require('../app');

const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

const {getUser, setUser} = require('./currentUser');

//Display Sign-in Form on GET
exports.signin_get = asyncHandler(async(req, res, next) =>{
    res.render('signin', {title: "Sign In"});
});

//Handle Sign-in Form on POST
exports.signin_post = [
    body("password")
    .trim()
    .isLength({min: 8, max: 32})
    .withMessage("Must contain at least 8 characters and not more than 16"),
    /* .isAlphanumeric()
    .withMessage("Password has non-alphanumeric characters"), */
    
    asyncHandler(async(req, res, next) =>{
        const errors = validationResult(req);

        const credential = new Credential({
            email: req.body.email,
            password: req.body.password,
        });

        if(!errors.isEmpty()) {
            res.render('signin', {
                title: "Sign In",
                credential: credential,
                errors: errors.array(),
            });
            return ;
        }
        else {
            const credentialExists = await Credential.findOne({email: req.body.email}).exec();
            console.log("here");
            if(!credentialExists) {
                res.render('signin', {
                    title: "Sign In",
                    credential: credential,
                    form_errors: "User does not exist"
                });
                return ;
            }
            if(credentialExists.password !== credential.password) {
                res.render('signin', {
                   title: "Sign In",
                   credential: credential,
                   form_errors: "Incorrect password",
                });
                return ;
            }
            const user = await User.findById(credentialExists.user).exec();
            console.log(setUser);
            setUser(user._id);
            /* res.render('user-home-page', {
                title: "Home",
                user: user,
            }); */
            res.redirect(user.url);
        }
        
    }),

]

/* exports.signin_post = asyncHandler(async(req, res, next) =>{
    res.render('signin', {title: "Sign In"});
}); */