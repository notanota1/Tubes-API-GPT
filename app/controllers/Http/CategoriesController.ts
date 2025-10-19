import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/kategori'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category_validator'
import { errors as vineErrors } from '@vinejs/vine'

export default class CategoriesController {
  /**
   * Display a list of categories with their products
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    
    return await Category.query()
      .preload('products')
      .paginate(page, limit)
  }

  /**
   * Store a new category
   */
  async store({ request, response, session }: HttpContext) {
    const isInertiaRequest = request.header('x-inertia') === 'true'
    const rawData = request.only(['nama'])

    try {
      const payload = await createCategoryValidator.validate(rawData)
      const category = await Category.create(payload)

      if (isInertiaRequest) {
        session.flash('success', 'Kategori berhasil ditambahkan')
        return response.redirect('/categories')
      }

      return response.created(category)
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
        message: 'Gagal membuat kategori.',
        ...(error instanceof Error ? { error: error.message } : {}),
      })
    }
  }

  /**
   * Show individual category with its products
   */
  async show({ params }: HttpContext) {
    const category = await Category.query()
      .where('id', params.id)
      .preload('products')
      .firstOrFail()
    
    return category
  }

  /**
   * Update existing category
   */
  async update({ params, request, response, session }: HttpContext) {
    const isInertiaRequest = request.header('x-inertia') === 'true'
    const rawData = request.only(['nama'])

    try {
      const payload = await updateCategoryValidator.validate(rawData)
      const category = await Category.findOrFail(params.id)

      category.merge(payload)
      await category.save()

      if (isInertiaRequest) {
        session.flash('success', 'Kategori berhasil diperbarui')
        return response.redirect('/categories')
      }

      await category.load('products')
      return response.ok(category)
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
        message: 'Gagal memperbarui kategori.',
        ...(error instanceof Error ? { error: error.message } : {}),
      })
    }
  }

  /**
   * Delete category
   */
  async destroy({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    
    // Check if category has products
    const productCount = await category.related('products').query().count('* as total')
    
    if (productCount[0].total > 0) {
      return { error: 'Tidak dapat menghapus kategori yang masih memiliki produk' }
    }
    
    await category.delete()
    return { message: 'Kategori berhasil dihapus' }
  }

  /**
   * Get category statistics
   */
  async stats({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    const products = await category.related('products').query()
    
    const totalProducts = products.length
    const totalStock = products.reduce((sum, product) => sum + product.stok, 0)
    const averagePrice = products.length > 0 
      ? products.reduce((sum, product) => sum + product.harga, 0) / products.length 
      : 0
    
    return {
      category: category,
      stats: {
        totalProducts,
        totalStock,
        averagePrice: Math.round(averagePrice * 100) / 100
      }
    }
  }

  /**
   * Search categories by name
   */
  async search({ request }: HttpContext) {
    const searchTerm = request.input('search', '')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return await Category.query()
      .where('nama', 'like', `%${searchTerm}%`)
      .preload('products')
      .paginate(page, limit)
  }
}
