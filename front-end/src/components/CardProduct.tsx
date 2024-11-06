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
  image?: string
}

export function CardProduct({ name, code, expirationDate, category, quantity, price, description, image }: TProduct) {
  return (
    <>
      <div 
        className="bg-lime-400 w-full px-4 py-2 rounded-lg shadow-md shadow-black/25"
        key={code}
      >

        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="line-clamp-3 italic text-sm text-balance">{description}</p>
          </div>
          <img 
            src={image} 
            alt="image product"
            className="size-24" 
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="font-bold">{category}</p>
          <p className="font-bold">{format(expirationDate, 'dd/MM/yyyy', { locale: ptBR })}</p>
          <p className="font-bold">quant: {quantity}</p>
          <p className="font-bold">price R$: {price.toFixed(2)}</p>
        </div>
      </div>
    </>
  )
}