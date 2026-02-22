
export interface ToolCard {
  purpose: string;
  useThisWhen: string[];
  inputNeeded: string;
  outputDelivered: string[];
  doNotUseWhen: string[];
  bestNextStep: string;
  useCases?: string[];
}

export interface Squad {
  id: string;
  name: string;
  domain: string;
  color: string;
}

export interface Agent {
  id: string; // The tactical code (e.g., A, B, Z1)
  name: string;
  role: string;
  description: string;
  oracleInsight?: string; // New: Punchy, conversational insight
  color: string;
  icon: string;
  url?: string;
  toolCard?: ToolCard;
  suggestedNextNode?: string; // ID of the suggested next agent
  suggestedPreviousNode?: string; // ID of the suggested previous agent
  squad?: Squad;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isTyping?: boolean;
  isStreaming?: boolean;
  choices?: string[];
}

export enum AppState {
  WELCOME = 'WELCOME',
  DIAGNOSTIC = 'DIAGNOSTIC',
  NEXUS_MAP = 'NEXUS_MAP'
}

export interface OracleConfig {
  temperature: number;
  maxQuestions: number;
  tone: string;
  thinkingEnabled: boolean;
  isAdmin?: boolean;
}
