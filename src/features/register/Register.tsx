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
    const attributeList: any[] = [];
    // attributeList
    // .push
    // new CognitoUserAttribute({
    //   Name: "email",
    //   Value: email,
    // })
    // ();
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
        window.location.href = "/";
      }
    });
  };

  return (
    <section className="text-gray-600 body-font relative min-h-screen">
      <div
        style={{ backgroundImage: "url(cheese-bg.jpg)" }}
        className="absolute inset-0 bg-gray-300 bg-cover bg-center"
      ></div>
      <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Fromagerie Virtuelle
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Inscrivez-vous pour découvrir notre sélection de fromages de qualité
            !
          </p>
          {verifyProcess === false ? (
            <form onSubmit={onSubmit}>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={username.toLowerCase().trim()}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                className="w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                type="submit"
              >
                Sign Up
              </button>
              <p className="text-xs text-gray-500 mt-3">Démo</p>
            </form>
          ) : (
            <form onSubmit={verifyAccount}>
              <p className="leading-relaxed mb-5 text-gray-600">
                Renseignez ci-dessous votre code de vérification
              </p>
              <div className="relative mb-4">
                <label
                  htmlFor="otp"
                  className="leading-7 text-sm text-gray-600"
                >
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>
              <button
                className="w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                type="submit"
              >
                Vérifier
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Register;
