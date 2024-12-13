import React, { useCallback, useEffect, useState } from 'react'
import { CommonInput } from '../Common/CommonInput'
import moment from 'moment/moment';
import useStatusStore from '../../ducks/store';
import axios from 'axios';
import endPointPaths from '../../utils/endpointPath';
import { redirect, useNavigate } from 'react-router-dom';

const {updateUserUrl} = endPointPaths

export const UserDetail = () => {

  const navigate = useNavigate();
  
  const {signupUser, info, setToken, token} = useStatusStore(state=>state);
  const {name, lastName, adress, email, birthDate, password, id: userId} = info;

  const [nameValue, setNameValue] = useState(name);
  const [lastNameValue, setLastNameValue] = useState(lastName);
  const [addressValue, setAddressValue] = useState(adress);
  const [emailValue, setEmailValue] = useState(email);
  const [birthdateValue, setBirthdateValue] = useState(birthDate);
  const [passValue, setPassValue] = useState(password);
  const [confirmPassValue, setConfirmPassValue] = useState(password);
  const [errorPassValue, setErrorPassValue] = useState('');
  const [errorBirthdateValue, setErrorBirthdateValue] = useState('');
  const [errorEmailValue, setErrorEmailValue] = useState('');
  const [viewPass, setViewPass] = useState(false)
  const [edit, setEdit] = useState(false)
  
  const onSaveChanges = useCallback(async()=>{
     try {
        const {data} = await axios.put(updateUserUrl+userId,{
        name: nameValue,
        lastName: lastNameValue,
        email: emailValue,
        adress: addressValue,
        birthDate: birthdateValue
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      console.log(data);
      signupUser(data);
    } catch (e) {
      console.log('data error')
    }
  },[nameValue, lastNameValue, addressValue, emailValue, birthdateValue, confirmPassValue]);

  useEffect(()=>{
    console.log(info, token)
    if (!!!token) {
      navigate("/")
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

  const goHome = () => {
    navigate('/home')
  }

  console.log(addressValue, birthdateValue)
  return (
    <div className='flex w-full h-auto mt-5'>
      <div className='w-full flex items-center justify-center'>
        <div className='bg-white px-10 py-10 rounded-3xl border-2 border-gray-200'>
          <h1 className='text-5xl font-semibold'>User Detail</h1>
          <p className='font-medium text-lg text-gray-500 mt-4'>Click on edit if need update </p>
          <div className='mt-8'>
            <CommonInput 
              value={nameValue}
              label={'Name'}
              onchange={setNameValue}
              placeholder={'Enter your Name'}
              disabled={!edit}
            />
            <CommonInput 
              value={lastNameValue}
              label={'Lastname'}
              onchange={setLastNameValue}
              placeholder={'Enter your lastname'}
              disabled={!edit}
            />
            <CommonInput 
              value={addressValue}
              label={'Address'}
              onchange={setAddressValue}
              placeholder={'Enter your address'}
              disabled={!edit}
            />
            <CommonInput 
              value={birthdateValue}
              label={'Birthdate'}
              onchange={setBirthdateValue}
              placeholder={'Enter your birthdate'}
              type='date'
              error={!!errorBirthdateValue}
              disabled={!edit}
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
              <button 
                className='font-medium text-base text-blue-600'
                onClick={()=> setEdit(!edit)}
              >
                Edit
              </button>
            </div>
            <div className='mt-8 flex flex-col gap-y-4'>
              <button 
                className={`${!!errorBirthdateValue || !!errorEmailValue || !!errorPassValue ? 'bg-gray-400':'bg-blue-500'} active:bg-blue-200 text-white text-lg font-bold py-3 rounded-xl`}
                onClick={()=>onSaveChanges()}
                disabled={!!errorBirthdateValue || !!errorEmailValue || !!errorPassValue}
              >
                Save changes
              </button>
              <button 
                className={`bg-blue-500 active:bg-blue-200 text-white text-lg font-bold py-3 rounded-xl`}
                onClick={()=>goHome()}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
