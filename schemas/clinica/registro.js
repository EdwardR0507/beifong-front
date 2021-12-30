import * as yup from "yup"

export const clinicRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es requerido")
    .max(70, "El nombre no puede tener más de 70 caracteres")
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios"
    ),
  telephone: yup
    .string()
    .required("El teléfono es requerido")
    .matches(/^9\d{8}$/, "El teléfono debe comenzar con 9 y tener 9 dígitos"),
  direction: yup
    .string()
    .required("La dirección es requerida")
    .max(70, "La dirección no puede tener más de 70 caracteres"),
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es requerido")
    .max(50, "El email no puede tener más de 50 caracteres"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "La contraseña debe contener al menos 1 minúscula, 1 mayúscula, 1 número y debe tener al menos 8 caracteres"
    )
    .max(30, "La contraseña no puede tener más de 30 caracteres"),
})
