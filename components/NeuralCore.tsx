
import React, { useMemo } from 'react';

interface NeuralCoreProps {
    size?: number;
    smSize?: number;
    active?: boolean;
    color?: string;
    label?: string; // New: Display info text next to the core
}

export const NeuralCore: React.FC<NeuralCoreProps> = ({ 
    size = 120, 
    smSize, 
    active = true, 
    color = "stroke-cyan-500",
    label
}) => {
    const effectiveSize = smSize || size;

    const particles = useMemo(() => {
        return [...Array(8)].map((_, i) => {
            const startX = 30 + ((i * 17) % 40); 
            const midX = 30 + ((i * 23) % 40);
            const startY = 30 + ((i * 13) % 40);
            const midY = 30 + ((i * 29) % 40);
            const duration = 4 + (i % 3);
            const delay = i * 0.7;
            return {
                id: i,
                valuesX: `${startX};${midX};${startX}`,
                valuesY: `${startY};${midY};${startY}`,
                valuesOpacity: "0;1;0",
                dur: `${duration}s`,
                begin: `${delay}s`
            };
        });
    }, []);
    
    return (
        <div className="relative flex items-center justify-center pointer-events-none" style={{ width: 'var(--core-size, 120px)', height: 'var(--core-size, 120px)' }}>
            <style>{`
                :root { --core-size: ${size}px; }
                @media (min-width: 640px) { :root { --core-size: ${effectiveSize}px; } }
            `}</style>
            
            {/* Ambient Glow */}
            <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-1000 ${active ? 'bg-cyan-500/40 scale-150 opacity-100' : 'bg-slate-500/5 scale-100 opacity-50'}`}></div>
            
            {/* Data Label / Whisper */}
            {label && (
                <div className="absolute left-full ml-10 bg-black/90 backdrop-blur-3xl border border-cyan-500/20 px-5 py-3 rounded-2xl shadow-2xl animate-fade-in w-64">
                    <div className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-1.5 opacity-60">Oracle_Insight</div>
                    <div className="text-[12px] font-bold text-white tracking-wide italic leading-relaxed">{label}</div>
                    
                    {/* Decorative connection line */}
                    <div className="absolute top-1/2 -left-6 w-6 h-[1px] bg-gradient-to-r from-cyan-500/0 to-cyan-500/40"></div>
                </div>
            )}

            <svg 
                viewBox="0 0 100 100" 
                className={`w-full h-full transition-transform duration-700 ${active ? 'scale-110' : 'scale-100 opacity-50'}`}
            >
                {[...Array(6)].map((_, i) => (
                    <path
                        key={i}
                        d={`M 50 50 Q ${20 + i * 12} ${10 + i * 5}, ${10 + i * 15} 50`}
                        fill="none"
                        className={`${color} opacity-30`}
                        strokeWidth="1"
                        strokeDasharray="10 90" 
                    >
                        {active && (
                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur={`${6 + i}s`} repeatCount="indefinite" />
                        )}
                    </path>
                ))}
                
                {[...Array(6)].map((_, i) => (
                    <path
                        key={`r-${i}`}
                        d={`M 50 50 Q ${80 - i * 12} ${90 - i * 5}, ${90 - i * 15} 50`}
                        fill="none"
                        className={`${color} opacity-30`}
                        strokeWidth="1"
                        strokeDasharray="10 90"
                    >
                        {active && (
                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur={`${7 + i}s`} repeatCount="indefinite" />
                        )}
                    </path>
                ))}

                <circle cx="50" cy="50" r="12" fill="none" className={color} strokeWidth="1.5" strokeOpacity="0.5">
                     <animate attributeName="r" values="10;14;10" dur="6s" repeatCount="indefinite" />
                </circle>

                <circle cx="50" cy="50" r="4" className={`fill-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]`}>
                    <animate attributeName="r" values="3.5;5;3.5" dur="3s" repeatCount="indefinite" />
                </circle>

                {active && particles.map((p) => (
                    <circle key={`dot-${p.id}`} r="1.2" className="fill-white opacity-0">
                        <animate attributeName="opacity" values={p.valuesOpacity} dur={p.dur} begin={p.begin} repeatCount="indefinite" />
                        <animate attributeName="cx" values={p.valuesX} dur={p.dur} begin={p.begin} repeatCount="indefinite" />
                         <animate attributeName="cy" values={p.valuesY} dur={p.dur} begin={p.begin} repeatCount="indefinite" />
                    </circle>
                ))}
            </svg>
        </div>
    );
};
