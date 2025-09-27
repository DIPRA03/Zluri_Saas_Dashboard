import React, { useState, useRef, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import type { Service, Filters, SortOption, ServiceRequest, User, Department } from '../types';
import MSPPage from './MSPPage';
import RequestManagementPage from './RequestManagementPage';
import ManagePermissionsPage from './ManagePermissionsPage';

// --- Filter Components & Icons (Moved from Sidebar) ---
const FilterCheckbox = ({ label, id, checked, onChange }: { label: string, id: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <label htmlFor={id} className="flex items-center cursor-pointer group">
        <div className="relative flex items-center justify-center">
            <input id={id} type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
            <div className="w-5 h-5 border-2 rounded-md bg-white border-slate-300 transition-all duration-200 group-hover:border-blue-500 peer-checked:bg-blue-600 peer-checked:border-blue-600"></div>
            <svg className="absolute w-3 h-3 text-white transition-opacity duration-200 opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{label}</span>
    </label>
);

const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconTrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconBuilding = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const IconFilter = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;
const IconSort = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>;
const IconChevronDown = () => <svg className="ml-2 h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;


// --- Customer Support Component ---
const CustomerSupport: React.FC = () => {
    const [form, setForm] = React.useState({ name: '', email: '', subject: '', description: '' });
    const [submitted, setSubmitted] = React.useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setForm(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // In a real app, you would send this data to a server.
        console.log('Form submitted:', form);
        setForm({ name: '', email: '', subject: '', description: '' });
    };

    return (
        <div className="p-8">
            <div className="mb-6">
                <p className="text-sm text-slate-500">Home &gt; Customer Support</p>
                <h1 className="text-3xl font-bold text-slate-800 mt-1">Customer Support</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-8">
                    <div className="bg-white p-6 rounded-lg border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Contact Information</h2>
                        <div className="space-y-3 text-sm text-slate-600">
                            <div className="flex items-center"><IconMail className="h-5 w-5 text-slate-500 mr-3"/>support@zluri.com</div>
                            <div className="flex items-center"><IconPhone className="h-5 w-5 text-slate-500 mr-3"/>+1 (555) 123-4567</div>
                            <div className="flex items-center"><IconLocation className="h-5 w-5 text-slate-500 mr-3"/>123 Zluri Lane, Tech City</div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2 bg-white p-8 rounded-lg border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-1">Submit a Support Ticket</h2>
                    <p className="text-slate-500 mb-6">We're here to help! Fill out the form below.</p>
                    {submitted ? (
                        <div className="text-center py-12 flex flex-col items-center justify-center h-full">
                             <IconCheckCircle className="h-12 w-12 text-green-500" />
                             <h3 className="mt-4 text-xl font-semibold text-slate-800">Thank you!</h3>
                             <p className="mt-2 text-slate-600">Your ticket has been submitted. We'll reply within 24 hours.</p>
                             <button onClick={() => setSubmitted(false)} className="mt-6 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Submit another ticket</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                    <input type="text" id="name" value={form.name} onChange={handleInputChange} required placeholder="John Doe" className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-200 ease-in-out" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                    <input type="email" id="email" value={form.email} onChange={handleInputChange} required placeholder="you@example.com" className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                                <input type="text" id="subject" value={form.subject} onChange={handleInputChange} required placeholder="e.g. Billing question" className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-200 ease-in-out" />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">How can we help?</label>
                                <textarea id="description" rows={5} value={form.description} onChange={handleInputChange} required placeholder="Please describe your issue in detail..." className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-200 ease-in-out"></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="inline-flex items-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                  Send Ticket
                                  <IconSend className="ml-2 h-5 w-5" />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
const IconSend = (props: {className: string}) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>;
const IconMail = (props: {className: string}) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconPhone = (props: {className: string}) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const IconLocation = (props: {className: string}) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconCheckCircle = (props: {className:string}) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconInfoCircle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

// --- Main Content Component ---
interface MainContentProps {
    activePage: string;
    services: Service[];
    allServices: Service[];
    likedServices: Set<number>;
    toggleLike: (serviceId: number) => void;
    sortOrder: SortOption;
    onSortChange: (value: SortOption) => void;
    onViewDetails: (service: Service) => void;
    filters: Filters;
    onFilterChange: (filterName: keyof Omit<Filters, 'publishers'>) => void;
    onPublisherChange: (publisher: string) => void;
    onClearFilters: () => void;
    allPublishers: string[];
    onRequestAccess: (service: Service) => void;
    requests: ServiceRequest[];
    onApproveRequest: (requestId: number) => void;
    onDenyRequest: (requestId: number) => void;
    currentUser: User;
    users: User[];
    departments: Department[];
    onAddServiceToUser: (userId: number, serviceId: number) => void;
    onAddServiceToDepartment: (departmentName: string, serviceId: number) => void;
    onRevokeServiceFromUser: (userId: number, serviceId: number) => void;
    onRevokeServiceFromDepartment: (departmentName: string, serviceId: number) => void;
}

const MainContent: React.FC<MainContentProps> = ({ 
    activePage, 
    services, 
    allServices,
    likedServices, 
    toggleLike, 
    sortOrder, 
    onSortChange, 
    onViewDetails,
    filters,
    onFilterChange,
    onPublisherChange,
    onClearFilters,
    allPublishers,
    onRequestAccess,
    requests,
    onApproveRequest,
    onDenyRequest,
    currentUser,
    users,
    departments,
    onAddServiceToUser,
    onAddServiceToDepartment,
    onRevokeServiceFromUser,
    onRevokeServiceFromDepartment
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filterRef, sortRef]);

    if (activePage === 'Customer Support') {
        return <CustomerSupport />;
    }

    if (activePage === 'MSP') {
        return <MSPPage />;
    }
    
    if (activePage === 'Manage Permissions') {
        if (currentUser.role !== 'reporting manager') return null;
        return <ManagePermissionsPage 
            allServices={allServices}
            users={users}
            departments={departments}
            onAddServiceToUser={onAddServiceToUser}
            onAddServiceToDepartment={onAddServiceToDepartment}
            onRevokeServiceFromUser={onRevokeServiceFromUser}
            onRevokeServiceFromDepartment={onRevokeServiceFromDepartment}
        />
    }

    if (activePage === 'Pending Requests' || activePage === 'My Requests') {
        return <RequestManagementPage
            activePage={activePage}
            requests={requests}
            onApproveRequest={onApproveRequest}
            onDenyRequest={onDenyRequest}
            currentUser={currentUser}
        />;
    }

    if (activePage === 'Personal Dashboard') {
        const mostlyUsedServices = [...services].sort((a, b) => (b.usageFrequency ?? 0) - (a.usageFrequency ?? 0)).slice(0, 4);
        const mostPopularServices = [...services].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

        const renderServiceGrid = (serviceList: Service[]) => (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {serviceList.map(service => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        hasAccess={currentUser.serviceIds.has(service.id)}
                        isLiked={likedServices.has(service.id)}
                        onLikeToggle={toggleLike}
                        onViewDetails={onViewDetails}
                        onRequestAccess={onRequestAccess}
                    />
                ))}
            </div>
        );

        return (
            <div className="px-6 pt-4 pb-6">
                 <h1 className="text-3xl font-bold text-slate-800 mb-8">Welcome Back, {currentUser.name.split(' ')[0]}!</h1>

                 <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-slate-700 mb-4">Mostly Used</h2>
                    {renderServiceGrid(mostlyUsedServices)}
                 </section>

                 <section>
                    <h2 className="text-2xl font-semibold text-slate-700 mb-4">Popular Services</h2>
                    {renderServiceGrid(mostPopularServices)}
                 </section>
            </div>
        );
    }
    
    const title = activePage;

    const activeFilterCount = 
        (filters.freeTrial ? 1 : 0) +
        (filters.trending ? 1 : 0) +
        (filters.newArrivals ? 1 : 0) +
        filters.publishers.size;

    const sortOptions: SortOption[] = ['Most Popular', 'Newest', 'Highest Rated'];

    return (
        <div className="px-6 pt-4 pb-6">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <p className="text-sm text-slate-500">Home &gt; {activePage}</p>
                    <h1 className="text-3xl font-bold text-slate-800 mt-1">{title}</h1>
                </div>
                
                <div className="flex items-center space-x-4">
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center bg-white border border-slate-300 rounded-md py-2 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <IconFilter />
                            <span className="ml-2">Filters</span>
                            {activeFilterCount > 0 && (
                                <span className="ml-2 bg-blue-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">{activeFilterCount}</span>
                            )}
                        </button>
                        {isFilterOpen && (
                            <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-xl z-20">
                                <div className="p-4 flex justify-between items-center border-b border-slate-200">
                                    <h3 className="text-sm font-semibold text-slate-800">Filter By</h3>
                                    <button onClick={() => { onClearFilters(); }} className="text-xs font-semibold text-blue-600 hover:text-blue-800">Clear All</button>
                                </div>
                                <div className="p-4 space-y-5">
                                    <div>
                                        <h4 className="flex items-center font-medium text-sm text-slate-800 mb-3">
                                            <span className="text-slate-500 mr-2"><IconCalendar /></span>
                                            Availability
                                        </h4>
                                        <FilterCheckbox id="freeTrial" label="Free Trial" checked={filters.freeTrial} onChange={() => onFilterChange('freeTrial')} />
                                    </div>
                                    <div>
                                        <h4 className="flex items-center font-medium text-sm text-slate-800 mb-3">
                                            <span className="text-slate-500 mr-2"><IconTrendingUp /></span>
                                            Status
                                        </h4>
                                        <div className="space-y-3">
                                            <FilterCheckbox id="trending" label="Trending" checked={filters.trending} onChange={() => onFilterChange('trending')} />
                                            <FilterCheckbox id="newArrivals" label="New Arrivals" checked={filters.newArrivals} onChange={() => onFilterChange('newArrivals')} />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="flex items-center font-medium text-sm text-slate-800 mb-3">
                                            <span className="text-slate-500 mr-2"><IconBuilding /></span>
                                            Publisher
                                        </h4>
                                        <div className="space-y-3 max-h-32 overflow-y-auto pr-2">
                                            {allPublishers.map(pub => (
                                                <FilterCheckbox key={pub} id={pub} label={pub} checked={filters.publishers.has(pub)} onChange={() => onPublisherChange(pub)} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative" ref={sortRef}>
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center bg-white border border-slate-300 rounded-md py-2 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <IconSort />
                            <span className="ml-2 hidden sm:inline">Sort By:</span>
                            <span className="ml-1 font-semibold">{sortOrder}</span>
                            <IconChevronDown />
                        </button>
                        {isSortOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-20">
                                <div className="p-2">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            onSortChange(option);
                                            setIsSortOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${sortOrder === option ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-100'}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {services.map(service => (
                        <div key={service.id}>
                            <ServiceCard 
                                service={service} 
                                hasAccess={currentUser.serviceIds.has(service.id)}
                                isLiked={likedServices.has(service.id)} 
                                onLikeToggle={toggleLike}
                                onViewDetails={onViewDetails}
                                onRequestAccess={onRequestAccess}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg border border-slate-200 mt-6">
                    <IconInfoCircle />
                    <h2 className="text-xl font-semibold text-slate-700 mt-4">Nothing to see here!</h2>
                    <p className="text-slate-500 mt-2 max-w-md mx-auto">
                        {activePage === 'My Liked Services' 
                            ? "You haven't liked any services yet. Click the heart icon on a service to save it to this list."
                            : "There are currently no services available for your selected filters. Try clearing some filters to see more results."
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default MainContent;
