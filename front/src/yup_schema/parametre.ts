import * as yup from "yup"

export const schemaUser = yup
  .object({
    email: yup.string().email("Adresse e-mail invalide"),
    pseudo: yup.string().min(3,'Le pseudo doit contenir au moins 3 caractères'),
  })
  