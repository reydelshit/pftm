import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Farmer from '@/assets/farmer.png'
import { Navigate, useNavigate } from 'react-router-dom'
import ButtonStyle from '@/lib/ButtonStyle'
import GoBackBtn from '@/lib/GoBackBtn'
import { Button } from '@/components/ui/button'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export default function Register() {
  const cmhsLoginToken = localStorage.getItem('pftm_token')

  if (cmhsLoginToken) {
    return <Navigate to="/" replace={true} />
  }

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorInput, setErrorInput] = useState<string>('')
  const [successfulLogin, setSuccessfulLogin] = useState<boolean>(false)
  const [seconds, setSeconds] = useState(5)
  const [credentials, setCredentials] = useState([])
  const navigate = useNavigate()
  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target

    setUsername(value)
    setPassword(value)

    setCredentials((values) => ({ ...values, [name]: value }))

    console.log(credentials)
  }

  const handleRegister = () => {
    if (!username || !password)
      return setErrorInput('Please fill in all fields')

    axios
      .post(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/login.php`, {
        ...credentials,
        account_type: 'farmer',
      })
      .then((res: any) => {
        console.log(res.data, 'login successfully')
        if (res.data.status === 'success') {
          setSuccessfulLogin(true)
          // navigate('/login')

          window.setTimeout(() => {
            return navigate('/login')
          }, 5000)
        }
      })
  }

  // navigate to login in 5 seconds

  const handleCheckPassword = (e: ChangeEvent) => {
    const { value } = e.target

    if (value !== password) {
      setErrorInput('Passwords do not match')
    } else {
      setErrorInput('')
    }
  }

  useEffect(() => {
    if (!successfulLogin) return

    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000)

    return () => clearInterval(countdownInterval)
  }, [successfulLogin])

  return (
    <div className="w-dvw h-dvh flex justify-center items-center flex-row bg-primary-color">
      <div className=" text-primary-secondary shadow-slate-400 w-[40%] px-[5rem] h-full flex justify-center items-center flex-col p-4 rounded-md">
        <div className="flex justify-start items-start w-full my-[2rem]">
          <a href="/" className="text-[1.2rem] underline">
            <GoBackBtn />
          </a>
        </div>

        <h1 className="mb-[5rem] font-semibold text-3xl uppercase">
          Pig Farmer Task Management System
        </h1>

        <Input
          onChange={handleChange}
          className="mb-8 border-4 text-2xl border-primary-secondtext-primary-secondary rounded-full p-8 w-full text-primary-secondary focus:outline-none placeholder:text-primary-secondary placeholder:text-2xl placeholder:font-semibold"
          placeholder="Fullname"
          name="name"
          required
        />
        <Input
          onChange={handleChange}
          className="mb-8 border-4 text-2xl border-primary-secondtext-primary-secondary rounded-full p-8 w-full text-primary-secondary focus:outline-none placeholder:text-primary-secondary placeholder:text-2xl placeholder:font-semibold"
          placeholder="Username"
          name="username"
          required
        />

        <Input
          className="mb-8 border-4 text-2xl border-primary-secondtext-primary-secondary rounded-full p-8 w-full text-primary-secondary focus:outline-none placeholder:text-primary-secondary placeholder:text-2xl placeholder:font-semibold"
          type="password"
          onChange={handleChange}
          name="password"
          required
          placeholder="Password"
        />

        <Input
          className="mb-2 border-4 text-2xl border-primary-secondtext-primary-secondary rounded-full p-8 w-full text-primary-secondary focus:outline-none placeholder:text-primary-secondary placeholder:text-2xl placeholder:font-semibold"
          type="password"
          onChange={handleCheckPassword}
          name="password"
          required
          placeholder="Retype Password"
        />

        {errorInput.length > 0 && (
          <p className="text-primary-red border-2 my-4 bg-white p-2 rounded-md font-semibold">
            {errorInput}
          </p>
        )}

        <Button
          className="w-[15rem] h-[3.5rem] bg-primary-secondary  text-primary-color font-bold text-[1.5rem] hover:text-primary-secondary hover:bg-primary-color hover:border-4 hover:border-primary-secondary"
          onClick={handleRegister}
        >
          Register
        </Button>

        {successfulLogin && (
          <div className="my-4 bg-green-500 p-2 text-white rounded-md">
            Registed Successfully, navigating to login page in{' '}
            <span className="font-bold">{seconds}</span> seconds
          </div>
        )}
      </div>
    </div>
  )
}
