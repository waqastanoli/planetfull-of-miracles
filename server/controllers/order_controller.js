import Order from '../models/orders';
import User from '../models/users';

const create = async(req,res,next) => {
  try {
    // const userId = req.body.owner;

    // const user = await User.findById(userId);
    // if(!user)
    //   return res.send({status: false, msg: 'User not found'});

    const order = await Order.create(req.body);
    console.log('REQUEST BODY ***** ', req.body);
    if(!order)
      return res.send({ status: false, msg: 'Order cannot be created this time' })

    return res.send({ status: true, msg: 'order endpoint working', data: order });
  }
  catch(err) {
    return res.send({status: false, msg: err.message});
  }
}

const getById = async(req, res, next) => {
  try {
    const id = req.params.id;

    const order = await Order.findById(id)
                          .populate({path: 'owner', select: 'first_name'});
    if(!order)
      return res.send({status: false, msg: 'Order not found'});                          

    return res.send({status: true, msg: 'order found', data: order});
  }
  catch(err) {
    return res.send({status: false, msg: err.message});
  }
}

const remove = async(req, res, next) => {
  try {
    const id = req.params.id;

    const order = await Order.findByIdAndDelete(id);
    if(!order)
      return res.send({status: false, msg: 'Cannot delete order, something went wrong!'});

    return res.send({status: true, msg: 'order deleted successfully!s'});
  }
  catch(err) {
    return res.send({status: false, msg: err.message});
  }
}

const getAll = async(req, res, next) => {
  try{
    const orders = await Order.find();
    
    if(!orders || orders.length == 0)
      return res.send({status: false, msg: 'orders not found'});

    return res.send({status: false, msg: 'Order fetched successfully', data: orders});  
  }
  catch(err){
    return res.send({status: false, msg: 'Internal server error'});
  }
}

export default {
  create,
  getById,
  getAll,
  remove
}