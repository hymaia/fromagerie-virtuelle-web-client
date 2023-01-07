import { useContext, useState } from "react";
import { AccountContext } from "../../services/Account";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate } = useContext(AccountContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authenticate == null) {
      return;
    }
    authenticate(username, password)
      .then((data: any) => {
        alert("login success");
        window.location.reload();
      })
      .catch((err: Error) => {
        alert("login failure");
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
            Connectez-vous pour découvrir notre sélection de fromages de qualité
            !
          </p>
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
                value={username}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setUsername(e.target.value)}
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
              Connectez-vous
            </button>
            <button
              className="w-full mt-3 border-solid border-indigo-500 text-indigo-500 bg-white border-2 py-2 px-6 focus:outline-none hover:bg-indigo-100 rounded text-lg"
              type="button"
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Créer un compte
            </button>
            <p className="text-xs text-gray-500 mt-3">Démo</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
