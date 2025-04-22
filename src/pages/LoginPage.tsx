
import React from "react";
import { LoginForm } from "../components/auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-softgray px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-darkpurple">Entrar no KiCardapio</h1>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-neutralgray">
            Não tem conta?{" "}
            <a className="text-primarypurple hover:underline font-medium" href="/cadastro">
              Começar Grátis
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
