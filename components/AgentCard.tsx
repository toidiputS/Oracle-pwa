
import React from 'react';
import { Agent } from '../types';

interface AgentCardProps {
    agent: Agent;
    onClick: (agent: Agent) => void;
}

export const renderIcon = (icon: string) => {
    const isImage = icon.startsWith('/') || icon.startsWith('data:') || icon.startsWith('http');
    if (isImage) {
        return <img src={icon} alt="" className="w-full h-full object-contain p-1" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.15))' }} />;
    }
    return <span className="drop-shadow-lg">{icon}</span>;
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
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] truncate">{agent.name}</span>
                        </div>
                        <h3 className="text-[22px] font-black text-white italic tracking-tighter uppercase truncate leading-none mb-1">{agent.role}</h3>
                        {agent.squad && (
                            <span className="text-[8px] text-cyan-500/80 font-black uppercase tracking-widest truncate block mt-1">
                                {agent.squad.id} // {agent.squad.name}
                            </span>
                        )}
                    </div>
                </div>

                {/* Pain Points (Formerly Triggers) */}
                {agent.toolCard && agent.toolCard.useThisWhen.length > 0 && (
                    <div className="mb-4">
                        <div className="bg-red-950/20 border border-red-500/20 p-3 rounded-xl shadow-inner">
                            <span className="text-[7px] text-red-400 font-black uppercase tracking-[0.2em] block mb-2">Pain Points</span>
                            <ul className="space-y-1.5 list-none">
                                {agent.toolCard.useThisWhen.map((pain, i) => (
                                    <li key={i} className="text-[10px] text-red-100 font-bold flex items-start gap-2.5 leading-tight">
                                        <span className="text-red-500 mt-0.5 text-[10px] drop-shadow-[0_0_5px_rgba(239,68,68,0.8)] font-black">✕</span> <span className="uppercase tracking-wide">{pain}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Mission & Description */}
                <div className="mb-6 space-y-2">
                    <span className="text-[7px] text-cyan-400 font-black uppercase tracking-[0.2em] block">Node Mission</span>
                    {agent.oracleInsight && (
                        <p className="text-[11px] text-cyan-50 font-bold leading-tight italic border-l-2 border-cyan-500/30 pl-3">
                            "{agent.oracleInsight}"
                        </p>
                    )}
                    <p className="text-[9px] text-slate-300 font-medium leading-relaxed pl-3 block mt-2">
                        {agent.description}
                    </p>
                </div>

                {/* REAL DATA: Full Capabilities Section */}
                {agent.toolCard && (
                    <div className="mt-auto space-y-4 border-t border-white/5 pt-4">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em]">Constraints</span>
                            <div className="flex flex-wrap gap-1">
                                {agent.toolCard.doNotUseWhen.map((constraint, i) => (
                                    <span key={i} className="px-1.5 py-0.5 bg-orange-500/5 border border-orange-500/10 rounded-[4px] text-[9px] font-medium text-orange-300 uppercase tracking-wide">
                                        {constraint}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em]">Input Protocol</span>
                            <p className="text-[10px] text-slate-400 font-mono mt-1 leading-snug line-clamp-2">{agent.toolCard.inputNeeded}</p>
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

                        <div className="flex items-center justify-between bg-slate-900/50 p-2 rounded-lg border border-white/5 mt-2 gap-2">
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em]">Prev Node</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{agent.suggestedPreviousNode || "N/A"}</span>
                            </div>
                            <div className="h-6 w-[1px] bg-white/10"></div>
                            <div className="flex flex-col gap-1 text-right">
                                <span className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em]">Next Node</span>
                                <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">{agent.suggestedNextNode || agent.toolCard.bestNextStep}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
