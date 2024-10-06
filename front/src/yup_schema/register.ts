import * as yup from "yup"

export const schemaRegister = yup
  .object({
    email: yup.string().email("Adresse e-mail invalide").required('Adresse e-mail est requise'),
    pseudo: yup.string().min(3,'Le pseudo doit contenir au moins 3 caractères').required('Pseudo est requis'),
    age: yup.number().typeError('Veuillez mettre un nombre').positive().integer().min(18, "Avoir au moins 18 ans").required('Age est requis'),
    gender: yup.string().required(),
    password: yup.string().matches(/[a-z]/,"Avoir au moins 1 caractere minuscule").matches(/[A-Z]/,"Avoir au moins 1 caractere en majuscule").matches(/[1-9]/,"Avoir au moins 1 nombre").matches(/[/#?!@$%^&*-]/,"Avoir au moins 1 caractere special").min(8, "Doit contenir un minimum de 8 caractères").required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre').required('La confirmation du mot de passe est requise'),
    checkbox: yup.bool() .oneOf([true], "Vous devez accepter les conditions d\'utilisation").required()
  })
  .required()