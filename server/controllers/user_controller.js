import User from '../models/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const create = async(req,res,next) => {
  try {
    
    var not_exist = true;
     await User.findOne({email:req.body.email}, function(err, user){
      if(err) {
        not_exist = false;
        return res.send({status: false, error: err.message});
      }
      if(Boolean(user)) {
        not_exist = false;
        return res.send({status: false, error: 'E-mail already in use, Signin or try different email'});
      }
      
    });

    if(not_exist==true){
        const newUser = await User.create(
            {
              name:req.body.name,
              email:req.body.email,
              password:req.body.password,
              cartItems:req.body.cartItems
            }
          );
        bcrypt.genSalt(10, (err, salt) => {
            if(err) console.error('There was an error', err);
            else {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) console.error('There was an error', err);
                    else {
                        newUser.password = hash;
                        newUser
                            .save(); 
                    }
                });
            }
        });
        if(!newUser)
          return res.send({status: false, error: 'user can\'t be created'});
        else{
          const payload = {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              cartItems: newUser.cartItems
          }
          jwt.sign(payload, 'secret', {
              expiresIn: 3600
          }, (err, token) => {
              if(err) console.error('There is some error in token', err);
              else {
                  return res.send({status: true, msg: 'user created successfully', data: token});
              }
          });
          
        }
      }
  }
  catch(err) {

    return res.send({status: false, error: err.message});
  }
}
const login = async(req,res,next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
        if(!user) {
            return res.send({status: false, error: 'Email does not exist, please create an account'});
        }
        bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            cartItems: user.cartItems
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) console.error('There is some error in token', err);
                            else {
                                return res.send({status: true, message: 'login successfull', data: token});
                            }
                        });
                    }
                    else {
                        return res.send({status: false, error: 'Incorrect Password, please try again'});
                    }
                });
    });
    
  }
  catch(err) {
    return res.send({status: false, error: err.message});
  }
}


export default {
  create,
  login
}