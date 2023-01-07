import { CognitoUserSession } from "amazon-cognito-identity-js";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../services/Account";

const Status = (props: {
  loginChildren: React.ReactNode;
  loggedInChildren: (jwtToken: string) => React.ReactNode;
}) => {
  const [status, setStatus] = useState(false);
  const [session, setSession] = useState<CognitoUserSession | null>(null);
  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    if (getSession == null) {
      return;
    }
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
          <div>{props.loggedInChildren((session as any).idToken.jwtToken)}</div>
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <>{props.loginChildren}</>
      )}
    </div>
  );
};

export default Status;
