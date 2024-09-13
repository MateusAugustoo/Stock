import { useForm } from 'react-hook-form'

type InputProps = {
  label: string
  options: string[]
}


export function InputSelect({ label, options }: InputProps) {
  const { register } = useForm()
  return (
    <div className='flex flex-col'>
      <label className='text-sm font-medium'>{label}</label>
      <select 
        {...register(label)}
        className='w-[10.563rem] h-[3.125rem] rounded-lg px-2 border border-black font-medium'
      >
        {options.map((option, index: number) => (
          <option 
            key={index} 
            value={option}
            className='font-medium'
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}