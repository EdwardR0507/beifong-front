import SubscriptionCard from "components/SubscriptionCard"
import { useRouter } from "next/router"
import { injectStyle } from "react-toastify/dist/inject-style"
import { ToastContainer, toast } from "react-toastify"
import AccessibilityButton from "ui/Accessibility/Button"

if (typeof window !== "undefined") {
  injectStyle()
}

export default function Suscripciones() {
  let token
  const router = useRouter()

  const onSubmit = async (mount, subscriptionType) => {
    if (typeof window !== "undefined") {
      token = JSON.parse(window.localStorage.getItem("token"))
    }
    const data = {
      mount,
      subscriptionType,
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/clinics/subscribe`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      )
      const json = res.json()
      console.log(json)
      if (!json.ok) {
        if (json.errors){
          json.errors.forEach((error) => {
            toast.error(error.msg)
          })
        }
        else{
          toast.error(json.msg)
        }
      }
      router.push("/clinica/app")
    } catch (error) {
      toast.error("Hubo un error, vuelva a intentarlo")
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-800">
      <div>
        <h1 className="mt-8 text-3xl font-semibold text-center">
          Nuestras suscripciones
        </h1>
      </div>
      <main className="flex justify-center flex-1 w-full font-semibold bg-sky-50 dark:bg-gray-800">
        <section className="grid w-full grid-cols-1 mx-8 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
          <SubscriptionCard
            type="Mensual"
            price="S/. 179"
            features={[
              "Lorem ipsum dolor sit amet",
              "Lorem ipsum dolor sit amet",
              "Lorem ipsum dolor sit amet",
            ]}
            handleSubmit={() => onSubmit("179.00", "monthly")}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          </SubscriptionCard>
          <SubscriptionCard
            type="Anual"
            price="S/. 399"
            features={[
              "Lorem ipsum dolor sit amet",
              "Lorem ipsum dolor sit amet",
              "Lorem ipsum dolor sit amet",
            ]}
            handleSubmit={() => onSubmit("399.00", "annual")}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          </SubscriptionCard>
          <SubscriptionCard
            type="Semestral"
            price="S/. 249"
            features={[
              "Lorem ipsum dolor sit amet",
              "Lorem ipsum dolor sit amet",
              "Lorem ipsum dolor sit amet",
            ]}
            handleSubmit={() => onSubmit("249.00", "semi-annual")}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          </SubscriptionCard>
        </section>
        <ToastContainer />
      </main>
      <div>
        <AccessibilityButton
          className="mb-10"
          variant="tertiary"
          onClick={() => router.push("/clinica/app")}
        >
          {" "}
          Ir a la aplicación
        </AccessibilityButton>
      </div>
    </div>
  )
}
