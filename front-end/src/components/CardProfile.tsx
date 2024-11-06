import { UserPen } from 'lucide-react'

type CardProfileProps = {
  name: string
  nameEnterprise?: string
  photo?: string
}

export const CardProfile = ({ name, nameEnterprise, photo }: CardProfileProps) => {
  return (
    <>
      <div className="bg-lime-400 flex flex-col gap-6 px-4 py-11 pt-4 rounded-3xl shadow-md shadow-black/30">
        <div className="text-xl">
          <span className="font-medium">Seja bem-vindo!</span> <span className="font-bold italic">{name}</span>
        </div>

        <div className='flex items-center justify-between'>
          <div className="flex items-center gap-4">
            <img
              src={photo}
              alt={`Foto de perfil do usuário ${name}!`}
              className="size-16 rounded-full ring-4 ring-white"
            />
            <div>
              <p className="font-bold text-xl">{name}</p>
              <p className="font-light italic text-base">{nameEnterprise}</p>
            </div>
          </div>

          <UserPen size={32}/>
        </div>
      </div>
    </>
  )
}

// Eita caba gostoso!!!