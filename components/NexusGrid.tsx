import React, { useState, useMemo, useRef } from 'react';
import { Agent, OracleConfig } from '../types';
import { AgentCard } from './AgentCard';
import { AgentOverlay } from './AgentOverlay';

export interface NexusGridProps {
    agents: Agent[]; // Required for portability
    config?: OracleConfig;
    onUpdateAgent?: (agent: Agent) => void;
    onAddAgent?: () => void;
    onDeleteAgent?: (id: string) => void;
    onUpdateConfig?: (config: OracleConfig) => void;
    onLaunchAgent?: (agent: Agent) => void; // Support for external handling
}

export const NexusGrid: React.FC<NexusGridProps> = ({ 
    agents, 
    config,
    onUpdateAgent = () => {},
    onAddAgent = () => {},
    onDeleteAgent = () => {},
    onUpdateConfig = () => {},
    onLaunchAgent
}) => {
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [sortBy, setSortBy] = useState<'id' | 'name' | 'role'>('id');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Default config if used standalone
    const effectiveConfig = config || {
        temperature: 0.7,
        maxQuestions: 5,
        tone: "Elite Authority",
        thinkingEnabled: false,
        isAdmin: false
    };

    const toggleSort = (key: 'id' | 'name' | 'role') => {
        if (sortBy === key) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortDirection('asc');
        }
    };

    const sortedAgents = useMemo(() => {
        return [...agents].filter(a => a.id !== 'ORACLE' && a.id !== 'ONE').sort((a, b) => {
             let comparison = 0;
             if (sortBy === 'id') {
                 comparison = a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
             } else if (sortBy === 'name') {
                 comparison = a.name.localeCompare(b.name);
             } else if (sortBy === 'role') {
                 comparison = a.role.localeCompare(b.role);
             }
             return sortDirection === 'asc' ? comparison : -comparison;
        });
    }, [agents, sortBy, sortDirection]);

    return (
        <div className="flex-1 flex flex-col w-full h-full overflow-hidden relative bg-[#020617]">
            <main ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-6 scrollbar-hide pb-32 sm:pb-40">
                <div className="max-w-[2000px] mx-auto">
                    {/* Header & Controls */}
                    <div className="mb-6 sm:mb-10 flex flex-col lg:flex-row lg:items-end justify-between px-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl sm:text-4xl font-black text-white mb-2 tracking-tighter uppercase italic">SOVEREIGN_NODE_LIBRARY</h2>
                            <p className="text-slate-600 text-[8px] sm:text-xs font-mono uppercase tracking-[0.2em]">
                                {sortedAgents.length} ACTIVE EXECUTION UNITS // BIOMETRIC_SYNC_ESTABLISHED
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3">
                            {effectiveConfig.isAdmin && (
                                <button 
                                    onClick={onAddAgent}
                                    className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] active:scale-95"
                                    data-oracle-info="Initialising a new sovereign node in the Nexus fleet."
                                >
                                    + INIT_NEW_NODE
                                </button>
                            )}

                            <div className="flex items-center gap-1.5 bg-slate-900/50 p-1.5 rounded-xl border border-white/10 backdrop-blur-xl shadow-lg overflow-x-auto scrollbar-hide">
                                {(['id', 'name', 'role'] as const).map((key) => (
                                    <button key={key} onClick={() => toggleSort(key)} className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${sortBy === key ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                                        {key} {sortBy === key && (sortDirection === 'asc' ? '↑' : '↓')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* The Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 sm:gap-5">
                        {sortedAgents.map(a => (
                            <AgentCard key={a.id} agent={a} onClick={setSelectedAgent} />
                        ))}
                    </div>
                </div>
            </main>

            {/* Internal Overlay for Self-Contained Logic */}
            <AgentOverlay 
                agent={selectedAgent} 
                onClose={() => setSelectedAgent(null)} 
                allAgents={agents} 
                config={effectiveConfig} 
                onUpdateAgent={onUpdateAgent} 
                onAddAgent={onAddAgent} 
                onDeleteAgent={onDeleteAgent} 
                onUpdateConfig={onUpdateConfig} 
                onNavigate={(agent) => setSelectedAgent(agent)}
                onLaunch={onLaunchAgent}
            />
        </div>
    );
};