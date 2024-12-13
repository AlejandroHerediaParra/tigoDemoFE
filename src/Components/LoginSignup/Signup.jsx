import React, { useCallback, useEffect, useState } from 'react'
import { CommonInput } from '../Common/CommonInput'
import moment from 'moment/moment';
import useStatusStore from '../../ducks/store';
import axios from 'axios';
import endPointPaths from '../../utils/endpointPath';
import { useNavigate } from 'react-router-dom';

const {signUpUrl} = endPointPaths

export const Signup = () => {

  const navigate = useNavigate();

  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [birthdateValue, setBirthdateValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const [confirmPassValue, setConfirmPassValue] = useState('');
  const [errorPassValue, setErrorPassValue] = useState('');
  const [errorBirthdateValue, setErrorBirthdateValue] = useState('');
  const [errorEmailValue, setErrorEmailValue] = useState('');
  const [viewPass, setViewPass] = useState(false)

  const {signupUser, info, setToken, token} = useStatusStore(state=>state);
  
  const onSignUp = useCallback(async()=>{
     try {
        const {data} = await axios.post(signUpUrl,{
        name: nameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: confirmPassValue,
        adress: addressValue,
        birthDate: birthdateValue
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
  },[nameValue, lastNameValue, addressValue, emailValue, birthdateValue, confirmPassValue]);

  useEffect(()=>{
    console.log(info, token)
    if (!!token) {
      navigate('/home')
    }
  }, [info, token])


  useEffect(()=>{
    if (confirmPassValue != passValue) {
      setErrorPassValue('password do not match')
    } else if (confirmPassValue === passValue) {
      setErrorPassValue('')
    }
  }, [confirmPassValue]);

  useEffect(() => {
    if (moment().diff(moment(birthdateValue, "YYYY-MM-DD"), 'years') < 18) {
      setErrorBirthdateValue('birthdate error')
    } else {
      setErrorBirthdateValue('')
    }
  }, [birthdateValue])

  useEffect(()=>{
    if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrorEmailValue('wrong email value')
    } else {
      setErrorEmailValue('')
    }
  }, [emailValue])

  const goSignin = () => {
    navigate('signin')
  }
  return (
    <div className='flex w-full h-auto mt-5'>
      <div className='w-full flex items-center justify-center'>
        <div className='bg-white px-10 py-10 rounded-3xl border-2 border-gray-200'>
          <h1 className='text-5xl font-semibold'>Welcome</h1>
          <p className='font-medium text-lg text-gray-500 mt-4'>Please enter your details</p>
          <div className='mt-8 '>
            <CommonInput 
              value={nameValue}
              label={'Name'}
              onchange={setNameValue}
              placeholder={'Enter your Name'}
            />
            <CommonInput 
              value={lastNameValue}
              label={'Lastname'}
              onchange={setLastNameValue}
              placeholder={'Enter your lastname'}
            />
            <CommonInput 
              value={addressValue}
              label={'Address'}
              onchange={setAddressValue}
              placeholder={'Enter your address'}
            />
            <CommonInput 
              value={emailValue}
              label={'Email'}
              onchange={setEmailValue}
              placeholder={'Enter your email'}
              type='email'
              error={!!errorEmailValue}
            />
            <CommonInput 
              value={birthdateValue}
              label={'Birthdate'}
              onchange={setBirthdateValue}
              placeholder={'Enter your birthdate'}
              type='date'
              error={!!errorBirthdateValue}
            />
            <CommonInput 
              value={passValue}
              label={'Password'}
              onchange={setPassValue}
              placeholder={'Enter your password'}
              type={`${!viewPass ? 'password' : 'text'}`}
            />
            <CommonInput 
              value={confirmPassValue}
              label={'Confirm Password'}
              onchange={setConfirmPassValue}
              placeholder={'Confirm password'}
              error={!!errorPassValue}
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
                className={`${!!errorBirthdateValue || !!errorEmailValue || !!errorPassValue ? 'bg-gray-400':'bg-blue-500'} text-white text-lg font-bold py-3 rounded-xl`}
                onClick={()=>onSignUp()}
                disabled={!!errorBirthdateValue || !!errorEmailValue || !!errorPassValue}
              >
                Signup
              </button>
            </div>
            <div className='mt-8 flex flex-col gap-y-4'>
              <button 
                className={`bg-blue-500 text-white text-lg font-bold py-3 rounded-xl`}
                onClick={()=>goSignin()}
              >
                Signin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
