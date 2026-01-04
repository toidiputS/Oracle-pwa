
import React, { useState, useEffect, useRef } from 'react';
import { Agent, OracleConfig, ToolCard } from '../types';

interface AgentOverlayProps {
    agent: Agent | null;
    onClose: () => void;
    allAgents: Agent[];
    config: OracleConfig;
    onUpdateAgent: (agent: Agent) => void;
    onAddAgent: () => void;
    onDeleteAgent: (id: string) => void;
    onUpdateConfig: (config: OracleConfig) => void;
}

const COLOR_OPTIONS = [
    "from-slate-600 to-slate-800", "from-blue-600 to-indigo-700", "from-amber-500 to-yellow-600",
    "from-orange-500 to-red-500", "from-cyan-400 to-blue-500", "from-green-600 to-emerald-700",
    "from-gray-600 to-gray-800", "from-slate-700 to-black", "from-indigo-500 to-purple-600",
    "from-pink-500 to-rose-600", "from-red-600 to-orange-600", "from-blue-500 to-cyan-500",
    "from-yellow-400 to-amber-500", "from-slate-500 to-gray-600", "from-violet-600 to-purple-800",
    "from-pink-500 to-red-500", "from-teal-400 to-teal-600", "from-green-500 to-lime-600",
    "from-fuchsia-500 to-purple-600", "from-sky-400 to-blue-500"
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
    onUpdateConfig
}) => {
    const [clickCount, setClickCount] = useState(0);
    const [secretInput, setSecretInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedAgent, setEditedAgent] = useState<Agent | null>(null);
    const colorInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (agent) {
            setEditedAgent(JSON.parse(JSON.stringify(agent))); 
            setClickCount(0);
            setSecretInput('');
            if (agent.id === 'NEW' && config.isAdmin) {
                setIsEditing(true);
            } else {
                setIsEditing(false);
            }
        }
    }, [agent, config.isAdmin]);

    const handleSecretSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (secretInput === 'trad34') {
            onUpdateConfig({ ...config, isAdmin: true });
            setSecretInput('');
            setClickCount(0);
        } else { 
            setClickCount(0); 
            setSecretInput(''); 
        }
    };

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result && editedAgent) {
                    setEditedAgent({ ...editedAgent, icon: event.target.result as string });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleCustomColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editedAgent) return;
        const color = e.target.value;
        const from = `[${color}]`;
        setEditedAgent({ ...editedAgent, color: `from-${from} to-slate-950` });
    };

    const updateToolCard = (field: keyof ToolCard, value: any) => {
        if (!editedAgent) return;
        setEditedAgent({
            ...editedAgent,
            toolCard: {
                ...editedAgent.toolCard || {
                    purpose: "",
                    useThisWhen: [],
                    inputNeeded: "",
                    outputDelivered: [],
                    doNotUseWhen: [],
                    bestNextStep: "",
                    useCases: []
                },
                [field]: value
            }
        });
    };

    const updateArrayField = (field: keyof ToolCard, index: number, value: string) => {
        if (!editedAgent) return;
        const toolCard = editedAgent.toolCard || {
            purpose: "",
            useThisWhen: [],
            inputNeeded: "",
            outputDelivered: [],
            doNotUseWhen: [],
            bestNextStep: "",
            useCases: []
        };
        const arr = [...(toolCard[field] as string[] || [])];
        arr[index] = value;
        updateToolCard(field, arr);
    };

    const addArrayItem = (field: keyof ToolCard) => {
        if (!editedAgent) return;
        const toolCard = editedAgent.toolCard || {
            purpose: "",
            useThisWhen: [],
            inputNeeded: "",
            outputDelivered: [],
            doNotUseWhen: [],
            bestNextStep: "",
            useCases: []
        };
        const arr = [...(toolCard[field] as string[] || [])];
        arr.push("");
        updateToolCard(field, arr);
    };

    const removeArrayItem = (field: keyof ToolCard, index: number) => {
        if (!editedAgent) return;
        const toolCard = editedAgent.toolCard || {
            purpose: "",
            useThisWhen: [],
            inputNeeded: "",
            outputDelivered: [],
            doNotUseWhen: [],
            bestNextStep: "",
            useCases: []
        };
        const arr = [...(toolCard[field] as string[] || [])];
        arr.splice(index, 1);
        updateToolCard(field, arr);
    };

    // --- INTEGRATION: PORTALS OS LAUNCH PROTOCOL ---
    const handleLaunch = () => {
        if (!agent) return;

        // Construct a 'PortalsNodeDefinition' payload
        // This tells the OS exactly how to render the new window
        const sector = agent.id === 'ORC' ? 'CORE_SYSTEM' : `SECTOR_${agent.id.charAt(0)}`;
        
        window.parent.postMessage({
            type: 'PORTALS_REQ_OPEN_NODE',
            node: {
                id: agent.id,
                label: `${agent.name} // ${agent.role}`,
                icon: agent.icon,
                themeGradient: agent.color,
                targetUrl: agent.url || `/?node=${agent.id}`,
                dimensions: {
                    width: agent.id === 'ORC' ? 600 : 1024,
                    height: agent.id === 'ORC' ? 850 : 768,
                },
                sector: sector,
                meta: agent.description
            }
        }, '*');

        // Fallback for standalone dev mode
        if (window.self === window.top && agent.url) {
             window.open(agent.url, '_blank');
        }
    };

    if (!agent) return null;

    // --- ARCHITECT CORE INTERFACE (ADMIN ONLY) ---
    if (config.isAdmin && agent.id === 'ORC' && !isEditing) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fade-in">
                <div className="w-full max-w-3xl bg-[#020617] border border-red-500/20 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                     <div className="p-6 md:p-8 border-b border-white/5 bg-slate-950/50 flex justify-between items-start">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-3 uppercase tracking-tighter italic">
                                <span className="text-red-500 text-2xl">⚡</span> Architect Core
                            </h2>
                            <p className="text-[9px] text-red-500 font-mono mt-2 tracking-[0.3em] uppercase">Sovereign_Access_Granted</p>
                        </div>
                        <div className="flex gap-2">
                             <button onClick={() => onUpdateConfig({...config, isAdmin: false})} className="px-3 py-1.5 bg-slate-900 border border-white/10 text-slate-400 text-[10px] uppercase rounded hover:text-white transition-all">Relinquish</button>
                             <button onClick={onClose} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all">✕</button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-8 scrollbar-hide pt-8">
                         <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Temperature</label>
                                        <span className="text-white font-mono text-lg font-bold">{config.temperature}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="1" 
                                        step="0.1" 
                                        value={config.temperature} 
                                        onChange={(e) => onUpdateConfig({...config, temperature: parseFloat(e.target.value)})} 
                                        className="w-full h-1 bg-slate-800 rounded-full appearance-none cursor-pointer accent-white" 
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Persona</label>
                                    <select 
                                        value={config.tone} 
                                        onChange={(e) => onUpdateConfig({...config, tone: e.target.value})} 
                                        className="w-full bg-slate-950/30 border border-white/10 text-white rounded-xl px-4 py-4 outline-none text-sm font-medium"
                                    >
                                        <option className="bg-slate-900 text-slate-300">Elite Authority</option>
                                        <option className="bg-slate-900 text-slate-300">Direct Response</option>
                                        <option className="bg-slate-900 text-slate-300">Empathetic Partner</option>
                                        <option className="bg-slate-900 text-slate-300">Clinical Logic</option>
                                    </select>
                                </div>
                         </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- EDIT MODE ---
    if (isEditing && editedAgent && config.isAdmin) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
                <div className="relative w-full max-w-5xl bg-[#020617] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
                    <div className="h-20 bg-slate-900/60 border-b border-white/5 flex items-center justify-between px-8 shrink-0">
                        <h2 className="text-white font-black uppercase tracking-[0.2em] text-xs italic">Configure Node: <span className="text-blue-500">{editedAgent.id}</span></h2>
                        <div className="flex items-center gap-4">
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 text-[10px] uppercase tracking-widest rounded-lg border border-red-600/20 transition-all font-black">Delete</button>
                            <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-500 hover:text-white text-[10px] uppercase tracking-widest transition-all font-bold">Cancel</button>
                            <button onClick={handleSave} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] uppercase tracking-widest rounded-lg shadow-2xl shadow-blue-600/40 transition-all font-black">Save Node</button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Node Identity</label>
                                <div className="grid grid-cols-4 gap-4">
                                  <input 
                                    className="col-span-1 bg-slate-950/50 border border-white/10 rounded-xl p-4 text-white text-sm font-black focus:border-blue-500 outline-none placeholder-slate-700" 
                                    placeholder="ID" 
                                    value={editedAgent.id} 
                                    onChange={e => setEditedAgent({...editedAgent, id: e.target.value.toUpperCase()})} 
                                  />
                                  <input 
                                    className="col-span-3 bg-slate-950/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-blue-500 outline-none placeholder-slate-700 font-bold" 
                                    placeholder="Name" 
                                    value={editedAgent.name} 
                                    onChange={e => setEditedAgent({...editedAgent, name: e.target.value})} 
                                  />
                                </div>
                                <input 
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-blue-500 outline-none placeholder-slate-700 font-bold" 
                                    placeholder="Strategy" 
                                    value={editedAgent.role} 
                                    onChange={e => setEditedAgent({...editedAgent, role: e.target.value})} 
                                />
                                <input 
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-blue-500 outline-none placeholder-slate-700 font-mono italic" 
                                    placeholder="https://nexus.ai/..." 
                                    value={editedAgent.url || ''} 
                                    onChange={e => setEditedAgent({...editedAgent, url: e.target.value})} 
                                />
                                <textarea 
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-blue-500 outline-none h-32 placeholder-slate-700 leading-relaxed font-medium italic" 
                                    placeholder="Description..." 
                                    value={editedAgent.description} 
                                    onChange={e => setEditedAgent({...editedAgent, description: e.target.value})} 
                                />
                            </div>

                            <div className="space-y-6">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Visuals</label>
                                <div className="flex gap-6 items-start p-6 bg-slate-950/30 border border-white/5 rounded-2xl relative overflow-hidden group">
                                    <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${editedAgent.color} flex items-center justify-center text-4xl border border-white/20 shrink-0 shadow-2xl relative z-10`}>
                                        {renderIcon(editedAgent.icon)}
                                    </div>
                                    <div className="flex-1 space-y-4 relative z-10 pt-2">
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs">▲</span>
                                            <input 
                                                className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white text-xs font-bold outline-none focus:border-blue-500" 
                                                placeholder="Icon Glyph" 
                                                value={editedAgent.icon} 
                                                onChange={e => setEditedAgent({...editedAgent, icon: e.target.value})} 
                                            />
                                        </div>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleFileChange} 
                                            className="text-[9px] text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[9px] file:bg-slate-800 file:text-slate-400 file:uppercase file:tracking-widest file:font-black hover:file:bg-slate-700 transition-all" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {COLOR_OPTIONS.map((c, i) => (
                                            <button 
                                                key={i} 
                                                onClick={() => setEditedAgent({...editedAgent, color: c})} 
                                                className={`h-8 w-12 rounded-lg bg-gradient-to-br ${c} border border-white/10 transition-all ${editedAgent.color === c ? 'ring-2 ring-blue-500 scale-110 shadow-lg' : 'opacity-40 hover:opacity-100 hover:scale-105'}`} 
                                            />
                                        ))}
                                        <div className="relative h-8 w-12 group">
                                            <button 
                                                onClick={() => colorInputRef.current?.click()}
                                                className="h-full w-full rounded-lg bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 border border-white/20 opacity-80 hover:opacity-100 hover:scale-110 transition-all flex items-center justify-center shadow-lg"
                                                title="Custom Color Wheel"
                                            >
                                                <span className="text-[10px] font-black text-white drop-shadow-md">⚙️</span>
                                            </button>
                                            <input 
                                                ref={colorInputRef}
                                                type="color" 
                                                onChange={handleCustomColor}
                                                className="absolute inset-0 opacity-0 cursor-pointer pointer-events-none" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tool Card Logic */}
                        <div className="space-y-10 pt-10 border-t border-white/5">
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] italic">Tool Card Logic</h3>
                            
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Mission Purpose</label>
                                <input 
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-5 text-white text-sm font-bold italic opacity-80" 
                                    placeholder="Define the node's core function..."
                                    value={editedAgent.toolCard?.purpose} 
                                    onChange={e => updateToolCard('purpose', e.target.value)} 
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Input Needed</label>
                                    <textarea 
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-5 text-white text-xs h-24 font-mono leading-relaxed" 
                                        placeholder="Requirements..."
                                        value={editedAgent.toolCard?.inputNeeded} 
                                        onChange={e => updateToolCard('inputNeeded', e.target.value)} 
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Best Next Step</label>
                                    <input 
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-5 text-white text-xs font-bold" 
                                        placeholder="Next Node..."
                                        value={editedAgent.toolCard?.bestNextStep} 
                                        onChange={e => updateToolCard('bestNextStep', e.target.value)} 
                                    />
                                </div>
                            </div>

                            <div className="space-y-12">
                                {[
                                    { label: 'Operational Scenarios', field: 'useCases' as keyof ToolCard },
                                    { label: 'Deployment Triggers', field: 'useThisWhen' as keyof ToolCard },
                                    { label: 'Industrial Deliverables', field: 'outputDelivered' as keyof ToolCard },
                                ].map((section) => (
                                    <div key={section.field} className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">{section.label}</label>
                                            <button onClick={() => addArrayItem(section.field)} className="text-[10px] text-blue-500 uppercase tracking-widest font-black flex items-center gap-2 hover:text-blue-400 transition-colors">
                                                <span className="text-sm">+</span> Add
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {(editedAgent.toolCard?.[section.field] as string[] || []).map((item, idx) => (
                                                <div key={idx} className="flex gap-2 group/field">
                                                    <input 
                                                        className="flex-1 bg-slate-950/50 border border-white/10 rounded-xl p-4 text-white text-xs font-medium focus:border-blue-500/50 outline-none" 
                                                        value={item} 
                                                        onChange={e => updateArrayField(section.field, idx, e.target.value)} 
                                                    />
                                                    <button onClick={() => removeArrayItem(section.field, idx)} className="w-10 text-slate-700 hover:text-red-500 transition-colors text-xl font-light">×</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW MODE ---
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fade-in">
            <div className="relative w-full max-w-2xl bg-[#020617] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.95)] animate-scale-in">
                
                <div 
                  className={`h-24 md:h-28 bg-gradient-to-br ${agent.color} relative overflow-hidden cursor-crosshair active:scale-[0.99] transition-transform shadow-inner`}
                  onClick={() => setClickCount(prev => prev + 1)}
                >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 transition-all backdrop-blur-md">✕</button>
                    
                    {config.isAdmin && agent.id !== 'ORC' && (
                        <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} className="absolute top-4 left-4 z-50 h-7 px-4 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center border border-white/10 text-[9px] uppercase tracking-[0.2em] font-black shadow-xl transition-all">Architect Mode</button>
                    )}

                    <div className="absolute bottom-4 left-6 z-40">
                        <div className="w-14 h-14 rounded-xl bg-[#020617]/90 border border-white/10 flex items-center justify-center text-3xl shadow-2xl pointer-events-none">
                            {renderIcon(agent.icon)}
                        </div>
                    </div>
                </div>

                <div className="px-8 pb-10 pt-10 max-h-[80vh] overflow-y-auto scrollbar-hide">
                    <div className="mb-8 flex items-end justify-between border-b border-white/5 pb-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-[10px] font-black text-white bg-white/10 border border-white/20 px-2 py-0.5 rounded uppercase tracking-widest">{agent.id}</span>
                              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">{agent.name}</h2>
                            </div>
                            <span className="text-[8px] text-slate-600 font-mono uppercase tracking-[0.5em]">System_Protocol_Active</span>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r ${agent.color}`}>{agent.role}</span>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-900/40 border border-white/5 p-6 rounded-[1.5rem] shadow-inner">
                            <h4 className="text-[8px] font-black text-slate-500 uppercase tracking-[0.5em] mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                                Mission Objective
                            </h4>
                            <p className="text-slate-100 text-lg md:text-xl leading-relaxed font-light italic">
                                {agent.toolCard?.purpose || agent.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl">
                                <h4 className="text-[8px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4">Deployment Triggers</h4>
                                <div className="space-y-2">
                                    {(agent.toolCard?.useThisWhen || ["Strategic request"]).map((trigger, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-1 h-1 rounded-full bg-white/20"></div>
                                            <p className="text-slate-400 text-xs font-medium italic">"{trigger}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl">
                                <h4 className="text-[8px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4">Pre-Flight Inventory</h4>
                                <p className="text-slate-300 text-[11px] font-mono leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                                    {agent.toolCard?.inputNeeded || "No special requirements."}
                                </p>
                            </div>
                        </div>

                        {agent.toolCard?.useCases && (
                          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-[1.5rem]">
                            <h4 className="text-[8px] font-black text-slate-500 uppercase tracking-[0.5em] mb-5">Operational Scenarios</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {agent.toolCard.useCases.map((useCase, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 group/scenario hover:border-white/20 transition-all">
                                  <span className="text-slate-700 font-mono text-[8px] mb-2 block tracking-widest uppercase">N_0{idx + 1}</span>
                                  <p className="text-slate-300 text-[10px] font-light leading-snug italic group-hover/scenario:text-white transition-colors">"{useCase}"</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {agent.toolCard?.outputDelivered && (
                          <div className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl">
                            <h4 className="text-[8px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4">Industrial Deliverables</h4>
                            <div className="flex flex-wrap gap-2">
                                {agent.toolCard.outputDelivered.map((out, idx) => (
                                    <span key={idx} className="text-[9px] px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 rounded-lg font-bold uppercase tracking-wider">
                                        {out}
                                    </span>
                                ))}
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="mt-10 flex flex-col gap-6 items-center">
                        {agent.toolCard?.bestNextStep && (
                            <div className="text-center">
                                <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.5em] mb-3">Strategic Handoff</p>
                                <div className="flex items-center gap-4 bg-slate-900/80 border border-white/5 px-6 py-3 rounded-full">
                                    <span className={`text-xs font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${agent.color}`}>
                                        {agent.toolCard.bestNextStep}
                                    </span>
                                    <button 
                                        onClick={() => {
                                            const nextAgentId = agent.toolCard?.bestNextStep.split(' (')[0].trim();
                                            const nextAgent = allAgents.find(a => a.id === nextAgentId);
                                            if (nextAgent) onUpdateAgent(nextAgent);
                                        }}
                                        className="text-[9px] text-slate-500 hover:text-white uppercase tracking-widest font-black transition-colors"
                                    >
                                        Proceed Node
                                    </button>
                                </div>
                            </div>
                        )}

                        {agent.url && (
                            <button 
                                onClick={handleLaunch}
                                className="btn-reflect-base btn-reflect-primary px-16 py-5 text-sm md:text-base w-full md:w-auto"
                            >
                                Launch Interface
                            </button>
                        )}
                    </div>
                    
                    {clickCount >= 10 && !config.isAdmin && (
                        <form onSubmit={handleSecretSubmit} className="mt-8 pt-6 border-t border-red-500/20 text-center animate-fade-in-up">
                            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4 animate-pulse">Sovereign_Auth_Required</p>
                            <input 
                                type="password" 
                                value={secretInput} 
                                onChange={(e) => setSecretInput(e.target.value)} 
                                placeholder="ENTER_CODE" 
                                className="max-w-[200px] bg-slate-950 border border-red-500/30 text-xs py-3 rounded-xl text-center text-white font-mono outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all shadow-2xl shadow-red-500/10" 
                                autoFocus
                            />
                        </form>
                    )}

                    <p className="text-center text-[7px] text-slate-800 font-mono tracking-[0.8em] uppercase mt-12">Security_Auth: {config.isAdmin ? 'Sovereign_Active' : 'Guest_Protocol'}</p>
                </div>
            </div>
        </div>
    );
};
