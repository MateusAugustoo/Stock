import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type InputProps<T extends FieldValues> = {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  required?: boolean
}

export function InputTextarea<T extends FieldValues>({label, name, register, required}: InputProps<T>) {
  return (
    <div className="flex flex-col">
      <label 
        htmlFor={name}
        className="text-sm font-medium"
      >
        {label}
      </label>
      <textarea 
        id={name} 
        {...register(name, {required})} 
        className="border border-black rounded-lg h-28 px-2 py-1"
      />
    </div>
  )
}