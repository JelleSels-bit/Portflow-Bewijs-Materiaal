import {z} from 'zod'
import {Role} from '@/generated/prisma/enums'

export const userSchema = z.object({
  id: z.uuid(),
  email: z.email('Gelieve het email adres in te vullen'),
  password: z
    .string()
    .min(8, {message: 'Het wachtwoord moet minsten 8 karakters lang zijn.'})
    .max(100, {message: 'Het wachtwoord mag maximum 100 karakters lagn zijn'}),
  username: z.string().min(3, {message: 'De gebruikersnaam moet minsten 3 karakters lang zijn.'}),
  role: z.enum(Role),
})

export const adminUpdateUserSchema = userSchema.pick({username: true, role: true, id: true})

export const adminDeleteUserSchema = userSchema.pick({id: true})

export const signInSchema = userSchema.omit({id: true, role: true, username: true})

export const registerSchema = userSchema
  .omit({id: true, role: true})
  // Via extend kunnen we een bestaand schema uitbreiden met extra velden.
  .extend({
    passwordConfirmation: z.string(),
  })
  // De refine methode, die beschikbaar is op properties en het schema zelf, kan gebruikt worden om extra validatie toe
  // te voegen die niet standaard aanwezig is in Zod.
  .refine(data => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'The password and confirmation do not match.',
  })

export const updateUserSchema = userSchema.pick({username: true, email: true})
export const updateRoleSchema = userSchema.pick({role: true, id: true})
