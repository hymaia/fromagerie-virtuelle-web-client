import { useContext, useState } from 'react';
import { AccountContext } from '../../services/Account';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useContext(AccountContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authenticate == null) { return; }
    authenticate(username, password)
      .then((data: any) => {
        alert('login success');
        window.location.reload();
      })
      .catch((err: Error) => {
        alert('login failure');
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
