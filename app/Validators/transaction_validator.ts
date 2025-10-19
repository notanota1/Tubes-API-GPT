import vine from '@vinejs/vine'

export const createTransactionValidator = vine.compile(
  vine.object({
    produk_id: vine.number().positive(),
    tipe: vine.enum(['masuk', 'keluar']),
    jumlah: vine.number().positive(),
    catatan: vine.string().trim().maxLength(500).optional()
  })
)

export const updateTransactionValidator = vine.compile(
  vine.object({
    produk_id: vine.number().positive().optional(),
    tipe: vine.enum(['masuk', 'keluar']).optional(),
    jumlah: vine.number().positive().optional(),
    catatan: vine.string().trim().maxLength(500).optional()
  })
)
