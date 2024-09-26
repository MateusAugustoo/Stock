import 
{ BadgeDollarSignIcon, 
  CalendarClockIcon, 
  ChartBarStackedIcon, 
  Undo2Icon 
} from "lucide-react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

type TProduct = {
  name: string
  code: number
  expirationDate: Date
  category: string
  quantity: number
  price: number
  description: string
}

export function CardProduct({ name, code, expirationDate, category, quantity, price, description }: TProduct) {
  return (
    <div
      key={code}
      className="relative border border-black rounded-lg bg-[#aad576] px-[7px] py-[10px] flex flex-col gap-1"
    >
      <button className="bg-[#aad576] absolute py-[6px] px-[7px] border border-black rounded-full -right-4 -top-5">
        <Undo2Icon />
      </button>

      <h3 className="font-bold text-center">{name}</h3>
      <div className="h-20">
        <img src="" alt="" />
      </div>
      <p className="font-medium items-center">Quant: <span>{quantity}</span></p>

      <div className="flex gap-1 font-medium items-center capitalize">
        <div className="flex items-center gap-1">
          <span><ChartBarStackedIcon /></span>
          <span>Categoria:</span>
        </div>
        <span>{category}</span>
      </div>

      <div className="flex gap-1 font-medium items-center">
        <div className="flex items-center gap-1">
          <span><BadgeDollarSignIcon /></span>
          <span>Preço:</span>
        </div>
        <span>R$ {price.toFixed(2)}</span>
      </div>

      <div className="flex gap-1 font-medium items-center">
        <div className="flex items-center gap-1">
          <span><CalendarClockIcon /></span>
          <span>Venc:</span>
        </div>
        <span>{format(expirationDate, 'dd/MM/yyyy', { locale: ptBR })}</span>
      </div>

      <p className="hidden">{description}</p>
    </div>
  )
}