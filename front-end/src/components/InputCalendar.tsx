import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type InputProps<T extends FieldValues> = {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  required?: boolean
}


export function InputCalendar<T extends FieldValues>({label, name, register, required}: InputProps<T>) {
  return (
    <div className="flex flex-col">
      <label 
        htmlFor={name}
        className="text-sm font-medium"
      >
        {label}
      </label>
      <input 
        type="date"
        id={name}
        {...register(name, {required})}
        className="w-[10.563rem] h-[3.125rem] rounded-lg px-2 border border-black font-medium " 
      />
    </div>
  )
} 