import { Route, Router, Routes,  } from 'react-router-dom';
import { Signup } from './Components/LoginSignup/Signup';
import { Signin } from './Components/LoginSignup/Signin';
import { UserDetail } from './Components/User/UserDetail';
import Home from './Components/Home/Home';
import CartDetail from './Components/Cart/CartDetail';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/user-detail' element={<UserDetail/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/cart' element={<CartDetail/>}/>
    </Routes>
  );
}

export default App;
