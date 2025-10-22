import React, { useState } from 'react';
import Card from './Card';
import { CANTEEN_MENU } from '../constants';
import { type Language, type CanteenItem } from '../types';
import { translations } from '../localization';

interface CanteenMenuProps {
  language: Language;
}

const CanteenMenu: React.FC<CanteenMenuProps> = ({ language }) => {
  const t = translations[language];
  const smoothieIngredients = CANTEEN_MENU.filter(item => item.isSmoothieIngredient);
  const [selectedIngredients, setSelectedIngredients] = useState<CanteenItem[]>([]);

  const toggleIngredient = (ingredient: CanteenItem) => {
    setSelectedIngredients(prev =>
      prev.find(item => item.id === ingredient.id)
        ? prev.filter(item => item.id !== ingredient.id)
        : [...prev, ingredient]
    );
  };

  const handleMakeSmoothie = () => {
    if (selectedIngredients.length === 0) return;
    alert(t.smoothieMade);
    setSelectedIngredients([]);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-yellow-900">{t.canteenTitle}</h1>

      <Card title={t.menuTitle} icon="🍽️">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {CANTEEN_MENU.map((item) => (
            <div key={item.id} className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center justify-between text-center border-2 border-yellow-200">
              <span className="text-6xl">{item.icon}</span>
              <p className="font-semibold mt-2 text-yellow-800">{item.name[language]}</p>
              {item.isHealthy && (
                <div className="mt-2 text-xs bg-green-500 text-white font-bold p-1 rounded-md">
                  {t.smartChoice}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card title={t.smoothieMakerTitle} icon="🥤">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredient Selection */}
          <div>
            <h3 className="text-xl font-bold text-yellow-800 mb-4">{t.selectIngredients}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {smoothieIngredients.map(ingredient => {
                const isSelected = selectedIngredients.some(i => i.id === ingredient.id);
                return (
                  <button
                    key={ingredient.id}
                    onClick={() => toggleIngredient(ingredient)}
                    className={`p-3 rounded-lg flex flex-col items-center border-2 transition ${isSelected ? 'bg-yellow-400 border-yellow-600 ring-2 ring-yellow-500' : 'bg-yellow-100 border-yellow-200 hover:bg-yellow-200'}`}
                  >
                    <span className="text-4xl">{ingredient.icon}</span>
                    <span className="text-sm font-semibold mt-1 text-yellow-900">{ingredient.name[language]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Smoothie Preview & Creation */}
          <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200 flex flex-col">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">{t.yourSmoothie}</h3>
            <div className="flex-grow min-h-[150px] bg-white rounded-lg p-4 flex flex-wrap gap-4 items-center justify-center">
              {selectedIngredients.length > 0 ? (
                selectedIngredients.map(ing => (
                   <div key={ing.id} className="flex flex-col items-center">
                      <span className="text-5xl">{ing.icon}</span>
                      <span className="text-xs">{ing.name[language]}</span>
                   </div>
                ))
              ) : (
                <p className="text-gray-400">{t.selectIngredients}</p>
              )}
            </div>
            <button
              onClick={handleMakeSmoothie}
              disabled={selectedIngredients.length === 0}
              className="mt-4 w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {t.makeSmoothie}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CanteenMenu;