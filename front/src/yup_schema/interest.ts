import * as yup from "yup"

export const schemaInterest = yup
  .object({
    name: yup.string().min(2,'Doit contenir au moins 2 caractères').required('Ce champ est requis'),
  })
  .required()