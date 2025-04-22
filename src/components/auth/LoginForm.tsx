
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { Mail, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const aoSubmeter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
      toast({ title: "Falha no login", description: error.message, variant: "destructive" });
      setLoading(false);
    } else {
      toast({ title: "Login realizado!", description: "Bem vindo!" });
      setLoading(false);
      navigate("/admin/dashboard");
    }
  };

  return (
    <form onSubmit={aoSubmeter} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-darkpurple font-medium mb-1">E-mail</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutralgray" />
          <Input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="seu@email.com"
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
            type="password"
            id="senha"
            placeholder="********"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      <Button disabled={loading} className="w-full bg-primarypurple hover:bg-darkpurple text-white text-base font-bold h-11">
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
};
