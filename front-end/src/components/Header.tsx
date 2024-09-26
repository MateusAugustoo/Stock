import { CircleUserRound } from "lucide-react"
import { ButtonBack } from "./ButtonBack"


export function HeaderComponent() {
  return (
    <div className="pt-7">
      <div className="flex justify-between ">
        <ButtonBack />
        <CircleUserRound size={46} />
      </div>

      <div className="border border-black mt-7"/>

      <h1 className="text-2xl font-bold text-center mt-5">Cadastre sue Produto</h1>
    </div>
  )
}