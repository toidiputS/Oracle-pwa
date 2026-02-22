import React, { useState, useMemo, useRef } from 'react';
import { Agent, OracleConfig } from '../types';
import { ORACLE_NODE } from '../constants';
import { AgentCard } from './AgentCard';
import { AgentOverlay } from './AgentOverlay';

export interface NexusGridProps {
    agents: Agent[];
    config?: OracleConfig;
    onUpdateAgent?: (agent: Agent) => void;
    onAddAgent?: () => void;
    onDeleteAgent?: (id: string) => void;
    onUpdateConfig?: (config: OracleConfig) => void;
    onLaunchAgent?: (agent: Agent) => void;
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
    const [viewMode, setViewMode] = useState<'grid' | 'dossier' | 'squads'>('grid');
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
    const scrollRef = useRef<HTMLDivElement>(null);

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

    const renderSquadsMode = () => {
        const squads = new Map<string, Agent[]>();
        
        // Add ORACLE_NODE manually
        if (ORACLE_NODE.squad) {
             const squadId = ORACLE_NODE.squad.id;
             if (!squads.has(squadId)) {
                 squads.set(squadId, []);
             }
             squads.get(squadId)?.push(ORACLE_NODE);
        }

        sortedAgents.forEach(a => {
            if (a.squad) {
                const squadId = a.squad.id;
                if (!squads.has(squadId)) {
                    squads.set(squadId, []);
                }
                squads.get(squadId)?.push(a);
            }
        });

        // Sort squads by ID (SQUAD 1, SQUAD 2, etc.)
        const sortedSquadKeys = Array.from(squads.keys()).sort((a, b) => {
             if (a === 'COMMAND') return -1;
             if (b === 'COMMAND') return 1;
             const numA = parseInt(a.replace(/\D/g, '')) || 0;
             const numB = parseInt(b.replace(/\D/g, '')) || 0;
             return numA - numB;
        });

        return (
            <div className="space-y-12 max-w-7xl mx-auto px-4">
                {sortedSquadKeys.map(key => {
                    const squadAgents = squads.get(key) || [];
                    const squadData = squadAgents[0].squad!;
                    
                    // Determine border color based on squad color string
                    let borderColor = 'border-slate-500';
                    if (squadData.color.includes('Blue')) borderColor = 'border-blue-500';
                    else if (squadData.color.includes('Indigo')) borderColor = 'border-indigo-500';
                    else if (squadData.color.includes('Teal')) borderColor = 'border-teal-500';
                    else if (squadData.color.includes('Crimson') || squadData.color.includes('Red')) borderColor = 'border-red-500';
                    else if (squadData.color.includes('Amber') || squadData.color.includes('Orange')) borderColor = 'border-amber-500';
                    else if (squadData.color.includes('Emerald') || squadData.color.includes('Green')) borderColor = 'border-emerald-500';
                    else if (squadData.color.includes('Violet') || squadData.color.includes('Purple')) borderColor = 'border-violet-500';
                    else if (squadData.color.includes('Rose') || squadData.color.includes('Pink')) borderColor = 'border-rose-500';

                    return (
                        <div key={key} className="space-y-6 animate-fade-in-up">
                            {/* Squad Header */}
                            <div className={`border-l-4 ${borderColor} pl-6 py-2 bg-gradient-to-r from-white/5 to-transparent rounded-r-2xl`}>
                                <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter italic mb-2 flex items-center gap-3">
                                    {squadData.id} <span className="text-slate-500 text-2xl not-italic">//</span> {squadData.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400">
                                    <span className="bg-cyan-950/30 px-2 py-1 rounded border border-cyan-500/20">DOMAIN: {squadData.domain}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block"></span>
                                    <span className="text-slate-500">UNITS: {squadAgents.length}</span>
                                </div>
                            </div>

                            {/* Squad Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {squadAgents.map(agent => (
                                    <div 
                                        key={agent.id} 
                                        onClick={() => setSelectedAgent(agent)}
                                        className="group relative bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 rounded-2xl p-5 transition-all cursor-pointer hover:bg-slate-900/60 hover:-translate-y-1"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl border border-white/10 group-hover:border-cyan-500/30 transition-colors shadow-inner">
                                                    {agent.id === 'ORACLE' ? '🔮' : agent.icon}
                                                </div>
                                                <div>
                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">{agent.id}</span>
                                                    <h4 className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-cyan-400 transition-colors truncate max-w-[140px]">{agent.name}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                                                <span className="text-[7px] text-slate-500 font-black uppercase tracking-[0.2em] block mb-1.5">Pain Point</span>
                                                <p className="text-[10px] text-slate-300 italic leading-relaxed line-clamp-2">
                                                    "{agent.oracleInsight}"
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-[7px] text-slate-500 font-black uppercase tracking-[0.2em] block mb-1.5">Artifact</span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {(agent.toolCard?.outputDelivered || []).slice(0, 2).map((o, i) => (
                                                        <span key={i} className="px-2 py-1 bg-emerald-500/5 rounded-md text-[8px] font-bold text-emerald-400/80 uppercase tracking-wide border border-emerald-500/10 truncate max-w-full">
                                                            {o}
                                                        </span>
                                                    ))}
                                                    {(agent.toolCard?.outputDelivered?.length || 0) > 2 && (
                                                        <span className="px-1.5 py-1 text-[8px] text-slate-600 font-bold">+{(agent.toolCard?.outputDelivered?.length || 0) - 2}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const handleExportDossier = () => {
        const header = "NEXUS TACTICAL REGISTRY - FULL FORENSIC DOSSIER\n==============================================\n\n";
        
        // 1. Detailed Agent Dossiers
        const agentContent = sortedAgents.map(a => {
            const tc = a.toolCard;
            const prev = a.suggestedPreviousNode ? `PREV_NODE: ${a.suggestedPreviousNode}\n` : '';
            const next = `NEXT_NODE: ${a.suggestedNextNode || tc?.bestNextStep || "ORACLE"}`;
            const squadInfo = a.squad ? `SQUAD: ${a.squad.id} // ${a.squad.name} (${a.squad.domain})\n` : '';
            
            return `NODE: ${a.id} // ${a.name}
ROLE: ${a.role}
${squadInfo}PURPOSE: ${tc?.purpose || a.description}

01_MISSION_PURPOSE: ${tc?.purpose || a.description}

02_PRE_FLIGHT_LOGIC:
  Deploy_When: ${(tc?.useThisWhen || []).join(', ')}
  Abstain_When: ${(tc?.doNotUseWhen || []).join(', ')}

03_INPUT_INVENTORY: ${tc?.inputNeeded || "N/A"}

04_DELIVERABLES:
${(tc?.outputDelivered || []).map(o => `  - ${o}`).join('\n')}

05_ORACLE_INSIGHT: "${a.oracleInsight || "N/A"}"

${prev}${next}
----------------------------------
`;
        }).join('\n');

        // 2. Squad Grouping Section
        const squads = new Map<string, Agent[]>();
        
        // Add ORACLE_NODE manually
        if (ORACLE_NODE.squad) {
             const squadId = ORACLE_NODE.squad.id;
             if (!squads.has(squadId)) {
                 squads.set(squadId, []);
             }
             squads.get(squadId)?.push(ORACLE_NODE);
        }

        sortedAgents.forEach(a => {
            if (a.squad) {
                const squadId = a.squad.id;
                if (!squads.has(squadId)) {
                    squads.set(squadId, []);
                }
                squads.get(squadId)?.push(a);
            }
        });

        // Sort squads by ID (SQUAD 1, SQUAD 2, etc.)
        const sortedSquadKeys = Array.from(squads.keys()).sort((a, b) => {
             if (a === 'COMMAND') return -1;
             if (b === 'COMMAND') return 1;
             const numA = parseInt(a.replace(/\D/g, '')) || 0;
             const numB = parseInt(b.replace(/\D/g, '')) || 0;
             return numA - numB;
        });

        const squadContent = "\n\nTACTICAL SQUAD FORMATIONS\n=========================\n\n" + sortedSquadKeys.map(key => {
            const squadAgents = squads.get(key) || [];
            const squadData = squadAgents[0].squad!; // Safe because we only add if squad exists
            
            const header = `${squadData.id} — ${squadData.name} ${squadData.domain} · ${squadData.color}\n`;
            const tableHeader = "ID\tNode\tPain\tArtifact\n";
            const rows = squadAgents.map(a => {
                const pain = a.oracleInsight?.replace(/"/g, '') || "N/A";
                const artifact = (a.toolCard?.outputDelivered || []).join(' / ');
                return `${a.id}\t${a.name.toUpperCase()}\t"${pain}"\t${artifact}`;
            }).join('\n');
            
            return `${header}${tableHeader}${rows}\n`;
        }).join('\n');
        
        navigator.clipboard.writeText(header + agentContent + squadContent).then(() => {
            setCopyStatus('copied');
            setTimeout(() => setCopyStatus('idle'), 3000);
        });
    };

    const renderDossierMode = () => (
        <div className="space-y-6 max-w-5xl mx-auto px-4">
            {sortedAgents.map(agent => (
                <div key={agent.id} className="bg-slate-900/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl transition-all hover:border-cyan-500/30 group">
                    <div className={`h-2 bg-gradient-to-r ${agent.color} opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                    <div className="p-6 sm:p-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-white/5">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center text-3xl shadow-2xl">
                                    {agent.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[10px] font-black text-white bg-white/10 border border-white/20 px-2 py-0.5 rounded uppercase tracking-widest">{agent.id}</span>
                                        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{agent.name}</h3>
                                    </div>
                                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-[0.4em] italic block">{agent.role}</span>
                                    {agent.squad && (
                                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2 block">
                                            {agent.squad.id} // {agent.squad.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col md:items-end">
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-2">Operational Vector</span>
                                <div className="flex flex-wrap justify-end gap-2">
                                    {agent.suggestedPreviousNode && (
                                        <span className="text-xs sm:text-sm font-black text-slate-400 bg-white/5 border border-white/10 px-3 py-2 rounded-xl italic">PREV: {agent.suggestedPreviousNode}</span>
                                    )}
                                    <span className="text-xs sm:text-sm font-black text-white bg-white/5 border border-white/10 px-3 py-2 rounded-xl italic">NEXT: {agent.suggestedNextNode || agent.toolCard?.bestNextStep || "SYSTEM_ORACLE"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="space-y-8">
                                <section>
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> 01_MISSION_PURPOSE
                                    </h4>
                                    <p className="text-slate-100 text-lg leading-relaxed font-light italic">{agent.toolCard?.purpose || agent.description}</p>
                                </section>

                                <section>
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 02_PRE_FLIGHT_LOGIC
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                            <span className="text-[9px] text-green-400 font-black uppercase tracking-widest block mb-2">Deploy_When:</span>
                                            <ul className="list-none space-y-2">
                                                {(agent.toolCard?.useThisWhen || []).map((t, i) => (
                                                    <li key={i} className="text-sm text-slate-300 flex items-center gap-3">
                                                        <span className="text-green-500 font-bold">✓</span> {t}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                            <span className="text-[9px] text-red-400 font-black uppercase tracking-widest block mb-2">Abstain_When:</span>
                                            <ul className="list-none space-y-2">
                                                {(agent.toolCard?.doNotUseWhen || []).map((t, i) => (
                                                    <li key={i} className="text-sm text-slate-400 flex items-center gap-3">
                                                        <span className="text-red-500 font-bold">✕</span> {t}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="space-y-8">
                                <section>
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> 03_INPUT_INVENTORY
                                    </h4>
                                    <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 font-mono text-sm text-cyan-200/80 leading-relaxed shadow-inner">
                                        {agent.toolCard?.inputNeeded || "No manual data required."}
                                    </div>
                                </section>

                                <section>
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 04_DELIVERABLES
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(agent.toolCard?.outputDelivered || []).map((item, i) => (
                                            <div key={i} className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-300">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                                
                                <section>
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span> 05_ORACLE_INSIGHT
                                    </h4>
                                    <p className="text-slate-500 text-xs italic font-medium leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
                                        "{agent.oracleInsight}"
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex-1 flex flex-col w-full h-full overflow-hidden relative bg-[#020617]">
            <main ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-6 scrollbar-hide pb-32 sm:pb-40">
                <div className="max-w-[2000px] mx-auto">
                    {/* Header & Controls */}
                    <div className="mb-6 sm:mb-10 flex flex-col lg:flex-row lg:items-end justify-between px-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl sm:text-4xl font-black text-white mb-2 tracking-tighter uppercase italic">
                                {viewMode === 'grid' ? 'SOVEREIGN_NODE_LIBRARY' : 'TACTICAL_DOSSIER_REPORT'}
                            </h2>
                            <p className="text-slate-600 text-[8px] sm:text-xs font-mono uppercase tracking-[0.2em]">
                                {sortedAgents.length} ACTIVE EXECUTION UNITS // REGISTRY_STATUS: SECURE
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3">
                            {/* VIEW MODE TOGGLE */}
                            <div className="flex items-center gap-1.5 bg-slate-900/50 p-1.5 rounded-xl border border-white/10 backdrop-blur-xl shadow-lg">
                                <button 
                                    onClick={() => setViewMode('grid')} 
                                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-500 hover:text-white'}`}
                                >
                                    GRID
                                </button>
                                <button 
                                    onClick={() => setViewMode('dossier')} 
                                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'dossier' ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-500 hover:text-white'}`}
                                >
                                    DOSSIER
                                </button>
                                <button 
                                    onClick={() => setViewMode('squads')} 
                                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'squads' ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-500 hover:text-white'}`}
                                >
                                    SQUADS
                                </button>
                            </div>

                            <button 
                                onClick={handleExportDossier}
                                className={`px-6 py-2 border text-[10px] font-black uppercase tracking-[0.3em] rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2 ${copyStatus === 'copied' ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-white/5 border-white/20 text-slate-300 hover:bg-white/10 hover:border-white/40'}`}
                            >
                                {copyStatus === 'copied' ? '✓ DOSSIER_COPIED' : '⧉ EXPORT_TACTICAL_DATA'}
                            </button>

                            {effectiveConfig.isAdmin && (
                                <button 
                                    onClick={onAddAgent}
                                    className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] active:scale-95"
                                    data-oracle-info="Initialising a new sovereign node in the Nexus fleet."
                                >
                                    + INIT_NEW_NODE
                                </button>
                            )}

                            {viewMode === 'grid' && (
                                <div className="flex items-center gap-1.5 bg-slate-900/50 p-1.5 rounded-xl border border-white/10 backdrop-blur-xl shadow-lg overflow-x-auto scrollbar-hide">
                                    {(['id', 'name', 'role'] as const).map((key) => (
                                        <button key={key} onClick={() => toggleSort(key)} className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${sortBy === key ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                                            {key} {sortBy === key && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Rendering */}
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 sm:gap-5">
                            {sortedAgents.map(a => (
                                <AgentCard key={a.id} agent={a} onClick={setSelectedAgent} />
                            ))}
                        </div>
                    ) : viewMode === 'dossier' ? (
                        renderDossierMode()
                    ) : (
                        renderSquadsMode()
                    )}
                </div>
            </main>

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