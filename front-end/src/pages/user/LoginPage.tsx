import { SubmitHandler, useForm } from "react-hook-form";
import { InputComponent } from "../../components/inputs/InputC";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Link } from "react-router-dom";

import logoIfpi from '../../assets/Logo-IFPI-Horizontal.png'
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
        navigate('/')
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
    <div className="flex h-screen flex-col items-center bg-[#AAD576] px-4">
      <header>
        <img
          src={logoIfpi}
          className="mx-auto mt-4"
          alt="um boneco ilustraso atravessando um porta"
        />
      </header>

      <main className="flex flex-col gap-16 mt-11">
        <h1 className="text-2xl font-extrabold text-center capitalize">sistema de gestão <br /> de alimentos</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-14"
        >
          <fieldset className="flex flex-col gap-4 bg-white px-14 pt-10 pb-16 rounded-lg shadow-xl shadow-black/30">
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

            <a href="#" className="text-base font-light text-[#228C22]">Forgot Password? Need help sign in</a>
          </fieldset>

          <div className="rounded-2xl overflow-hidden">
            <ButtonPrimary
              title="Acessar"
            />
          </div>
        </form>

        <div>
          <p className="text-center mt-4">
            Crie uma conta <Link to="/register" className="text-blue-700 font-bold">aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}