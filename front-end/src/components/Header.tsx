import { CircleUserRound, ChevronLeft } from "lucide-react"


export function HeaderComponent() {
  return (
    <div className="pt-7">
      <div className="flex justify-between ">
        <div className="bg-white border border-black py-2 px-3 rounded-lg flex items-center">
          <ChevronLeft size={20} fontWeight={"bold"} />
        </div>
        <CircleUserRound size={46} />
      </div>

      <div className="border border-black mt-7"/>

      <h1 className="text-2xl font-bold text-center mt-5">Cadastre sue Produto</h1>
    </div>
  )
}