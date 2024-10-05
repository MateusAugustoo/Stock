import { SubmitHandler, useForm } from "react-hook-form";
import { InputComponent } from "../../components/inputs/InputC";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Link } from "react-router-dom";

import imgLogin from '../../assets/img-login.png'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type TFormUserDate = {
  property: string,
  password: string
}

export function LoginPage() {

  const { register, handleSubmit, formState: { errors }, setError } = useForm<TFormUserDate>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<TFormUserDate> = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/login', data)

      if (response.data.status === 200 && response.data.data.token) {
        localStorage.setItem('authToken', response.data.data.token)
        navigate('/products')
      }
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        const { label, message } = error.response?.data.message || {}
        if (label && message) {
          setError(label, { message })
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#AAD576] px-4">
      <header>
        <h2 className="font-extrabold text-3xl text-center py-12">Login</h2>
      </header>

      <main>
        <img
          src={imgLogin}
          className="mx-auto"
          alt="um boneco ilustraso atravessando um porta"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-14 mt-10"
        >
          <fieldset className="flex flex-col gap-4">
            <div>
              <InputComponent
                label="Username/Email"
                name="property"
                type="text"
                required
                colorText
                register={register}
              />
              {errors.property && <p className="text-red-500 italic font-bold text-xs">{errors.property.message}</p>}
            </div>

            <div>
              <InputComponent
                label="Senha"
                name="password"
                type="password"
                required
                colorText
                register={register}
              />
              {errors.password && <p className="text-red-500 italic font-bold text-xs">{errors.password.message}</p>}
            </div>
          </fieldset>

          <div className="flex justify-center">
            <div className="w-60 rounded-lg overflow-hidden">
              <ButtonPrimary
                title="Entrar"
              />
            </div>
          </div>
        </form>

        <p className="text-center mt-4">
          Crie uma conta <Link to="/register" className="text-blue-700 font-bold">aqui</Link>
        </p>
      </main>
    </div>
  )
}