import type { HttpContext } from '@adonisjs/core/http'
import Suplier from '#models/suplier'

export default class SuppliersController {
  /**
   * Display a list of suppliers
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    
    return await Suplier.query()
      .paginate(page, limit)
  }

  /**
   * Store a new supplier
   */
  async store({ request }: HttpContext) {
    const data = request.only(['nama', 'alamat', 'telepon', 'email'])
    
    // Validate required fields
    if (!data.nama) {
      return { error: 'Nama supplier harus diisi' }
    }

    const suplier = await Suplier.create(data)
    return suplier
  }

  /**
   * Show individual supplier
   */
  async show({ params }: HttpContext) {
    const suplier = await Suplier.findOrFail(params.id)
    return suplier
  }

  /**
   * Update existing supplier
   */
  async update({ params, request }: HttpContext) {
    const suplier = await Suplier.findOrFail(params.id)
    const data = request.only(['nama', 'alamat', 'telepon', 'email'])
    
    suplier.merge(data)
    await suplier.save()
    
    return suplier
  }

  /**
   * Delete supplier
   */
  async destroy({ params }: HttpContext) {
    const suplier = await Suplier.findOrFail(params.id)
    await suplier.delete()
    
    return { message: 'Supplier berhasil dihapus' }
  }

  /**
   * Search suppliers
   */
  async search({ request }: HttpContext) {
    const searchTerm = request.input('search', '')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return await Suplier.query()
      .where('nama', 'like', `%${searchTerm}%`)
      .orWhere('alamat', 'like', `%${searchTerm}%`)
      .orWhere('telepon', 'like', `%${searchTerm}%`)
      .orWhere('email', 'like', `%${searchTerm}%`)
      .paginate(page, limit)
  }
}
