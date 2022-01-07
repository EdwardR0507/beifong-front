import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/router"

export default function Logo() {
  const router = useRouter()
  const { theme } = useTheme()

  return (
    <div className="flex ml-4">
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
  )
}
