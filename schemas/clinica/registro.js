import * as yup from "yup"

export const clinicRegisterSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  phone: yup.string().required("El teléfono es requerido"),
  address: yup.string().required("La dirección es requerida"),
  email: yup.string().required("El correo es requerido"),
  password: yup.string().required("La contraseña es requerida"),
})
