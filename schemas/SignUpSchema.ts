import { z } from "zod"

export const signUpForm = z
  .object({
    fullName: z.string({ message: "O nome completo é obrigatório." }),
    email: z.email({ message: "Informe um e-mail válido." }),
    password: z
      .string({ message: "A senha é obrigatória." })
      .min(6, { message: "A senha deve conter pelo menos 6 caracteres." }),
    confirmPassword: z.string({
      message: "A confirmação de senha é obrigatória.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  })
