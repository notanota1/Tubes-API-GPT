import router from '@adonisjs/core/services/router'

// Public routes (tidak perlu authentication)
router.get('/', async ({ inertia }) => {
  return inertia.render('home')
}).middleware(() => import('#middleware/session_auth_middleware'))

// Authentication routes (public)
router.get('/login', async ({ inertia }) => {
  return inertia.render('login')
})

// Authentication routes (public)
router.group(() => {
  router.post('/login', '#controllers/http/AuthController.login')
}).prefix('/api/auth')

// Logout route (public)
router.post('/logout', '#controllers/http/AuthController.logout')

// Protected UI routes (membutuhkan authentication)
router.group(() => {
  // Dashboard
  router.get('/dashboard', async ({ inertia, session, response }) => {
    // Check authentication manually
    const authToken = session.get('auth_token')
    const user = session.get('user')
    
    if (!authToken || !user) {
      return response.redirect('/login')
    }
    
    return inertia.render('dashboard')
  })
  
  // Categories UI
  router.get('/categories', async ({ inertia, session, response }) => {
    // Check authentication manually
    const authToken = session.get('auth_token')
    const user = session.get('user')
    
    if (!authToken || !user) {
      return response.redirect('/login')
    }
    
    return inertia.render('categories/index', {
      categories: { data: [], meta: {} }
    })
  })
  
  // Products UI
  router.get('/products', async ({ inertia, session, response }) => {
    // Check authentication manually
    const authToken = session.get('auth_token')
    const user = session.get('user')
    
    if (!authToken || !user) {
      return response.redirect('/login')
    }
    
    return inertia.render('products/index', {
      products: { data: [], meta: {} },
      categories: []
    })
  })
  
  // Transactions UI
  router.get('/transactions', async ({ inertia, session, response }) => {
    // Check authentication manually
    const authToken = session.get('auth_token')
    const user = session.get('user')
    
    if (!authToken || !user) {
      return response.redirect('/login')
    }
    
    return inertia.render('transactions/index', {
      transactions: { data: [], meta: {} },
      products: []
    })
  })
})

// API routes (protected)
router.group(() => {
  // Auth protected routes
  router.get('/profile', '#controllers/http/AuthController.profile')
  router.post('/refresh', '#controllers/http/AuthController.refresh')
  
  // Categories routes
  router.get('/categories', '#controllers/http/CategoriesController.index')
  router.post('/categories', '#controllers/http/CategoriesController.store')
  router.get('/categories/:id', '#controllers/http/CategoriesController.show')
  router.put('/categories/:id', '#controllers/http/CategoriesController.update')
  router.delete('/categories/:id', '#controllers/http/CategoriesController.destroy')
  router.get('/categories/:id/stats', '#controllers/http/CategoriesController.stats')
  router.get('/categories/search', '#controllers/http/CategoriesController.search')

  // Products routes
  router.get('/products', '#controllers/http/ProductsController.index')
  router.post('/products', '#controllers/http/ProductsController.store')
  router.get('/products/:id', '#controllers/http/ProductsController.show')
  router.put('/products/:id', '#controllers/http/ProductsController.update')
  router.delete('/products/:id', '#controllers/http/ProductsController.destroy')
  router.get('/products/category/:categoryId', '#controllers/http/ProductsController.getByCategory')
  router.get('/products/search', '#controllers/http/ProductsController.search')

  // Transactions routes
  router.get('/transactions', '#controllers/http/TransactionsController.index')
  router.post('/transactions', '#controllers/http/TransactionsController.store')
  router.get('/transactions/:id', '#controllers/http/TransactionsController.show')
  router.put('/transactions/:id', '#controllers/http/TransactionsController.update')
  router.delete('/transactions/:id', '#controllers/http/TransactionsController.destroy')
  router.get('/transactions/product/:productId', '#controllers/http/TransactionsController.getByProduct')
  router.get('/transactions/stats', '#controllers/http/TransactionsController.stats')
  router.get('/transactions/search', '#controllers/http/TransactionsController.search')

  // Suppliers routes
  router.get('/suppliers', '#controllers/http/SuppliersController.index')
  router.post('/suppliers', '#controllers/http/SuppliersController.store')
  router.get('/suppliers/:id', '#controllers/http/SuppliersController.show')
  router.put('/suppliers/:id', '#controllers/http/SuppliersController.update')
  router.delete('/suppliers/:id', '#controllers/http/SuppliersController.destroy')
  router.get('/suppliers/search', '#controllers/http/SuppliersController.search')
}).prefix('/api') 
