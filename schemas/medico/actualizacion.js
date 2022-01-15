import * as yup from "yup"

export const actualizacionSchema = yup.object().shape({
  attentionTime: yup.string().required("Campo requerido"),
  startAttentionTime: yup.string().required("Campo requerido"),
  endAttentionTime: yup.string().required("Campo requerido"),
  password: yup.string().required("Contraseña requerida")
})