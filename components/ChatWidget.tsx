import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

interface Message {
    sender: 'user' | 'model';
    text: string;
}

const TypingIndicator = () => (
    <div className="flex items-end max-w-[85%]">
        <img src="https://i.pravatar.cc/40?u=support-agent" alt="Support Agent" className="h-6 w-6 rounded-full mr-2 flex-shrink-0 self-end" />
        <div className="p-3 bg-gray-100 rounded-xl rounded-bl-none">
            <div className="flex items-center space-x-1.5">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
            </div>
        </div>
    </div>
);

// --- Extracted ChatWindow Component ---
interface ChatWindowProps {
    toggleChat: () => void;
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    messagesEndRef: React.RefObject<HTMLDivElement>;
    inputRef: React.RefObject<HTMLInputElement>;
    inputValue: string;
    setInputValue: (value: string) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleSendMessage: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
    toggleChat,
    messages,
    isLoading,
    error,
    messagesEndRef,
    inputRef,
    inputValue,
    setInputValue,
    handleKeyPress,
    handleSendMessage
}) => (
    <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[32rem] bg-white rounded-xl shadow-2xl flex flex-col z-20 border border-slate-200 transition-all duration-300 ease-out transform scale-100 opacity-100 animate-fade-in-up">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 p-4 rounded-t-xl flex justify-between items-center flex-shrink-0">
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <img src="https://i.pravatar.cc/40?u=support-agent" alt="Support Agent" className="h-10 w-10 rounded-full" />
                     <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">Alex</h3>
                    <p className="text-xs text-slate-500">Virtual Assistant</p>
                </div>
            </div>
            <button onClick={toggleChat} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50">
            {messages.map((msg, index) => (
                 msg.sender === 'model' ? (
                    <div key={index} className="flex items-end max-w-[85%]">
                         <img src="https://i.pravatar.cc/40?u=support-agent" alt="Support Agent" className="h-6 w-6 rounded-full mr-2 flex-shrink-0 self-end" />
                        <div className="p-3 bg-gray-100 text-slate-800 rounded-xl rounded-bl-none text-sm whitespace-pre-wrap">
                            {msg.text}
                        </div>
                    </div>
                 ) : (
                    <div key={index} className="flex items-end justify-end">
                         <div className="p-3 bg-blue-600 text-white rounded-xl rounded-br-none text-sm max-w-[85%] whitespace-pre-wrap">
                           {msg.text}
                        </div>
                    </div>
                 )
            ))}
            {isLoading && <TypingIndicator />}
             {error && (
                <div className="p-3 bg-red-100 text-red-800 border border-red-200 rounded-lg text-sm">{error}</div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-200 bg-white rounded-b-xl flex items-center space-x-3 flex-shrink-0">
            <input 
                ref={inputRef}
                type="text" 
                placeholder={error ? "Chat unavailable" : "Type your message..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading || !!error}
                className="flex-1 bg-slate-100 border-transparent rounded-full py-2 px-4 text-sm focus:ring-blue-500 focus:border-blue-500 transition-colors w-full disabled:opacity-50" 
            />
            <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim() || !!error}
                className="bg-blue-600 text-white h-10 w-10 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </button>
        </div>
         <style>{`
            @keyframes fade-in-up {
                0% {
                    opacity: 0;
                    transform: translateY(20px) scale(0.95);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.3s ease-out forwards;
            }
        `}</style>
    </div>
);


const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'model', text: "Hello! I'm Alex, your virtual assistant for Zluri. How can I help you discover the perfect service today?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const initChat = () => {
            try {
                if (!process.env.API_KEY) {
                    throw new Error("API key is missing.");
                }
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: "You are Alex, a friendly and helpful customer support agent for Zluri, a service discovery platform. Your goal is to help users find services that meet their needs. Be conversational and concise.",
                    }
                });
                setError(null);
            } catch (e) {
                console.error("Failed to initialize Gemini:", e);
                setError("Sorry, the chat service is currently unavailable.");
            }
        };
        initChat();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    useEffect(() => {
        if(isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading || !chatRef.current || error) return;

        const userMessage: Message = { sender: 'user', text: trimmedInput };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: trimmedInput });

            let modelResponse = '';
            setMessages(prev => [...prev, { sender: 'model', text: '' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (e) {
            console.error("Error sending message to Gemini:", e);
            setMessages(prev => {
                const newMessages = [...prev];
                // remove the empty model message placeholder
                if (newMessages[newMessages.length - 1].sender === 'model' && newMessages[newMessages.length - 1].text === '') {
                    newMessages.pop();
                }
                return [...newMessages, { sender: 'model', text: "I seem to be having some trouble. Please try again in a moment." }];
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <>
            {isOpen && <ChatWindow 
                toggleChat={toggleChat}
                messages={messages}
                isLoading={isLoading}
                error={error}
                messagesEndRef={messagesEndRef}
                inputRef={inputRef}
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleKeyPress={handleKeyPress}
                handleSendMessage={handleSendMessage}
            />}

            {/* Chat Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 h-16 w-16 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center transition-all duration-200 hover:scale-110 z-20"
                aria-label="Toggle chat widget"
            >
                {isOpen ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </button>
        </>
    );
};

export default ChatWidget;