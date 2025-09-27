import React from 'react';

interface PersonalInfoPageProps {
    setActivePage: (page: string) => void;
}

const PersonalInfoPage: React.FC<PersonalInfoPageProps> = ({ setActivePage }) => {
    
    const InfoRow = ({ label, value }: { label: string, value: string }) => (
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-slate-500">{label}</dt>
            <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{value}</dd>
        </div>
    );
    
    return (
        <div className="p-8 animate-fade-in">
             <div className="mb-6">
                <button onClick={() => setActivePage('Personal Dashboard')} className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </button>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                    <h1 className="text-2xl font-bold text-slate-800">Personal Information</h1>
                    <p className="mt-1 text-sm text-slate-500">Your personal details and profile information.</p>
                </div>
                <div className="px-6">
                    <dl className="divide-y divide-slate-200">
                        <InfoRow label="Full Name" value="Dipra Biswas" />
                        <InfoRow label="Email Address" value="dipra.biswas@example.com" />
                        <InfoRow label="Department" value="Engineering" />
                        <InfoRow label="Role" value="Reporting Manager" />
                        <InfoRow label="Member Since" value="January 15, 2022" />
                    </dl>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default PersonalInfoPage;
