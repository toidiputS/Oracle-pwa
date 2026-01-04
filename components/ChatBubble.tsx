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
            // Split by comma OR pipe to handle model formatting variations, and filter empty
            const extracted = choiceMatch[1].split(/[,|]/).map(c => c.trim()).filter(c => c.length > 0);
            choices = [...choices, ...extracted];
            text = text.replace(/\[CHOICES:\s*[^\]]+\]/i, '').trim();
        }
        
        return { cleanText: text, parsedChoices: choices };
    }, [message.text, message.choices]);

    const renderContent = (text: string) => {
        // Safety: Filter out accidentally generated LLM url-leaks (e.g. [Agent] (url) or just (url))
        let processedText = text.replace(/\(https?:\/\/[^\s)]+\)/gi, '');
        processedText = processedText.replace(/\[([^\]]+)\]\s*https?:\/\/[^\s]+/gi, '$1');

        // Combined pattern for Teleport tags AND Bold markers
        const combinedPattern = /(\[TELEPORT\s*->\s*[^\]]+\]|\*\*.*?\*\*)/gi;
        const parts = processedText.split(combinedPattern);
        
        return parts.map((part, i) => {
            if (!part) return null;

            // Handle Teleport Tags
            if (part.match(/^\[TELEPORT\s*->/i)) {
                const match = part.match(/\[TELEPORT\s*->\s*([^\]]+)\]/i);
                if (match) {
                    const agentName = match[1].trim();
                    return (
                        <TeleportButton 
                            key={`teleport-${i}`} 
                            agentName={agentName} 
                            onClick={onTeleport} 
                            agents={agents}
                            variant="inline" 
                        />
                    );
                }
            } 
            
            // Handle Bold markers
            if (part.startsWith('**') && part.endsWith('**')) {
                const innerText = part.slice(2, -2);
                
                // Detect if bold text is an Agent reference
                const matchedAgent = agents.find(a => 
                    innerText.toLowerCase() === a.name.toLowerCase() ||
                    innerText.toLowerCase() === a.id.toLowerCase() ||
                    innerText.toLowerCase().includes(a.name.toLowerCase()) ||
                    innerText.toLowerCase().includes(`[${a.id.toLowerCase()}]`)
                );

                if (matchedAgent) {
                     return (
                        <span 
                            key={i}
                            onClick={() => onTeleport(matchedAgent)}
                            className="font-black text-white hover:text-cyan-400 cursor-pointer hover:underline decoration-cyan-500 underline-offset-4 transition-colors px-0.5"
                            title={`Inspect ${matchedAgent.name}`}
                        >
                            {innerText}
                        </span>
                    );
                }

                return (
                    <strong key={i} className="font-black text-white px-0.5">
                        {innerText}
                    </strong>
                );
            }

            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className={`flex flex-col w-full ${isUser ? 'items-end' : 'items-start'} mb-10 group animate-fade-in`}>
            <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-2xl mr-6 shadow-2xl flex-shrink-0 mt-2">
                        🔮
                    </div>
                )}
                
                <div className={`
                    max-w-[85%] md:max-w-[80%] p-6 md:p-8 rounded-[2rem] text-base md:text-lg leading-relaxed transition-all duration-500
                    ${isUser 
                        ? 'bg-slate-900 border border-white/5 text-slate-100 rounded-tr-none shadow-xl' 
                        : 'bg-slate-900/40 backdrop-blur-3xl border border-white/5 text-slate-200 rounded-tl-none shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-white/10'
                    }
                `}>
                    {!isUser && (
                        <div className="flex items-center gap-3 mb-6 text-[10px] font-mono tracking-[0.4em] text-cyan-500/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)] animate-pulse"></span>
                            Intelligence Stream
                        </div>
                    )}
                    <div className="whitespace-pre-wrap font-light tracking-wide">
                        {message.isTyping ? (
                            <div className="flex items-center space-x-2 py-2">
                                <div className="w-2 h-2 bg-cyan-500/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-cyan-500/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-cyan-500/40 rounded-full animate-bounce"></div>
                            </div>
                        ) : (
                            renderContent(cleanText)
                        )}
                    </div>
                </div>
            </div>

            {!isUser && parsedChoices.length > 0 && isLast && (
                <div className="ml-20 mt-8 flex flex-wrap gap-4 animate-fade-in-up delay-300">
                    {parsedChoices.map((choice, idx) => (
                        <button
                            key={idx}
                            onClick={() => onChoiceSelect?.(choice)}
                            className="chip-reflect"
                        >
                            {choice}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
