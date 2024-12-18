import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type validate = (value: string) => boolean | string

type InputProps<T extends FieldValues> = {
  label: string
  name: Path<T>
  type: string
  register: UseFormRegister<T>
  required?: boolean
  step?: string
  colorText?: boolean
  validate?: validate
}


export function InputComponent<T extends FieldValues>({ label, name, type, register, required, step, colorText, validate }: InputProps<T>) {

  const color = colorText ? '#228C22' : '#000'

  return (
    <div className='flex flex-col gap-3'>
      <label 
        htmlFor={name}
        style={{ color: color }}
        className='text-base font-bold' 
        >
          {label}
      </label>
      <input
        id={name}
        type={type}
        step={step}
        {...register(name, { required: required ? 'Campo obrigatório' : false, validate: validate })}
        className='bg-gray-300 w-full h-[3.125rem] pl-2 border border-black rounded-lg'
      />
    </div>
  )
}