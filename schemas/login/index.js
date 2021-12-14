import * as yup from "yup"

export const loginSchema = yup.object().shape({
  email: yup.string().required("El correo es requerido"),
  password: yup.string().required("La contraseña es requerida"),
})
