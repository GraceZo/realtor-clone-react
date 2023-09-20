import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formDate, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = formDate
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex flex-col items-center flex-wrap px-6 py-12 mx-auto">
        <form
          action=""
          className="w-full md:w-[67%] lg:w-[40%] mt-6 text-xl text-gray-700 border-gray-300 rounded transition ease-in-out"
        >
          <input
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Full name"
            className="mb-6 w-full p-2 border border-gray-300 rounded"
          />
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
              Have a account?
              <Link
                to="/sign-in"
                className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
              >
                Sign in
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
            className="w-full md:w-[40%] bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            Sign UP
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
