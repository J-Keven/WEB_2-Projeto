import React, { useContext, createContext, useState, useCallback } from 'react';
import clientApi from '../service/clientApi';
import formatName from '../utils/formatName';

interface LoginRequest {
  email: string;
  password: string;
}

export interface UserProps {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar: string;
  title: string;
  description?: string;
  id: string
}

interface AuthContextProps {
  user: UserProps;
  token: string | undefined;
  login: (data: LoginRequest) => Promise<void>;
  updateUser: (data: UserProps) => Promise<void>;
  logout: () => Promise<void>;
}

const ContextAuth = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(() => {
    const response = localStorage.getItem('FreelasApp@user');
    if (response) {
      return JSON.parse(response);
    }
    return undefined;
  });

  const [token, setToken] = useState(() => {
    const response = localStorage.getItem('FreelasApp@token');
    if (response) {
      // clientApi.defaults.headers = {
      //   authorization: `Bearer ${JSON.parse(response)}`,
      // };
      return JSON.parse(response);
    }
    return null;
  });

  const login = async ({ email, password }: LoginRequest) => {
    const response = await clientApi.post<{
      user: UserProps;
      token: string;
    }>('/login', {
      email,
      password,
    });

    const userFomated = {
      fullName: formatName(
        response.data.user.firstName,
        response.data.user.lastName,
      ),
      firstName: response.data.user.firstName,
      lastName: response.data.user.lastName,
      email: response.data.user.email,
      id: response.data.user.id,
      description: response.data.user.description,
      avatar: response.data.user.avatar
        ? `https://hub-api.s3.amazonaws.com/${response.data.user.avatar}`
        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7i7gVDMhGLjyGKix9PTsTlY1wsjH4BIC2g&usqp=CAU',
    };

    setUser(userFomated);
    setToken(response.data.token);

    // clientApi.defaults.headers = {
    //   authorization: `Bearer ${response.data.token}`,
    // };

    localStorage.setItem('FreelasApp@user', JSON.stringify(userFomated));
    localStorage.setItem(
      'FreelasApp@token',
      JSON.stringify(response.data.token),
    );
  };

  const updateUser = useCallback(async (data: UserProps) => {
    const userFomated = {
      fullName: formatName(data.firstName, data.lastName),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      description: data.description,
      id: data.id,
      avatar: data.avatar
        ? `https://hub-api.s3.amazonaws.com/${data.avatar}`
        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7i7gVDMhGLjyGKix9PTsTlY1wsjH4BIC2g&usqp=CAU',
    };

    setUser(userFomated);
    localStorage.setItem('FreelasApp@user', JSON.stringify(userFomated));
  }, []);
  const logout = async () => {
    localStorage.removeItem('FreelasApp@user');
    localStorage.removeItem('FreelasApp@token');

    setUser(undefined);
  };

  return (
    <ContextAuth.Provider
      value={{
        user,
        token,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </ContextAuth.Provider>
  );
};

function useAuthContext(): AuthContextProps {
  return useContext(ContextAuth);
}

export { useAuthContext, AuthProvider };