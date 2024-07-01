import { Route, Routes } from 'react-router-dom';
import './App.css';
import GamePage from './Games/GamePage';
import LoginPage from './Login/LoginPage';
import JoinPage from './Login/JoinPage';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_RESTAPI_URL
function App() {
  
  return (
    <div className="App">
        <GamePage/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='join' element={<JoinPage/>}/>
        </Routes>
    </div>
  )
}

export default App;
