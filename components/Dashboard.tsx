import React from 'react';
import Card from './Card';
import { SCHOOLS, CHALLENGES } from '../constants';
import { type ActivityLog, type Language } from '../types';
import { translations } from '../localization';

interface DashboardProps {
  activityLog: ActivityLog | null;
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ activityLog, language }) => {
  const t = translations[language];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-yellow-900">{t.dashboardTitle}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Student Health Tracker */}
        <Card title={t.healthyChoices} icon="🍎" className="lg:col-span-1">
          <p className="text-6xl font-bold text-center text-yellow-600">{activityLog?.healthyChoices ?? 0}</p>
        </Card>

        {/* Activity Tracker */}
        <Card title={t.activityTracker} icon="🏃‍♂️" className="lg:col-span-2">
          {activityLog ? (
            <div className="space-y-4 text-lg">
              <div className="flex justify-between items-center bg-yellow-100 p-3 rounded-lg">
                <span className="font-semibold">{t.grade}:</span>
                <span className="font-bold text-yellow-800">{activityLog.grade}</span>
              </div>
               <div className="flex justify-between items-center bg-yellow-100 p-3 rounded-lg">
                <span className="font-semibold">{t.numberOfStudents}:</span>
                <span className="font-bold text-yellow-800">{activityLog.studentsAttended}</span>
              </div>
              <div className="flex justify-between items-center bg-yellow-100 p-3 rounded-lg">
                <span className="font-semibold">{t.attendedActivity}:</span>
                <span className={`px-3 py-1 rounded-full text-white font-bold ${activityLog.activityClass.attended ? 'bg-green-500' : 'bg-red-500'}`}>
                  {activityLog.activityClass.attended ? t.yes : t.no}
                </span>
              </div>
              {activityLog.activityClass.attended && (
                 <div className="flex justify-between items-center bg-yellow-100 p-3 rounded-lg">
                    <span className="font-semibold">{t.intensity}:</span>
                    <span className="capitalize font-bold text-yellow-800">{activityLog.activityClass.intensity ? t[activityLog.activityClass.intensity] : 'N/A'}</span>
                 </div>
              )}
              <div className="flex justify-between items-center bg-yellow-100 p-3 rounded-lg">
                <span className="font-semibold">{t.activeBreak}:</span>
                 <span className={`px-3 py-1 rounded-full text-white font-bold ${activityLog.academicBreak ? 'bg-green-500' : 'bg-red-500'}`}>
                   {activityLog.academicBreak ? t.yes : t.no}
                </span>
              </div>
               <div className="flex justify-between items-center bg-yellow-100 p-3 rounded-lg">
                <span className="font-semibold">{t.teacher}:</span>
                <span className="font-bold text-yellow-800">{activityLog.teacher}</span>
              </div>
            </div>
          ) : (
             <p className="text-center text-gray-500">No activity logged for today.</p>
          )}
        </Card>

        {/* Leaderboard */}
        <Card title={t.leaderboardTitle} icon="🏆" className="lg:col-span-2">
          <ul className="space-y-3">
            {SCHOOLS.sort((a, b) => b.points - a.points).map((school, index) => (
              <li key={school.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xl font-bold mr-4 rtl:ml-4 rtl:mr-0">{index + 1}</span>
                  <span className="text-2xl mr-4 rtl:ml-4 rtl:mr-0">{school.logo}</span>
                  <span className="font-semibold text-yellow-900">{school.name[language]}</span>
                </div>
                <span className="font-bold text-lg text-yellow-700">{school.points.toLocaleString()} pts</span>
              </li>
            ))}
          </ul>
        </Card>
        
        {/* Challenges */}
        <Card title={t.challengesTitle} icon="🎯" className="lg:col-span-1">
          <div className="space-y-4">
            {CHALLENGES.map(challenge => (
              <div key={challenge.id} className="p-4 bg-yellow-100 rounded-lg">
                <h3 className="font-bold text-yellow-800 flex items-center">
                  <span className="text-2xl mr-2 rtl:ml-2 rtl:mr-0">{challenge.icon}</span> {challenge.title[language]}
                </h3>
                <p className="text-sm text-yellow-700 mt-1">{challenge.description[language]}</p>
                <p className="text-right font-bold text-green-600 mt-2">+{challenge.points} pts</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
