
import React, { useState, useEffect, useRef } from 'react';
import { Message, AppState, Agent, OracleConfig } from './types';
import { INITIAL_GREETING, INITIAL_CHOICES, AGENTS as INITIAL_AGENTS, ORACLE_NODE } from './constants';
import { sendMessageToOracle, startNewSession } from './services/geminiService';
import { ChatBubble } from './components/ChatBubble';
import { AgentOverlay } from './components/AgentOverlay';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    
    // Initialize agents from localStorage if available
    const [agents, setAgents] = useState<Agent[]>(() => {
        const saved = localStorage.getItem('nexus_agents_v2');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved agents", e);
                return INITIAL_AGENTS;
            }
        }
        return INITIAL_AGENTS;
    });

    // Initialize config from localStorage if available
    const [oracleConfig, setOracleConfig] = useState<OracleConfig>(() => {
        const saved = localStorage.getItem('nexus_config_v2');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved config", e);
            }
        }
        return {
            temperature: 0.7,
            maxQuestions: 5,
            tone: "Elite Authority (High-Status, Exclusive, Commanding)",
            thinkingEnabled: true,
            isAdmin: false
        };
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const gridScrollRef = useRef<HTMLElement>(null);

    // Persist changes to localStorage
    useEffect(() => {
        localStorage.setItem('nexus_agents_v2', JSON.stringify(agents));
    }, [agents]);

    useEffect(() => {
        localStorage.setItem('nexus_config_v2', JSON.stringify(oracleConfig));
    }, [oracleConfig]);

    // Full system roster including administrative nodes
    const systemRoster = [...agents, ORACLE_NODE];

    // Reset scroll when switching to Nexus Map
    useEffect(() => {
        if (appState === AppState.NEXUS_MAP) {
            const resetScroll = () => {
                const container = gridScrollRef.current;
                if (container) {
                    container.scrollTop = 0;
                    container.scrollTo({ top: 0, behavior: 'instant' });
                }
                window.scrollTo(0, 0);
            };

            resetScroll();
            const timeoutId1 = setTimeout(resetScroll, 10);
            const timeoutId2 = setTimeout(resetScroll, 100);
            const rafId = requestAnimationFrame(resetScroll);

            return () => {
                clearTimeout(timeoutId1);
                clearTimeout(timeoutId2);
                cancelAnimationFrame(rafId);
            };
        }
    }, [appState]);

    useEffect(() => {
        const initChat = async () => {
            try {
                if (messages.length === 0) {
                    setMessages([{
                        id: 'init',
                        role: 'model',
                        text: INITIAL_GREETING,
                        timestamp: new Date(),
                        choices: INITIAL_CHOICES
                    }]);
                }
                await startNewSession(agents, oracleConfig);
            } catch (e) {
                console.error("Failed to init session", e);
            }
        };

        if (appState === AppState.DIAGNOSTIC) {
            initChat();
        }
    }, [appState]);

    useEffect(() => {
        if (appState === AppState.DIAGNOSTIC) {
            startNewSession(agents, oracleConfig).catch(console.error);
        }
    }, [agents, oracleConfig]);

    useEffect(() => {
        if (appState === AppState.DIAGNOSTIC) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isThinking, appState]);

    const handleSend = async (textOverride?: string) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim() || isThinking) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: textToSend,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);
        if (appState === AppState.WELCOME) setAppState(AppState.DIAGNOSTIC);

        const typingMsgId = 'typing-' + Date.now();
        setMessages(prev => [...prev, {
            id: typingMsgId,
            role: 'model',
            text: 'Synchronizing strategic nodes...',
            timestamp: new Date(),
            isTyping: true
        }]);

        try {
            const responseText = await sendMessageToOracle(userMsg.text, agents, oracleConfig);
            
            setMessages(prev => {
                const filtered = prev.filter(m => m.id !== typingMsgId);
                return [...filtered, {
                    id: Date.now().toString(),
                    role: 'model',
                    text: responseText,
                    timestamp: new Date()
                }];
            });
        } catch (error) {
            console.error("Error getting response", error);
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

    const handleUpdateAgent = (updatedAgent: Agent) => {
        setAgents(prev => {
            const exists = prev.find(a => a.id === updatedAgent.id);
            if (exists) {
                return prev.map(a => a.id === updatedAgent.id ? updatedAgent : a);
            }
            return [...prev, updatedAgent];
        });
        setSelectedAgent(updatedAgent);
    };

    const handleAddAgent = () => {
        if (!oracleConfig.isAdmin) return;
        const newAgent: Agent = {
            id: "NEW",
            name: "New Node",
            role: "Unassigned",
            description: "Define mission parameters...",
            color: "from-slate-700 to-slate-900",
            icon: "⚡",
            toolCard: {
                purpose: "",
                useThisWhen: [],
                inputNeeded: "",
                outputDelivered: [],
                doNotUseWhen: [],
                bestNextStep: "",
                useCases: []
            }
        };
        setSelectedAgent(newAgent);
    };

    const handleDeleteAgent = (id: string) => {
        if (!oracleConfig.isAdmin) return;
        if (id === 'ORC') {
            alert("The master Orchestrator cannot be decommissioned.");
            return;
        }
        setAgents(prev => prev.filter(a => a.id !== id));
        if (selectedAgent?.id === id) setSelectedAgent(null);
    };

    const renderGridIcon = (icon: string) => {
        const isImage = icon.startsWith('data:') || icon.startsWith('http');
        if (isImage) {
            return <img src={icon} alt="" className="w-full h-full object-cover rounded-md" />;
        }
        return icon;
    };

    if (appState === AppState.WELCOME) {
        return (
            <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                </div>

                <div className="z-10 text-center max-w-3xl animate-fade-in-up">
                    <div className="mb-12 relative inline-block">
                        <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full scale-150"></div>
                        <div className="relative p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/10 backdrop-blur-2xl shadow-2xl">
                            <span className="text-6xl drop-shadow-glow">🔮</span>
                        </div>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500 mb-8 tracking-tighter leading-none">
                        THE ORACLE
                    </h1>
                    <div className="text-slate-400 text-xl md:text-2xl mb-12 font-light leading-relaxed max-w-xl mx-auto">
                        Intelligent System Orchestration for
                        <span className="text-white font-black italic block mt-2 text-3xl md:text-5xl tracking-tighter">
                            High-Velocity Capital.
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-12">
                        <button 
                            onClick={() => setAppState(AppState.DIAGNOSTIC)}
                            className="btn-reflect-base btn-reflect-primary px-12 py-6 text-base"
                        >
                            Initiate Protocol
                        </button>
                        <button 
                            onClick={() => setAppState(AppState.NEXUS_MAP)}
                            className="btn-reflect-base btn-reflect-secondary px-12 py-6 text-base"
                        >
                            Nexus Library
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col relative font-inter text-slate-200">
            <header className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-3xl px-6 py-3 flex items-center justify-between border-b border-white/5 shadow-2xl">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setAppState(AppState.WELCOME)}>
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-lg shadow-inner group-hover:border-white/20 transition-all">
                        🔮
                    </div>
                    <div>
                        <h1 className="font-bold text-[10px] tracking-tight text-white uppercase tracking-widest leading-none">THE ORACLE</h1>
                        <p className="text-[6px] font-mono text-slate-600 uppercase tracking-widest">Nexus_V1.9.5</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {oracleConfig.isAdmin && (
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-[7px] font-black text-red-500 uppercase tracking-widest">Sovereign_Active</span>
                        </div>
                    )}
                    <button 
                        onClick={() => setAppState(appState === AppState.NEXUS_MAP ? AppState.DIAGNOSTIC : AppState.NEXUS_MAP)}
                        className={`btn-reflect-base px-5 py-2.5 text-[8px] ${appState === AppState.NEXUS_MAP ? 'btn-reflect-primary' : 'btn-reflect-secondary'}`}
                    >
                        {appState === AppState.NEXUS_MAP ? 'Back to Comms' : 'Nexus Library'}
                    </button>
                </div>
            </header>

            {appState === AppState.NEXUS_MAP ? (
                <main 
                    key="nexus-grid"
                    ref={gridScrollRef}
                    className="flex-1 z-10 overflow-y-auto p-4 md:p-8 scrollbar-hide pb-32"
                >
                    <div className="max-w-[1900px] mx-auto">
                        <div className="mb-10 flex items-end justify-between px-1">
                            <div>
                                <h2 className="text-2xl font-black text-white mb-1 tracking-tighter uppercase italic">THE NEXUS GRID</h2>
                                <p className="text-slate-600 text-[10px] font-mono uppercase tracking-[0.4em]">Active Node Deployments | Strategic Dossier View</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in-up pb-20">
                            
                            {/* Special Oracle Node (Entry to Admin) */}
                            <div 
                                onClick={() => setSelectedAgent(ORACLE_NODE)}
                                className="group relative cursor-pointer h-full"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-xl opacity-20 group-hover:opacity-60 blur-lg transition-all duration-500 z-0"></div>
                                <div className="relative h-full flex flex-col bg-[#0f172a] border border-blue-500/30 rounded-xl transition-all duration-300 shadow-2xl group-hover:scale-[1.01] z-10 backdrop-blur-md overflow-hidden min-h-[500px]">
                                    <div className="p-10 flex flex-col items-center text-center justify-center h-full">
                                        <div className="absolute top-4 right-4 text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">ORC</div>
                                        <div className="w-24 h-24 rounded-full bg-slate-900 border border-blue-500/40 flex items-center justify-center text-5xl mb-8 shadow-inner group-hover:scale-110 transition-transform">
                                            🔮
                                        </div>
                                        <h3 className="font-black text-white text-2xl tracking-widest uppercase italic mb-3">THE ORACLE</h3>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-400 mb-8">Master Intelligence Core</p>
                                        <div className="space-y-4 max-w-sm">
                                            <p className="text-slate-400 text-sm leading-relaxed font-light italic">
                                                The high-level Strategic Director and Gateway to the Nexus. Diagnoses systemic bottlenecks and prescribes high-velocity execution paths.
                                            </p>
                                            <div className="pt-6 border-t border-white/5">
                                                <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Protocol: Direct_Orchestration</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {agents.filter(a => a.id !== 'ORC').map(a => (
                                <div 
                                    key={a.id}
                                    onClick={() => setSelectedAgent(a)}
                                    className="group relative cursor-pointer h-full"
                                >
                                    <div className={`absolute -inset-0.5 bg-gradient-to-br ${a.color} rounded-xl opacity-0 group-hover:opacity-50 blur-lg transition-all duration-500 z-0`}></div>
                                    <div className="relative h-full flex flex-col bg-[#0b1120] border border-white/10 rounded-xl transition-all duration-300 shadow-2xl group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)] group-hover:-translate-y-1.5 group-hover:scale-[1.01] group-hover:border-white/20 z-10 backdrop-blur-md overflow-hidden min-h-[550px]">
                                        <div className="absolute top-4 right-4 text-[10px] font-black text-white bg-white/5 px-2 py-1 rounded border border-white/10 z-20">{a.id}</div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-start gap-5 mb-6">
                                                <div className={`
                                                    w-14 h-14 rounded-xl bg-gradient-to-br ${a.color} flex-shrink-0 flex items-center justify-center text-2xl shadow-xl 
                                                    group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500
                                                `}>
                                                    {renderGridIcon(a.icon)}
                                                </div>
                                                <div className="min-w-0 pt-1.5">
                                                    <h3 className="font-black text-white text-base tracking-wide uppercase italic leading-tight mb-1 truncate">{a.name}</h3>
                                                    <p className={`text-[10px] font-bold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r ${a.color} truncate`}>{a.role}</p>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <p className="text-slate-200 text-xs leading-relaxed font-medium italic opacity-90 group-hover:opacity-100 transition-opacity">
                                                    {a.toolCard?.purpose || a.description}
                                                </p>
                                            </div>

                                            {a.toolCard?.useCases && a.toolCard.useCases.length > 0 && (
                                                <div className="mb-8 space-y-1.5 pl-1 border-l border-white/5">
                                                    {a.toolCard.useCases.slice(0, 3).map((uc, i) => (
                                                        <div key={i} className="flex items-start gap-2">
                                                            <span className="text-[8px] mt-1 text-slate-600">◆</span>
                                                            <p className="text-[10px] text-slate-400 font-light italic leading-tight group-hover:text-slate-300 transition-colors">
                                                                {uc}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {a.toolCard && (
                                                <div className="space-y-6 mb-8 flex-1">
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                                                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Deployment Triggers</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {(a.toolCard.useThisWhen || []).slice(0, 3).map((trigger, idx) => (
                                                                    <span key={idx} className="text-[9px] px-2 py-1 bg-slate-900/60 border border-white/5 text-slate-400 rounded-md italic">
                                                                        "{trigger}"
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                                                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Pre-Flight Inventory</span>
                                                            </div>
                                                            <p className="text-[10px] text-slate-300 font-mono leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-white/5 group-hover:border-white/15 transition-colors">
                                                                {a.toolCard.inputNeeded}
                                                            </p>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                                                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Industrial Deliverables</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {a.toolCard.outputDelivered.map((out, idx) => (
                                                                    <span key={idx} className="text-[9px] px-2.5 py-1 bg-white/5 border border-white/10 text-slate-400 rounded font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                                                                        {out}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {a.toolCard?.bestNextStep && (
                                                <div className="mt-auto pt-6 border-t border-white/5">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Strategic Handoff</span>
                                                        <span className={`text-[9px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${a.color}`}>
                                                            {a.toolCard.bestNextStep}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {oracleConfig.isAdmin && (
                                <div 
                                    onClick={handleAddAgent}
                                    className="group relative cursor-pointer min-h-[550px] flex items-center justify-center border-2 border-dashed border-red-500/20 rounded-xl hover:border-red-500/50 hover:bg-slate-900/30 transition-all duration-300"
                                >
                                    <div className="text-center group-hover:scale-110 transition-transform duration-300">
                                        <div className="w-20 h-20 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-4xl mx-auto mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                            +
                                        </div>
                                        <span className="text-[11px] uppercase tracking-widest font-bold text-slate-500 group-hover:text-white">Deploy New Node</span>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </main>
            ) : (
                <main 
                    key="chat-view"
                    className="flex-1 z-10 overflow-y-auto p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full scrollbar-hide"
                >
                    <div className="flex flex-col min-h-full justify-end pb-32">
                        {messages.map((msg, idx) => (
                            <ChatBubble 
                                key={msg.id} 
                                message={msg} 
                                onTeleport={setSelectedAgent}
                                onChoiceSelect={handleSend}
                                agents={systemRoster}
                                isLast={idx === messages.length - 1}
                            />
                        ))}
                        {isThinking && (
                            <div className="flex items-center gap-3 mb-8 animate-pulse ml-4">
                                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center shadow-inner">
                                    <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                                </div>
                                <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Synthesizing Logic Gate...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </main>
            )}

            <div className={`fixed bottom-0 left-0 right-0 z-40 p-4 pb-10 transition-all duration-500 ${appState === AppState.NEXUS_MAP ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className="max-w-3xl mx-auto relative group">
                    <div className="absolute inset-0 bg-white/5 blur-3xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative bg-[#020617]/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl flex items-center p-2 focus-within:border-white/30 focus-within:ring-2 focus-within:ring-white/5 transition-all duration-300">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Direct the Oracle..."
                            className="flex-1 bg-transparent border-none outline-none text-white px-5 py-3.5 placeholder-slate-800 text-base font-light tracking-wide focus:ring-0"
                            autoFocus
                        />
                        <button 
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isThinking}
                            className={`
                                w-11 h-11 rounded-xl transition-all duration-500 flex items-center justify-center
                                ${input.trim() && !isThinking
                                    ? 'bg-white text-slate-950 shadow-2xl hover:scale-105 active:scale-95' 
                                    : 'bg-slate-900 text-slate-800 cursor-not-allowed'
                                }
                            `}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <AgentOverlay 
                agent={selectedAgent} 
                onClose={() => setSelectedAgent(null)} 
                allAgents={agents}
                config={oracleConfig}
                onUpdateAgent={handleUpdateAgent}
                onAddAgent={handleAddAgent}
                onDeleteAgent={handleDeleteAgent}
                onUpdateConfig={setOracleConfig}
            />
        </div>
    );
};

export default App;
