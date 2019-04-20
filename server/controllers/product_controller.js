import Product from '../models/products';
import Categories from '../models/categories';
import {AutoComplete} from 'mongoose-in-memory-autocomplete';
const create = async(req, res, next) => {
  try {
    const product = await Product.create(req.body);
    
    if(!product)
      return res.send({status: false, msg: 'Product not created, something went wrong!'});
    else
      return res.send({status: true, msg: 'Product created successfully', product})
  }
  catch(err) {
    return res.send({status: false, msg: err.message})
  }
}

const getAll = async(req, res, next) => {
  try {

    const perpage = parseInt(req.params.perpage);
    const search = req.params.search;
    const page = Math.max(0, req.params.page)-1;
    var query = {};
    if(search!='null'){
      //query = {name: new RegExp('^'+search+'$', "i")};
      query = {
        name : {
          $regex: new RegExp(search)
        }
      }
    }
    //console.log(query);
    const products = await Product.find(query).sort('-created_at')
    .skip(perpage * page)
    .limit(parseInt(perpage));
    const totalProducts = await Product.find(query).count();

    if(!products && products.length == 0)
      return res.send({status: false, msg: 'Products not found!'})
    else 
      return res.send({status: true, msg: 'Products found', data: products, totalProducts:totalProducts, page:page, perpage:perpage})
  }
  catch(err) {
    return res.send({status: false, msg: err.message})
  }
}

const update = async(req, res, next) => {
  try {
    const id = req.params.id;

    var product = await Product.findByIdAndUpdate(id, req.body, {new: true, upsert: true});
    if(!product)
      return res.send({status: false, msg: 'server error'});
    
    return res.status(200).send({status: true, msg: 'Product updated successfully', data: product});
  }
  catch(err) {
    return res.send({status: false, msg: err.message})
  }
}

const remove = async(req, res, next) => {
  try {
    const id = req.params.id;
    console.log('ID ***** ', id);
    var data = await Product.findByIdAndDelete(id);
    if(!data)
      return res.send({status: false, msg: "product not found"});

    return res.status(200).send("product delete success");
  }
  catch(err) {
    return res.send({status: false, msg: err.message})
  }
}

const getById = async(req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);
    if(!product)
      return res.send({status: false, msg: 'Product not found'});

    return res.send({status: true, msg: 'product found', data: product});
  }
  catch(err) {
    return res.send({status: false, msg: err.message});
  }
}

const getproductdetail = async(req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);
    if(!product)
      return res.send({status: false, msg: 'Product not found'});

    return res.send({status: true, msg: 'product found', data: product});
  }
  catch(err) {
    return res.send({status: false, msg: err.message});
  }
}

const search = async(req, res, next) => {
  try {
    let products = [];
    if(req.body.name && req.body.name !== '') {
      products = await Product.find({ name:  new RegExp('^'+req.body.name+'$', "i")  });
    } else {
      products = await Product.find({});
    }
    if(!products)
      return res.send({status: false, msg: 'Product not found'});

    return res.send({status: true, msg: 'product found', data: products});
  }
  catch(err) {
    return res.send({status: false, msg: err.message});
  }
}
const importproductsdebug = async(req, res, next) => {
  Product.remove({})
  const request=require('request')
  const csvFilePath='http://localhost:8080/public/csv/ZebraTechnologiesdebug.csv';
  console.log(csvFilePath);
  const csv=require('csvtojson');
  

  csv()
  .fromStream(request.get(csvFilePath))
  .subscribe((json)=>{
      
      new Promise( async (resolve,reject)=>{
          var images = json.images.split("|").map(function (val) { return '/public/images/products/IMG/'+val; });;
          var data_to_be_inserted = {
            "tags" : [],
            "images" : images,
            "relatedProducts" : [],
            "name" : json.title,
            "title" : json.title,
            "description" : json.description,
            "averageRating" : 0,
            "proRef" : "",
            "price" : parseFloat(json.price.replace(/\$/g,'')),
            "quantity" : "100",
            "brand" : "",
            "created_at" : "2019-01-21T15:50:42.094Z",
            "updated_at" : "2019-01-21T15:50:42.094Z",
            "MainCategory":json.MainCategory,
            "SubCat1":json.SubCat1,
            "SubCat2":json.SubCat2,
            "SubCat3":json.SubCat3,
            "SubCat4":json.SubCat4,
            "SubCat5":json.SubCat5,
            "SubCat6":json.SubCat6,
        };
         //const product = await Product.create(data_to_be_inserted);
          console.log(data_to_be_inserted);
          resolve('done')
      })
      
  });
  return res.send({status: true, msg: 'import completed'});
}
const importproducts = async(req, res, next) => {
  Product.remove({})
  const request=require('request')
  const csvFilePath='http://68.183.175.21:8080/public/csv/ZebraTechnologies.csv';
  console.log(csvFilePath);
  const csv=require('csvtojson');
  

  csv()
  .fromStream(request.get(csvFilePath))
  .subscribe((json)=>{
      
      new Promise( async (resolve,reject)=>{
          var images = json.images.split("|").map(function (val) { return '/public/images/products/IMG/'+val; });;
          var data_to_be_inserted = {
            "tags" : [],
            "images" : images,
            "relatedProducts" : [],
            "name" : json.title,
            "title" : json.title,
            "description" : json.description,
            "averageRating" : 0,
            "proRef" : "",
            "price" : parseFloat(json.price.replace(/\$/g,'')),
            "quantity" : "100",
            "brand" : "",
            "created_at" : "2019-01-21T15:50:42.094Z",
            "updated_at" : "2019-01-21T15:50:42.094Z",
            "MainCategory":json.MainCategory,
            "SubCat1":json.SubCat1,
            "SubCat2":json.SubCat2,
            "SubCat3":json.SubCat3,
            "SubCat4":json.SubCat4,
            "SubCat5":json.SubCat5,
            "SubCat6":json.SubCat6,
        };
         const product = await Product.create(data_to_be_inserted);
          //console.log(product);
          resolve('done')
      })
      
  });
  return res.send({status: true, msg: 'import completed'});
}


