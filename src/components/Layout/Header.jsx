import React from 'react';
import { GamepadIcon } from 'lucide-react';
import Navigation from './Navigation';

const Header = ({ vistaActual, onCambiarVista }) => {
  return (
    <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-white border-opacity-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GamepadIcon size={40} className="text-purple-400" />
            <h1 className="text-3xl font-bold text-white">GameTracker</h1>
          </div>
          <Navigation vistaActual={vistaActual} onCambiarVista={onCambiarVista} />
        </div>
      </div>
    </header>
  );
};

export default Header;