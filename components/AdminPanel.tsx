import React, { useState } from 'react';
import Card from './Card';
import { type Language, type ActivityLog } from '../types';
import { translations } from '../localization';

interface AdminPanelProps {
  language: Language;
  onLogSubmit: (log: ActivityLog) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ language, onLogSubmit }) => {
  const t = translations[language];
  const [grade, setGrade] = useState('');
  const [studentsAttended, setStudentsAttended] = useState('');
  const [classType, setClassType] = useState<'academic' | 'activity' | null>(null);
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high' | null>(null);
  const [hadBreak, setHadBreak] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [healthyChoices, setHealthyChoices] = useState(0);

  const grades = Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grade || !studentsAttended || !teacherName || !classType) {
      alert("Please fill all required fields.");
      return;
    }
    const newLog: ActivityLog = {
      id: Date.now(),
      grade: grade,
      studentsAttended: parseInt(studentsAttended, 10),
      date: new Date().toISOString().split('T')[0],
      healthyChoices: healthyChoices,
      activityClass: {
        attended: classType === 'activity',
        intensity: classType === 'activity' ? intensity : null,
      },
      academicBreak: classType === 'academic' ? hadBreak : false,
      teacher: teacherName,
    };
    onLogSubmit(newLog);
    // Reset form
    setGrade('');
    setStudentsAttended('');
    setClassType(null);
    setIntensity(null);
    setHadBreak(false);
    setTeacherName('');
    setHealthyChoices(0);
    alert("Activity logged successfully!");
  };

  return (
    <div className="p-8 flex justify-center items-center">
      <Card title={t.adminTitle} icon="✏️" className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="grade" className="block text-lg font-semibold text-yellow-800">{t.grade}</label>
            <select id="grade" value={grade} onChange={e => setGrade(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white border border-yellow-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" required>
              <option value="" disabled>{t.selectGrade}</option>
              {grades.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          
          <div>
            <label htmlFor="studentsAttended" className="block text-lg font-semibold text-yellow-800">{t.numberOfStudents}</label>
            <input type="number" id="studentsAttended" value={studentsAttended} onChange={e => setStudentsAttended(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white border border-yellow-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              placeholder={t.enterNumberOfStudents} required min="0" />
          </div>

          <div>
            <label htmlFor="healthyChoices" className="block text-lg font-semibold text-yellow-800">{t.healthyChoices}</label>
            <input type="number" id="healthyChoices" value={healthyChoices} onChange={e => setHealthyChoices(Number(e.target.value))}
              className="mt-1 block w-full px-4 py-2 bg-white border border-yellow-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="0" required min="0"/>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-yellow-800">{t.classType}</label>
            <div className="flex gap-4">
              <button type="button" onClick={() => { setClassType('academic'); setIntensity(null); }} className={`px-4 py-2 rounded-md w-full ${classType === 'academic' ? 'bg-yellow-500 text-white' : 'bg-yellow-100'}`}>{t.academic}</button>
              <button type="button" onClick={() => { setClassType('activity'); setHadBreak(false); }} className={`px-4 py-2 rounded-md w-full ${classType === 'activity' ? 'bg-yellow-500 text-white' : 'bg-yellow-100'}`}>{t.activity}</button>
            </div>
          </div>

          {classType === 'activity' && (
            <div>
              <label htmlFor="intensity" className="block text-lg font-semibold text-yellow-800">{t.intensity}</label>
              <select id="intensity" value={intensity || ''} onChange={e => setIntensity(e.target.value as 'low' | 'medium' | 'high')}
                className="mt-1 block w-full px-4 py-2 bg-white border border-yellow-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" required>
                <option value="" disabled>{t.selectIntensity}</option>
                <option value="low">{t.low}</option>
                <option value="medium">{t.medium}</option>
                <option value="high">{t.high}</option>
              </select>
            </div>
          )}

          {classType === 'academic' && (
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-yellow-800">{t.activeBreakQuestion}</label>
              <div className="flex gap-4">
                <button type="button" onClick={() => setHadBreak(true)} className={`px-4 py-2 rounded-md w-full ${hadBreak ? 'bg-yellow-500 text-white' : 'bg-yellow-100'}`}>{t.yes}</button>
                <button type="button" onClick={() => setHadBreak(false)} className={`px-4 py-2 rounded-md w-full ${!hadBreak ? 'bg-yellow-500 text-white' : 'bg-yellow-100'}`}>{t.no}</button>
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="teacherName" className="block text-lg font-semibold text-yellow-800">{t.teacherName}</label>
            <input type="text" id="teacherName" value={teacherName} onChange={e => setTeacherName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white border border-yellow-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              placeholder={t.enterTeacherName} required />
          </div>

          <button type="submit" className="w-full bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors">{t.submit}</button>
        </form>
      </Card>
    </div>
  );
};

export default AdminPanel;