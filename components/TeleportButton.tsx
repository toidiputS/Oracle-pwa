import React, { useState } from 'react';
import { Agent } from '../types';

interface TeleportButtonProps {
    agentName: string;
    onClick: (agent: Agent) => void;
    agents: Agent[];
    variant?: 'pill' | 'inline';
}

export const TeleportButton: React.FC<TeleportButtonProps> = ({ agentName, onClick, agents, variant = 'pill' }) => {
    const [status, setStatus] = useState<'idle' | 'completing' | 'completed'>('idle');

    const agent = agents.find(a => 
        a.name.toLowerCase() === agentName.toLowerCase() || 
        a.id.toLowerCase() === agentName.toLowerCase()
    );

    if (!agent) {
        return <span className="text-white font-black decoration-dotted underline cursor-help" title="Agent not found">{agentName}</span>;
    }

    const handleClick = (e: React.MouseEvent) => {
        if (status !== 'idle') return;
        setStatus('completing');
        setTimeout(() => {
            setStatus('completed');
            onClick(agent);
            setTimeout(() => setStatus('idle'), 2500);
        }, 800);
    };

    const isActive = status !== 'idle';

    if (variant === 'inline') {
        return (
            <button 
                onClick={handleClick}
                disabled={isActive}
                className={`
                    group inline-flex items-center gap-2 px-3 py-1 rounded-lg mx-1 align-baseline
                    transition-all duration-500 cursor-pointer select-none overflow-hidden relative
                    border shadow-xl backdrop-blur-md
                    ${isActive 
                        ? 'bg-white border-white text-slate-950 scale-105' 
                        : 'bg-slate-900/60 border-white/10 hover:border-white/40'
                    }
                `}
            >
                <span className={`text-base ${isActive ? 'scale-110 rotate-[360deg]' : 'grayscale group-hover:grayscale-0'} transition-all duration-700`}>
                    {isActive ? '✨' : agent.icon}
                </span>
                <span className={`font-black text-xs uppercase tracking-widest ${isActive ? 'text-slate-950' : 'text-white'}`}>
                    {isActive ? 'LINKED' : agent.name}
                </span>
            </button>
        );
    }

    return (
        <div className="flex flex-col items-center py-8">
            <button 
                onClick={handleClick}
                disabled={isActive}
                className={`btn-reflect-base px-10 py-6 min-w-[280px] text-base ${isActive ? 'btn-reflect-secondary opacity-50' : 'btn-reflect-primary'}`}
            >
                <div className="flex items-center gap-4">
                    <span className="text-2xl">{isActive ? '⚙️' : agent.icon}</span>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] uppercase tracking-[0.2em] mb-1">{isActive ? 'Connecting...' : 'Orchestration Hub'}</span>
                        <span className="text-lg font-black italic">{agent.name}</span>
                    </div>
                </div>
            </button>
        </div>
    );
};