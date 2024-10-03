import { ChevronLeftIcon } from "lucide-react";

type Props = {
  title: string
}

export function HeaderComponent({title}: Props) {
  return (
    <header className="flex justify-between items-center pt-7">
      <div className="bg-white border border-black size-10 rounded-lg flex items-center justify-center">
        <ChevronLeftIcon />
      </div>
      <h2 className="text-2xl font-bold">
        {title}
      </h2>
      <div></div>
    </header>
  )
}