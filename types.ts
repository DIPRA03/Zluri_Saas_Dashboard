export interface Service {
  id: number;
  name: string;
  author: string;
  description: string;
  rating: number;
  reviews: number;
  priceInfo: string;
  isFeatured?: boolean;
  icon: JSX.Element;
  logoBgColor: string;
  category: string;
  dateAdded: string; // ISO 8601 date string
  usageFrequency?: number; // Value between 0 and 1
  tags?: string[];
  requestStatus?: 'pending' | 'approved' | 'denied';
}

export interface Filters {
  freeTrial: boolean;
  trending: boolean;
  newArrivals: boolean;
  publishers: Set<string>;
}

export type SortOption = 'Most Popular' | 'Newest' | 'Highest Rated';

export type RequestStatus = 'pending' | 'approved' | 'denied';

export interface ServiceRequest {
    id: number;
    serviceId: number;
    serviceName: string;
    serviceIcon: JSX.Element;
    serviceAuthor: string;
    logoBgColor: string;
    userName: string;
    userAvatar: string;
    requestDate: string; // ISO 8601 date string
    status: RequestStatus;
}

export interface Notification {
  id: number;
  text: string;
  timestamp: string; // ISO 8601 date string
  isRead: boolean;
  type: 'request_approved' | 'request_denied' | 'info';
}

export type UserRole = 'employee' | 'reporting manager';

export interface User {
  id: number;
  name:string;
  avatar: string;
  department: string;
  role: UserRole;
  serviceIds: Set<number>;
}

export interface Department {
  name: string;
}
