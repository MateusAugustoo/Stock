import { SubmitHandler, useForm } from "react-hook-form"
import { TProductData } from "../types/TProductData"
import { InputComponent } from "../components/inputs/InputC"
import { InputCalendar } from "../components/inputs/InputCalendar"
import { InputTextarea } from "../components/inputs/InputTextarea"
import { InputSelect } from "../components/inputs/InputSelect"
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import axios from '../utils/axiosConfig'
import { ButtonBack } from "../components/ButtonBack"
import { CircleUserRound } from "lucide-react"

export function RegisterProduct() {
  const { register, handleSubmit } = useForm<TProductData>()

  const onSubmit: SubmitHandler<TProductData> = async (data) => {
    const toastId = toast.loading('Cadastrando...')

    const payload = {
      ...data,
      expirationDate: new Date(data.expirationDate).toISOString(),
      code: Number(data.code),
      quantity: Number(data.quantity),
      price: Number(data.price),
    }
    try {
      const response = await axios.post('http://localhost:3000/register_products', payload)

      toast.update(toastId, {
        render: 'Cadastrado com sucesso',
        type: "success",
        position: "top-right",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true
      })
      console.log(response)
    } catch (error) {
      toast.update(toastId, {
        render: 'Erro ao cadastrar',
        type: "error",
        position: "top-right",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true
      })
      console.error(error)
    }
  }

  return (
    <>
      <div className="bg-[#AAD576] h-screen w-screen px-4">
        <div className="flex flex-col gap-10">
          <div className="pt-7">
            <div className="flex justify-between ">
              <ButtonBack />
              <CircleUserRound size={46} />
            </div>

            <div className="border border-black mt-7" />

            <h1 className="text-2xl font-bold text-center mt-5">Cadastre sue Produto</h1>
          </div>

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
      </div>

      <ToastContainer />
    </>
  )
}