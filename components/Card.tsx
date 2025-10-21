
import React from 'react';

interface CardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white/70 backdrop-blur-sm border-2 border-yellow-300 rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3 rtl:ml-3 rtl:mr-0">{icon}</span>
        <h2 className="text-2xl font-bold text-yellow-800">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
