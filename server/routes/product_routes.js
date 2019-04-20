import express from 'express';
import productController from '../controllers/product_controller';
import fileService from '../services/fileService';
const router = express.Router();

//=============== BASE CALLS
router.route('/')
  // POST
  .post( productController.create );

router.route('/page/:page/:perpage/:search')// GET
  .get( productController.getAll );

router.route('/importproducts')// GET
  .get( productController.importproducts );
router.route('/importproductsdebug')// GET
  .get( productController.importproductsdebug );
router.route('/detail/:id')// GET
  .get( productController.getproductdetail )

router.route('/importcategories')// GET
  .get(productController.importcategories) ;

//=============== CALLS BY ID
router.route('/:id')  
  // PUT
  .put( productController.update )
  // DELETE
  .delete ( productController.remove )
  // GET
  .get( productController.getById )
//=============== SEARCH PRODUCTS
router.route('/search')
  //GET
  .post ( productController.search )

//=============== GET SUGGESTIONS
router.route('/suggest')
  //GET
  .post ( productController.suggest )


export default router;