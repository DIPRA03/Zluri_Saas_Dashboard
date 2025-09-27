import React from 'react';

const FeatureCard = ({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) => (
    <div className="bg-white p-6 rounded-lg border border-slate-200 text-center">
        <div className="flex justify-center items-center h-16 w-16 bg-blue-100 rounded-full mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
    </div>
);

const MSPPage: React.FC = () => {
    return (
        <div className="p-8 animate-fade-in">
            <div className="mb-6">
                <p className="text-sm text-slate-500">Home &gt; MSP</p>
                <h1 className="text-3xl font-bold text-slate-800 mt-1">Managed Service Provider (MSP) Solutions</h1>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-8">
                <div className="text-center max-w-3xl mx-auto">
                     <IconShieldLarge />
                    <h2 className="text-2xl font-bold text-slate-800 mt-4">Empower Your Business with Our MSP Services</h2>
                    <p className="text-slate-600 mt-3 leading-relaxed">
                        Zluri's Managed Service Provider program is designed to help you manage your IT infrastructure with ease and efficiency. We provide proactive monitoring, maintenance, and support to keep your systems running smoothly, so you can focus on what matters most: growing your business.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <FeatureCard
                        icon={<IconServer className="h-8 w-8 text-blue-600" />}
                        title="Proactive Monitoring"
                        description="We monitor your systems 24/7 to identify and resolve potential issues before they become critical problems."
                    />
                    <FeatureCard
                        icon={<IconHeadset className="h-8 w-8 text-blue-600" />}
                        title="24/7 Expert Support"
                        description="Our team of certified professionals is always available to provide expert support and quick resolutions."
                    />
                    <FeatureCard
                        icon={<IconTrendingUp className="h-8 w-8 text-blue-600" />}
                        title="Scalable Solutions"
                        description="Our services are designed to scale with your business, ensuring you always have the right level of support."
                    />
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 bg-slate-50 rounded-lg p-8 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Ready to Get Started?</h3>
                        <p className="text-slate-600 mt-1">Contact our MSP specialists today for a free consultation.</p>
                    </div>
                    <button className="mt-4 md:mt-0 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex-shrink-0">
                        Contact Sales
                    </button>
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

// Icons for MSP Page
const IconShieldLarge = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.016h-.008v-.016z" /></svg>;
const IconServer = (props: { className: string }) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V7.5a3 3 0 013-3h13.5a3 3 0 013 3v3.75a3 3 0 01-3 3m-13.5 0v4.5a3 3 0 003 3h7.5a3 3 0 003-3v-4.5" /></svg>;
const IconHeadset = (props: { className: string }) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5a6 6 0 00-6-6.75v1.5a4.5 4.5 0 11-9 0v-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v2.25m9 7.5h-9" /></svg>;
const IconTrendingUp = (props: { className: string }) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.75-.625m3.75.625V3.375" /></svg>;


export default MSPPage;
