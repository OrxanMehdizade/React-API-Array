import './App.css';
import Goods from "./Goods";
import MyBag from "./MyBag";
import Admin from "./Admin";
import {Route, Routes,Link} from "react-router-dom";
import goods from "./Goods";

function App() {

  return (
      <div className="App">
        <Link id='goodsİd' to='/' >Goods</Link>
        <Link id='mybagsİd' to='/my-bag'>MyBag</Link>
        <Link id='adminİd' to='/admin'>Admin</Link>
        <Routes>
          <Route path='/' element={<Goods/>}/>
          <Route path='/my-bag' element={<MyBag/>}/>
            <Route path='/admin' element={<Admin/>}/>
        </Routes>
      </div>
  );
}

export default App;