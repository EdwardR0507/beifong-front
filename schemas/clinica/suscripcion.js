import * as yup from "yup"
import { isValidDate } from "../../helpers/customMethodsYup"

export const clinicaSubscriptionSchema = yup.object().shape({
  numeroTarjeta: yup
    .string()
    .required("El número de tarjeta es requerido")
    .max(16, "El número de tarjeta no puede exceder los 16 dígitos")
    .matches(/^\d{16}$/, "Solo debe ingresar 16 dígitos numéricos"),
  fechaExpiracion: yup.string().isValidDate(),
  cvv: yup
    .string()
    .required("El CVV es requerido")
    .max(3, "El CVV no puede exceder los 3 dígitos")
    .matches(/^\d{3}$/, "El CVV solo debe contener números"),
})
