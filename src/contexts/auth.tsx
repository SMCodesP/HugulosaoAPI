import { api } from '@/services/api';
import { createContext, useContext, useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import useSWR from 'swr';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuthProps {
  user: TUser | undefined;
  accessToken: string;
  isLoaded: boolean;
  signIn: (user: { email: string; password: string }) => Promise<void>;
}

export const AuthContext = createContext<AuthProps>({} as AuthProps);

const AuthProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { data: user, mutate } = useSWR<TUser>(`/me`);
  const [accessToken, setAccessToken] = useState(``);
  const [isLoaded, setIsLoaded] = useState(false);

  const signIn: AuthProps['signIn'] = async ({ email, password }) => {
    try {
      if (!email || !password)
        throw new Error(`E-mail e senha devem ser enviadas.`);

      const response = await api.post<any>(`/session`, {
        email,
        password,
      });

      setAccessToken(response.data.access_token);
      localStorage.setItem(`access_token`, response.data.access_token);
    } catch (error) {
      const messageError = (error as any).response
        ? (error as any).response.data.message
        : (error as any).message;
      toast(messageError, {
        type: `error`,
      });
    }
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem(`access_token`) || ``);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    console.log(accessToken);
    api.defaults.headers.common[`Authorization`] = `Bearer ${accessToken}`;
    mutate();
  }, [accessToken, mutate]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isLoaded,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthProps {
  const context = useContext(AuthContext);

  return context;
}

export default AuthProvider;
