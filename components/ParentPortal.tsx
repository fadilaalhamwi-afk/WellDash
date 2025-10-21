
import React, { useState } from 'react';
import Card from './Card';
import { type Language } from '../types';
import { translations } from '../localization';
import { getHealthAdvice } from '../services/geminiService';

interface ParentPortalProps {
  language: Language;
}

const ParentPortal: React.FC<ParentPortalProps> = ({ language }) => {
  const t = translations[language];
  const [prompt, setPrompt] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAdvice = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setAdvice('');
    try {
      const result = await getHealthAdvice(prompt);
      setAdvice(result);
    } catch (error) {
      setAdvice(t.askHealthQuestion);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-yellow-900">{t.parentTitle}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title={t.healthPromotion} icon="👨‍👩‍👧‍👦">
          <ul className="space-y-3 list-disc list-inside text-lg text-yellow-800">
            <li>{t.healthTip1}</li>
            <li>{t.healthTip2}</li>
            <li>{t.healthTip3}</li>
          </ul>
        </Card>
        <Card title={t.challengeInsights} icon="💡">
          <p className="text-lg text-yellow-800">{t.challengeInsightText}</p>
        </Card>
        <div className="lg:col-span-2">
          <Card title={t.healthAdvisor} icon="🤖">
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.askHealthQuestion}
                className="w-full p-3 border-2 border-yellow-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition"
                rows={3}
              />
              <button
                onClick={handleGetAdvice}
                disabled={isLoading}
                className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition disabled:bg-yellow-300 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Thinking...' : t.getAdvice}
              </button>
              {advice && (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="whitespace-pre-wrap text-yellow-900">{advice}</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ParentPortal;
