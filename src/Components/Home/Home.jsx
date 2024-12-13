import React, { useCallback, useEffect, useState } from 'react'
import useStatusStore from '../../ducks/store'
import { useNavigate } from 'react-router-dom';
import ProductItem from '../Common/ProductItem';
import axios from 'axios';
import endPointPaths from '../../utils/endpointPath';
import SearchInput from '../Common/SearchInput';
import Sipiner from '../Common/Sipiner';

const {getProductsUrl, searchProductsUrl} = endPointPaths;

const Home = () => {

  const navigate = useNavigate();
  const {info, token} = useStatusStore(state => state);
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    if (!token) {
      navigate('/');
    }
  }, [token])
  const goToMyInfo = () => {
    navigate('/user-detail')
  }

  const handleGetProducts = useCallback(async()=>{
    const {data: productsResponse} = await axios.get(getProductsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        
      }
    })
    console.log(productsResponse)
    setProducts(productsResponse);
  }, [token])

  useEffect(()=>{
    console.log(token, searchValue, !searchValue)
    if (token && !searchValue) {
      setLoading(true);
      handleGetProducts();
      setLoading(false)
    }
  },[token, searchValue])

  const handleSearch = useCallback(async()=>{
    try {
      setLoading(true);
      const {data: productsResponse} = await axios.get(`${searchProductsUrl}${searchValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
          
        }
      })
      console.log(productsResponse)
      setProducts(productsResponse);
      console.log(searchValue);
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }, [searchValue]);


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
                // onClick={()=>goSignin()}
              >
                My Cart
              </button>
            </div>
          </div>
          <SearchInput 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
          />
          <div className=''>
            {loading && <Sipiner/>}
            {products.map((product, index)=>(
              <ProductItem key={index} {...product}/>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home