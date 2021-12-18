import * as yup from "yup"

export const clinicRegisterSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  telephone: yup
    .string()
    .required("El teléfono es requerido")
    .matches(/^9\d{8}$/, "El teléfono debe comenzar con 9 y tener 9 dígitos"),
  direction: yup.string().required("La dirección es requerida"),
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "La contraseña debe contener al menos 1 minúscula, 1 mayúscula, 1 número y debe tener al menos 8 caracteres"
    ),
})
