// src/components/cards/OpportunityCard.jsx
import { Clock, Building, MapPin, ExternalLink } from "lucide-react";
import Button from "../ui/button";
import "./OpportunityCard.css";

export default function OpportunityCard({ opportunity }) {
  const {
    image,
    type,
    deadline,
    title,
    company,
    location,
    description,
    requirements,
    salary,
  } = opportunity;

  // O tipo é passado como um atributo de dados para estilização no CSS
  return (
    <div className="card opportunity-card">
      <div className="opportunity-card__header">
        <div className="opportunity-card__image-wrapper">
          <img src={image || "/placeholder.svg"} alt={title} className="opportunity-card__image" />
        </div>
        <div className="opportunity-card__info-bar">
          <span className="badge" data-type={type}>{type}</span>
          <div className="deadline">
            <Clock size={16} />
            <span>{deadline}</span>
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
        <p className="opportunity-card__description">{description}</p>
        <div className="opportunity-card__requirements">
          <h4>Requisitos:</h4>
          <ul>
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
        <div className="opportunity-card__footer">
          <div className="salary">
            <span>Remuneração:</span>
            <p>{salary}</p>
          </div>
          <Button variant="primary">
            Candidatar-se <ExternalLink />
          </Button>
        </div>
      </div>
    </div>
  );
}