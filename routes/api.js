const express = require('express')
const router = express.Router()
const authController =  require('../controllers/authController')
const usersController =  require('../controllers/usersController')
const categoriesController =  require('../controllers/categoriesController')
const subcategoriesController =  require('../controllers/subcategoriesController')
const productsController =  require('../controllers/productsController')
const brandsController =  require('../controllers/brandsController')
const cartController =  require('../controllers/cartController')
const ordersController =  require('../controllers/ordersController')
const favoritesController =  require('../controllers/favoritesController')
const egyptController = require('../controllers/egyptController')
const { requireAuth } = require('../middlewares/authMiddleware')

//Auth Routes
router.post('/signup',authController.signup_post)
router.post('/login',authController.login_post)
router.get('/logout',authController.logout_get)

//User Routes
router.get('/users',usersController.get_users)
router.get('/current-user',usersController.get_current_user)
router.get('/users/:id',usersController.get_single_user)
router.delete('/users/:id',usersController.delete_user)
router.put('/users/:id',usersController.update_user)

//Category Routes
router.post('/categories',categoriesController.create_category)
router.get('/categories',categoriesController.get_categories)
router.get('/categories/:id',categoriesController.get_single_category)
router.delete('/categories/:id',categoriesController.delete_category)
router.put('/categories/:id',categoriesController.update_category)

//Subcategory Routes
router.post('/subcategories',subcategoriesController.create_subcategory)
router.get('/subcategories',subcategoriesController.get_subcategories)
router.get('/subcategories/:id',subcategoriesController.get_single_subcategory)
router.delete('/subcategories/:id',subcategoriesController.delete_subcategory)
router.put('/subcategories/:id',subcategoriesController.update_subcategory)

//Products Routes
router.post('/products',productsController.create_product)
router.get('/products',productsController.get_products)
router.get('/products/:id',productsController.get_single_product)
router.delete('/products/:id',productsController.delete_product)
router.put('/products/:id',productsController.update_product)
router.get('/newest-products',productsController.getNewestProducts)
router.get('/most-ordered-products',productsController.getMostOrderedProducts)
//Brands Routes
router.post('/brands',brandsController.create_brand)
router.get('/brands',brandsController.get_brands)
router.get('/brands/:id',brandsController.get_single_brand)
router.delete('/brands/:id',brandsController.delete_brand)
router.put('/brands/:id',brandsController.update_brand)

//Cart Routes
router.post('/cart/:id',cartController.create_cart)
router.put('/cart/:id',cartController.delete_one_product_from_cart)
router.delete('/cart/:id',cartController.delete_all_cart)

//Order Routes
router.post('/create-order',ordersController.create_order)
router.get('/orders',ordersController.get_all_orders)
router.get('/orders/:id',ordersController.get_single_order)
router.put('/orders/:id',ordersController.update_order)
router.delete('/orders/:id',ordersController.delete_order)

//Favorite Routes
router.post('/favorites',favoritesController.post_favorite)
router.get('/favorites',favoritesController.get_favorites)
router.delete('/favorites/:id',favoritesController.delete_favorite)

// Cities and Governorates
router.get('/governorates',egyptController.getGovernorates)


module.exports = router