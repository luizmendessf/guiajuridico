// src/pages/Oportunidades.jsx
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import OpportunityCard from "../components/cards/OpportunityCard";
import Button from "../components/ui/button";
import "./Oportunidades.css";

import opportunitiesData from '../data/oportunidade.json';
import legalMeetingImg from '../assets/imagens/legal-meeting.jpg';

const imageMap = {
  "legal-meeting.jpg": legalMeetingImg,
};

const getOpportunityStatus = (openingDate, closingDate) => {
  const now = new Date();
  const start = new Date(openingDate);
  const end = new Date(closingDate);
  end.setDate(end.getDate() + 1);

  if (now < start) {
    return 'Em Breve';
  } else if (now >= start && now < end) {
    return 'Abertas';
  } else {
    return 'Encerradas';
  }
};

const categories = ["Todos", "Estágio", "Trainee", "Congresso", "Competição", "Publicação acadêmica", "Eventos"];
// ALTERADO: Adicionado "Todas" ao início da lista de filtros de status
const statusFilters = ["Todas", "Abertas", "Em Breve", "Encerradas"];

export default function Oportunidades() {
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  // ALTERADO: O filtro de status agora começa com "Todas" por padrão
  const [selectedStatus, setSelectedStatus] = useState("Todas");

  useEffect(() => {
    const processedOpportunities = opportunitiesData.map(opportunity => ({
      ...opportunity,
      image: imageMap[opportunity.image],
      status: getOpportunityStatus(opportunity.openingDate, opportunity.closingDate)
    }));
    setOpportunities(processedOpportunities);
  }, []);

  // ALTERADO: A lógica de filtro agora lida com o caso "Todas" para o status
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchesSearch =
      opportunity.title.toLowerCase().includes(lowerSearchTerm) ||
      opportunity.company.toLowerCase().includes(lowerSearchTerm) ||
      opportunity.location.toLowerCase().includes(lowerSearchTerm);
    const matchesCategory = selectedCategory === "Todos" || opportunity.type === selectedCategory;
    // Se "Todas" estiver selecionado, o filtro de status é ignorado (sempre verdadeiro)
    const matchesStatus = selectedStatus === "Todas" || opportunity.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
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

          <div className="status-bar">
            {statusFilters.map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "primary" : "outline"}
                onClick={() => setSelectedStatus(status)}
                className="status-button"
              >
                {status}
              </Button>
            ))}
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