const importcategories = async(req, res, next) => {
  Categories.remove({})
  const request=require('request')
  const csvFilePath='http://68.183.175.21:8080/public/csv/ZebraTechnologies.csv';
  console.log(csvFilePath);
  const csv=require('csvtojson');
  

  csv()
  .fromStream(request.get(csvFilePath))
  .subscribe((json)=>{
      
      new Promise( async (resolve,reject)=>{
          if(json.MainCategory!=''){
            var MainCategory = await Categories.findOne({name:json.MainCategory});
            console.log(MainCategory);
            if(!MainCategory){
              var data_to_be_inserted = {
                  "name" : json.MainCategory,
                  "parent" : '/'
              };
              var MainCategory = await Categories.create(data_to_be_inserted);
            }
          }
          if(json.SubCat1!=''){
            var SubCat1 = await Categories.findOne({name:json.SubCat1});
            if(!SubCat1){
              var data_to_be_inserted = {
                  "name" : json.SubCat1,
                  "parent" : MainCategory.name
              };
              var SubCat1 = await Categories.create(data_to_be_inserted);
            }
          }
          if(json.SubCat2!=''){
            var SubCat2 = await Categories.findOne({name:json.SubCat2});
            if(!SubCat2){
              var data_to_be_inserted = {
                  "name" : json.SubCat2,
                  "parent" : SubCat1.name
              };
              var SubCat2 = await Categories.create(data_to_be_inserted);
            }
          }
          if(json.SubCat3!=''){
            var SubCat3 = await Categories.findOne({name:json.SubCat3});
            if(!SubCat3){
              var data_to_be_inserted = {
                  "name" : json.SubCat3,
                  "parent" : SubCat2.name
              };
              var SubCat3 = await Categories.create(data_to_be_inserted);
            }
          }
          if(json.SubCat4!=''){
            var SubCat4 = await Categories.findOne({name:json.SubCat4});
            if(!SubCat4){
              var data_to_be_inserted = {
                  "name" : json.SubCat4,
                  "parent" : SubCat3.name
              };
              var SubCat4 = await Categories.create(data_to_be_inserted);
            }
          }
          if(json.SubCat5!=''){
            var SubCat5 = await Categories.findOne({name:json.SubCat5});
            if(!SubCat5){
              var data_to_be_inserted = {
                  "name" : json.SubCat5,
                  "parent" : SubCat4.name
              };
              var SubCat5 = await Categories.create(data_to_be_inserted);
            }
          }
          if(json.SubCat6!=''){
            var SubCat6 = await Categories.findOne({name:json.SubCat6});
            if(!SubCat6){
              var data_to_be_inserted = {
                  "name" : json.SubCat6,
                  "parent" : SubCat5.name
              };
              var SubCat6 = await Categories.create(data_to_be_inserted);
            }
          }
          //console.log(product);
          resolve('done')
      })
      
  });
  return res.send({status: true, msg: 'import completed'});
}

const suggest = async(req, res, next) => {
  try {
    // Autocomplete configuration
    var configuration = {
        //Fields being autocompleted, they will be concatenated
        autoCompleteFields : [ "title","name","description"],
        //Returned data with autocompleted results
        dataFields: ["_id"],
        //Maximum number of results to return with an autocomplete request
        maximumResults: 10,
        //MongoDB model (defined earlier) that will be used for autoCompleteFields and dataFields
        model: Product
    }
    //initialization of AutoComplete Module
    var myMembersAutoComplete = new AutoComplete(configuration, function(){
      //any calls required after the initialization
      console.log("Loaded " + myMembersAutoComplete.getCacheSize() + " words in auto complete");
    });
    myMembersAutoComplete.getResults(req.body.name, function(err, words){
      if(err)
        return res.send({status: false, msg: err});
      else{
        if(Array.isArray(words))
          return  res.send({status: true, msg: 'suggestions found', suggestions: words});
        else
          return res.send({status: false, msg: 'suggestions not found'});    
      }
    });
   }
  catch(err) {
    return res.send({status: false, msg: err.message});
  }
}

export default {
  create,
  getAll,
  update,
  remove,
  getById,
  search,
  suggest,
  importproducts,
  getproductdetail,
  importcategories,
  importproductsdebug
}