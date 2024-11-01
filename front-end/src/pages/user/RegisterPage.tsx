import svgRegister from '../../assets/svg-register.svg';
import { InputComponent } from "../../components/inputs/InputC";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonPrimary } from "../../components/ButtonPrimary";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

  const inputs: Array<{
    label: string;
    name: keyof TFormUserDate;
    type: string;
    required?: boolean;
    description?: string;
    validate?: (value: string) => boolean | string;
  }> = [
      {
        label: 'Nome:',
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        label: 'Username:',
        name: 'username',
        type: 'text',
        required: true,
      },
      {
        label: 'Nome da empresa/instituição:',
        name: 'nameEnterprise',
        type: 'text',
        required: false,
        description: 'Preencha caso seja uma instituição/empresa',
      },
      {
        label: 'Email:',
        name: 'email',
        type: 'email',
        required: true,
      },
      {
        label: 'Senha:',
        name: 'password',
        type: 'password',
        required: true,
      },
      {
        label: 'Confirmar senha:',
        name: 'confirmPassword',
        type: 'password',
        required: true,
        validate: (value: string) => value === password || 'As senhas não conferem',
      },
  ];


  const onSubmit: SubmitHandler<TFormUserDate> = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/register_user', data)

      if (response.status === 201) {
        navigate('/login')
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
    <>
      <div
        className="bg-[#AAD576] min-h-screen px-4"
      >
        <img
          src={svgRegister}
          alt=""
          className="mx-auto"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
        >

          {inputs.map(({ label, name, type, required, validate, description }) => (
            <div key={name}>
              <InputComponent
                label={label}
                required={required}
                name={name}
                type={type}
                register={register}
                validate={validate}
                colorText
              />
              {description && <p className="italic font-light ">{description}</p>}
              {errors[name] && (
                <p className="text-red-500 italic font-bold text-xs">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}

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