import React from 'react'

const Login = () => {
  return (
    <>
    <form className='border border-black w-[40vw] h-[80vh]'>
       <h3 className='text-center text-2xl'>login page</h3>
       <div className='w-[60%] h-[60%] mx-[20%] my-[10%] border flex justify-center items-center'>
          <div>
          <input type="text" name='Email' placeholder='ENTER Email' className='border p-[2%] border-b-zinc-600 border-x-0 border-t-0' /><br/>
          <input type="text" name='pass' placeholder='ENTER Password' className='border p-[2%] border-b-zinc-600 border-x-0 border-t-0' /><br/>
          <button type="submit" className='border p-2 rounded-md w-20 bg-slate-300 mt-6'>Login</button>
          </div>
       </div>
    </form>
    </>
  )
}

export default Login