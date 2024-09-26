import { ChevronLeft } from "lucide-react";

export function ButtonBack() {
  return (
    <div className="bg-white border border-black py-2 px-3 rounded-lg flex items-center">
      <ChevronLeft size={20} fontWeight={"bold"} />
    </div>
  )
}