import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from './kategori.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare merk: string

  @column()
  declare stok: number

  @column()
  declare harga: number

  @column()
  declare kategori_id: number

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>
}
