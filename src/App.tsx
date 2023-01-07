import "./App.css";
import Status from "./features/status/Status";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/login/Login";
import Register from "./features/register/Register";
import { Account } from "./services/Account";

function App() {
  return (
    <Account>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Status
                loginChildren={<Login />}
                loggedInChildren={(token) => <span>LoggedIn: {token}</span>}
              />
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
        <footer className="text-gray-600 body-font">
          <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <span className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <span className="ml-3 text-xl">
                Fromagerie Virtuelle by Hymaia
              </span>
            </span>
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
              © 2022 Hymaia
            </p>
          </div>
        </footer>
      </BrowserRouter>
    </Account>
  );
}

export default App;
