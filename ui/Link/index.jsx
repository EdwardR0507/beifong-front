import NextLink from "next/link"

const styles = {
  primary: "text-sky-500 hover:text-sky-600 decoration-sky-600",
  secondary: "text-emerald-500 hover:text-emerald-600 decoration-emerald-600",
  inactive: "text-gray-700 hover:text-gray-800 decoration-gray-800",
}

export default function Link({
  to,
  children,
  variant = "primary",
  active = true,
}) {
  const newVariant = active ? variant : "inactive"
  return (
    <NextLink href={to}>
      <a
        className={` hover:underline hover:decoration-2 transition ${styles[newVariant]} underline-offset-4`}
      >
        {children}
      </a>
    </NextLink>
  )
}
