import React, { useState, useRef, useEffect } from 'react';
import type { Notification, User } from '../types';

const ZluriLogo = () => (
    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    </div>
);

interface HeaderProps {
    setActivePage: (page: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    notifications: Notification[];
    unreadCount: number;
    onMarkAsRead: (id: number) => void;
    onMarkAllAsRead: () => void;
    currentUser: User;
}

const formatDistanceToNow = (isoDate: string) => {
    const date = new Date(isoDate);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return "Just now";
};

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
    const baseClasses = "h-6 w-6 text-white";
    const icons = {
        request_approved: <svg xmlns="http://www.w3.org/2000/svg" className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
        request_denied: <svg xmlns="http://www.w3.org/2000/svg" className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
        info: <svg xmlns="http://www.w3.org/2000/svg" className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    };
    const colors = {
        request_approved: "bg-green-500",
        request_denied: "bg-red-500",
        info: "bg-blue-500",
    }
    return <div className={`flex items-center justify-center h-10 w-10 rounded-full ${colors[type]}`}>{icons[type]}</div>;
}

const Header: React.FC<HeaderProps> = ({ 
    setActivePage, 
    searchQuery, 
    onSearchChange,
    notifications,
    unreadCount,
    onMarkAsRead,
    onMarkAllAsRead,
    currentUser
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(localSearchQuery);
        }, 300); // 300ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [localSearchQuery, onSearchChange]);

    useEffect(() => {
        setLocalSearchQuery(searchQuery);
    }, [searchQuery]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
             if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleNavigation = (page: string) => {
        setActivePage(page);
        setIsDropdownOpen(false);
    }

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
      {/* Left section: Logo */}
      <div className="flex items-center">
        <ZluriLogo />
        <span className="text-2xl font-bold text-slate-800">Zluri</span>
      </div>

      {/* Middle section: Search bar */}
      <div className="flex-1 max-w-lg mx-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search services..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border border-slate-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
           <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <kbd className="inline-flex items-center border border-slate-300 rounded px-2 text-sm font-sans font-medium text-slate-500">
                ⌘ K
            </kbd>
        </div>
        </div>
      </div>

      {/* Right section: User profile */}
      <div className="flex items-center space-x-2">
        <div className="relative" ref={notificationsRef}>
            <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                </svg>
                 {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 block h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold ring-2 ring-white flex items-center justify-center">{unreadCount}</span>
                )}
            </button>
            {isNotificationsOpen && (
                 <div className="absolute top-full right-0 mt-2 w-80 max-w-sm bg-white border border-slate-200 rounded-lg shadow-xl z-20 animate-fade-in-down">
                    <div className="p-3 flex justify-between items-center border-b border-slate-200">
                        <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                        {unreadCount > 0 && <button onClick={onMarkAllAsRead} className="text-xs font-semibold text-blue-600 hover:text-blue-800">Mark all as read</button>}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map(n => (
                                <div 
                                    key={n.id} 
                                    onClick={() => onMarkAsRead(n.id)}
                                    className={`flex items-start p-3 gap-3 border-b border-slate-100 last:border-b-0 cursor-pointer ${n.isRead ? 'opacity-70' : 'bg-blue-50/50'}`}
                                >
                                    <NotificationIcon type={n.type} />
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-700">{n.text}</p>
                                        <p className="text-xs text-slate-500 mt-1">{formatDistanceToNow(n.timestamp)}</p>
                                    </div>
                                    {!n.isRead && <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>}
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                <p className="text-sm font-semibold text-slate-600 mt-2">No notifications yet</p>
                                <p className="text-xs text-slate-500 mt-1">We'll let you know when something new comes up.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 p-1 rounded-md hover:bg-slate-100 focus:outline-none">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-9 w-9 rounded-full"
              />
              <div>
                <div className="font-semibold text-sm text-slate-700">{currentUser.name}</div>
              </div>
                <svg
                  className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
            </button>
            {isDropdownOpen && (
                 <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-20 animate-fade-in-down py-1">
                    <button onClick={() => handleNavigation('Personal Info')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">Personal Info</button>
                    <button onClick={() => handleNavigation('Available Services')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">Available Services</button>
                    <div className="my-1 h-px bg-slate-200"></div>
                    <button onClick={() => alert('Sign out clicked!')} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors">Sign Out</button>
                </div>
            )}
        </div>
      </div>
       <style>{`
            @keyframes fade-in-down {
                0% {
                    opacity: 0;
                    transform: translateY(-10px) scale(0.95);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            .animate-fade-in-down {
                animation: fade-in-down 0.15s ease-out forwards;
            }
        `}</style>
    </header>
  );
};

export default Header;