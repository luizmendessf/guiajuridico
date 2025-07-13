// src/pages/Oportunidades.jsx
import { useState } from "react";
import { Search } from "lucide-react";
import OpportunityCard from "../components/cards/OpportunityCard";
import Button from "../components/ui/button"; // Reutilizando nosso botão
import "./Oportunidades.css";

// Os dados podem ser movidos para um arquivo separado no futuro
const opportunities = [
  // ... (cole aqui a lista de 'opportunities' do arquivo original)
  {
    id: 1,
    title: "Estágio em Direito Corporativo",
    company: "Machado Meyer Advogados",
    location: "São Paulo, SP",
    type: "Estágio",
    deadline: "15/02/2024",
    description:
      "Oportunidade de estágio em uma das maiores bancas de advocacia do país, com foco em fusões e aquisições.",
    requirements: ["Cursando 7º ou 8º semestre", "Inglês avançado", "Disponibilidade 6h/dia"],
    salary: "R$ 2.500 + benefícios",
    image: "/images/lawyer-office.jpg",
  },
   {
    id: 2,
    title: "Programa de Trainee Jurídico",
    company: "Banco Itaú",
    location: "São Paulo, SP",
    type: "Trainee",
    deadline: "28/02/2024",
    description:
      "Programa de 18 meses para recém-formados em Direito com rotação em diferentes áreas jurídicas do banco.",
    requirements: ["Formado até 2 anos", "Inglês fluente", "Disponibilidade para viagens"],
    salary: "R$ 8.500 + benefícios",
    image: "/images/legal-meeting.jpg",
  },
  // etc...
];

const categories = ["Todos", "Estágio", "Trainee", "Olimpíada", "Concurso"];

export default function Oportunidades() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

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