import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/produk'

export default class ProductsController {
  /**
   * Display a list of products with pagination and category relationships
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    
    return await Product.query()
      .preload('category')
      .paginate(page, limit)
  }

  /**
   * Store a new product
   */
  async store({ request }: HttpContext) {
    const data = request.only(['nama', 'merk', 'stok', 'harga', 'kategori_id'])
    
    // Validate required fields
    if (!data.nama || !data.harga || !data.kategori_id) {
      return { error: 'Nama, harga, dan kategori_id harus diisi' }
    }

    const product = await Product.create(data)
    await product.load('category')
    
    return product
  }

  /**
   * Show individual product with category relationship
   */
  async show({ params }: HttpContext) {
    const product = await Product.query()
      .where('id', params.id)
      .preload('category')
      .firstOrFail()
    
    return product
  }

  /**
   * Update existing product
   */
  async update({ params, request }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const data = request.only(['nama', 'merk', 'stok', 'harga', 'kategori_id'])
    
    product.merge(data)
    await product.save()
    await product.load('category')
    
    return product
  }

  /**
   * Delete product
   */
  async destroy({ params }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.delete()
    
    return { message: 'Product berhasil dihapus' }
  }

  /**
   * Get products by category
   */
  async getByCategory({ params }: HttpContext) {
    const products = await Product.query()
      .where('kategori_id', params.categoryId)
      .preload('category')
    
    return products
  }

  /**
   * Search products by name
   */
  async search({ request }: HttpContext) {
    const searchTerm = request.input('search', '')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return await Product.query()
      .where('nama', 'like', `%${searchTerm}%`)
      .orWhere('merk', 'like', `%${searchTerm}%`)
      .preload('category')
      .paginate(page, limit)
  }
}
