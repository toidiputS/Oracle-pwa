
import React, { useMemo } from 'react';
import { Message, Agent } from '../types';
import { TeleportButton } from './TeleportButton';

interface ChatBubbleProps {
    message: Message;
    onTeleport: (agent: Agent) => void;
    onChoiceSelect?: (choice: string) => void;
    agents: Agent[];
    isLast?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onTeleport, onChoiceSelect, agents, isLast }) => {
    const isUser = message.role === 'user';
    
    const { cleanText, parsedChoices } = useMemo(() => {
        let text = message.text;
        let choices = message.choices || [];
        
        const choiceMatch = text.match(/\[CHOICES:\s*([^\]]+)\]/i);
        if (choiceMatch) {
            const extracted = choiceMatch[1].split(/[,|]/).map(c => c.trim()).filter(c => c.length > 0);
            choices = [...choices, ...extracted];
            text = text.replace(/\[CHOICES:\s*[^\]]+\]/i, '').trim();
        }
        
        return { cleanText: text, parsedChoices: choices };
    }, [message.text, message.choices]);

    const renderContent = (text: string) => {
        let processedText = text.replace(/\(https?:\/\/[^\s)]+\)/gi, '');
        processedText = processedText.replace(/\[([^\]]+)\]\s*https?:\/\/[^\s]+/gi, '$1');

        const combinedPattern = /(\[TELEPORT\s*->\s*[^\]]+\]|\*\*[^*]+\*\*|\[[A-Z0-9]+\])/g;
        const parts = processedText.split(combinedPattern);
        
        return parts.map((part, i) => {
            if (!part) return null;

            const teleportMatch = part.match(/^\[TELEPORT\s*->\s*([^\]]+)\]$/i);
            if (teleportMatch) {
                const agentRef = teleportMatch[1].trim();
                return <TeleportButton key={`teleport-${i}`} agentName={agentRef} onClick={onTeleport} agents={agents} variant="inline" />;
            }

            if (part.startsWith('**') && part.endsWith('**')) {
                const content = part.slice(2, -2).trim();
                const matchedAgent = agents.find(a => a.name.toLowerCase() === content.toLowerCase() || a.id.toLowerCase() === content.toLowerCase());

                if (matchedAgent) {
                     return (
                        <button 
                            key={i}
                            onClick={() => onTeleport(matchedAgent)}
                            className="inline-flex items-center gap-2 align-baseline mx-1 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group/agent cursor-pointer shadow-lg active:scale-95"
                        >
                            <span className="text-xs">{matchedAgent.icon}</span>
                            <span className="font-bold text-cyan-200 group-hover/agent:text-cyan-400 text-[0.9em] uppercase tracking-wider">
                                {content}
                            </span>
                        </button>
                    );
                }
                return <strong key={i} className="font-bold text-white tracking-wide">{content}</strong>;
            }

            if (part.startsWith('[') && part.endsWith(']')) {
                const idRef = part.slice(1, -1);
                const matchedAgent = agents.find(a => a.id === idRef);
                if (matchedAgent) {
                     return (
                        <button key={i} onClick={() => onTeleport(matchedAgent)} className="inline-flex items-center gap-1 align-baseline mx-1 px-2 py-0.5 bg-slate-800 border border-indigo-500/30 rounded font-mono font-bold text-blue-400 hover:text-blue-300 transition-all">
                            {part}
                        </button>
                    );
                }
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className={`flex flex-col w-full ${isUser ? 'items-end' : 'items-start'} mb-10 group animate-fade-in`}>
            {/* Context Label */}
            <div className={`flex items-center gap-3 mb-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center text-base shadow-2xl border transition-transform duration-500 group-hover:scale-110
                    ${isUser 
                        ? 'bg-slate-800 border-slate-700 text-slate-400' 
                        : 'bg-gradient-to-br from-indigo-950 to-slate-900 border-indigo-500/40 text-white shadow-indigo-500/10'
                    }
                `}>
                    {isUser ? '👤' : '🔮'}
                </div>
                <div className="flex flex-col">
                    <span className={`text-[9px] font-black uppercase tracking-[0.4em] ${isUser ? 'text-right text-slate-600' : 'text-slate-400'}`}>
                        {isUser ? 'AUTHORIZATION_ID' : 'ORCHESTRATOR_ALPHA'}
                    </span>
                    <span className={`text-[10px] font-bold ${isUser ? 'text-right text-slate-500' : 'text-slate-300'}`}>
                        {isUser ? 'Operator' : 'The Oracle'}
                    </span>
                </div>
            </div>

            {/* Premium Glass Bubble */}
            <div className={`
                glass-bubble relative max-w-[92%] md:max-w-[85%] p-7 md:p-9 rounded-[2rem] text-[15px] leading-[1.7]
                ${isUser ? 'user-bubble rounded-tr-none ml-auto' : 'rounded-tl-none mr-auto'}
            `}>
                {message.isTyping ? (
                    <div className="flex items-center gap-2 h-6">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
                    </div>
                ) : (
                    <div className="whitespace-pre-wrap font-light tracking-wide text-slate-100 italic">
                        {renderContent(cleanText)}
                        {message.isStreaming && (
                            <span className="inline-block w-1.5 h-5 bg-cyan-500 ml-1 animate-pulse align-middle"></span>
                        )}
                    </div>
                )}

                {/* Mirror Reflection Effect at bottom of last bot message */}
                {!isUser && isLast && (
                    <div className="absolute -bottom-8 left-4 right-4 h-8 bg-gradient-to-t from-transparent to-indigo-500/5 opacity-50 blur-sm pointer-events-none"></div>
                )}
            </div>

            {/* Quick Choices */}
            {!isUser && parsedChoices.length > 0 && isLast && !message.isStreaming && (
                <div className="mt-6 flex flex-wrap gap-4 animate-fade-in-up">
                    {parsedChoices.map((choice, idx) => (
                        <button
                            key={idx}
                            onClick={() => onChoiceSelect?.(choice)}
                            className="btn-reflect-base btn-reflect-secondary"
                        >
                            <span className="btn-content px-6 py-3 text-[10px] tracking-[0.25em]">
                                {choice}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
