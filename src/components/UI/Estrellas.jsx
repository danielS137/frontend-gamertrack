import React from 'react';
import { Star } from 'lucide-react';

const Estrellas = ({ puntuacion, onChange = null, size = 20 }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= puntuacion 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'text-gray-300'
          } ${onChange ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => onChange && onChange(star)}
        />
      ))}
    </div>
  );
};

export default Estrellas;