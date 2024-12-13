import React, { useCallback, useEffect, useState } from 'react'
import useStatusStore from '../../ducks/store'
import { useNavigate } from 'react-router-dom';
import ProductItem from '../Common/ProductItem';
import axios from 'axios';
import endPointPaths from '../../utils/endpointPath';
import SearchInput from '../Common/SearchInput';
import Sipiner from '../Common/Sipiner';

const {getProductsUrl, searchProductsUrl, cartItemsUrl} = endPointPaths;

const CartDetail = () => {

  const navigate = useNavigate();
  const {info, token} = useStatusStore(state => state);
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(()=>{
    if (!token) {
      navigate('/');
    }
  }, [token])
  const goToMyInfo = () => {
    navigate('/user-detail')
  }

  const goHome = () => {
    navigate('/home')
  }

  const handleGetProducts = useCallback(async() => {
    try {
      let response;
      response = await axios.get(cartItemsUrl,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      console.log(response.data)
      const cartItems = response.data.map(cartItem => ({
        ...cartItem.product,
        cartItemId: cartItem.id
      }))
      setProducts(cartItems);
      const totalPrice = cartItems?.reduce((sum, item) => sum + item.price, 0)
      setTotalPrice(totalPrice)
    } catch (e) {
      console.error('error on reques', e.error)
    }
  }, [token])

  useEffect(()=>{
    console.log(token, searchValue, !searchValue)
    if (token && !searchValue) {
      setLoading(true);
      handleGetProducts();
      setLoading(false)
    }
  },[token, searchValue])

  return (
    <div className='flex w-full h-auto mt-5'>
      <div className='w-full flex items-start justify-center'>
        <div className='w-5/6 bg-white px-10 py-10 rounded-3xl border-2 border-gray-200 flex flex-col'>
          <div>
            <div className='flex my-2 gap-x-2 justify-start w-full lg:w-1/2 items-baseline'>
              <button 
                className={`bg-blue-500 active:bg-blue-200 text-white text-lg font-bold py-2 rounded-xl px-3`}
                onClick={()=>goToMyInfo()}
              >
                My Info
              </button>
              <button 
                className={`bg-blue-500 active:bg-blue-200 text-white text-lg font-bold py-2 rounded-xl px-3`}
                onClick={()=>goHome()}
              >
                Go Home
              </button>
            </div>
          </div>
          <div>
            <h3 className='text-xl font-semibold'>
              Total Price: {parseFloat(totalPrice.toFixed(2))}
            </h3>
          </div>
          <div className=''>
            {loading && <Sipiner/>}
            {products.map((product, index)=>(
              <ProductItem key={index} {...product} isCartItem cartItemId={product.cartItemId} handleCallBack={handleGetProducts}/>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default CartDetail