import vine from '@vinejs/vine'

export const createSupplierValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(1).maxLength(255),
    alamat: vine.string().trim().maxLength(500).optional(),
    telepon: vine.string().trim().maxLength(20).optional(),
    email: vine.string().email().trim().optional()
  })
)

export const updateSupplierValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(1).maxLength(255).optional(),
    alamat: vine.string().trim().maxLength(500).optional(),
    telepon: vine.string().trim().maxLength(20).optional(),
    email: vine.string().email().trim().optional()
  })
)
