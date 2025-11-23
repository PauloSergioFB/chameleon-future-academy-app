import { z } from "zod"

export const signInForm = z.object({
  email: z.string({ message: "O e-mail é obrigatório." }),
  password: z.string({ message: "A senha é obrigatória." }),
})
