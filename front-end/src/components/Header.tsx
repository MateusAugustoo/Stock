import { SquareArrowLeft} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Props = {
  title: string
}

export const Header = ({ title }: Props) => {

  const navigate = useNavigate() 

  return (
    <>
      <div className='flex items-center justify-between border-b-2 border-black py-5'>
        <SquareArrowLeft size={32} onClick={() => navigate(-1)}/>
        <h1 className="font-bold text-2xl">{title}</h1>
        <div></div>
      </div>
    </>
  )
}