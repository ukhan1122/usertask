
import { useSelector } from 'react-redux';
import './App.css';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import { selectUser } from './redux/UserSlice';

function App() {
  const user = useSelector(selectUser)
  console.log("redux user data",user)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={!user ? <Login/> : <Navigate to="/" />}/>
          <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/" />}/>
          <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>}/>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
