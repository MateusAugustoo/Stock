import { Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export function ProductManagement() {
  return (
    <>
      <div>
        <header>
          <h1 className="font-bold text-2xl text-center">Gestão de produtos</h1>
        </header>

        <main className="flex flex-col gap-14 mt-28">
          <Link to={'register-product'}>
            <button className="w-full bg-green-600 py-10 pl-6 gap-14 rounded-2xl flex items-center shadow-md shadow-black/40">
              <Plus size={32} />
              <span className="font-bold italic text-base">Adicione um produto</span>
            </button>
          </Link>

          <Link to={''}>
            <button className="w-full bg-red-600 py-10 pl-6 gap-14 rounded-2xl flex items-center shadow-md shadow-black/40">
              <Trash2 size={32} />
              <span className="font-bold italic text-base">Retirar produto</span>
            </button>
          </Link>
        </main>
      </div>
    </>
  )
}