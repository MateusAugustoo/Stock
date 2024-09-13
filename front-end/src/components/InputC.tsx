import { useForm } from 'react-hook-form'

type InputProps = {
  label: string
  type: string
  required?: boolean
}


export function InputComponent({label, type, required}: InputProps) {
  const { register } = useForm()

  return (
    <div>
      <label className='text-sm font-medium'>{label}</label>
      <input
        type={type} 
        {...register(label, {required})}
        className='bg-white w-full h-[3.125rem] pl-2 border border-black rounded-lg' 
      />
    </div>
  )
}