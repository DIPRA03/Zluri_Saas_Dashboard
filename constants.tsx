import React from 'react';
import { Service, User, Department } from './types';

// Generic Icons
export const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-4 w-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Service Icons
const TaskFlowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SalesSparkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const DataPulseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
);

const SupportWaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const DesignCraftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);

export const SupperWaveStudioIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const CodeCanvasIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const ConnectSphereIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const MarketMojoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
);

const FinTrackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h11a2 2 0 012 2v11a2 2 0 01-2 2z" />
    </svg>
);

const SecureVaultIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const InsightifyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
    </svg>
);


export const SERVICES_DATA: Omit<Service, 'requestStatus'>[] = [
  {
    id: 1,
    name: 'TaskFlow Manager',
    author: 'By Inswave Solutions Inc.',
    description: 'Streamline project management and team collaboration with intuitive tasks and real-time updates. This comprehensive tool helps you organize workflows, track progress, and communicate effectively with your team members, ensuring projects are completed on time and within budget.',
    rating: 4.8,
    reviews: 246,
    priceInfo: 'Free Trial available, then $19/month',
    isFeatured: true,
    icon: <TaskFlowIcon />,
    logoBgColor: 'bg-blue-500',
    category: 'Productivity & Collaboration',
    dateAdded: '2023-10-26T10:00:00Z',
    usageFrequency: 0.9,
    tags: ['project management', 'collaboration', 'tasks', 'workflow'],
  },
  {
    id: 2,
    name: 'SaleSpark CRM',
    author: 'By Gkmate Solutions Ltd',
    description: 'Manage customer relationships, track deals and automate outreach to boost your sales pipeline.',
    rating: 4.5,
    reviews: 15,
    priceInfo: '',
    icon: <SalesSparkIcon />,
    logoBgColor: 'bg-orange-500',
    category: 'Marketing Services',
    dateAdded: '2023-09-15T10:00:00Z',
    usageFrequency: 0.5,
    tags: ['crm', 'sales', 'customer relationship', 'outreach'],
  },
  {
    id: 3,
    name: 'DataPulse Analytics',
    author: '',
    description: 'Manage team performance, track deals, and automate intelligence for data-driven decisions.',
    rating: 5,
    reviews: 110,
    priceInfo: 'Purchase: $49/month',
    icon: <DataPulseIcon />,
    logoBgColor: 'bg-purple-500',
    category: 'Deducting & Satic',
    dateAdded: '2023-11-01T10:00:00Z',
    tags: ['analytics', 'data', 'business intelligence', 'reporting'],
  },
  {
    id: 4,
    name: 'SupportWave Helpdesk',
    author: '',
    description: 'Cloud-based customer support and project management tool designed for modern teams.',
    rating: 4,
    reviews: 310,
    priceInfo: 'Free Trial, then $29/month',
    icon: <SupportWaveIcon />,
    logoBgColor: 'bg-sky-500',
    category: 'Productivity & Collaboration',
    dateAdded: '2023-08-20T10:00:00Z',
    usageFrequency: 0.8,
    tags: ['customer support', 'helpdesk', 'tickets', 'project management'],
  },
  {
    id: 5,
    name: 'DesignCraft Studio',
    author: 'By AssistFlow',
    description: 'Cloud-based graphic design UX for creating stunning visuals and collaborating with your team.',
    rating: 4,
    reviews: 450,
    priceInfo: 'Purchase: $99 one-time',
    icon: <DesignCraftIcon />,
    logoBgColor: 'bg-green-500',
    category: 'Productivity & Collaboration',
    dateAdded: '2023-11-05T10:00:00Z',
    tags: ['design', 'graphics', 'ux', 'collaboration', 'visuals'],
  },
  {
    id: 6,
    name: 'SupperWave Studio',
    author: 'By Assitive Flow',
    description: 'Unified customer design platform that brings all your creative tools into one place.',
    rating: 5,
    reviews: 19,
    priceInfo: 'Free Tier available',
    icon: <SupperWaveStudioIcon />,
    logoBgColor: 'bg-teal-500',
    category: 'Productivity & Collaboration',
    dateAdded: '2023-07-11T10:00:00Z',
    tags: ['design', 'creative', 'customer design'],
  },
  {
    id: 7,
    name: 'CodeCanvas IDE',
    author: 'By Deves Omree Co',
    description: 'Online development environment for multiple languages with built-in collaboration features.',
    rating: 4,
    reviews: 318,
    priceInfo: 'Free for personal use',
    icon: <CodeCanvasIcon />,
    logoBgColor: 'bg-slate-800',
    category: 'Development Tools',
    dateAdded: '2023-10-02T10:00:00Z',
    usageFrequency: 0.95,
    tags: ['development', 'ide', 'code', 'programming', 'collaboration'],
  },
  {
    id: 8,
    name: 'ConnectSphere',
    author: 'By Synergy Inc.',
    description: 'A unified communication platform that brings team chat, video meetings, and file sharing together in one place.',
    rating: 4.7,
    reviews: 312,
    priceInfo: 'Free Trial available, then $15/user/month',
    icon: <ConnectSphereIcon />,
    logoBgColor: 'bg-indigo-500',
    category: 'Productivity & Collaboration',
    dateAdded: '2024-02-15T10:00:00Z',
    usageFrequency: 0.7,
    tags: ['communication', 'chat', 'video meetings', 'file sharing'],
  },
  {
    id: 9,
    name: 'MarketMojo',
    author: 'By Growthify',
    description: 'All-in-one marketing automation platform to engage and nurture leads from discovery to conversion.',
    rating: 4.6,
    reviews: 189,
    priceInfo: 'Purchase: $79/month',
    icon: <MarketMojoIcon />,
    logoBgColor: 'bg-rose-500',
    category: 'Marketing Services',
    dateAdded: '2024-01-20T10:00:00Z',
    tags: ['marketing automation', 'leads', 'conversion'],
  },
  {
    id: 10,
    name: 'FinTrack',
    author: 'By Numerix',
    description: 'Manage your business finances, create invoices, track expenses, and prepare for tax season with ease.',
    rating: 4.9,
    reviews: 402,
    priceInfo: 'Free Trial available, then $25/month',
    icon: <FinTrackIcon />,
    logoBgColor: 'bg-emerald-500',
    category: 'Productivity & Collaboration',
    dateAdded: '2023-12-10T10:00:00Z',
    usageFrequency: 0.6,
    tags: ['finance', 'accounting', 'invoicing', 'expense tracking', 'tax'],
  },
  {
    id: 11,
    name: 'SecureVault',
    author: 'By Cypher Corp',
    description: 'Enterprise-grade password manager and secure digital vault for your team\'s sensitive information.',
    rating: 4.8,
    reviews: 255,
    priceInfo: 'Purchase: $5/user/month',
    icon: <SecureVaultIcon />,
    logoBgColor: 'bg-gray-700',
    category: 'Productivity & Collaboration',
    dateAdded: '2024-03-01T10:00:00Z',
    tags: ['security', 'password manager', 'vault'],
  },
  {
    id: 12,
    name: 'Insightify',
    author: 'By DataWeave',
    description: 'A powerful business intelligence tool for visualizing data and creating interactive dashboards.',
    rating: 4.7,
    reviews: 150,
    priceInfo: 'Free Trial available, then $99/month',
    icon: <InsightifyIcon />,
    logoBgColor: 'bg-cyan-500',
    category: 'Deducting & Satic',
    dateAdded: '2024-02-22T10:00:00Z',
    usageFrequency: 0.85,
    tags: ['business intelligence', 'data visualization', 'dashboards', 'analytics'],
  },
];


