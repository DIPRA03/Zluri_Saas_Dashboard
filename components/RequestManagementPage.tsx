import React from 'react';
import type { ServiceRequest, RequestStatus, User } from '../types';

interface RequestManagementPageProps {
    activePage: 'Pending Requests' | 'My Requests';
    requests: ServiceRequest[];
    onApproveRequest: (requestId: number) => void;
    onDenyRequest: (requestId: number) => void;
    currentUser: User;
}

const StatusBadge = ({ status }: { status: RequestStatus }) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full inline-flex items-center";
    const statusMap = {
        pending: { text: "Pending", classes: "bg-yellow-100 text-yellow-800" },
        approved: { text: "Approved", classes: "bg-green-100 text-green-800" },
        denied: { text: "Denied", classes: "bg-red-100 text-red-800" },
    };

    const { text, classes } = statusMap[status];

    return (
        <span className={`${baseClasses} ${classes}`}>
             {text}
        </span>
    );
};

const RequestManagementPage: React.FC<RequestManagementPageProps> = ({
    activePage,
    requests,
    onApproveRequest,
    onDenyRequest,
    currentUser
}) => {
    
    const pendingRequests = requests.filter(r => r.status === 'pending');
    const myRequests = requests.filter(r => r.userName === currentUser.name).sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());

    const renderEmptyState = (title: string, message: string) => (
        <div className="text-center py-20 bg-white rounded-lg border border-slate-200 mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            <h2 className="text-xl font-semibold text-slate-700 mt-4">{title}</h2>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">{message}</p>
        </div>
    );
    
    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    const RequestItem = ({ request }: {request: ServiceRequest}) => (
        <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
                <div className={`flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-lg ${request.logoBgColor}`}>
                    {React.cloneElement(request.serviceIcon, {className: 'h-7 w-7 text-white'})}
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">{request.serviceName}</h3>
                    <p className="text-sm text-slate-500">{request.serviceAuthor}</p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <img src={request.userAvatar} alt={request.userName} className="h-9 w-9 rounded-full" />
                <div>
                    <p className="text-sm font-semibold text-slate-700">{request.userName}</p>
                    <p className="text-xs text-slate-500">Requested on {formatDate(request.requestDate)}</p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => onDenyRequest(request.id)}
                    className="bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors duration-200 text-sm"
                >
                    Deny
                </button>
                <button
                    onClick={() => onApproveRequest(request.id)}
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm"
                >
                    Approve
                </button>
            </div>
        </div>
    );
    
    const MyRequestItem = ({ request }: {request: ServiceRequest}) => (
        <div className="bg-white p-4 rounded-lg border border-slate-200 flex items-center justify-between gap-4">
             <div className="flex items-center gap-4 flex-1">
                <div className={`flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-lg ${request.logoBgColor}`}>
                    {React.cloneElement(request.serviceIcon, {className: 'h-7 w-7 text-white'})}
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">{request.serviceName}</h3>
                    <p className="text-sm text-slate-500">Requested on {formatDate(request.requestDate)}</p>
                </div>
            </div>
            <StatusBadge status={request.status} />
        </div>
    );

    return (
        <div className="p-6">
            <div className="mb-6">
                 <p className="text-sm text-slate-500">Home &gt; Management &gt; {activePage}</p>
                 <h1 className="text-3xl font-bold text-slate-800 mt-1">{activePage}</h1>
            </div>
            
            {activePage === 'Pending Requests' && (
                <div className="space-y-4">
                    {pendingRequests.length > 0
                        ? pendingRequests.map(req => <RequestItem key={req.id} request={req} />)
                        : renderEmptyState("No Pending Requests", "You're all caught up! There are no new service requests to review.")
                    }
                </div>
            )}

            {activePage === 'My Requests' && (
                 <div className="space-y-4">
                    {myRequests.length > 0
                        ? myRequests.map(req => <MyRequestItem key={req.id} request={req} />)
                        : renderEmptyState("No Request History", "You haven't requested any services yet. Browse the categories to find services you need.")
                    }
                </div>
            )}
        </div>
    );
};

export default RequestManagementPage;