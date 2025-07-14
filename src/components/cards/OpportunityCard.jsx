// src/components/cards/OpportunityCard.jsx
import { Clock, Building, MapPin, ExternalLink } from "lucide-react";
import Button from "../ui/button";
import "./OpportunityCard.css";

export default function OpportunityCard({ opportunity }) {
  const {
    image,
    type,
    closingDate, // ALTERADO: de 'deadline' para 'closingDate'
    title,
    company,
    location,
    applicationLink,
    status, // NOVO: Recebendo o status
  } = opportunity;

  // NOVO: Função para formatar o texto do status
  const getStatusText = (status) => {
    if (status === 'Abertas') return 'Inscrições Abertas';
    if (status === 'Em Breve') return 'Abre em Breve';
    return 'Inscrições Encerradas';
  }

  return (
    // NOVO: Adicionando uma classe com o status ao card principal
    <div className={`card opportunity-card status-border--${status}`}>
      <div className="opportunity-card__header">
        <div className="opportunity-card__image-wrapper">
          <img src={image || "/placeholder.svg"} alt={title} className="opportunity-card__image" />
        </div>
        <div className="opportunity-card__info-bar">
          <span className="badge" data-type={type}>{type}</span>
          {/* NOVO: Indicador de status visual */}
          <div className={`status-indicator status--${status}`}>
            {getStatusText(status)}
          </div>
        </div>
        <h3 className="opportunity-card__title">{title}</h3>
        <p className="opportunity-card__meta">
          <Building size={16} /> {company}
        </p>
        <p className="opportunity-card__meta">
          <MapPin size={16} /> {location}
        </p>
      </div>
      <div className="card__content">
        {/* ...código do conteúdo do card sem alterações... */}
      </div>
      <div className="opportunity-card__footer">
        <div className="deadline">
            <Clock size={16} />
            <span>Encerra em: {new Date(closingDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
          </div>
        {applicationLink && status === 'Abertas' && (
          <Button href={applicationLink} variant="primary">
            Candidatar-se <ExternalLink size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}