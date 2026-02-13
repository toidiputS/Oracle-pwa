import React, { useState, useEffect, useRef } from 'react';
import { Agent, OracleConfig, ToolCard } from '../types';
import { NeuralCore } from './NeuralCore';

interface AgentOverlayProps {
    agent: Agent | null;
    onClose: () => void;
    allAgents: Agent[];
    config: OracleConfig;
    onUpdateAgent: (agent: Agent) => void;
    onAddAgent: () => void;
    onDeleteAgent: (id: string) => void;
    onUpdateConfig: (config: OracleConfig) => void;
    onNavigate: (agent: Agent) => void;
    onLaunch?: (agent: Agent) => void;
}

const COLOR_OPTIONS = [
    { name: "Slate", class: "from-slate-600 to-slate-800" },
    { name: "Indigo", class: "from-blue-600 to-indigo-700" },
    { name: "Amber", class: "from-amber-500 to-yellow-600" },
    { name: "Red", class: "from-orange-500 to-red-500" },
    { name: "Cyan", class: "from-cyan-400 to-blue-500" },
    { name: "Green", class: "from-green-600 to-emerald-700" },
    { name: "Violet", class: "from-violet-600 to-purple-800" },
    { name: "Rose", class: "from-pink-500 to-rose-600" }
];

const renderIcon = (icon: string) => {
    const isImage = icon.startsWith('data:') || icon.startsWith('http');
    if (isImage) {
        return <img src={icon} alt="icon" className="w-full h-full object-cover rounded-md" />;
    }
    return icon;
};

