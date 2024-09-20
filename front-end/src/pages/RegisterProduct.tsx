import { SubmitHandler, useForm } from "react-hook-form"
import { TFormData } from "../types/TFromData"
import { HeaderComponent } from "../components/Header"
import { InputComponent } from "../components/InputC"
import { InputCalendar } from "../components/InputCalendar"
import { InputTextarea } from "../components/InputTextarea"
import { InputSelect } from "../components/InputSelect"

import axios from "axios"

export function RegisterProduct() {
  const { register, handleSubmit } = useForm<TFormData>()

  const onSubmit: SubmitHandler<TFormData> = async (data) => {
    const payload = {
      ...data,
      expirationDate: new Date(data.expirationDate).toISOString(),
      code: Number(data.code),
      quantity: Number(data.quantity),
      price: Number(data.price),
    }
    try {
      const response = await axios.post('http://localhost:3000/products', payload)

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <HeaderComponent />

        <main>
          <form
            className="flex flex-col gap-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputComponent
              label="Nome"
              name="name"
              type="text"
              register={register}
              required
            />

            <InputComponent
              label="Código"
              name="code"
              type="number"
              register={register}
              required
            />

            <div className="flex justify-between">
              <InputCalendar
                label="Data de validade"
                name="expirationDate"
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
              name="quantity"
              type="number"
              register={register}
              required
            />

            <InputComponent
              label="preço"
              name="price"
              type="number"
              register={register}
              required
              step="0.01"
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