import { HeaderComponent } from "../../components/Header";
import svgRegister from '../../assets/svg-register.svg';
import { InputComponent } from "../../components/inputs/InputC";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonPrimary } from "../../components/ButtonPrimary";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from "axios";

type TFormUserDate = {
  name: string
  username: string
  nameEnterprise?: string
  email: string
  password: string
  confirmPassword?: string
  terms: string
}

export function RegisterUserPage() {

  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm<TFormUserDate>()

  const password = watch('password')

  const onSubmit: SubmitHandler<TFormUserDate> = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/register_user', data)
      console.log(response)
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        const errorMessageLabel = error.response?.data.message.label
        const errorMessage = error.response?.data.message.message
        if (errorMessageLabel === 'username') {
          setError('username', { message: errorMessage })
        } else if (errorMessageLabel === 'email') {
          setError('email', { message: errorMessage })
        }
      }
    }
  }
  return (
    <>
      <div
        className="bg-[#AAD576] min-h-screen px-4"
      >
        <HeaderComponent
          title="Cadastro"
        />

        <img
          src={svgRegister}
          alt=""
          className="mx-auto"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
        >

          <InputComponent
            label="Nome:"
            required
            name="name"
            type="text"
            register={register}
            colorText
          />
          {errors.name && <p className="text-red-500 italic font-bold text-xs">{errors.name.message}</p>}

          <InputComponent
            label="Username:"
            required
            name="username"
            type="text"
            register={register}
            colorText
          />
          {errors.username && <p className="text-red-500 italic font-bold text-xs">{errors.username.message}</p>}

          <div>
            <InputComponent
              label="Nome da empresa/instituição:"
              name="nameEnterprise"
              type="text"
              register={register}
              colorText
            />
            <p className="italic font-light ">
              Preencha caso seja uma instituição/empresa
            </p>
          </div>

          <InputComponent
            label="Email:"
            required
            name="email"
            type="email"
            register={register}
            colorText
          />
          {errors.email && <p className="text-red-500 italic font-bold text-xs">{errors.email.message}</p>}

          <InputComponent
            label="Senha:"
            required
            name="password"
            type="password"
            register={register}
            colorText
          />
          {errors.password && <p className="text-red-500 italic font-bold text-xs">{errors.password.message}</p>}

          <InputComponent
            label="Confirmar senha:"
            required
            name="confirmPassword"
            type="password"
            register={register}
            colorText
            validate={(value) => value === password || 'As senhas não conferem'}
          />
          {errors.confirmPassword && <p className="text-red-500 italic font-bold text-xs">{errors.confirmPassword.message}</p>}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              value='checked'
              {...register('terms', { required: true })}
            />
            <label htmlFor="terms">Eu concordo com os Termos</label>
          </div>
          {errors.terms && <p className="text-red-500 italic font-bold text-xs">Aceite os termos para continuar</p>}

          <div className="flex justify-center mt-6">
            <div className="w-60 rounded-lg overflow-hidden">
              <ButtonPrimary
                title="Register"
              />
            </div>
          </div>

        </form>
      </div>
    </>
  )
}