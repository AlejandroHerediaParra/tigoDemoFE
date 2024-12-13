import React, { useCallback, useEffect, useState } from 'react'
import { CommonInput } from '../Common/CommonInput'
import moment from 'moment/moment';
import useStatusStore from '../../ducks/store';
import axios from 'axios';
import endPointPaths from '../../utils/endpointPath';
import { useNavigate } from 'react-router-dom';

const {signInUrl} = endPointPaths

export const Signin = () => {

  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const [errorEmailValue, setErrorEmailValue] = useState('');
  const [viewPass, setViewPass] = useState(false)

  const {signupUser, info, setToken, token} = useStatusStore(state=>state);
  
  const onSignIn = useCallback(async()=>{
    try { 
      const {data} = await axios.post(signInUrl,{
        email: emailValue,
        password: passValue,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(data);
      signupUser(data.user);
      setToken(data.jwt);
    } catch (e) {
      console.log('data error')
    }
  },[emailValue, passValue]);

  useEffect(()=>{
    console.log(info, token)
    if (!!token) {
      navigate('/home')
    }
  }, [info, token])

  useEffect(()=>{
    if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrorEmailValue('wrong email value')
    } else {
      setErrorEmailValue('')
    }
  }, [emailValue])

  const goSignup = () => {
    navigate("/")
  }
  return (
    <div className='flex w-full h-auto mt-5'>
      <div className='w-full flex items-center justify-center'>
        <div className='bg-white px-10 py-10 rounded-3xl border-2 border-gray-200'>
          <h1 className='text-5xl font-semibold'>Welcome</h1>
          <p className='font-medium text-lg text-gray-500 mt-4'>Please enter your details</p>
          <div className='mt-8'>
            <CommonInput 
              value={emailValue}
              label={'Email'}
              onchange={setEmailValue}
              placeholder={'Enter your email'}
              type='email'
              error={!!errorEmailValue}
            />
            <CommonInput 
              value={passValue}
              label={'Password'}
              onchange={setPassValue}
              placeholder={'Enter your password'}
              type={`${!viewPass ? 'password' : 'text'}`}
            />
            <div>
              <button 
                className='font-medium text-base text-blue-600'
                onClick={()=> setViewPass(!viewPass)}
              >
                View password
              </button>
            </div>
            <div>
              <button className='font-medium text-base text-blue-500 active:bg-blue-200'>forgot password</button>
            </div>
            <div className='mt-8 flex flex-col gap-y-4'>
              <button 
                className={`${!!errorEmailValue ? 'bg-gray-400':'bg-blue-500'} text-white text-lg font-bold py-3 rounded-xl`}
                onClick={()=>onSignIn()}
                disabled={!!errorEmailValue}
              >
                Signin
              </button>
            </div>
            <div className='mt-8 flex flex-col gap-y-4'>
              <button 
                className={`bg-blue-500 text-white text-lg font-bold py-3 rounded-xl`}
                onClick={()=>goSignup()}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
