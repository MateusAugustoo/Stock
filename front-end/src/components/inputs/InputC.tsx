import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputProps<T extends FieldValues> = {
  label: string
  name: Path<T>
  type: string
  register: UseFormRegister<T>
  required?: boolean
  step?: string
}


export function InputComponent<T extends FieldValues>({label, name, type, register, required, step}: InputProps<T>) {
  return (
    <div>
      <label className='text-sm font-medium' htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        step={step}
        {...register(name, {required})}
        className='bg-white w-full h-[3.125rem] pl-2 border border-black rounded-lg' 
      />
    </div>
  )
}