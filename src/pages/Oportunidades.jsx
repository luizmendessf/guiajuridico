// src/pages/Oportunidades.jsx

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import OpportunityCard from "../components/cards/OpportunityCard";
import Button from "../components/ui/button";
import "./Oportunidades.css";

// 1. Importe os dados brutos do seu novo arquivo JSON
import opportunitiesData from '../data/oportunidade.json';

// 2. Importe TODAS as imagens que você referencia no seu JSON
import legalMeetingImg from '../assets/imagens/legal-meeting.jpg';
// Adicione aqui outras importações de imagem se tiver mais vagas

// 3. Crie um "mapa" para conectar o nome da imagem (texto) à imagem importada (módulo)
const imageMap = {
  "legal-meeting.jpg": legalMeetingImg,
  // "outra-imagem.jpg": outraImagemImportada,
};

const categories = ["Todos", "Estágio", "Trainee", "Congresso", "Competição", "Publicação acadêmica", "Eventos"];

export default function Oportunidades() {
  // 4. Crie um estado para armazenar as vagas depois de processadas
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // 5. Use o useEffect para processar os dados uma única vez, quando o componente montar
  useEffect(() => {
    const processedOpportunities = opportunitiesData.map(opportunity => ({
      ...opportunity,
      // Para cada vaga, troque o nome da imagem pela imagem real importada
      image: imageMap[opportunity.image] 
    }));
    setOpportunities(processedOpportunities);
  }, []); // O array vazio [] garante que isso rode só uma vez

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchesSearch =
      opportunity.title.toLowerCase().includes(lowerSearchTerm) ||
      opportunity.company.toLowerCase().includes(lowerSearchTerm) ||
      opportunity.location.toLowerCase().includes(lowerSearchTerm);
    const matchesCategory = selectedCategory === "Todos" || opportunity.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="opportunities-page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Oportunidades Jurídicas</h1>
          <p className="page-subtitle">
            Descubra as melhores vagas de estágio, trainee, olimpíadas e concursos
          </p>
        </header>

        <div className="filters-section">
          <div className="search-bar">
            <Search className="search-bar__icon" />
            <input
              type="text"
              placeholder="Buscar por título, empresa ou localização..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar__input"
            />
          </div>

          <div className="categories-bar">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="category-button"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="results-count">
          <p>
            {filteredOpportunities.length} oportunidade{filteredOpportunities.length !== 1 && "s"} encontrada{filteredOpportunities.length !== 1 && "s"}
          </p>
        </div>

        <div className="opportunities-grid">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))
          ) : (
            <div className="no-results">
              <p>Nenhuma oportunidade encontrada com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}