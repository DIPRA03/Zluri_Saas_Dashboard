import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ServiceDetail from './components/ServiceDetail';
import PersonalInfoPage from './components/PersonalInfoPage';
import { SERVICES_DATA, USERS_DATA, DEPARTMENTS_DATA } from './constants';
import { Service, Filters, SortOption, ServiceRequest, Notification, User, Department } from './types';
import ChatWidget from './components/ChatWidget';
import { DesignCraftIcon, SupperWaveStudioIcon } from './constants';

const INITIAL_REQUESTS: ServiceRequest[] = [
    {
        id: 1,
        serviceId: 5,
        serviceName: 'DesignCraft Studio',
        serviceIcon: <DesignCraftIcon />,
        serviceAuthor: 'By AssistFlow',
        logoBgColor: 'bg-green-500',
        userName: 'Aditya Sharma',
        userAvatar: 'https://i.pravatar.cc/40?u=aditya-sharma',
        requestDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        status: 'pending',
    },
    {
        id: 2,
        serviceId: 6,
        serviceName: 'SupperWave Studio',
        serviceIcon: <SupperWaveStudioIcon />,
        serviceAuthor: 'By Assitive Flow',
        logoBgColor: 'bg-teal-500',
        userName: 'Dipra Biswas',
        userAvatar: 'https://i.pravatar.cc/40?u=dipra-biswas',
        requestDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
        status: 'denied',
    }
];

const INITIAL_NOTIFICATIONS: Notification[] = [
    {
      id: 1,
      text: "Your request for SupperWave Studio has been denied.",
      timestamp: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
      isRead: false,
      type: 'request_denied',
    },
    {
      id: 2,
      text: "Welcome to Zluri! Explore the dashboard to find new services.",
      timestamp: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
      isRead: true,
      type: 'info',
    }
];


