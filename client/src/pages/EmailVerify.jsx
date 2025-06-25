import React from 'react'

const EmailVerify = () => {
  return (
    <div className='flex justify-center items-center min-h-screen  bg-background text-foreground'>
      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email id.</p>
      </form>
    </div>
  )
}

export default EmailVerify

// Verify user email where user will be enter the OTP to verify their email or account


