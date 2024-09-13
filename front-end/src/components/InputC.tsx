import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputProps<T extends FieldValues> = {
  label: Path<T>
  type: string
  register: UseFormRegister<T>
  required?: boolean
}


export function InputComponent<T extends FieldValues>({label,type, register, required}: InputProps<T>) {
  return (
    <div>
      <label className='text-sm font-medium' htmlFor={label}>{label}</label>
      <input
        type={type}
        {...register(label, {required})}
        className='bg-white w-full h-[3.125rem] pl-2 border border-black rounded-lg' 
      />
    </div>
  )
}