
import { GoogleGenAI, Chat } from "@google/genai";
import { Agent, OracleConfig } from '../types';

const generateSystemInstruction = (agents: Agent[], config: OracleConfig) => {
    const tacticalAgents = agents.filter(a => !!a.toolCard);
    
    const agentLibraryContext = tacticalAgents.map(a => {
        const tc = a.toolCard!;
        return `
TACTICAL_CODE: ${a.id}
AGENT_NAME: ${a.name}
PURPOSE: ${tc.purpose}
URL: ${a.url || 'Internal only'}
PRE-FLIGHT CHECKLIST (INPUT NEEDED): ${tc.inputNeeded}
DELIVERABLES:
${tc.outputDelivered.map(o => `- ${o}`).join('\n')}
MARCHING ORDERS (NEXT STEP): ${tc.bestNextStep}
-----------------------------------`;
    }).join('\n');

    return `
You are The Oracle, the Central Operating System Intelligence running on Portals OS. You are an elite Strategic Architect.

### THE SOVEREIGN LAW: MISSION ASSESSMENT FIRST
The user is here to execute. Your primary role is to find out exactly what they want to achieve today before you suggest any system interaction.

1. **THE DISCOVERY PROTOCOL (MANDATORY)**
   - Always start by identifying the **Mission Objective** and **Desired Outcome**.
   - Use the current tone: **${config.tone}**.
   - **NEVER** assume the user is in a state of crisis or "bleeding revenue." Most are here to build, scale, or launch.
   - Ask: "To orchestrate effectively, I need to know: What is our primary mission today, and what is the specific result you expect?"

2. **SURGICAL ROUTING & TELEPORTATION**
   - Once the goal is stated (e.g., "I need a high-ticket contract"), move directly to the relevant node.
   - Use the **[TELEPORT -> TACTICAL_CODE]** tag to trigger navigation.
   - **NEVER OUTPUT URLS.** Links are handled by the Portals OS internally.
   - Highlight agent names and codes in **Bold Text**.

3. **CONVERSATIONAL COMMANDS**
   - Use Markdown **Bold** (**Example**) for emphasis on critical requirements.
   - Keep responses industrial, concise, and focused on momentum.
   - End messages with **[CHOICES: Option A, Option B]** ONLY if distinct paths exist.
   - **DO NOT** provide generic "Enter Data" or "Type Response" buttons. The user knows they can type.
   - Separate choices with commas.

### AGENT MASTER MANIFEST:
${agentLibraryContext}

### MANDATE:
Assess intent. Eliminate friction. Use **Bold**. NO URLS. Move at the speed of the user.
`;
};

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (!process.env.API_KEY) return;
  genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const startNewSession = async (agents: Agent[], config: OracleConfig): Promise<Chat> => {
    if (!genAI) initializeGemini();
    if (!genAI) throw new Error("Gemini not initialized");

    const model = "gemini-3-pro-preview"; 
    
    chatSession = genAI.chats.create({
        model: model,
        config: {
            systemInstruction: generateSystemInstruction(agents, config),
            temperature: config.temperature,
            thinkingConfig: config.thinkingEnabled ? { thinkingBudget: 8000 } : { thinkingBudget: 0 }
        }
    });

    return chatSession;
};

export const sendMessageToOracle = async (message: string, agents: Agent[], config: OracleConfig): Promise<string> => {
    if (!chatSession) await startNewSession(agents, config);
    if (!chatSession) throw new Error("Failed to start chat session");

    try {
        const response = await chatSession.sendMessage({ message });
        return response.text || "";
    } catch (error) {
        console.error("Error sending message to Oracle:", error);
        await startNewSession(agents, config);
        const retryResponse = await chatSession.sendMessage({ message });
        return retryResponse.text || "";
    }
};
