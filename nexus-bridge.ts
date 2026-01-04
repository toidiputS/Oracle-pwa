
import { AGENTS, ORACLE_NODE } from './constants';
import { Agent } from './types';

// --- PORTALS OS INTEGRATION LAYER ---

export interface PortalsNodeDefinition {
    id: string;              // Unique Node ID (e.g., 'A', 'ORC')
    label: string;           // Window/Tab Title
    icon: string;            // Emoji or Image URL
    themeGradient: string;   // Tailwind string for window borders/glows
    targetUrl: string;       // The source URL for the Viewport
    dimensions: {            // Default window size on open
        width: number;
        height: number;
    };
    sector: string;          // For sidebar/folder grouping
    meta: string;            // Description for the OS search bar/tooltip
}

/**
 * Converts a Nexus Agent into a Portals OS Node Definition.
 */
const convertAgentToPortalNode = (agent: Agent): PortalsNodeDefinition => {
    // Grouping logic: 'System' for Oracle, 'Alpha', 'Beta', etc. for pairs
    const sector = agent.id === 'ORC' ? 'CORE_SYSTEM' : `SECTOR_${agent.id.charAt(0)}`;

    return {
        id: agent.id,
        label: `${agent.name} // ${agent.role}`,
        icon: agent.icon,
        themeGradient: agent.color,
        // If an external URL exists, use it. Otherwise, deep link into Oracle.
        targetUrl: agent.url || `/?node=${agent.id}`,
        dimensions: {
            width: agent.id === 'ORC' ? 600 : 1024,
            height: agent.id === 'ORC' ? 850 : 768,
        },
        sector: sector,
        meta: agent.description
    };
};

/**
 * THE PORTALS MANIFEST
 * Import 'PORTALS_SYSTEM_MANIFEST' into your Portals OS 'AppManager' or 'Registry'.
 * This array contains the configuration for every window that can be spawned.
 */
export const PORTALS_SYSTEM_MANIFEST: PortalsNodeDefinition[] = [
    convertAgentToPortalNode(ORACLE_NODE), // The Master Node (The Oracle itself)
    ...AGENTS.map(convertAgentToPortalNode) // The Tactical Nodes
];

/**
 * HELPER: Group nodes by Sector for the Portals 'Explorer' or 'Sidebar'
 */
export const getNodesBySector = () => {
    const sectors: Record<string, PortalsNodeDefinition[]> = {};
    PORTALS_SYSTEM_MANIFEST.forEach(node => {
        if (!sectors[node.sector]) {
            sectors[node.sector] = [];
        }
        sectors[node.sector].push(node);
    });
    return sectors;
};
