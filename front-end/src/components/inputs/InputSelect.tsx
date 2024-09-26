import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputProps<T extends FieldValues> = {
  label: string
  name: Path<T>
  options: string[]
  register: UseFormRegister<T>
}


export function InputSelect<T extends FieldValues>({ label, name, options, register }: InputProps<T>) {
  return (
    <div className='flex flex-col'>
      <label className='text-sm font-medium' htmlFor={name}>{label}</label>
      <select 
        id={name}
        {...register(name)}
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