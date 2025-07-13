// src/components/sections/FeaturesSection.jsx

import FeatureCard from "../cards/FeatureCard";
import { Search, Users, BookOpen } from "lucide-react";
import "./FeaturesSection.css";

const featuresData = [
    { icon: Search, title: "Busca Inteligente", description: "Encontre oportunidades personalizadas para seu perfil", image: "/images/busca.jpg", delay: "0s" },
    { icon: Users, title: "Networking", description: "Conecte-se com profissionais e colegas da área", image: "/images/students-campus.jpg", delay: "0.2s" },
    { icon: BookOpen, title: "Recursos Educativos", description: "Materiais e dicas para impulsionar sua carreira", image: "/images/legal-meeting.jpg", delay: "0.4s" },
];

export default function FeaturesSection() {
  return (
    <section className="section features-section">
      <div className="section__bg-gradient"></div>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">O que você encontrará</h2>
          <p className="section-subtitle">Uma plataforma completa para impulsionar sua carreira jurídica</p>
        </div>
        <div className="features__grid">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              image={feature.image}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}