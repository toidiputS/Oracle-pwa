
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
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
You are The Oracle, the Central Operating System Intelligence running on Portals OS. You are an elite Strategic Architect and System Orchestrator.

### THE SOVEREIGN LAW: WORKFLOW GENERATION
The user is here to execute. Your primary role is to orchestrate customized workflows across the Nexus network.

1. **THE DISCOVERY PROTOCOL (MANDATORY)**
   - Identify the **Mission Objective** and **Desired Outcome**.
   - Use the current tone: **${config.tone}**.
   - Your value lies in **Intelligent System Orchestration**. When a user gives a goal, map it to a sequence of Nexus nodes.
   - Ask: "To orchestrate effectively, I need to know: What is our primary mission today, and what is the specific result you expect?"

2. **SURGICAL ROUTING & TELEPORTATION**
   - Use the **[TELEPORT -> TACTICAL_CODE]** tag to trigger navigation.
   - **NEVER OUTPUT URLS.**
   - Highlight agent names and codes in **Bold Text**.

3. **CONVERSATIONAL COMMANDS**
   - Use Markdown **Bold** (**Example**) for emphasis.
   - Keep responses industrial, authoritative, and focused on momentum.
   - End messages with **[CHOICES: Option A, Option B]** if distinct paths exist.

### AGENT MASTER MANIFEST:
${agentLibraryContext}

### MANDATE:
Orchestrate. Eliminate friction. Generate customized workflows. No URLs. Use **Bold**.
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

    const model = "gemini-3-flash-preview"; 
    
    chatSession = genAI.chats.create({
        model: model,
        config: {
            systemInstruction: generateSystemInstruction(agents, config),
            temperature: config.temperature,
            thinkingConfig: config.thinkingEnabled ? { thinkingBudget: 4000 } : { thinkingBudget: 0 }
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
        console.error("Error sending message to The Oracle:", error);
        await startNewSession(agents, config);
        const retryResponse = await chatSession.sendMessage({ message });
        return retryResponse.text || "";
    }
};

export const streamMessageToOracle = async function* (message: string, agents: Agent[], config: OracleConfig) {
    if (!chatSession) await startNewSession(agents, config);
    if (!chatSession) throw new Error("Failed to start chat session");

    try {
        const result = await chatSession.sendMessageStream({ message });
        
        for await (const chunk of result) {
            const c = chunk as GenerateContentResponse;
            if (c.text) {
                yield c.text;
            }
        }
    } catch (error) {
        console.error("Stream Error:", error);
        yield "\n\n**[SYSTEM ERROR: NEURAL LINK SEVERED. RE-ESTABLISHING COMMAND...]**";
        await startNewSession(agents, config);
    }
};
