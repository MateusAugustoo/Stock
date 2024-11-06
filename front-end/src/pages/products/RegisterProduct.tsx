import { SubmitHandler, useForm } from "react-hook-form"
import { TProductData } from "../../types/TProductData"
import { InputComponent } from "../../components/inputs/InputC"
import { InputCalendar } from "../../components/inputs/InputCalendar"
import { InputTextarea } from "../../components/inputs/InputTextarea"
import { InputSelect } from "../../components/inputs/InputSelect"
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { ScanBarcode } from 'lucide-react'

import axios from '../../utils/axiosConfig'
import { Header } from "../../components/Header"

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
      <div className="bg-lime-50 h-screen w-screen px-4">
        <div className="flex flex-col gap-10">
          <header className="pt-7">
            <Header 
              title="Cadastro de produtos"
            />
          </header>

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

              <div className="flex mt-11">
                <button
                  type="submit"
                  className="bg-lime-400 py-3 px-11 uppercase font-bold rounded-lg border border-black shadow"
                >
                  cadastrar
                </button>

                <button
                  type="button"
                  className="bg-lime-400 w-full flex justify-center py-3 px-11 ml-5 uppercase font-bold rounded-lg border border-black shadow"
                >
                  <ScanBarcode size={32} />
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