import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { toast } from 'react-toastify'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  function onChange(e) {
    setEmail(e.target.value)
  }
  async function onSubmit(e) {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      getAuth().fetchSignInMethodsForEmail(email)
      toast.success('Email was sent')
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address')
      } else if (error.code === 'auth/user-not-found') {
        toast.error('User not found')
      } else {
        toast.error('Could not send reset password')
      }
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
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
          <div className="relative mb-6"></div>
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
                to="/sign-in"
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
              >
                Sign in instead
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            Send reset password
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
