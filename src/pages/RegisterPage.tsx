
import React from "react";
import { RegisterForm } from "../components/auth/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-softgray px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-darkpurple">Criar conta no KiCardapio</h1>
          <RegisterForm />
          <p className="mt-6 text-center text-sm text-neutralgray">
            Já possui uma conta?{" "}
            <a className="text-primarypurple hover:underline font-medium" href="/login">
              Entrar no sistema
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
