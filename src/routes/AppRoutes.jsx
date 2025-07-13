import { Routes, Route } from "react-router-dom";

// Importe todas as suas páginas aqui
import Inicio from "../pages/inicio";
import Oportunidades from "../pages/Oportunidades";
import Sobre from "../pages/Sobre";

export default function AppRoutes() {
  return (
    <Routes>
      {/* A rota principal "/" renderiza a sua página Inicio */}
      <Route path="/" element={<Inicio />} />
      
      {/* Outras rotas */}
      <Route path="/oportunidades" element={<Oportunidades />} />
      <Route path="/sobre" element={<Sobre />} />
      
      {/* Quando precisar adicionar uma nova página, você só precisará mexer aqui */}
      {/* Exemplo: <Route path="/contato" element={<Contato />} /> */}
    </Routes>
  );
}