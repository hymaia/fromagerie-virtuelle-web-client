import { CognitoUserSession } from "amazon-cognito-identity-js";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../services/Account";

const Status = () => {
  const [status, setStatus] = useState(false);
  const [session, setSession] = useState<CognitoUserSession | null>(null);
  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    if (getSession == null) { return; }
    getSession()
      .then((session) => {
        setSession(session);
        setStatus(true);
      })
      .catch((err) => {
        setSession(null);
        setStatus(false);
      });
  }, [getSession, status]);

  return (
    <div>
      {status ? (
        <div>
          <div>You are logged in.</div>
          <div>
            <code>{(session as any).idToken.jwtToken}</code>
          </div>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        "Please Login"
      )}
    </div>
  );
};

export default Status;
