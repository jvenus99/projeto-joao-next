import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import jwt from "jwt-decode"

import { getUser, signIn } from "../services/authController";
import { api } from "../services";

type User = {
  email: string;
  id: number
}

type LoginData = {
  email: string;
  password: string;
}

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    (async () => {
      const { 'q2bank.accessToken': accessToken } = parseCookies();
      if (accessToken) {
        const { sub, exp } = await jwt(accessToken);
        const current_time = Date.now() / 1000;
        if (current_time > exp) {
          destroyCookie({}, 'q2bank.accessToken');
        }
        const { data: userData } = await getUser(sub);
        setUser(userData);
      }
    })
      ();

  }, []);

  async function login({ email, password }: LoginData) {
    try {
      const { data } = await signIn(email, password);
      const { accessToken, user } = data;

      setCookie(undefined, "q2bank.accessToken", accessToken, {
        maxAge: 60 * 60, // 1h
      });

      api.defaults.headers['Authorization'] = `Bearer ${accessToken}`

      setUser(user);

      Router.push("/bankData");
    } catch (error) {
      console.log(error);
      alert('Email ou senha incorretos');
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  )
}
