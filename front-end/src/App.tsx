import { useForm } from "react-hook-form"
import { HeaderComponent } from "./components/Header"
import { InputComponent } from "./components/InputC"
import { InputSelect } from "./components/InputSelect"
import { InputCalendar } from "./components/InputCalendar"
import { InputTextarea } from "./components/InputTextarea"

function App() {
  const { register } = useForm()
  return (
    <>
      <div className="flex flex-col gap-10">
        <HeaderComponent />

        <main>
          <form method="post" className="flex flex-col gap-1">
            <InputComponent
              label="Nome"
              type="text"
              register={register}
              required
            />

            <InputComponent
              label="Código"
              type="text"
              register={register}
              required
            />

            <div className="flex justify-between">
              <InputCalendar
                label="Data de validade"
                name="validity"
                register={register}
              />

              <InputSelect
                label="Categorias"
                name="category"
                options={[
                  'Bebidas',
                  'Carnes',
                  'Frutas'
                ]}
                register={register}
              />
            </div>

            <InputComponent
              label="Quantidade"
              type="number"
              register={register}
              required
            />

            <InputComponent
              label="preço"
              type="number"
              register={register}
              required
            />

            <InputTextarea 
              label="Descrição"
              name="description"
              register={register}
              required
            />

            <div className="flex justify-center mt-11">
              <button
                type="submit"
                className="bg-[#2DEE1C] py-3 px-11 uppercase font-bold rounded-lg border border-black shadow"
              >
                cadastrar
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}

export default App
