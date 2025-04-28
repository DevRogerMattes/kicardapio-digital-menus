
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/lib/authService";

export const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function aoSubmeter(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { user, error } = await registerUser(email, senha);
    
    if (error || !user) {
      toast.error(error || "Erro ao registrar usuário");
      setLoading(false);
      return;
    }
    
    toast.success("Cadastro realizado com sucesso!");
    setLoading(false);
    navigate("/login");
  }

  return (
    <form onSubmit={aoSubmeter} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-darkpurple font-medium mb-1">E-mail</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutralgray" />
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="senha" className="block text-darkpurple font-medium mb-1">Senha</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutralgray" />
          <Input
            id="senha"
            type="password"
            placeholder="Nova senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="pl-10"
            autoComplete="new-password"
            required
          />
        </div>
      </div>
      <Button disabled={loading} className="w-full bg-primarypurple hover:bg-darkpurple text-white text-base font-bold h-11">
        {loading ? "Cadastrando..." : "Criar Conta"}
      </Button>
    </form>
  );
};
