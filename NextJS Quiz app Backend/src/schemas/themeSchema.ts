import {z} from 'zod'

export const themeSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'De naam is verplicht in te vullen').min(3, 'De naam moet minimum 3 karakters lang zijn'),
  description: z
    .string()
    .min(1, 'De omschrijving is verplicht in te vullen')
    .min(5, 'De uitleg moet minimum 5 karakters lang zijn')
    .default(''),
})

export const createThemeSchema = themeSchema.pick({
  name: true,
  description: true,
})

export const deleteThemeSchema = themeSchema.pick({
  id: true,
})

export const updateThemeSchema = themeSchema.pick({
  id: true,
  name: true,
  description: true,
})