export const DEPARTMENTS_DATA: Department[] = [
    { name: 'Engineer' },
    { name: 'Cloud' },
    { name: 'Research And development' },
];

export const USERS_DATA: User[] = [
    {
        id: 1,
        name: 'Dipra Biswas',
        avatar: 'https://i.pravatar.cc/40?u=dipra-biswas',
        department: 'Engineer',
        role: 'reporting manager',
        serviceIds: new Set([1, 4, 7, 8, 10, 12]),
    },
    {
        id: 2,
        name: 'Aryan Shah',
        avatar: 'https://i.pravatar.cc/40?u=aryan-shah',
        department: 'Engineer',
        role: 'employee',
        serviceIds: new Set([1, 7, 8]),
    },
    {
        id: 3,
        name: 'Aditya Sharma',
        avatar: 'https://i.pravatar.cc/40?u=aditya-sharma',
        department: 'Cloud',
        role: 'employee',
        serviceIds: new Set([2, 9, 8, 11]),
    },
    {
        id: 4,
        name: 'Khush Patel',
        avatar: 'https://i.pravatar.cc/40?u=khush-patel',
        department: 'Research And development',
        role: 'employee',
        serviceIds: new Set([3, 12]),
    },
    {
        id: 5,
        name: 'Aryan kumar',
        avatar: 'https://i.pravatar.cc/40?u=aryan-kumar',
        department: 'Engineer',
        role: 'employee',
        serviceIds: new Set([1, 7]),
    },
    {
        id: 6,
        name: 'Smit ghatole',
        avatar: 'https://i.pravatar.cc/40?u=smit-ghatole',
        department: 'Cloud',
        role: 'employee',
        serviceIds: new Set([8, 11]),
    }
];