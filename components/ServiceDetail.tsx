import React from 'react';
import type { Service, User } from '../types';
import { StarIcon } from '../constants';

interface ServiceDetailProps {
    service: Service;
    currentUser: User;
    onBack: () => void;
    onRequestAccess: (service: Service) => void;
}

const StarRating = ({ rating, reviews }: { rating: number; reviews: number; }) => {
    const fullStars = Math.floor(rating);
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} filled={true} />)}
            {[...Array(5 - fullStars)].map((_, i) => <StarIcon key={`empty-${i}`} filled={false} />)}
            <span className="ml-3 text-sm text-slate-500">{`${rating.toFixed(1)} (${reviews} Reviews)`}</span>
        </div>
    );
};

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, currentUser, onBack, onRequestAccess }) => {
    const hasAccess = currentUser.serviceIds.has(service.id);
    
    return (
        <div className="p-8 animate-fade-in">
            <div className="mb-6">
                <button onClick={onBack} className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Services
                </button>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 pb-6 border-b border-slate-200">
                    <div className={`flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-xl ${service.logoBgColor} mr-6 mb-4 sm:mb-0`}>
                         {React.cloneElement(service.icon, {className: 'h-10 w-10 text-white'})}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-slate-800">{service.name}</h1>
                        <p className="text-md text-slate-500 mt-1">{service.author}</p>
                    </div>
                    <div className="flex-shrink-0 mt-4 sm:mt-0">
                         <StarRating rating={service.rating} reviews={service.reviews} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Description</h2>
                        <p className="text-slate-600 leading-relaxed">{service.description}</p>

                        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Key Features (Dummy)</h2>
                        <ul className="list-disc list-inside text-slate-600 space-y-2">
                            <li>Real-time collaboration and task tracking.</li>
                            <li>Customizable workflows and project templates.</li>
                            <li>Integration with popular third-party apps.</li>
                            <li>Advanced reporting and analytics dashboard.</li>
                        </ul>
                    </div>
                    <div className="lg:col-span-1">
                         <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                            {hasAccess ? (
                                <>
                                    <h3 className="text-lg font-bold text-slate-800 mb-4">Status</h3>
                                    <p className="text-2xl font-bold text-green-600 mb-2">Purchased</p>
                                    <p className="text-sm text-slate-500 mb-4">This service is included in your plan.</p>
                                    <button className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                        Launch App
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-lg font-bold text-slate-800 mb-4">Pricing</h3>
                                    <p className="text-2xl font-bold text-slate-800 mb-2">
                                        {(() => {
                                            const pricePart = service.priceInfo.split(',').find(s => s.includes('$'))?.trim();
                                            if (pricePart) return pricePart.replace('Purchase: ', '');
                                            if (service.priceInfo.toLowerCase().includes('free')) return 'Free Tier';
                                            return 'Contact Sales';
                                        })()}
                                    </p>
                                    <p className="text-sm text-slate-500 mb-4">{service.priceInfo || 'Contact for pricing'}</p>
                                    
                                     {service.requestStatus === 'pending' ? (
                                        <button
                                            disabled
                                            className="w-full bg-slate-200 text-slate-500 font-semibold py-3 px-6 rounded-lg cursor-not-allowed"
                                        >
                                            Request Pending
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => onRequestAccess(service)}
                                            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            Request Access
                                        </button>
                                    )}
                                </>
                            )}
                         </div>
                    </div>
                </div>
                 
                 {/* Reviews Section */}
                <div className="mt-10 pt-6 border-t border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">User Reviews (Dummy)</h2>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <img src="https://i.pravatar.cc/40?u=user1" alt="user avatar" className="h-10 w-10 rounded-full mr-4"/>
                            <div>
                                <h4 className="font-semibold text-slate-800">Sarah Johnson</h4>
                                <div className="my-1"><StarRating rating={5} reviews={0} /></div>
                                <p className="text-sm text-slate-600">"This tool has transformed how our team manages projects. Highly recommended!"</p>
                            </div>
                        </div>
                         <div className="flex items-start">
                            <img src="https://i.pravatar.cc/40?u=user2" alt="user avatar" className="h-10 w-10 rounded-full mr-4"/>
                            <div>
                                <h4 className="font-semibold text-slate-800">Mark Chen</h4>
                                 <div className="my-1"><StarRating rating={4} reviews={0} /></div>
                                <p className="text-sm text-slate-600">"Great features and easy to use. The integrations could be a bit better, but overall it's a solid product."</p>
                            </div>
                        </div>
                    </div>
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

export default ServiceDetail;