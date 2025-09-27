import React from 'react';
import { UserRole } from '../types';

const NavItem = ({ icon, label, active = false, onClick }: { icon: JSX.Element; label: string; active?: boolean; onClick: () => void; }) => (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 ${
        active 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-slate-600 hover:bg-slate-100'
    }`}>
        <span className="mr-3">{icon}</span>
        {label}
    </button>
);

interface SidebarProps {
    activePage: string;
    setActivePage: (page: string) => void;
    pendingRequestCount: number;
    currentUserRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, pendingRequestCount, currentUserRole }) => {
    
    const mainNavLinks = [
        { icon: <IconLayoutDashboard />, label: "Personal Dashboard" },
        { icon: <IconCategory />, label: "Browse All Categories" },
        { icon: <IconHeart />, label: "My Liked Services" },
    ];
    
    const categoryLinks = [
        { icon: <IconTools />, label: "Development Tools" },
        { icon: <IconBriefcase />, label: "Marketing Services" },
        { icon: <IconPuzzle />, label: "Deducting & Satic" },
        { icon: <IconUsers />, label: "Productivity & Collaboration" },
    ];
    
    const otherLinks = [
        { icon: <IconShield />, label: "MSP" },
        { icon: <IconHeadset />, label: "Customer Support" },
    ];

    const managementLinks = [
        { icon: <IconChecklist />, label: "My Requests" },
    ];

    const renderNavLinks = (links: {icon: JSX.Element, label: string}[]) => {
        return links.map(link => (
            <NavItem 
                key={link.label} 
                icon={link.icon}
                label={link.label}
                active={activePage === link.label}
                onClick={() => setActivePage(link.label)}
            />
        ));
    }
    
    return (
        <aside className="w-64 bg-white border-r border-slate-200 p-4 flex-shrink-0 overflow-y-auto">
            <nav className="space-y-1">
                {renderNavLinks(mainNavLinks)}
                
                <div className="pt-4 pb-1 px-4">
                    <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Management</h3>
                </div>
                 {currentUserRole === 'reporting manager' && (
                    <NavItem 
                        icon={<IconShieldLock />}
                        label="Manage Permissions"
                        active={activePage === 'Manage Permissions'}
                        onClick={() => setActivePage('Manage Permissions')}
                    />
                 )}
                 <button
                    onClick={() => setActivePage("Pending Requests")}
                    className={`w-full text-left flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 ${
                        activePage === 'Pending Requests' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}>
                    <div className="flex items-center">
                        <span className="mr-3"><IconClock /></span>
                        Pending Requests
                    </div>
                    {pendingRequestCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">{pendingRequestCount}</span>
                    )}
                </button>
                {renderNavLinks(managementLinks)}


                <div className="pt-4 pb-1 px-4">
                    <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Categories</h3>
                </div>
                {renderNavLinks(categoryLinks)}
                
                <div className="pt-4 pb-1 px-4">
                     <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Services & Support</h3>
                </div>
                {renderNavLinks(otherLinks)}
            </nav>
        </aside>
    );
};


// Icons
const IconLayoutDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const IconTools = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const IconBriefcase = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconHeart = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const IconPuzzle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125" /></svg>;
const IconHeadset = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 18.75v-1.5a2.25 2.25 0 114.5 0v1.5m0 0v.75m0-1.5H3" /></svg>;
const IconCategory = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.016h-.008v-.016z" /></svg>;
const IconClock = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconChecklist = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const IconShieldLock = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm-3 13.036a11.959 11.959 0 013.598-2.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;

export default Sidebar;