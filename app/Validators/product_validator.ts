import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(1).maxLength(255),
    merk: vine.string().trim().maxLength(255).optional(),
    stok: vine.number().min(0).optional(),
    harga: vine.number().positive(),
    kategori_id: vine.number().positive()
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(1).maxLength(255).optional(),
    merk: vine.string().trim().maxLength(255).optional(),
    stok: vine.number().min(0).optional(),
    harga: vine.number().positive().optional(),
    kategori_id: vine.number().positive().optional()
  })
)
