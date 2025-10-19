import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(1).maxLength(255)
  })
)

export const updateCategoryValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(1).maxLength(255).optional()
  })
)