const App: React.FC = () => {
  const [activePage, setActivePage] = useState('Personal Dashboard');
  const [likedServices, setLikedServices] = useState<Set<number>>(new Set());
  const [sortOrder, setSortOrder] = useState<SortOption>('Most Popular');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_REQUESTS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const [users, setUsers] = useState<User[]>(USERS_DATA);
  const [departments, setDepartments] = useState<Department[]>(DEPARTMENTS_DATA);
  const [servicesData] = useState<Service[]>(SERVICES_DATA);

  // In a real app, this would come from an auth context
  const currentUser = useMemo(() => users.find(u => u.role === 'reporting manager')!, [users]);

  const [filters, setFilters] = useState<Filters>({
    freeTrial: false,
    trending: false,
    newArrivals: false,
    publishers: new Set(),
  });

  const allPublishers = useMemo(() => 
    [...new Set(servicesData.map(s => s.author).filter(Boolean))]
  , [servicesData]);

  const clearFilters = () => {
    setFilters({
      freeTrial: false,
      trending: false,
      newArrivals: false,
      publishers: new Set(),
    });
  };

  const handlePageChange = (page: string) => {
    setSelectedService(null); // Deselect service when changing page
    if (page === 'Browse All Categories') {
        clearFilters();
        setSortOrder('Most Popular');
    }
    setActivePage(page);
  };

  const toggleLike = (serviceId: number) => {
    setLikedServices(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(serviceId)) {
        newLiked.delete(serviceId);
      } else {
        newLiked.add(serviceId);
      }
      return newLiked;
    });
  };
    
    // --- Permission Handlers ---
    const handleAddServiceToUser = (userId: number, serviceId: number) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, serviceIds: new Set(u.serviceIds).add(serviceId) } : u));
    };
    
    const handleAddServiceToDepartment = (departmentName: string, serviceId: number) => {
        setUsers(prev => prev.map(u => {
            if (u.department === departmentName) {
                const newServiceIds = new Set(u.serviceIds);
                newServiceIds.add(serviceId);
                return { ...u, serviceIds: newServiceIds };
            }
            return u;
        }));
    };

    const handleRevokeServiceFromUser = (userId: number, serviceId: number) => {
        setUsers(prev => prev.map(u => {
            if (u.id === userId) {
                const newServiceIds = new Set(u.serviceIds);
                newServiceIds.delete(serviceId);
                return { ...u, serviceIds: newServiceIds };
            }
            return u;
        }));
    };

    const handleRevokeServiceFromDepartment = (departmentName: string, serviceId: number) => {
        setUsers(prev => prev.map(u => {
            if (u.department === departmentName) {
                const newServiceIds = new Set(u.serviceIds);
                newServiceIds.delete(serviceId);
                return { ...u, serviceIds: newServiceIds };
            }
            return u;
        }));
    };


  const handleRequestAccess = (service: Service) => {
    const newRequest: ServiceRequest = {
        id: Date.now(),
        serviceId: service.id,
        serviceName: service.name,
        serviceIcon: service.icon,
        serviceAuthor: service.author,
        logoBgColor: service.logoBgColor,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        requestDate: new Date().toISOString(),
        status: 'pending',
    };
    setRequests(prev => [...prev, newRequest]);
  };

  const handleApproveRequest = (requestId: number) => {
    const requestToApprove = requests.find(r => r.id === requestId);
    if (requestToApprove) {
        const userToUpdate = users.find(u => u.name === requestToApprove.userName);
        if (userToUpdate) {
            handleAddServiceToUser(userToUpdate.id, requestToApprove.serviceId);
        }
    }
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'approved' } : r));
  };

  const handleDenyRequest = (requestId: number) => {
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'denied' } : r));
  };

  const handleFilterChange = (filterName: keyof Omit<Filters, 'publishers'>) => {
    setFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };
  
  const handlePublisherChange = (publisher: string) => {
      setFilters(prev => {
          const newPublishers = new Set(prev.publishers);
          if (newPublishers.has(publisher)) {
              newPublishers.delete(publisher);
          } else {
              newPublishers.add(publisher);
          }
          return { ...prev, publishers: newPublishers };
      });
  };

    const handleMarkAsRead = (notificationId: number) => {
        setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

  const getFilteredServices = (): Service[] => {
    let servicesToFilter: Service[];

    switch (activePage) {
        case 'Personal Dashboard':
        case 'Available Services':
        case 'Personal Info':
            servicesToFilter = servicesData.filter(s => currentUser.serviceIds.has(s.id));
            break;
        case 'My Liked Services':
            servicesToFilter = servicesData.filter(s => likedServices.has(s.id));
            break;
        case 'Browse All Categories':
            servicesToFilter = servicesData;
            break;
        case 'Customer Support':
        case 'MSP':
        case 'Pending Requests':
        case 'My Requests':
        case 'Manage Permissions':
             return []; // These pages don't show a service list
        default:
            servicesToFilter = servicesData.filter(s => s.category === activePage);
            break;
    }

    // Apply search query
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      servicesToFilter = servicesToFilter.filter(service =>
        service.name.toLowerCase().includes(lowercasedQuery) ||
        service.description.toLowerCase().includes(lowercasedQuery) ||
        (service.author || '').toLowerCase().includes(lowercasedQuery) ||
        service.category.toLowerCase().includes(lowercasedQuery) ||
        (service.tags && service.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery)))
      );
    }
    
    // Apply filters
    const filteredServices = servicesToFilter.filter(service => {
        // Free Trial Filter
        if (filters.freeTrial && !service.priceInfo.toLowerCase().includes('free trial')) {
            return false;
        }
        // Trending Filter (e.g., > 200 reviews)
        if (filters.trending && service.reviews <= 200) {
            return false;
        }
        // New Arrivals Filter (e.g., last 4 months)
        if (filters.newArrivals) {
            const fourMonthsAgo = new Date();
            fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
            if (new Date(service.dateAdded) < fourMonthsAgo) {
                return false;
            }
        }
        // Publisher Filter
        if (filters.publishers.size > 0 && !filters.publishers.has(service.author)) {
            return false;
        }
        return true;
    });

    // Apply sorting
    const sortedServices = [...filteredServices].sort((a, b) => {
        switch (sortOrder) {
            case 'Highest Rated':
                return b.rating - a.rating;
            case 'Newest':
                return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
            case 'Most Popular':
            default:
                return b.reviews - a.reviews;
        }
    });
    
    // Add request status to each service
    const servicesWithStatus = sortedServices.map(service => {
        const userRequest = requests.find(r => r.serviceId === service.id && r.userName === currentUser.name);
        return {
            ...service,
            requestStatus: userRequest ? userRequest.status : undefined,
        };
    });

    return servicesWithStatus;
  };

  const services = getFilteredServices();
  const pendingRequestCount = requests.filter(r => r.status === 'pending').length;
  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  const handleSelectService = (service: Service) => {
      setSelectedService(service);
  };

  const handleBackToList = () => {
      setSelectedService(null);
  }
  
  const serviceDetailWithStatus = selectedService ? {
      ...selectedService,
      requestStatus: requests.find(r => r.serviceId === selectedService.id && r.userName === currentUser.name)?.status
  } : null;

  return (
    <div className="h-screen flex flex-col bg-gray-50 font-sans text-gray-800">
      <Header 
        setActivePage={handlePageChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        notifications={notifications}
        unreadCount={unreadNotificationCount}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        currentUser={currentUser}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activePage={activePage} 
          setActivePage={handlePageChange}
          pendingRequestCount={pendingRequestCount}
          currentUserRole={currentUser.role}
        />
        <main className="flex-1 overflow-y-auto">
          {selectedService ? (
            <ServiceDetail service={serviceDetailWithStatus!} currentUser={currentUser} onBack={handleBackToList} onRequestAccess={handleRequestAccess} />
          ) : activePage === 'Personal Info' ? (
            <PersonalInfoPage setActivePage={handlePageChange} />
          ) : (
            <MainContent 
                activePage={activePage} 
                services={services}
                allServices={servicesData}
                likedServices={likedServices}
                toggleLike={toggleLike}
                sortOrder={sortOrder}
                onSortChange={(value) => setSortOrder(value)}
                onViewDetails={handleSelectService}
                filters={filters}
                onFilterChange={handleFilterChange}
                onPublisherChange={handlePublisherChange}
                onClearFilters={clearFilters}
                allPublishers={allPublishers}
                onRequestAccess={handleRequestAccess}
                requests={requests}
                onApproveRequest={handleApproveRequest}
                onDenyRequest={handleDenyRequest}
                currentUser={currentUser}
                users={users}
                departments={departments}
                onAddServiceToUser={handleAddServiceToUser}
                onAddServiceToDepartment={handleAddServiceToDepartment}
                onRevokeServiceFromUser={handleRevokeServiceFromUser}
                onRevokeServiceFromDepartment={handleRevokeServiceFromDepartment}
            />
          )}
        </main>
      </div>
      <ChatWidget />
    </div>
  );
};

export default App;
