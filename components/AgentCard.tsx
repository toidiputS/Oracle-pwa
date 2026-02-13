
import React from 'react';
import { Agent } from '../types';

interface AgentCardProps {
    agent: Agent;
    onClick: (agent: Agent) => void;
}

const renderIcon = (icon: string) => {
    const isImage = icon.startsWith('data:') || icon.startsWith('http');
    if (isImage) {
        return <img src={icon} alt="" className="w-full h-full object-cover rounded-md" />;
    }
    return icon;
};

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick }) => {
    return (
        <div 
            onClick={() => onClick(agent)} 
            className="group relative cursor-pointer h-full flex flex-col transition-all duration-500 hover:scale-[1.05]"
            data-oracle-info={agent.oracleInsight || `${agent.name}: ${agent.role}`}
        >
            {/* Ambient Background Glow */}
            <div className={`absolute -inset-4 bg-gradient-to-br ${agent.color} rounded-[2rem] opacity-0 group-hover:opacity-25 blur-[40px] transition-all duration-700 -z-10`}></div>
            
            {/* Hover Action Bubble */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-50 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none">
                <div className="bg-white text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.3em] shadow-2xl flex items-center gap-2 border border-white/20">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    ACCESS NODE
                </div>
            </div>

            {/* The Reflective Card Container */}
            <div 
                className="reflect-card relative flex-1 flex flex-col bg-[#0b1120]/60 border border-white/5 rounded-[1.5rem] p-5 backdrop-blur-2xl shadow-2xl transition-all duration-700 group-hover:bg-[#070b14]/90 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_50px_rgba(6,182,212,0.4)]"
                style={{
                    boxShadow: `0 20px 50px -10px rgba(0,0,0,0.5), 0 0 0 0 transparent`
                }}
            >
                {/* Decorative Top Line */}
                <div className={`absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all`}></div>

                {/* Header Section */}
                <div className="flex items-center gap-4 mb-5">
                    <div className={`
                        w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl border border-white/20 shadow-inner text-white shrink-0`}>
                        {renderIcon(agent.icon)}
                    </div>
                    <div className="overflow-hidden">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black text-white bg-white/10 border border-white/20 px-1.5 py-0.5 rounded uppercase tracking-widest">{agent.id}</span>
                            <h3 className="text-lg font-black text-white italic tracking-tighter uppercase truncate">{agent.name}</h3>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] truncate block">{agent.role}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-[10px] text-white font-bold leading-relaxed mb-6 border-l-2 border-white/10 pl-3">
                    {agent.description}
                </p>

                {/* REAL DATA: Full Capabilities Section */}
                {agent.toolCard && (
                    <div className="mt-auto space-y-4 border-t border-white/5 pt-4">
                        <div>
                             <span className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em]">Input Protocol</span>
                             <p className="text-[10px] text-slate-400 font-mono mt-1 leading-snug line-clamp-2">{agent.toolCard.inputNeeded}</p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em]">Deployment Triggers</span>
                            <div className="flex flex-wrap gap-1">
                                {agent.toolCard.useThisWhen.map((trigger, i) => (
                                    <span key={i} className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded-[4px] text-[9px] font-medium text-slate-300 uppercase tracking-wide">
                                        {trigger}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                             <span className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em]">Deliverables</span>
                             <div className="flex flex-wrap gap-1">
                                {agent.toolCard.outputDelivered.map((output, i) => (
                                    <span key={i} className="px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-[4px] text-[9px] font-bold text-blue-200 uppercase tracking-wide">
                                        {output}
                                    </span>
                                ))}
                             </div>
                        </div>

                        <div className="flex items-center justify-between bg-slate-900/50 p-2 rounded-lg border border-white/5 mt-2">
                             <span className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em]">Next Node</span>
                             <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">{agent.toolCard.bestNextStep}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
