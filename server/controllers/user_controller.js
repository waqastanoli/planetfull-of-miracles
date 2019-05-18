import User from '../models/users';
import Token from '../models/Token';
import Topics from '../models/Topics';
import Prouds from '../models/prouds';
import Contracts from '../models/Contracts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import mongoose from 'mongoose';
var formidable = require('formidable');
var fs = require('fs');
import sendVerificationEmail  from '../lib/SendGridEmailHelper';
//import UniqueUser  from '../lib/UniqueUser';
exports.updatesection = async(req,res,next) => {
  const id = req.params.id;

  const type = req.body.type;
  console.log(type);
  User.findOne({_id:id})
    .then(user => {
      // Verify and save the user
      if(type=='current')
      user.current_situation = req.body.value;
      if(type=='future')
      user.future_vision = req.body.value;
      
      user.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
      })
      return res.send({status: true, msg: 'Saved successfully'});
    })
}
exports.profilepic = async(req,res,next) => {
   const id = req.params.id;
   const pictype = req.params.type;
   var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.imageFiles.path;
      var newpath = 'dist/public/'+id+'/'+pictype+'/' + files.imageFiles.name;
      var pubpath = 'public/'+pictype+'/'+id+'/'+ files.imageFiles.name;
      var userdir = 'dist/public/'+id;

      if (!fs.existsSync(userdir)){
        fs.mkdirSync(userdir);
      }
      userdir=userdir+'/'+pictype
      if (!fs.existsSync(userdir)){
        fs.mkdirSync(userdir);
      }
       // Read the file
        fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            console.log('File read!');

            // Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;
                User.findOne({_id:id})
                .then(user => {
                  // Verify and save the user
                  if(pictype=='profile')
                  user.image = files.imageFiles.name;
                  if(pictype=='cover')
                  user.cover = files.imageFiles.name;
                  
                  user.save(function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                  })
                })
                res.send([pubpath]);
                res.end();
                console.log('File written!');
            });

            // Delete the file
            fs.unlink(oldpath, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        });
 });
}
exports.create = async(req,res,next) => {
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
        var username = req.body.name.replace(/\s/g,'');
        //var username = await UniqueUser(req);
        await User.find({name:req.body.name})
          .then(users => {
          
          if(users!=null) {
              username=username+users.length
          }      
        });

        
        const newUser = await User.create(
            {
              name:req.body.name,
              email:req.body.email,
              password:req.body.password,
              mobile:req.body.mobile,
              isVerified:false,
              username:username
            }
          );
        //console.log(newUser);
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
          var token = await Token.create({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
          sendVerificationEmail(req , newUser.email, token.token);
          const payload = {
              id: newUser.id,
              name: newUser.name,
              image: newUser.image,
              email: newUser.email,
              username: newUser.username
          }
          jwt.sign(payload, 'secret', {
              expiresIn: 7200
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
};
exports.confirm = async(req,res,next) => {
  req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('token', 'Token cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
 
    // Check for validation errors    
    var errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);
 
    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(200).send({ status: false, type: 'not-verified', error: 'We were unable to find a valid token. Your token may have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(200).send({status: false,  error: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(200).send({status: false,  type: 'already-verified', error: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                
                
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    username: user.username
                }
                jwt.sign(payload, 'secret', {
                    expiresIn: 7200
                }, (err, token) => {
                    if(err) console.error('There is some error in token', err);
                    else {
                        return res.send({status: true, message: 'Thank you, The account has been verified.', data: token});
                    }
                });
                    
                //res.status(200).send({status: true, message:"Thank you, The account has been verified."});
            });
        });
    });
};
exports.login = async(req,res,next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
        if(!user) {
            return res.send({status: false, error: 'Email does not exist, please create an account'});
        }
        if(user && user.isVerified==false) {
            return res.send({status: false, error: 'Account not active, please check your email to verify your account'});
        }
        bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            image: user.image,
                            email: user.email,
                            username: user.username
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 7200
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
};
exports.updatetopic = async(req,res,next) => {

  var topic_id = req.body.id;
  

    Topics.findOneAndUpdate({
              text:req.body.text,
              type:req.body.type
            },
                {                        
                    "$addToSet": {
                        "_userIds": req.body.user_id
                    }
                },
                { new: true,upsert:true}, function (err, doc) {
                    if (err) { 
                        //do something         
                        console.log(err)             
                    } else if (doc === null) {
                        //do something                      
                    } else {
                        return res.send({status: true, msg: 'Topic Saved successfully', Topic: doc});
                    }
                });
  
}
exports.updatecontract = async(req,res,next) => {

  var req_cont = req.body.contract;
  const newContract = await Contracts.create(
            {
              _userId:req_cont._userId,
              from:req_cont.startDate,
              to:req_cont.endDate,
              status:req_cont.status,
              serverType:req_cont.type,
              who:req_cont.who.value,
              rating:req_cont.rate
            }
          );
  var responseContract = await newContract.populate('who').execPopulate();
  
  return res.send({status: true, msg: 'Contract Saved successfully', Contract: responseContract});
  
}
exports.updateproud = async(req,res,next) => {

  var proud_id = req.body.id;
  if(proud_id==null){
      const newProud = await Prouds.create(
            {
              _userId:req.body.user_id,
              title:req.body.title,
              note:req.body.note
            }
          );
      return res.send({status: true, msg: 'Proud Saved successfully', Proud: newProud});
  } else {
    Prouds.findOne({ _id: proud_id }, function (err, proud) {
        proud.title = req.body.title;
        proud.note = req.body.note;
        proud.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            return res.send({status: true, msg: 'Proud Saved successfully', Proud: proud});
        });
    });
  }
  
}
exports.profile = async(req,res,next) => {
  try {
    const name = req.params.name;

    User.findOne({username:name})
        .then(user => {
        if(!user) {
            return res.send({status: false, error: 'User does not exist'});
        }
        
        Prouds.find({_userId:user._id})
        .then(prouds => {
          Topics.find({_userIds: { "$in" : [user._id]} })
            .then(topics => {
              User.find({},'_id name', function(err, users) {
              users = users.map(function(elm) {
   return { value: elm._id, label: elm.name};
});
              const inspire = topics.filter(d => d.type == 'inspire');
              const aspire = topics.filter(d => d.type == 'aspire');
              Contracts.find({_userId:user._id}).populate('who').then(contracts => {

                const serving_me = contracts.filter(d => d.serverType == 'me');
                const serving_others = contracts.filter(d => d.serverType == 'others');
                const openContracts = contracts.filter(d => d.status == 'Open');
                const completedContracts = contracts.filter(d => d.status == 'Completed');
                
                var payload = {
                  id:user._id,          
                  name:user.name,
                  image:user.image,
                  cover:user.cover,
                  badge: null,
                  current_situation:user.current_situation,
                  future_vision:user.future_vision,
                  inspire:inspire,
                  aspire:aspire,
                  proud_chart:prouds,
                  serving_me:serving_me,
                  serving_others:serving_others,
                  suggestions_list: [],
                  openContracts:openContracts,
                  completedContracts:completedContracts,
                  users:users
                };

               return res.send({status: true, message: 'successfull', data: payload});
               });
              });
          })
        })
        
    });
    
  }
  catch(err) {
    return res.send({status: false, error: err.message});
  }
};


/*export default {
  create,
  login,
  confirm
}*/