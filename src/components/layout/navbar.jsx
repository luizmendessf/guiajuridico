import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import "./Navbar.css";

// 1. IMPORTE OS LOGOS NO TOPO DO ARQUIVO
import logoLight from '../../assets/imagens/logo3d.png'; // Caminho para o logo do modo claro
import logoDark from '../../assets/imagens/logo-dark.png'; // Caminho para o logo do modo escuro

// Função helper para alternar o tema
const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Função para obter o tema inicial
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') === 'dark';
  }
  return false;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(getInitialTheme());

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Lidar com o scroll para o efeito da navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Checar no carregamento inicial
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDark]);

  const handleThemeClick = () => {
    setIsDark(!isDark);
    toggleTheme();
  }

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Oportunidades", href: "/oportunidades" },
    { name: "Sobre", href: "/sobre" },
  ];

  const navClasses = `navbar ${scrolled ? 'navbar--scrolled' : ''}`;

  // 2. USE AS VARIÁVEIS IMPORTADAS PARA DEFINIR O SRC DO LOGO
  const logoSrc = isDark ? logoDark : logoLight;

  return (
    <nav className={navClasses}>
      <div className="container navbar__container">
        <Link to="/" className="navbar__logo-link">
          <div className="navbar__logo-wrapper">
          <img 
              src={logoSrc} 
              alt="Guia Jurídico" 
              className="navbar__logo-img" 
            />
            <div className="navbar__logo-glow"></div>
          </div>
        </Link>

        {/* Navegação Desktop */}
        <div className="navbar__desktop-nav">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="navbar__desktop-link">
              {item.name}
              <span className="navbar__desktop-link-underline"></span>
            </Link>
          ))}
          <button onClick={handleThemeClick} className="navbar__theme-toggle" aria-label="Toggle theme">
            <Sun className="sun-icon" size={20} />
            <Moon className="moon-icon" size={20} />
          </button>
        </div>

        {/* Botões do menu mobile */}
        <div className="navbar__mobile-controls">
           <button onClick={handleThemeClick} className="navbar__theme-toggle" aria-label="Toggle theme">
            <Sun className="sun-icon" size={20} />
            <Moon className="moon-icon" size={20} />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="navbar__menu-button" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navegação Mobile */}
      {isOpen && (
        <div className="navbar__mobile-nav">
          <div className="navbar__mobile-nav-inner">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="navbar__mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}