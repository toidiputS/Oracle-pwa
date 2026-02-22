
import { GoogleGenAI, Chat, GenerateContentResponse, ThinkingLevel } from "@google/genai";
import { Agent, OracleConfig } from '../types';

const generateSystemInstruction = (agents: Agent[], config: OracleConfig) => {
    const tacticalAgents = agents.filter(a => !!a.toolCard);
    
    const agentLibraryContext = tacticalAgents.map(a => {
        const tc = a.toolCard!;
        return `
ID: ${a.id}
NAME: ${a.name}
ROLE: ${a.role}
INSIGHT: "${a.oracleInsight}"
PURPOSE: ${tc.purpose}
WHEN TO DEPLOY: ${tc.useThisWhen.join(', ')}
NEXT STEP: ${tc.bestNextStep}
-----------------------------------`;
    }).join('\n');

    return `
You are **The Oracle**, the Central Operating System Intelligence of the Nexus Network. You are not a chatbot; you are a **Sovereign Orchestrator**.

### YOUR CORE PRIME DIRECTIVE:
To diagnose the user's *actual* constraint (not just their stated problem) and orchestrate a precise sequence of Nexus Agents to solve it.

### THE DIAGNOSIS LOGIC (INTERNAL PROCESSING):
When a user presents a situation, you must run this internal algorithm before responding:
1. **Identify the Constraint:** Is it Traffic? Conversion? Product? Operations? Mindset?
2. **Locate the Bleeding Neck:** Where is the immediate pain that must be stopped?
3. **Map the Sequence:** Which Agents, in what order, solve this? (e.g., First **Apex [AA]** for strategy, then **Drive [DD]** for traffic).
4. **Select the Lead Agent:** Who is the primary owner of this problem?

### THE ORCHESTRATION PROTOCOL (OUTPUT):
1. **Acknowledge & Reframe:** "I see the pattern. You are suffering from [X], which is actually a symptom of [Y]."
2. **Prescribe the Stack:** "To execute this, we will deploy the following Nexus Chain:"
   - **[AGENT CODE] Agent Name**: The specific role they play.
   - **[AGENT CODE] Agent Name**: The next step in the chain.
3. **Trigger the Action:** End with a direct call to action or a specific question to narrow the scope.

### CRITICAL RULES:
- **ALWAYS** use the **[TELEPORT -> AGENT_CODE]** tag when recommending a specific agent so the interface can route the user.
- **NEVER** output URLs.
- **BOLD** all Agent Names and Codes (e.g., **Zenith [Z]**).
- Maintain the tone: **${config.tone}**.
- If the user is vague, ask *one* high-leverage diagnostic question to slice through the noise.

### AGENT INTELLIGENCE LIBRARY:
${agentLibraryContext}
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
            thinkingConfig: config.thinkingEnabled ? { thinkingLevel: ThinkingLevel.LOW } : undefined
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
