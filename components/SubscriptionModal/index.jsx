import { Dialog } from "@headlessui/react"
import Image from "next/image"
import Button from "ui/Button"
import TextInput from "ui/TextInput"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { clinicaSubscriptionSchema } from "schemas/clinica/suscripcion"
import Modal from "ui/Modal"
import { useState } from "react"

export default function SubscriptionModal({ order, onSubmitSubscription }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clinicaSubscriptionSchema),
  })

  const [isOpen, setIsOpen] = useState(false)
  const { type, price } = order
  console.log(errors, "errors")

  const onSubmit = async (data, e) => {
    e.preventDefault()
    onSubmitSubscription()
    setIsOpen(false)
    console.log(data)
  }

  const rowOrder = (titleOrder, valueOrder) => {
    return (
      <div className="flex justify-between">
        <span className="text-sm font-bold text-gray-600 dark:text-gray-100">
          {titleOrder}:
        </span>
        <span className="text-sm font-bold text-blue-500">{valueOrder}</span>
      </div>
    )
  }

  return (
    <Modal type={"subscription"} isOpen={isOpen} setIsOpen={setIsOpen}>
      <form
        className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-sky-50 dark:bg-gray-600 shadow-xl rounded-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Dialog.Title
          as="h3"
          className="px-3 py-2 font-bold text-lg uppercase leading-6 text-gray-700 dark:text-gray-100"
        >
          Método de pago
        </Dialog.Title>
        <div className="mt-2">
          <TextInput
            name="numeroTarjeta"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            type="credit_card"
            label="Número de tarjeta"
            register={register}
            errors={errors?.numeroTarjeta}
          />
        </div>

        <div className="flex mt-2">
          <TextInput
            name="fechaExpiracion"
            placeholder="MM/YY"
            type="expiration_date"
            label="Fecha de Expiración"
            register={register}
            errors={errors?.fechaExpiracion}
          />
          <div className="flex grow-0 items-end">
            <TextInput
              name="cvv"
              type="password"
              label="CVV"
              register={register}
              errors={errors?.cvv}
            />
          </div>
        </div>

        <div className="px-3 mt-2">
          <label className="py-2 text-xs font-bold text-gray-700 uppercase select-none dark:text-gray-100">
            Mi pedido
          </label>
          <div className="flex mt-2 border-2 border-gray-200 rounded-md bg-white dark:bg-gray-700">
            <Image
              src={"/images/icon-sub.png"}
              width={200}
              height={20}
              alt="sub"
            />
            <div className="flex flex-col w-96 h-32 justify-around px-4">
              {rowOrder("Producto", `Suscripción ${type}`)}
              {rowOrder("Cantidad", "1")}
              {rowOrder("Precio", `${price}`)}
            </div>
          </div>
        </div>

        <div className="mt-4 p-3">
          <Button
            variant="secondary"
            size="medium"
            type="submit"
            className="w-full"
          >
            Realizar Pago
          </Button>
        </div>
      </form>
    </Modal>
  )
}
