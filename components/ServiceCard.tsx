import React from 'react';
import type { Service } from '../types';
import { StarIcon } from '../constants';

interface ServiceCardProps {
    service: Service;
    isLiked: boolean;
    hasAccess: boolean;
    onLikeToggle: (id: number) => void;
    onViewDetails: (service: Service) => void;
    onRequestAccess: (service: Service) => void;
}

const StarRating = ({ rating, reviews }: { rating: number; reviews: number; }) => {
    const fullStars = Math.floor(rating);
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} filled={true} />)}
            {[...Array(5 - fullStars)].map((_, i) => <StarIcon key={`empty-${i}`} filled={false} />)}
            <span className="ml-2 text-xs text-slate-500">{`(${rating.toFixed(1)}) - ${reviews} Reviews`}</span>
        </div>
    );
};


const ServiceCard: React.FC<ServiceCardProps> = ({ service, isLiked, hasAccess, onLikeToggle, onViewDetails, onRequestAccess }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 flex flex-col h-full hover:shadow-lg hover:border-blue-400 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
                <div className={`flex items-center justify-center h-16 w-16 rounded-xl ${service.logoBgColor} mr-4`}>
                    {React.cloneElement(service.icon, {className: 'h-8 w-8 text-white'})}
                </div>
                <div>
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold text-slate-800">{service.name}</h2>
                        {!hasAccess && <IconLock />}
                    </div>
                     <p className="text-sm text-slate-500">{service.author}</p>
                </div>
            </div>
           
            <div className="mb-4">
                 <StarRating rating={service.rating} reviews={service.reviews} />
            </div>
            <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-3">{service.description}</p>
            <p className="text-sm font-medium mb-6">
                {hasAccess
                    ? <span className="text-green-600">Purchased</span>
                    : <span className="text-slate-500">{service.priceInfo || 'Contact for pricing'}</span>
                }
            </p>
            <div className="flex items-center justify-between mt-auto">
                <button onClick={() => onLikeToggle(service.id)} className="p-2 rounded-full text-slate-500 hover:bg-slate-100" aria-label={isLiked ? 'Unlike service' : 'Like service'}>
                    <IconHeart isLiked={isLiked} />
                </button>
                 <div className="flex items-center space-x-2">
                    {hasAccess ? (
                        <button 
                            onClick={() => onViewDetails(service)}
                            className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                        >
                            View Details
                        </button>
                    ) : (
                         <>
                            <button 
                                onClick={() => onViewDetails(service)}
                                className="bg-slate-100 text-slate-700 font-semibold py-2.5 px-4 rounded-lg hover:bg-slate-200 transition-colors duration-200 text-sm"
                            >
                                Details
                            </button>

                            {service.requestStatus === 'pending' ? (
                                 <button
                                    disabled
                                    className="bg-slate-200 text-slate-500 font-semibold py-2.5 px-6 rounded-lg cursor-not-allowed text-sm w-[140px] text-center"
                                 >
                                    Request Pending
                                 </button>
                            ) : (
                                <button 
                                    onClick={() => onRequestAccess(service)}
                                    className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm w-[140px] text-center"
                                >
                                    Request Access
                                </button>
                            )}
                         </>
                    )}
                </div>
            </div>
        </div>
    );
};

// Card Icons
const IconHeart = ({isLiked}: {isLiked?: boolean}) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-6 w-6 ${isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-400'}`}
        fill={isLiked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={1.5}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const IconLock = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 ml-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
);


export default ServiceCard;