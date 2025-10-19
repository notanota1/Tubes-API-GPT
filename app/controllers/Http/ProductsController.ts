import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/produk'
import { createProductValidator } from '#validators/product_validator'
import { errors as vineErrors } from '@vinejs/vine'

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
  async store({ request, response, session }: HttpContext) {
    const isInertiaRequest = request.header('x-inertia') === 'true'
    const rawData = request.only(['nama', 'merk', 'stok', 'harga', 'kategori_id'])

    try {
      const normalizedData = {
        ...rawData,
        stok:
          rawData.stok === undefined || rawData.stok === null || rawData.stok === ''
            ? undefined
            : Number(rawData.stok),
        harga:
          rawData.harga === undefined || rawData.harga === null || rawData.harga === ''
            ? undefined
            : Number(rawData.harga),
        kategori_id:
          rawData.kategori_id === undefined || rawData.kategori_id === null || rawData.kategori_id === ''
            ? undefined
            : Number(rawData.kategori_id),
      }

      const payload = await createProductValidator.validate(normalizedData)

      const product = await Product.create(payload)
      await product.load('category')

      if (isInertiaRequest) {
        session.flash('success', 'Produk berhasil ditambahkan')
        return response.redirect('/products')
      }

      return response.created(product)
    } catch (error) {
      if (error instanceof vineErrors.E_VALIDATION_ERROR) {
        const validationErrors = error.messages.reduce<Record<string, string>>((acc, message) => {
          acc[message.field] = message.message
          return acc
        }, {})

        if (isInertiaRequest) {
          return response
            .status(422)
            .header('X-Inertia', 'true')
            .send({ errors: validationErrors })
        }

        return response.status(422).send({
          message: 'Validasi gagal.',
          errors: validationErrors,
        })
      }

      return response.internalServerError({
        message: 'Gagal membuat produk.',
        ...(error instanceof Error ? { error: error.message } : {}),
      })
    }
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
