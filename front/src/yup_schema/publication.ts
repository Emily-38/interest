import * as yup from "yup"

export const schemaPublication = yup
  .object({
    description: yup.string().min(2,'Doit contenir au moins 2 caractères').max(500).required('Ce champ est requis'),
  })
  .required()