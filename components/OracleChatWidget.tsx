import React, { useState, useEffect, useRef } from 'react';
import { Message, Agent, OracleConfig } from '../types';
import { INITIAL_GREETING, INITIAL_CHOICES, ORACLE_NODE } from '../constants';
import { streamMessageToOracle, startNewSession } from '../services/geminiService';
import { ChatBubble } from './ChatBubble';
import { NeuralCore } from './NeuralCore';

interface OracleChatWidgetProps {
    agents: Agent[];
    config: OracleConfig;
    onTeleport: (agent: Agent) => void;
}

export const OracleChatWidget: React.FC<OracleChatWidgetProps> = ({ agents, config, onTeleport }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [thinkingStep, setThinkingStep] = useState('');
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const THINKING_PHASES = [
        "Analyzing Mission Constraints...",
        "Querying Nexus Node Registry...",
        "Orchestrating Strategic Vectors...",
        "Generating Customized Workflows...",
        "Validating Execution Paths...",
        "Deploying Operational Logic..."
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isThinking]);

    useEffect(() => {
        let interval: any;
        if (isThinking) {
            let i = 0;
            setThinkingStep(THINKING_PHASES[0]);
            interval = setInterval(() => {
                i = (i + 1) % THINKING_PHASES.length;
                setThinkingStep(THINKING_PHASES[i]);
            }, 1200);
        }
        return () => clearInterval(interval);
    }, [isThinking]);

    useEffect(() => {
        const initChat = async () => {
            if (messages.length === 0) {
                setMessages([{
                    id: 'init',
                    role: 'model',
                    text: INITIAL_GREETING,
                    timestamp: new Date(),
                    choices: INITIAL_CHOICES
                }]);
            }
            await startNewSession(agents, config);
        };
        initChat();
    }, []);

    const handleSend = async (textOverride?: string) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim() || isThinking) return;

        const userMsgId = Date.now().toString();
        const userMsg: Message = { id: userMsgId, role: 'user', text: textToSend, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        const botMsgId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { 
            id: botMsgId, 
            role: 'model', 
            text: '', 
            timestamp: new Date(),
            isStreaming: true 
        }]);

        try {
            const stream = streamMessageToOracle(textToSend, agents, config);
            let fullText = "";
            for await (const chunk of stream) {
                setIsThinking(false); 
                fullText += chunk;
                setMessages(prev => prev.map(msg => msg.id === botMsgId ? { ...msg, text: fullText } : msg));
            }
            setMessages(prev => prev.map(msg => msg.id === botMsgId ? { ...msg, isStreaming: false } : msg));
        } catch (error) {
            console.error(error);
            setIsThinking(false);
            setMessages(prev => prev.map(msg => msg.id === botMsgId ? { ...msg, text: "**[COMMAND_ERROR]:** Direct link disrupted. Attempting reconnection...", isStreaming: false } : msg));
        } finally {
            setIsThinking(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const systemRoster = [...agents, ORACLE_NODE];

    return (
        <div className="flex flex-col h-full bg-[#020617] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-16 scrollbar-hide">
                <div className="flex flex-col min-h-full justify-end max-w-4xl mx-auto w-full">
                    {messages.map((msg, idx) => (
                        <ChatBubble 
                            key={msg.id} 
                            message={msg} 
                            onTeleport={onTeleport} 
                            onChoiceSelect={handleSend} 
                            agents={systemRoster} 
                            isLast={idx === messages.length - 1} 
                        />
                    ))}
                    {isThinking && (
                        <div className="flex items-center gap-5 mb-14 animate-pulse pl-4">
                            <div className="relative">
                                <NeuralCore size={36} smSize={42} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em] italic">{thinkingStep}</span>
                                <span className="text-[8px] text-slate-600 uppercase tracking-[0.2em] mt-1 font-bold">Neural Link: Processing Command Vectors</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="shrink-0 z-40 p-6 sm:p-10 bg-[#020617] border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-[#0b1120]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] flex items-center p-2.5 group focus-within:border-cyan-500/40 transition-all duration-500">
                        <div className="absolute -left-1 w-1.5 h-12 bg-cyan-500/20 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                        
                        <input 
                            type="text" 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            onKeyDown={handleKeyPress} 
                            placeholder="State your objective to The Oracle..." 
                            className="flex-1 bg-transparent border-none outline-none text-white px-8 py-5 placeholder-slate-800 text-sm font-light tracking-[0.15em] italic" 
                            data-oracle-info="Input Command Sequence"
                        />
                        <button 
                            onClick={() => handleSend()} 
                            className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center font-black text-3xl hover:bg-cyan-500 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
                            data-oracle-info="Transmit to Orchestrator"
                        >
                            <span className="translate-y-[-1px]">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};