import { useForm } from 'react-hook-form'

type InputProps = {
  label: string
  type: string
}


export function InputComponent({label, type}: InputProps) {
  const { register } = useForm()

  return (
    <div>
      <label className='text-sm font-medium'>{label}</label>
      <input
        required
        type={type} 
        {...register(label)}
        className='bg-white w-full h-[3.125rem] pl-2 border border-black rounded-lg' 
      />
    </div>
  )
}