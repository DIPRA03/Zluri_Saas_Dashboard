import React, { useState, useMemo } from 'react';
import type { User, Department, Service } from '../types';

interface ManagePermissionsPageProps {
    allServices: Service[];
    users: User[];
    departments: Department[];
    onAddServiceToUser: (userId: number, serviceId: number) => void;
    onAddServiceToDepartment: (departmentName: string, serviceId: number) => void;
    onRevokeServiceFromUser: (userId: number, serviceId: number) => void;
    onRevokeServiceFromDepartment: (departmentName: string, serviceId: number) => void;
}

// --- Accordion Item Component ---
const AccordionItem = ({
  title,
  subtitle,
  serviceCount,
  isOpen,
  onToggle,
  onEdit,
  children,
}: {
  title: string;
  subtitle?: string;
  serviceCount: number;
  isOpen: boolean;
  onToggle: () => void;
  onEdit: () => void;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg border border-slate-200 transition-shadow duration-300 hover:shadow-md">
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3 flex-grow cursor-pointer" onClick={onToggle}>
        <div>
          <h3 className="font-bold text-slate-800">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center space-x-4 pl-4 flex-shrink-0">
        <span className="text-sm text-slate-500 hidden sm:block">{serviceCount} service{serviceCount !== 1 && 's'}</span>
        <button
            onClick={(e) => {
                e.stopPropagation();
                onEdit();
            }}
            className="text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
        >
            Edit
        </button>
        <div className="cursor-pointer" onClick={onToggle}>
            <svg className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </div>
      </div>
    </div>
    {isOpen && (
      <div className="px-4 pb-4 border-t border-slate-200 animate-fade-in-down">
        {children}
      </div>
    )}
  </div>
);

const ManagePermissionsPage: React.FC<ManagePermissionsPageProps> = ({
    allServices, users, departments, 
    onAddServiceToUser,
    onAddServiceToDepartment,
    onRevokeServiceFromUser,
    onRevokeServiceFromDepartment
}) => {
    const [activeTab, setActiveTab] = useState<'department' | 'individual'>('department');
    const [openAccordionId, setOpenAccordionId] = useState<string | number | null>(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTarget, setEditingTarget] = useState<{ type: 'user' | 'department', id: number | string, name: string } | null>(null);
    const [selectedServicesInModal, setSelectedServicesInModal] = useState<Set<number>>(new Set());
    const [modalSearchQuery, setModalSearchQuery] = useState('');
    
    const servicesById = useMemo(() => 
        allServices.reduce((acc, service) => {
            acc[service.id] = service;
            return acc;
        }, {} as Record<number, Service>), 
    [allServices]);

    const departmentServicesMap = useMemo(() => {
        const map = new Map<string, Set<number>>();
        departments.forEach(dept => map.set(dept.name, new Set<number>()));
        users.forEach(user => {
            const deptServices = map.get(user.department);
            if (deptServices) {
                user.serviceIds.forEach(serviceId => deptServices.add(serviceId));
            }
        });
        return map;
    }, [users, departments]);

    const handleOpenEditModal = (target: { type: 'user' | 'department', id: number | string, name: string }) => {
        setEditingTarget(target);
        if (target.type === 'department') {
            const currentServices = departmentServicesMap.get(target.id as string) || new Set<number>();
            setSelectedServicesInModal(new Set(currentServices));
        } else {
            const user = users.find(u => u.id === target.id);
            const currentServices = user ? user.serviceIds : new Set<number>();
            setSelectedServicesInModal(new Set(currentServices));
        }
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingTarget(null);
        setSelectedServicesInModal(new Set());
        setModalSearchQuery('');
    };

    const handleToggleServiceInModal = (serviceId: number) => {
        setSelectedServicesInModal(prev => {
            const newSet = new Set(prev);
            if (newSet.has(serviceId)) {
                newSet.delete(serviceId);
            } else {
                newSet.add(serviceId);
            }
            return newSet;
        });
    };
    
    const handleSaveChanges = () => {
        if (!editingTarget) return;

        let initialServices: Set<number>;
        if (editingTarget.type === 'department') {
            initialServices = departmentServicesMap.get(editingTarget.id as string) || new Set();
        } else {
            const user = users.find(u => u.id === editingTarget.id);
            initialServices = user ? user.serviceIds : new Set();
        }

        const servicesToAdd = new Set([...selectedServicesInModal].filter(id => !initialServices.has(id)));
        const servicesToRemove = new Set([...initialServices].filter(id => !selectedServicesInModal.has(id)));

        if (editingTarget.type === 'department') {
            servicesToAdd.forEach(serviceId => onAddServiceToDepartment(editingTarget.id as string, serviceId));
            servicesToRemove.forEach(serviceId => onRevokeServiceFromDepartment(editingTarget.id as string, serviceId));
        } else {
            servicesToAdd.forEach(serviceId => onAddServiceToUser(editingTarget.id as number, serviceId));
            servicesToRemove.forEach(serviceId => onRevokeServiceFromUser(editingTarget.id as number, serviceId));
        }
        
        handleCloseEditModal();
    };
    
    const handleRevokeService = (serviceId: number, target: { type: 'user' | 'department', id: number | string, name: string }) => {
        const serviceName = servicesById[serviceId]?.name || 'this service';
        if (target.type === 'department') {
            if (window.confirm(`Are you sure you want to revoke "${serviceName}" from the ${target.name} department? This will affect all users.`)) {
                onRevokeServiceFromDepartment(target.id as string, serviceId);
            }
        } else {
             if (window.confirm(`Are you sure you want to revoke "${serviceName}" from ${target.name}?`)) {
                onRevokeServiceFromUser(target.id as number, serviceId);
            }
        }
    }
    
    const TabButton = ({ label, value, current, onClick }: { label: string, value: 'department' | 'individual', current: string, onClick: (v: 'department' | 'individual') => void }) => (
        <button
            onClick={() => { onClick(value); setOpenAccordionId(null); }}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${current === value ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
        >
            {label}
        </button>
    );
    
    const renderServiceList = (services: Service[], target: { type: 'user' | 'department', id: number | string, name: string }) => {
        if (services.length === 0) {
            return <p className="text-sm text-center text-slate-500 py-4">No services assigned.</p>;
        }
        return (
            <div className="space-y-3 pt-4">
                {services.map(service => (
                    <div key={service.id} className="group bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between transition-all duration-200 hover:border-slate-300 hover:bg-slate-100">
                        <div className="flex items-center gap-3">
                            <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg ${service.logoBgColor}`}>
                                {React.cloneElement(service.icon, { className: 'h-5 w-5 text-white' })}
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800">{service.name}</p>
                                <p className="text-xs text-slate-500">{service.author || 'Unknown Publisher'}</p>
                            </div>
                        </div>
                        <button onClick={() => handleRevokeService(service.id, target)} className="text-sm font-semibold text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md">Revoke</button>
                    </div>
                ))}
            </div>
        );
    }
    
    const filteredServicesForModal = allServices.filter(service =>
        service.name.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
        (service.author || '').toLowerCase().includes(modalSearchQuery.toLowerCase())
    );

    return (
        <div className="p-8 animate-fade-in">
            <div className="mb-6">
                <p className="text-sm text-slate-500">Home &gt; Management &gt; Manage Permissions</p>
                <h1 className="text-3xl font-bold text-slate-800 mt-1">Manage Permissions</h1>
            </div>

            <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-slate-200 inline-flex mb-6">
                <TabButton label="By Department" value="department" current={activeTab} onClick={setActiveTab} />
                <TabButton label="By Individual" value="individual" current={activeTab} onClick={setActiveTab} />
            </div>

            <div className="space-y-4">
                {activeTab === 'department' ? (
                    departments.map(dept => {
                        const services = Array.from(departmentServicesMap.get(dept.name) || []).map(id => servicesById[id]).filter(Boolean);
                        return (
                             <AccordionItem
                                key={dept.name}
                                title={dept.name}
                                serviceCount={services.length}
                                isOpen={openAccordionId === dept.name}
                                onToggle={() => setOpenAccordionId(openAccordionId === dept.name ? null : dept.name)}
                                onEdit={() => handleOpenEditModal({ type: 'department', id: dept.name, name: dept.name })}
                             >
                                {renderServiceList(services, { type: 'department', id: dept.name, name: dept.name })}
                            </AccordionItem>
                        );
                    })
                ) : (
                    users.filter(u => u.role !== 'reporting manager').map(user => {
                        const services = Array.from(user.serviceIds).map(id => servicesById[id]).filter(Boolean);
                        return (
                            <AccordionItem
                                key={user.id}
                                title={user.name}
                                subtitle={user.department}
                                serviceCount={services.length}
                                isOpen={openAccordionId === user.id}
                                onToggle={() => setOpenAccordionId(openAccordionId === user.id ? null : user.id)}
                                onEdit={() => handleOpenEditModal({ type: 'user', id: user.id, name: user.name })}
                            >
                                {renderServiceList(services, { type: 'user', id: user.id, name: user.name })}
                            </AccordionItem>
                        );
                    })
                )}
            </div>
            
            {isEditModalOpen && editingTarget && (
                <div 
                    className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center animate-fade-in-fast"
                    onClick={handleCloseEditModal}
                >
                    <div 
                        className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col animate-fade-in-down"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-slate-200">
                             <h2 className="text-lg font-bold text-slate-800">Edit Services for {editingTarget.name}</h2>
                             <p className="text-sm text-slate-500">Select services to grant or revoke access.</p>
                        </div>
                        <div className="p-4">
                             <input
                                type="text"
                                placeholder="Search for a service..."
                                value={modalSearchQuery}
                                onChange={(e) => setModalSearchQuery(e.target.value)}
                                className="w-full bg-slate-100 border border-slate-200 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                              />
                        </div>
                        <div className="flex-1 overflow-y-auto px-4" style={{maxHeight: '40vh'}}>
                            <div className="space-y-2">
                            {filteredServicesForModal.map(service => (
                                <label key={service.id} htmlFor={`service-${service.id}`} className="flex items-center p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                                    <input
                                        id={`service-${service.id}`}
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={selectedServicesInModal.has(service.id)}
                                        onChange={() => handleToggleServiceInModal(service.id)}
                                    />
                                    <div className="relative flex items-center justify-center w-5 h-5">
                                        <div className="w-full h-full border-2 rounded-md bg-white border-slate-300 transition-all duration-200 group-hover:border-blue-500 peer-checked:bg-blue-600 peer-checked:border-blue-600"></div>
                                        <svg className="absolute w-3 h-3 text-white transition-opacity duration-200 opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="flex items-center gap-3 ml-4">
                                        <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg ${service.logoBgColor}`}>
                                            {React.cloneElement(service.icon, { className: 'h-5 w-5 text-white' })}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800">{service.name}</p>
                                            <p className="text-xs text-slate-500">{service.author || 'Unknown Publisher'}</p>
                                        </div>
                                    </div>
                                </label>
                            ))}
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex justify-end space-x-2 rounded-b-lg">
                            <button onClick={handleCloseEditModal} className="bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors">
                                Cancel
                            </button>
                             <button onClick={handleSaveChanges} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <style>{`
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-down {
                    0% { opacity: 0; transform: translateY(-5px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-fast {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.2s ease-out forwards;
                }
                .animate-fade-in-fast {
                    animation: fade-in-fast 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ManagePermissionsPage;