export const AgentOverlay: React.FC<AgentOverlayProps> = ({ 
    agent, 
    onClose, 
    allAgents, 
    config, 
    onUpdateAgent, 
    onAddAgent, 
    onDeleteAgent,
    onUpdateConfig,
    onNavigate,
    onLaunch
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedAgent, setEditedAgent] = useState<Agent | null>(null);

    // Calculate navigation neighbors based on allAgents list
    const agentIndex = agent ? allAgents.findIndex(a => a.id === agent.id) : -1;
    const prevAgent = agentIndex > 0 ? allAgents[agentIndex - 1] : null;
    const nextAgent = agentIndex !== -1 && agentIndex < allAgents.length - 1 ? allAgents[agentIndex + 1] : null;

    // Handle launching the external agent interface
    const handleLaunch = () => {
        if (agent?.url) {
            if (onLaunch) {
                onLaunch(agent);
            } else {
                window.open(agent.url, '_blank');
            }
        }
    };

    useEffect(() => {
        if (agent) {
            setEditedAgent(JSON.parse(JSON.stringify(agent))); 
            // If it's a new agent or we're in admin mode, default to editing if it's the specific "NEW" unit
            if (agent.id.startsWith('NEW') && config.isAdmin) {
                setIsEditing(true);
            } else {
                setIsEditing(false);
            }
        }
    }, [agent, config.isAdmin]);

    const handleSave = () => {
        if (editedAgent) {
            onUpdateAgent(editedAgent);
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        if (agent && window.confirm("Are you sure you want to delete this agent node?")) {
            onDeleteAgent(agent.id);
            onClose();
        }
    };

    const updateToolCard = (updates: Partial<ToolCard>) => {
        if (!editedAgent) return;
        setEditedAgent({
            ...editedAgent,
            toolCard: {
                ...(editedAgent.toolCard || {
                    purpose: "",
                    useThisWhen: [],
                    inputNeeded: "",
                    outputDelivered: [],
                    doNotUseWhen: [],
                    bestNextStep: ""
                }),
                ...updates
            }
        });
    };

    const handleArrayInput = (key: keyof ToolCard, value: string) => {
        const items = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
        updateToolCard({ [key]: items });
    };

    if (!agent) return null;

    // --- ADMIN EDIT VIEW ---
    if (isEditing && editedAgent && config.isAdmin) {
         return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fade-in">
                <div className="relative w-full max-w-5xl bg-[#020617] border border-cyan-500/30 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[95vh] animate-scale-in">
                     <div className="h-20 bg-slate-900/60 border-b border-white/10 flex items-center justify-between px-8 shrink-0">
                        <h2 className="text-white font-black uppercase tracking-[0.3em] text-xs italic flex items-center gap-3">
                            <span className="text-cyan-400 text-lg">⚙️</span> Node Dashboard: <span className="text-cyan-400">{editedAgent.id}</span>
                        </h2>
                        <div className="flex gap-4">
                            <button onClick={handleDelete} className="px-4 py-2 text-red-500 hover:text-red-400 text-[10px] uppercase tracking-widest transition-all font-bold">Delete Unit</button>
                            <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-500 hover:text-white text-[10px] uppercase tracking-widest transition-all font-bold">Exit Mode</button>
                        </div>
                     </div>
                     <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1)_0%,transparent_50%)]">
                         
                         {/* BASIC IDENTITY */}
                         <section className="space-y-6">
                              <h3 className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> Identity_Matrix
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <div className="space-y-2">
                                      <label className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Node ID</label>
                                      <input className="w-full bg-slate-950/50 border border-white/5 rounded-xl p-4 text-white text-sm focus:border-cyan-500 outline-none font-bold" value={editedAgent.id} onChange={e => setEditedAgent({...editedAgent, id: e.target.value})} placeholder="e.g. Z1" />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Name</label>
                                      <input className="w-full bg-slate-950/50 border border-white/5 rounded-xl p-4 text-white text-sm focus:border-cyan-500 outline-none font-bold" value={editedAgent.name} onChange={e => setEditedAgent({...editedAgent, name: e.target.value})} placeholder="e.g. Arbiter" />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Role</label>
                                      <input className="w-full bg-slate-950/50 border border-white/5 rounded-xl p-4 text-white text-sm focus:border-cyan-500 outline-none font-bold" value={editedAgent.role} onChange={e => setEditedAgent({...editedAgent, role: e.target.value})} placeholder="e.g. Contracts" />
                                  </div>
                              </div>
                         </section>

                         {/* NARRATIVE & INSIGHT */}
                         <section className="space-y-6">
                              <h3 className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Neural_Narrative
                              </h3>
                              <div className="grid grid-cols-1 gap-6">
                                  <div className="space-y-2">
                                      <label className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Description</label>
                                      <textarea className="w-full bg-slate-950/50 border border-white/5 rounded-xl p-4 text-white text-sm focus:border-cyan-500 outline-none font-medium h-24" value={editedAgent.description} onChange={e => setEditedAgent({...editedAgent, description: e.target.value})} />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Oracle Insight (Whisper)</label>
                                      <input className="w-full bg-slate-950/50 border border-white/5 rounded-xl p-4 text-white text-sm focus:border-cyan-500 outline-none font-bold italic" value={editedAgent.oracleInsight} onChange={e => setEditedAgent({...editedAgent, oracleInsight: e.target.value})} placeholder="What the orb whispers on hover..." />
                                  </div>
                              </div>
                         </section>

                         {/* CAPABILITIES (TOOLCARD) */}
                         <section className="space-y-6">
                              <h3 className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Operation_Specs
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                      <label className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Mission Purpose</label>
                                      <input className="w-full bg-slate-950/50 border border-white/5 rounded-xl p-4 text-white text-sm focus:border-cyan-500 outline-none font-medium" value={editedAgent.toolCard?.purpose} onChange={e => updateToolCard({ purpose: e.target.value })} />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Inputs Required</label>
                                      <input className="w-full bg-slate-950/50 border border-white/5 rounded-xl p-4 text-white text-sm focus:border-cyan-500 outline-none font-mono" value={editedAgent.toolCard?.inputNeeded} onChange={e => updateToolCard({ inputNeeded: e.target.value })} />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Triggers (Comma Separated)</label>
                                      <input className="w-full bg-slate-950/50 border border-white/5 rounded-xl p-4 text-white text-sm focus:border-cyan-500 outline-none" value={editedAgent.toolCard?.useThisWhen.join(', ')} onChange={e => handleArrayInput('useThisWhen', e.target.value)} />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Outputs (Comma Separated)</label>
                                      <input className="w-full bg-slate-950/50 border border-white/5 rounded-xl p-4 text-white text-sm focus:border-cyan-500 outline-none" value={editedAgent.toolCard?.outputDelivered.join(', ')} onChange={e => handleArrayInput('outputDelivered', e.target.value)} />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Next Recommended Node</label>
                                      <input className="w-full bg-slate-950/50 border border-white/5 rounded-xl p-4 text-white text-sm focus:border-cyan-500 outline-none font-black" value={editedAgent.toolCard?.bestNextStep} onChange={e => updateToolCard({ bestNextStep: e.target.value })} />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Theme Profile</label>
                                      <select className="w-full bg-slate-950/50 border border-white/5 rounded-xl p-4 text-white text-sm outline-none font-bold appearance-none" value={editedAgent.color} onChange={e => setEditedAgent({...editedAgent, color: e.target.value})}>
                                          {COLOR_OPTIONS.map(opt => <option key={opt.class} value={opt.class} className="bg-slate-900">{opt.name}</option>)}
                                      </select>
                                  </div>
                              </div>
                         </section>

                         <button onClick={handleSave} className="w-full py-6 bg-cyan-500 text-black text-xs font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-white transition-all shadow-2xl active:scale-[0.98]">
                             Transmit_Node_Logic
                         </button>
                     </div>
                </div>
            </div>
         );
    }

    // --- MAIN OPTIMIZED VIEW ---
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl animate-fade-in">
            <div className="relative w-full max-w-4xl bg-[#020617] border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl animate-scale-in flex flex-col h-auto max-h-[95vh] sm:max-h-[90vh]">
                
                {/* COMPACT HEADER (Mobile Optimized) */}
                <div className={`shrink-0 h-24 sm:h-36 bg-gradient-to-br ${agent.color} relative overflow-hidden flex flex-col justify-end p-5 sm:p-8`}>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
                    {agent.id === 'ONE' && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none transform scale-[1.5]">
                            <NeuralCore size={400} />
                        </div>
                    )}
                    <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 transition-all">✕</button>
                    {config.isAdmin && agent.id !== 'ONE' && (
                        <button onClick={() => setIsEditing(true)} className="absolute top-4 left-4 z-50 h-6 px-3 rounded-full bg-cyan-500 hover:bg-white hover:text-black text-black flex items-center justify-center border border-white/10 text-[8px] uppercase tracking-[0.2em] font-black transition-all">Command_Center</button>
                    )}
                    
                    <div className="relative z-10 flex items-end justify-between">
                         <div className="flex items-center gap-4 sm:gap-5">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#020617]/90 border border-white/10 flex items-center justify-center text-2xl sm:text-3xl shadow-2xl shrink-0">
                                {agent.id === 'ONE' ? <NeuralCore size={30} smSize={40} /> : renderIcon(agent.icon)}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                                    <span className="text-[9px] sm:text-[10px] font-black text-white bg-white/10 border border-white/20 px-1.5 py-0.5 rounded uppercase tracking-widest">{agent.id}</span>
                                    <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">{agent.name}</h2>
                                </div>
                                <span className="text-[8px] sm:text-[9px] text-white/80 font-bold uppercase tracking-[0.3em]">{agent.role}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COMPACT BODY - Single Card View */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-8 bg-[#020617] scrollbar-hide">
                    <div className="space-y-3 sm:space-y-8">
                        
                        {/* 1. MISSION & INVENTORY - 2 Cols */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-6">
                             <div className="bg-slate-900/40 border border-white/5 p-3 sm:p-6 rounded-xl sm:rounded-[1.5rem] shadow-inner flex flex-col">
                                <h4 className="text-[7px] sm:text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-2 sm:mb-4 flex items-center gap-2">
                                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white"></span>
                                    Mission
                                </h4>
                                <p className="text-slate-100 text-[10px] sm:text-lg leading-snug sm:leading-relaxed font-light italic flex-1">{agent.toolCard?.purpose || agent.description}</p>
                            </div>
                            <div className="bg-slate-900/40 border border-white/5 p-3 sm:p-6 rounded-xl sm:rounded-[1.5rem] shadow-inner flex flex-col">
                                <h4 className="text-[7px] sm:text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-2 sm:mb-4 flex items-center gap-2">
                                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-600"></span>
                                    Inventory
                                </h4>
                                <p className="text-slate-300 text-[9px] sm:text-sm font-mono leading-snug sm:leading-relaxed bg-black/40 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-white/5 flex-1">{agent.toolCard?.inputNeeded || "None"}</p>
                            </div>
                        </div>

                        {/* 2. TRIGGERS & CONSTRAINTS - 2 Cols */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-6">
                            <div className="space-y-2 sm:space-y-4">
                                <h4 className="text-[7px] sm:text-[8px] font-black text-green-500 uppercase tracking-[0.3em] sm:tracking-[0.5em] ml-1 sm:ml-2">Triggers</h4>
                                <div className="grid gap-1 sm:gap-2">
                                    {(agent.toolCard?.useThisWhen || ["Request"]).map((trigger, idx) => (
                                        <div key={idx} className="bg-green-500/5 border border-green-500/10 p-2 sm:p-3 rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3">
                                            <span className="text-green-500 text-[8px] sm:text-xs">✓</span>
                                            <p className="text-slate-300 text-[8px] sm:text-xs font-bold uppercase tracking-wide truncate">{trigger}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2 sm:space-y-4">
                                <h4 className="text-[7px] sm:text-[8px] font-black text-red-500 uppercase tracking-[0.3em] sm:tracking-[0.5em] ml-1 sm:ml-2">Constraints</h4>
                                <div className="grid gap-1 sm:gap-2">
                                    {(agent.toolCard?.doNotUseWhen || ["None"]).map((constraint, idx) => (
                                        <div key={idx} className="bg-red-500/5 border border-red-500/10 p-2 sm:p-3 rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3">
                                            <span className="text-red-500 text-[8px] sm:text-xs">✕</span>
                                            <p className="text-slate-300 text-[8px] sm:text-xs font-bold uppercase tracking-wide truncate">{constraint}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                         <div className="h-px bg-white/5 w-full hidden sm:block"></div>

                        {/* 3. DELIVERABLES & SECTORS - 2 Cols */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-6">
                             <div className="space-y-2 sm:space-y-4">
                                <h4 className="text-[7px] sm:text-[8px] font-black text-blue-400 uppercase tracking-[0.3em] sm:tracking-[0.5em] ml-1 sm:ml-2">Outputs</h4>
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                    {(agent.toolCard?.outputDelivered || []).map((item, i) => (
                                        <div key={i} className="px-2 py-1 sm:px-4 sm:py-2 bg-slate-800 border border-white/10 rounded sm:rounded-lg text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-blue-200 shadow-lg truncate max-w-full">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                             <div className="space-y-2 sm:space-y-4">
                                <h4 className="text-[7px] sm:text-[8px] font-black text-purple-400 uppercase tracking-[0.3em] sm:tracking-[0.5em] ml-1 sm:ml-2">Sectors</h4>
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                    {(agent.toolCard?.useCases || []).map((item, i) => (
                                        <div key={i} className="px-2 py-1 sm:px-3 sm:py-1.5 bg-purple-500/10 border border-purple-500/20 rounded sm:rounded-md text-[7px] sm:text-[9px] font-bold uppercase tracking-wider text-purple-300 truncate max-w-full">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 4. SUGGESTED NODES */}
                        <div className="mt-2 sm:mt-0">
                            <h4 className="text-[7px] sm:text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] sm:tracking-[0.5em] ml-1 sm:ml-2 mb-2">Suggested Nodes</h4>
                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                {prevAgent ? (
                                    <div 
                                        onClick={() => onNavigate(prevAgent)}
                                        className="bg-slate-900/40 border border-white/5 p-3 sm:p-5 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4 cursor-pointer hover:border-white/20 hover:bg-slate-900/80 transition-all active:scale-[0.99] group h-full"
                                    >
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-all">
                                            ←
                                        </div>
                                        <div className="overflow-hidden">
                                            <span className="text-[7px] sm:text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] block">Prev</span>
                                            <div className="text-white font-bold text-xs sm:text-sm italic truncate">{prevAgent.id} // {prevAgent.name}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="border border-dashed border-white/5 rounded-xl sm:rounded-2xl"></div>
                                )}

                                {nextAgent ? (
                                    <div 
                                        onClick={() => onNavigate(nextAgent)}
                                        className="bg-slate-900/40 border border-white/5 p-3 sm:p-5 rounded-xl sm:rounded-2xl flex items-center justify-end gap-3 sm:gap-4 cursor-pointer hover:border-white/20 hover:bg-slate-900/80 transition-all active:scale-[0.99] group h-full text-right"
                                    >
                                        <div className="overflow-hidden">
                                            <span className="text-[7px] sm:text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] block">Next</span>
                                            <div className="text-white font-bold text-xs sm:text-sm italic truncate">{nextAgent.id} // {nextAgent.name}</div>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-all">
                                            →
                                        </div>
                                    </div>
                                ) : (
                                    <div className="border border-dashed border-white/5 rounded-xl sm:rounded-2xl"></div>
                                )}
                            </div>
                        </div>

                        <div className="h-2 sm:h-4"></div>

                        {/* Footer Actions */}
                        <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center pt-2 sm:pt-4 border-t border-white/5 pb-4 sm:pb-0">
                            {agent.url && (
                                <button onClick={handleLaunch} className="btn-reflect-base btn-reflect-primary w-full md:w-auto">
                                    <span className="btn-content px-10 sm:px-20 py-3 sm:py-5 text-xs sm:text-sm">
                                        Launch Interface
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};