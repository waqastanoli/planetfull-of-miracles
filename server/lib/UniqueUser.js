import User from '../models/users';
import Token from '../models/Token';
import Topics from '../models/Topics';
import Prouds from '../models/prouds';
import Contracts from '../models/Contracts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import mongoose from 'mongoose';

module.exports = async function UniqueUser(req){
    var username = req.body.name.replace(/\s/g,'');
    console.log(username);
    await User.find({name:req.body.name})
      .then(users => {
      
      if(users!=null) {
          username=username+users.length
      }
      console.log(username);
      return username;
    });
}

