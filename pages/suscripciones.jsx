import SubscriptionCard from "components/SubscriptionCard"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/router"
import Button from "ui/Button"
import Link from "ui/Link"

export default function Suscripciones() {
  const router = useRouter()
  const { theme } = useTheme()
  let token

  const onSubmit = async (mount, subscriptionType) => {
    if (typeof window !== "undefined") {
      token = JSON.parse(window.localStorage.getItem("token"))
    }
    const data = {
      mount,
      subscriptionType,
    }
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
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-800">
      <header className="flex items-center justify-around w-full pt-8 text-xl max-h-24">
        <div className="flex justify-self-start">
          <Image
            onClick={() => {
              router.push("/")
            }}
            className="pt-4 pl-10 cursor-pointer"
            src={
              theme === "dark"
                ? "/images/logo-beifong-dark.png"
                : "/images/logo-beifong.png"
            }
            width={145}
            height={46}
            alt="Logo de Beifong"
          />
        </div>
        <div className="grid grid-cols-3 text-lg font-semibold gap-x-8 place-items-center">
          <Link to="/" active={router.pathname === "/"}>
            Home
          </Link>
          <Link
            to="/suscripciones"
            active={router.pathname === "/suscripciones"}
          >
            Suscripciones
          </Link>
          <Link
            to="/sobre-nosotros"
            active={router.pathname === "/sobre-nosotros"}
          >
            Sobre Nosotros
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-8">
          <Button
            onClick={() => {
              router.push("/clinica/registro")
            }}
            className="px-4"
            variant="primary"
          >
            Registrarse
          </Button>
          <Button
            onClick={() => {
              router.push("/clinica/login")
            }}
            className="px-4"
            variant="outline_primary"
          >
            Iniciar Sesión
          </Button>
        </div>
      </header>
      <div>
        <h1 className="my-8 text-3xl font-semibold text-center">
          Nuestras suscripciones
        </h1>
      </div>
      <main className="flex justify-center flex-1 w-full font-semibold bg-sky-50 dark:bg-gray-800">
        <section className="grid w-full grid-cols-1 mx-8 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
          <SubscriptionCard
            type="Mensual"
            price="S/. 179"
            features={[
              "Solo 1 cuenta de administración",
              "150 consultas por mes (máximo)",
              "10 consultas por día (máximo)",
            ]}
            handleSubmit={() => onSubmit("179.00", "monthly")}
          >
            Esta suscripción incluye:
          </SubscriptionCard>
          <SubscriptionCard
            type="Anual"
            price="S/. 399"
            features={[
              "5 cuentas de administración",
              "Consultads personalizadas por año",
              "Consultas ilimitadas por día",
            ]}
            handleSubmit={() => onSubmit("399.00", "annual")}
          >
            Esta suscripción incluye:
          </SubscriptionCard>
          <SubscriptionCard
            type="Semestral"
            price="S/. 249"
            features={[
              "2 cuentas de administración",
              "Consultas ilimitadas por mes",
              "Atención personalizada por semestre",
            ]}
            handleSubmit={() => onSubmit("249.00", "semi-annual")}
          >
            Esta suscripción incluye:
          </SubscriptionCard>
        </section>
      </main>
    </div>
  )
}
