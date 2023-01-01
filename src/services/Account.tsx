import { AuthenticationDetails, CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import { createContext, ReactNode } from "react";
import UserPool from "./UserPool";

interface AccountContextData {
  getSession?: () => Promise<CognitoUserSession>;
  authenticate?: (username: string, password: string) => Promise<CognitoUserSession>;
  logout?: () => void;
}

const AccountContext = createContext<AccountContextData>({});

function Account(props: { children: ReactNode }) {
  const getSession = async () => await new Promise<CognitoUserSession>((resolve, reject) => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err) {
          reject(err);
        } else if (session == null) {
          // TODO: implement this
          reject();
        } else {
          resolve(session);
        }
      });
    } else {
      reject();
    }
  });

  const authenticate = async (username: string, password: string) => await new Promise<CognitoUserSession>((resolve, reject) => {
    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
      newPasswordRequired: (data) => {
        // TODO: test this
        reject(data);
      },
    });
  });

  const logout = () => {
    const user = UserPool.getCurrentUser();
    user?.signOut();
    window.location.href = "/";
  };

  return (
    <AccountContext.Provider value={{ getSession, authenticate, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
}

export { Account, AccountContext };
