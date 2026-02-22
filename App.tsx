import React, { useState, useEffect, useCallback } from 'react';
import { AppState, Agent, OracleConfig } from './types';
import { AGENTS as INITIAL_AGENTS } from './constants';
import { AgentOverlay } from './components/AgentOverlay';
import { NeuralCore } from './components/NeuralCore';
import { OracleChatWidget } from './components/OracleChatWidget';
import { NexusGrid } from './components/NexusGrid';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
    const [oracleConfig, setOracleConfig] = useState<OracleConfig>({
        temperature: 0.7,
        maxQuestions: 5,
        tone: "Elite Authority (High-Status, Exclusive, Commanding)",
        thinkingEnabled: false,
        isAdmin: false
    });

    // SECRET ADMIN LOGIC
    const [adminClicks, setAdminClicks] = useState(0);
    const handleOracleIconClick = () => {
        const newCount = adminClicks + 1;
        setAdminClicks(newCount);
        if (newCount >= 10) {
            setOracleConfig(prev => ({ ...prev, isAdmin: !prev.isAdmin }));
            setAdminClicks(0);
        }
    };

    const handleUpdateAgent = (updatedAgent: Agent) => {
        setAgents(prev => {
            const index = prev.findIndex(a => a.id === updatedAgent.id);
            if (index === -1) return [...prev, updatedAgent];
            const newAgents = [...prev];
            newAgents[index] = updatedAgent;
            return newAgents;
        });
    };

    const handleAddAgent = () => {
        const newId = `NEW_${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        const newAgent: Agent = {
            id: newId,
            name: "UNIDENTIFIED_UNIT",
            role: "SPECIFY_ROLE",
            description: "Awaiting mission parameters.",
            oracleInsight: "This unit is currently being initialized in the Nexus stream.",
            color: "from-slate-500 to-slate-900",
            icon: "⚡",
            toolCard: {
                purpose: "Mission pending.",
                useThisWhen: ["Initial Command"],
                inputNeeded: "Data source required.",
                outputDelivered: ["Processing results"],
                doNotUseWhen: ["System Offline"],
                bestNextStep: "ORACLE"
            }
        };
        setSelectedAgent(newAgent);
    };

    const handleDeleteAgent = (id: string) => {
        setAgents(prev => prev.filter(a => a.id !== id));
    };

    // MOUSE FOLLOWER LOGIC
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoverInfo, setHoverInfo] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            const target = e.target as HTMLElement;
            const info = target.closest('[data-oracle-info]')?.getAttribute('data-oracle-info');
            setHoverInfo(info || null);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const renderHeader = () => (
        <header className="sticky top-0 z-50 bg-[#020617]/95 backdrop-blur-3xl px-4 py-4 flex items-center justify-between border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div 
                className={`flex items-center gap-3 cursor-pointer group transition-all ${oracleConfig.isAdmin ? 'border-b-2 border-cyan-500/50 pb-1' : ''}`} 
                onClick={handleOracleIconClick}
                data-oracle-info={oracleConfig.isAdmin ? "Sovereign Override: Active" : "Tapping the Central Core... access restricted."}
            >
                <div className={adminClicks > 0 ? 'animate-pulse' : ''}>
                    <NeuralCore size={28} smSize={32} />
                </div>
                <h1 className="font-black text-[10px] sm:text-sm text-white uppercase tracking-[0.3em] leading-none italic">Oracle // Nexus OS</h1>
            </div>
            <div className="flex items-center gap-2">
                 <button 
                    onClick={() => setAppState(AppState.DIAGNOSTIC)} 
                    className={`btn-reflect-base ${appState === AppState.DIAGNOSTIC ? 'btn-reflect-primary' : 'btn-reflect-secondary'}`}
                    data-oracle-info="Preparing the Neural Workspace for execution."
                >
                    <span className="btn-content px-5 py-2 text-[9px] font-black tracking-widest">COMMANDER</span>
                </button>
                <button 
                    onClick={() => setAppState(AppState.NEXUS_MAP)} 
                    className={`btn-reflect-base ${appState === AppState.NEXUS_MAP ? 'btn-reflect-primary' : 'btn-reflect-secondary'}`}
                    data-oracle-info="Analyzing the fleet of sovereign nodes."
                >
                    <span className="btn-content px-5 py-2 text-[9px] font-black tracking-widest">NEXUS GRID</span>
                </button>
            </div>
        </header>
    );

    // Halved again as requested: (8 -> 4, 15 -> 8)
    const followerSize = appState === AppState.WELCOME ? 4 : 8;

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col relative font-inter text-slate-200 overflow-hidden cursor-none">
            
            {/* THE AUTONOMOUS COMPANION (MOUSE FOLLOWER) */}
            {!isMobile && (
                <div 
                    className="fixed z-[100] pointer-events-none transition-all duration-300 ease-out"
                    style={{ 
                        left: `${mousePos.x}px`, 
                        top: `${mousePos.y}px`,
                        transform: `translate(-50%, -50%) ${hoverInfo ? 'scale(1.1)' : 'scale(1)'}`,
                        transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), left 0.12s ease-out, top 0.12s ease-out'
                    }}
                >
                    <NeuralCore size={followerSize} label={hoverInfo || undefined} active={!!hoverInfo} />
                </div>
            )}

            {appState === AppState.WELCOME ? (
                <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
                    <div className="z-10 text-center max-w-4xl animate-fade-in-up flex flex-col items-center gap-10 sm:gap-14 transform -translate-y-4">
                        <div className="flex flex-col items-center gap-4 sm:gap-6 bg-transparent">
                            <div className="relative inline-block reflect-node cursor-pointer z-10" onClick={handleOracleIconClick} data-oracle-info="Biometric sync required. Accessing encrypted data...">
                                <NeuralCore size={140} smSize={160} />
                            </div>
                            <p className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] italic opacity-80 z-20">
                                Intelligent Node Orchestration
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 w-full px-4 perspective-stage z-30">
                            <div 
                                className="relative group w-full sm:w-60 turn-left cursor-pointer" 
                                onClick={() => setAppState(AppState.DIAGNOSTIC)}
                                data-oracle-info="Orchestrating a new strategic trajectory."
                            >
                                <div className="btn-reflect-base btn-reflect-primary w-full pointer-events-none">
                                    <span className="btn-content italic text-xs sm:text-sm">COMMAND BOOT</span>
                                </div>
                            </div>

                            <div 
                                className="relative group w-full sm:w-60 turn-right cursor-pointer" 
                                onClick={() => setAppState(AppState.NEXUS_MAP)}
                                data-oracle-info="Entering the node library for structural analysis."
                            >
                                <div className="btn-reflect-base btn-reflect-secondary w-full pointer-events-none">
                                    <span className="btn-content italic text-xs sm:text-sm">NEXUS GRID</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 w-full flex justify-center z-10">
                            <h1 className="reflect-title text-4xl sm:text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500 tracking-tighter uppercase italic pr-6 pb-0">
                                The Oracle
                            </h1>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {renderHeader()}
                    {appState === AppState.NEXUS_MAP ? (
                        <NexusGrid 
                            agents={agents} 
                            config={oracleConfig} 
                            onUpdateConfig={setOracleConfig} 
                            onAddAgent={handleAddAgent}
                            onUpdateAgent={handleUpdateAgent}
                            onDeleteAgent={handleDeleteAgent}
                        />
                    ) : (
                        <main className="flex-1 flex flex-col w-full h-full relative">
                            <OracleChatWidget agents={agents} config={oracleConfig} onTeleport={setSelectedAgent} />
                        </main>
                    )}
                </>
            )}

            <AgentOverlay 
                agent={selectedAgent} 
                onClose={() => setSelectedAgent(null)} 
                allAgents={agents} 
                config={oracleConfig} 
                onUpdateConfig={setOracleConfig}
                onUpdateAgent={handleUpdateAgent}
                onDeleteAgent={handleDeleteAgent}
                onNavigate={setSelectedAgent}
                onAddAgent={handleAddAgent}
            />
        </div>
    );
};

export default App;