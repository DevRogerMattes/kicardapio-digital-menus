
import React from "react";
import { Link } from "react-router-dom";
import KiCardapioLogo from "../logo/KiCardapioLogo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <KiCardapioLogo size="md" variant="full" />
            <p className="text-muted-foreground mt-4 mb-6 max-w-md">
              KiCardapio é a plataforma SaaS que permite criar cardápios digitais
              personalizados para seu restaurante, bar ou lanchonete em minutos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-kicardapio-red">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-kicardapio-red">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-kicardapio-red">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Produto</h3>
            <ul className="space-y-3">
              <li><Link to="/planos" className="text-muted-foreground hover:text-kicardapio-red">Planos</Link></li>
              <li><Link to="/demo/pizzaria-do-joao" className="text-muted-foreground hover:text-kicardapio-red">Demo</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-kicardapio-red">Recursos</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-kicardapio-red">Novidades</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li><Link to="/sobre" className="text-muted-foreground hover:text-kicardapio-red">Sobre nós</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-kicardapio-red">Contato</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-kicardapio-red">Carreiras</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-kicardapio-red">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Suporte</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-muted-foreground hover:text-kicardapio-red">Ajuda</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-kicardapio-red">FAQ</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-kicardapio-red">Termos de Serviço</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-kicardapio-red">Política de Privacidade</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} KiCardapio. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
