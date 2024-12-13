
import axios from 'axios'
import React from 'react'
import endPointPaths from '../../utils/endpointPath'
import useStatusStore from '../../ducks/store';
import { CommonInput } from './CommonInput';

const {cartItemsUrl} = endPointPaths;

const ProductItem = ({title, description, imgUrl, price, quantity, isCartItem, id: productId, cartItemId, handleCallBack}) => {

  const {token} = useStatusStore(state=>state)
  const handleAcction = async() => {
    try {
      let response;
      if (!isCartItem) {
        response = await axios.post(cartItemsUrl, [{
          productId,
          "quantity": 1
        }],{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
      } else {
        await axios.delete(`${cartItemsUrl}/${cartItemId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        handleCallBack && handleCallBack();
      }
      console.log(response.data)
    } catch (e) {
      console.error('error on reques', e.error)
    }
  }


  return (
    <div className='flex lg:flex-row flex-col gap-y-3 lg:gap-x-2 my-2 rounded-lg border-gray-200 border-2 lg:h-28 p-1'>
      <div className='w-full lg:h-full h-28 lg:w-1/5'>
        <img 
          src={imgUrl}
          className='h-full w-full object-cover rounded-l-lg'
        />
      </div>
      <div className='lg:w-3/5 lg:h-full h-20 '>
        <div>
          <h3 className='text-xl font-semibold'>
            {title}
          </h3>
        </div>
        <div>
          <p className='font-medium text-lg text-gray-600 my-2 line-clamp-2'>
            {description}
          </p>
        </div>
      </div>
      <div className='flex flex-col lg:w-1/5 justify-between items-center bg-slate-100 rounded-lg p-2'>
        <div className='flex justify-between w-full'>
          <p className='font-medium text-lg text-gray-600'>
            Price:
          </p>
          <p className='font-medium text-lg text-gray-600'>
            {price}
          </p>
        </div>
        {/* <div className='flex justify-between w-full'>
          <p className='font-medium text-lg text-gray-600'>
            Qt:
          </p>
          <p className='font-medium text-lg text-gray-600 w-1/5 h-1'>
            {isCartItem ? quantity : <CommonInput hideLabel/>}
          </p>
        </div> */}
        <div className='w-full '>
          <button 
            onClick={handleAcction}
            className='bg-blue-500 text-white text-lg font-bold p-1 rounded-xl w-full active:bg-blue-200'
          >
            {`${!isCartItem ? 'add to cart' : 'delete'}`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem