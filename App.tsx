import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import ParentPortal from './components/ParentPortal';
import CanteenMenu from './components/CanteenMenu';
import { translations } from './localization';
import { type Language, type Page, type ActivityLog } from './types';

const Header: React.FC<{
    language: Language,
    setLanguage: (lang: Language) => void,
    setPage: (page: Page) => void,
    currentPage: Page,
    onPrint: () => void,
    onShare: () => void
}> = ({ language, setLanguage, setPage, currentPage, onPrint, onShare }) => {
    const t = translations[language];
    const NavButton: React.FC<{ page: Page, children: React.ReactNode }> = ({ page, children }) => (
        <button
            onClick={() => setPage(page)}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${currentPage === page ? 'bg-yellow-500 text-white' : 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300'}`}
        >
            {children}
        </button>
    );

    return (
        <header className="bg-yellow-400 p-4 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
            <h1 className="text-3xl font-bold text-white">{t.appName} 🌟</h1>
            <nav className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
                <NavButton page="dashboard">{t.navDashboard}</NavButton>
                <NavButton page="canteen">{t.navCanteen}</NavButton>
                <NavButton page="admin">{t.navAdmin}</NavButton>
                <NavButton page="parent">{t.navParent}</NavButton>
            </nav>
            <div className="flex items-center gap-4">
                <button onClick={onPrint} className="p-2 bg-white rounded-full text-yellow-600 hover:bg-gray-100 transition">🖨️</button>
                <button onClick={onShare} className="p-2 bg-white rounded-full text-yellow-600 hover:bg-gray-100 transition">📤</button>
                <button
                    onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                    className="px-4 py-2 bg-white text-yellow-800 font-bold rounded-md"
                >
                    {language === 'en' ? 'العربية' : 'English'}
                </button>
            </div>
        </header>
    );
};

const Footer: React.FC<{ language: Language }> = ({ language }) => {
    const t = translations[language];
    return (
        <footer className="text-center p-4 bg-yellow-200 text-yellow-800 font-semibold print:hidden">
            {t.createdBy}
        </footer>
    );
};


function App() {
    const [language, setLanguage] = useState<Language>('en');
    const [page, setPage] = useState<Page>('dashboard');
    const [activityLog, setActivityLog] = useState<ActivityLog | null>(null);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const handleLogSubmit = (log: ActivityLog) => {
        // In a real app, you'd likely fetch and update data based on student ID
        setActivityLog(log);
    };

    const handlePrint = () => window.print();
    const handleShare = () => alert(translations[language].sharedMessage);
    
    const renderPage = () => {
        switch (page) {
            case 'admin':
                return <AdminPanel language={language} onLogSubmit={handleLogSubmit} />;
            case 'parent':
                return <ParentPortal language={language} />;
            case 'canteen':
                return <CanteenMenu language={language} />;
            case 'dashboard':
            default:
                return <Dashboard language={language} activityLog={activityLog} />;
        }
    };

    return (
        <div className="min-h-screen bg-yellow-50 text-gray-800">
            <Header
                language={language}
                setLanguage={setLanguage}
                setPage={setPage}
                currentPage={page}
                onPrint={handlePrint}
                onShare={handleShare}
            />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer language={language} />
        </div>
    );
}

export default App;