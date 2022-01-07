import * as yup from "yup"

export const isValidDate = yup.addMethod(
  yup.string,
  "isValidDate",
  function () {
    return yup.mixed().test(`isValidDate`, function (value) {
      const { path, createError } = this
      const [month, year] = value.split("/")
      const date = new Date()
      const currentMonth = date.getMonth() + 1
      const currentYear = date.getFullYear() - 2000
      if (value.length === 0) {
        return createError({
          path,
          message: "La fecha de expiración es requerida",
        })
      }
      if (!value.includes("/")) {
        return createError({
          path,
          message: "La fecha debe ingresarse con el formato correcto",
        })
      }
      if (month.length !== 2 || year.length !== 2) {
        return createError({
          path,
          message: "La fecha debe ingresarse con el formato correcto",
        })
      }
      if (month < 1 || month > 12) {
        return createError({ path, message: "Mes inválido" })
      }
      if (currentYear > year) {
        return createError({
          path,
          message: `La tarjeta de crédito ha expirado `,
        })
      }
      if (currentYear >= year && currentMonth > month) {
        return createError({
          path,
          message: "La tarjeta de crédito ha expirado",
        })
      }
      return true
    })
  }
)
