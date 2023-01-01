import './App.css';
import Status from './features/status/Status';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './features/login/Login';
import Register from './features/register/Register';
import { Account } from './services/Account';

function App() {
  return (
    <Account>
      <Status />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Account>
  );
}

export default App;
