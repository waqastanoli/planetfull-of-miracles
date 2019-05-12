import User from '../models/users';
import Token from '../models/Token';
import Topics from '../models/Topics';
import Prouds from '../models/prouds';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import mongoose from 'mongoose';
exports.detail = async(req,res,next) => {
	try {
    const id = req.params.id;

    Topics.findById(id).populate('_userIds')
        .then(topic => {
        if(!topic) {
            return res.send({status: false, error: 'User does not exist'});
        }
        return res.send({status: true, message: 'successfull', data: topic});
        /*
        Prouds.find({_userId:user._id})
        .then(prouds => {
          Topics.find({_userIds: { "$in" : [user._id]} })
            .then(topics => {
              const inspire = topics.filter(d => d.type == 'inspire');
              const aspire = topics.filter(d => d.type == 'aspire');
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
                serving_me:[],
                serving_others:[],
                suggestions_list: []
              };

             return res.send({status: true, message: 'successfull', data: payload});
          })
        })*/
        
    });
    
  }
  catch(err) {
    return res.send({status: false, error: err.message});
  }
}