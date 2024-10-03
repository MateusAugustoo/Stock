type Props = {
  title: string
}


export function ButtonPrimary({title}: Props) {
  return (
    <button
      type="submit"
      className="bg-[#228C22] text-white font-bold w-full h-[3.375rem] border-none"
    >
      {title}
    </button>
  )
}