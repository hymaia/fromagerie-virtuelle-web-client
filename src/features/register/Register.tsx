import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useState } from "react";
import UserPool from "../../services/UserPool";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [OTP, setOTP] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      })
    );
    UserPool.signUp(username, password, attributeList, [], (err, data) => {
      if (err) {
        alert("Couldn't sign up");
      } else {
        setVerifyProcess(true);
        alert("User Added Successfully");
      }
    });
  };

  const verifyAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });
    user.confirmRegistration(OTP, true, (err, data) => {
      if (err) {
        alert("Couldn't verify account");
      } else {
        alert("Account verified successfully");
        window.location.href = "/login";
      }
    });
  };

  return (
    <div>
      {verifyProcess === false ? (
        <form onSubmit={onSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Email:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="email"
                name="email"
                className="form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                value={username.toLowerCase().trim()}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Email (Useless):
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="email"
                className="form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Password:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="password"
                name="password"
                className="form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign up
          </button>
        </form>
      ) : (
        <form onSubmit={verifyAccount}>
          Enter the OTP:
          <input
            type="text"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
          <br />
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
}

export default Register;
