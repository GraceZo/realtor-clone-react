import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { signInWithEmailAndPassword, auth, getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formDate, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formDate
  const navigate = useNavigate()
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  async function onSubmit(e) {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCrendentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (userCrendentials.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Bad user credentials')
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
      <div className="flex flex-col items-center flex-wrap px-6 py-12 mx-auto">
        <form
          onSubmit={onSubmit}
          action=""
          className="w-full md:w-[67%] lg:w-[40%] mt-6 text-xl text-gray-700 border-gray-300 rounded transition ease-in-out"
        >
          <input
            type="email"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="Email address"
            className="mb-6 w-full p-2 border border-gray-300 rounded"
          />
          <div className="relative mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {showPassword ? (
              <AiFillEyeInvisible
                className="absolute right-3 top-3 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            ) : (
              <AiFillEye
                className="absolute right-3 top-3 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            )}
          </div>
          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
            <p className="mb-6">
              Don't have a account?
              <Link
                to="/sign-up"
                className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
              >
                Register
              </Link>
            </p>
            <p>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
              >
                Forgot password?
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            Sign in
          </button>
          <div className="w-full flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <OAuth />
        </form>
      </div>
    </section>
  )
}
