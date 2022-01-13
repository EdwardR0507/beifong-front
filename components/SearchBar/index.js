import { useForm } from "react-hook-form"
import Button from "ui/Button"
import TextInput from "ui/TextInput"

export default function SearchBar({
  handleSearch,
  placeholder = "Buscar por nombre",
}) {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    handleSearch(data)
  }

  return (
    <div className="relative text-gray-600 md:w-6/12 focus-within:text-gray-400 ">
      <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full">
          <TextInput
            placeholder={placeholder}
            name="search"
            register={register}
          />
        </div>
        <Button className="h-12 mt-3" type="submit">
          Buscar
        </Button>
      </form>
    </div>
  )
}
