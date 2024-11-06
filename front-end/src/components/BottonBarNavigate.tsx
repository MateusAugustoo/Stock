import { Package, LandmarkIcon, ArrowRightLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export const BottomBarNavigate = () => {
  return (
    <>
      <div className='fixed bottom-4 w-bottomBar'>
        <div className="flex p-4 justify-between items-center bg-lime-400 rounded-xl">
          <Link to={'/'}>
            <Package size={32} />
          </Link>
          <Link to={'/finance'}>
            <LandmarkIcon size={32} />
          </Link>
          <Link to={'/productManagement'}>
            <div className='rotate-90'>
              <ArrowRightLeft size={32} />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}