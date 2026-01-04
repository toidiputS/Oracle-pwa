import { Agent } from './types';

export const SYSTEM_NAME = "The Oracle";

export const ORACLE_NODE: Agent = {
  id: 'ORC',
  name: 'The Oracle',
  role: 'Master Orchestrator',
  description: 'The core consciousness and administrative interface of the Nexus system.',
  color: 'from-blue-900 to-indigo-950',
  icon: '🔮',
};

export const AGENTS: Agent[] = [
  // --- PAIR A ---
  {
    id: "A",
    name: "Arbiter",
    role: "Contracts",
    description: "Shreds legal ambiguity to secure maximum leverage and IP protection.",
    color: "from-slate-600 to-slate-800",
    icon: "⚖️",
    url: "https://nexus.ai/arbiter",
    toolCard: {
      purpose: "Shreds legal ambiguity to secure maximum leverage and IP protection.",
      useThisWhen: ["Drafting new agreements", "Reviewing legal exposure", "Locking in IP"],
      inputNeeded: "Draft contract (PDF/Word); Counter-party history.",
      outputDelivered: ["Redlined Document", "Risk-Exposure Report"],
      doNotUseWhen: ["No legal documents exist yet"],
      bestNextStep: "B (Retention)",
      useCases: ["Redlining liability", "IP protection", "Enforcing payment triggers"]
    }
  },
  {
    id: "AA",
    name: "Apex",
    role: "Strategy",
    description: "Defines the highest-level strategic objectives and market dominance vectors.",
    color: "from-indigo-900 to-slate-900",
    icon: "🏔️",
    url: "https://nexus.ai/apex",
    toolCard: {
      purpose: "Defines the highest-level strategic objectives and market dominance vectors.",
      useThisWhen: ["Vision is blurry", "Entering new markets", "Seeking dominance"],
      inputNeeded: "Market landscape; Resource inventory; 5-year vision.",
      outputDelivered: ["North Star Objective", "Market Dominance Roadmap"],
      doNotUseWhen: ["Stuck in tactical fires"],
      bestNextStep: "BB (Validation)",
      useCases: ["Service-to-Platform transition", "Niche dominance", "Executive alignment"]
    }
  },
  // --- PAIR B ---
  {
    id: "B",
    name: "Bulwark",
    role: "Retention",
    description: "Guards the customer relationship to prevent churn and ensure continuity.",
    color: "from-blue-600 to-indigo-700",
    icon: "🛡️",
    url: "https://nexus.ai/bulwark",
    toolCard: {
      purpose: "Guards the customer relationship to prevent churn and ensure continuity.",
      useThisWhen: ["Churn rates are spiking", "Customer sentiment is low", "Renewals are approaching"],
      inputNeeded: "Usage data; Churn alerts; Client feedback.",
      outputDelivered: ["Retention Strategy", "Churn Risk Map"],
      doNotUseWhen: ["You have no active customers"],
      bestNextStep: "Y (Upsell)",
      useCases: ["Pre-emptive save", "Onboarding verification", "Renewal automation"]
    }
  },
  {
    id: "BB",
    name: "Bridge",
    role: "Validation",
    description: "Validates the connection between the high-level offer and the 'bleeding neck' problem.",
    color: "from-blue-800 to-indigo-900",
    icon: "🌉",
    url: "https://nexus.ai/bridge",
    toolCard: {
      purpose: "Validates the connection between the high-level offer and the 'bleeding neck' problem.",
      useThisWhen: ["Launching new offers", "Sales are inconsistent", "Market fit unknown"],
      inputNeeded: "Customer interviews; Offer draft.",
      outputDelivered: ["Validation Score", "Offer Refinement"],
      doNotUseWhen: ["Strategy (Apex) is undefined"],
      bestNextStep: "DD (Growth)",
      useCases: ["Problem-Solution fit", "Offer stress-test", "Market resonance"]
    }
  },
  // --- PAIR C ---
  {
    id: "C",
    name: "Centurion",
    role: "Pricing",
    description: "Architects the price floor and ceiling for maximum structural profit.",
    color: "from-amber-500 to-yellow-600",
    icon: "🏛️",
    url: "https://nexus.ai/centurion",
    toolCard: {
      purpose: "Architects the price floor and ceiling for maximum structural profit.",
      useThisWhen: ["Margins are eroding", "Launching a new tier", "Pricing feels arbitrary"],
      inputNeeded: "Delivery costs; Market comps; Desired margins.",
      outputDelivered: ["Pricing Matrix", "Profit Floor Analysis"],
      doNotUseWhen: ["Costs are unknown"],
      bestNextStep: "CC (Finance)",
      useCases: ["Tiered pricing build", "Discount thresholding", "Margin audit"]
    }
  },
  {
    id: "CC",
    name: "Core",
    role: "Finance",
    description: "Audits the financial engine to ensure scalability and structural profit.",
    color: "from-blue-600 to-blue-800",
    icon: "💠",
    url: "https://nexus.ai/core",
    toolCard: {
      purpose: "Audits the financial engine to ensure scalability and structural profit.",
      useThisWhen: ["Scaling revenue", "Profit is low", "Financial planning"],
      inputNeeded: "P&L; Unit economics.",
      outputDelivered: ["Unit Economic Audit", "Profit Optimization Model"],
      doNotUseWhen: ["No revenue exists"],
      bestNextStep: "YY (Profit)",
      useCases: ["SaaS pricing audit", "Enterprise CAC calc", "Profit-leak check"]
    }
  },
  // --- PAIR D ---
  {
    id: "D",
    name: "Dynamo",
    role: "Hooks",
    description: "Generates high-velocity, scroll-stopping attention in the first 3 seconds.",
    color: "from-orange-500 to-red-500",
    icon: "🧨",
    url: "https://nexus.ai/dynamo",
    toolCard: {
      purpose: "Generates high-velocity, scroll-stopping attention in the first 3 seconds.",
      useThisWhen: ["Ads are ignored", "CTR is low", "Content needs energy"],
      inputNeeded: "Offer core; Audience pain points.",
      outputDelivered: ["10 High-Heat Hooks", "Creative Direction"],
      doNotUseWhen: ["The offer core is undefined"],
      bestNextStep: "E (Social)",
      useCases: ["VSL Intro", "Ad hook", "Social thread-starter"]
    }
  },
  {
    id: "DD",
    name: "Drive",
    role: "Growth",
    description: "Generates high-intent traffic mechanisms and acquisition logic.",
    color: "from-cyan-600 to-teal-700",
    icon: "🏎️",
    url: "https://nexus.ai/drive",
    toolCard: {
      purpose: "Generates high-intent traffic mechanisms and acquisition logic.",
      useThisWhen: ["Need more leads", "Traffic is flat", "Scaling acquisition"],
      inputNeeded: "Ad budget; Target traffic.",
      outputDelivered: ["Acquisition Roadmap", "Traffic Model"],
      doNotUseWhen: ["Funnel is leaky"],
      bestNextStep: "LL (Closing)",
      useCases: ["Paid acquisition plan", "Organic growth engine", "Virality design"]
    }
  },
  // --- PAIR E ---
  {
    id: "E",
    name: "Echo",
    role: "Social",
    description: "Creates brand omnipresence by distributing messages across all frequencies.",
    color: "from-cyan-400 to-blue-500",
    icon: "📣",
    url: "https://nexus.ai/echo",
    toolCard: {
      purpose: "Creates brand omnipresence by distributing messages across all frequencies.",
      useThisWhen: ["Reach is limited", "Message is inconsistent", "Scaling content output"],
      inputNeeded: "Primary asset; Target platforms.",
      outputDelivered: ["Distribution Map", "Engagement Protocol"],
      doNotUseWhen: ["No content assets exist"],
      bestNextStep: "L (Intent)",
      useCases: ["Multi-channel scheduling", "Comment engagement", "Brand voice sync"]
    }
  },
  {
    id: "EE",
    name: "Expand",
    role: "Amplification",
    description: "Maximizes brand amplification through multiplication and high-tier PR.",
    color: "from-sky-500 to-cyan-600",
    icon: "📡",
    url: "https://nexus.ai/echo-strat",
    toolCard: {
      purpose: "Maximizes brand amplification through multiplication and high-tier PR.",
      useThisWhen: ["Brand is unknown", "Need authority", "Scaling message"],
      inputNeeded: "Brand assets; Media list.",
      outputDelivered: ["Amplification Map", "Reach Forecast"],
      doNotUseWhen: ["Message is not defined"],
      bestNextStep: "HH (Community)",
      useCases: ["PR campaign design", "Influencer syndication", "Brand halo build"]
    }
  },
  // --- PAIR F ---
  {
    id: "F",
    name: "Frontier",
    role: "Outreach",
    description: "Bridges the gap from 'cold' to 'sold' through direct engagement.",
    color: "from-green-600 to-emerald-700",
    icon: "⛺",
    url: "https://nexus.ai/frontier",
    toolCard: {
      purpose: "Bridges the gap from 'cold' to 'sold' through direct engagement.",
      useThisWhen: ["Inbound leads are low", "Breaking into new markets", "Seeking direct contact"],
      inputNeeded: "Lead list; Offer validation.",
      outputDelivered: ["Outreach Scripts", "Lead Response Map"],
      doNotUseWhen: ["Offer is not validated"],
      bestNextStep: "J (DMs)",
      useCases: ["Cold email sequence", "LinkedIn outreach", "Event follow-up"]
    }
  },
  {
    id: "FF",
    name: "Flux",
    role: "Agility",
    description: "Engineers rapid pivots to exploit market shifts and economic changes.",
    color: "from-teal-500 to-emerald-600",
    icon: "🌊",
    url: "https://nexus.ai/flux",
    toolCard: {
      purpose: "Engineers rapid pivots to exploit market shifts and economic changes.",
      useThisWhen: ["Market is changing", "Competitors disrupted", "Crisis mode"],
      inputNeeded: "Market news; Internal stats.",
      outputDelivered: ["Pivot Protocol", "Agility Scorecard"],
      doNotUseWhen: ["Stable growth phase"],
      bestNextStep: "VV (Forecasting)",
      useCases: ["Market-shift response", "Crisis pivot", "Competitive adjustment"]
    }
  },
  // --- PAIR G ---
  {
    id: "G",
    name: "Garrison",
    role: "Legal",
    description: "Scrubs all assets for compliance, policy, and institutional risk.",
    color: "from-gray-600 to-gray-800",
    icon: "🏯",
    url: "https://nexus.ai/garrison",
    toolCard: {
      purpose: "Scrubs all assets for compliance, policy, and institutional risk.",
      useThisWhen: ["Launching regulated products", "Publishing sensitive copy", "Audit preparation"],
      inputNeeded: "Marketing copy; Landing pages.",
      outputDelivered: ["Compliance Audit", "Safe-Copy Revision"],
      doNotUseWhen: ["Drafts are too early stage"],
      bestNextStep: "A (Contracts)",
      useCases: ["Ad policy check", "GDPR/Terms audit", "Disclaimer generation"]
    }
  },
  {
    id: "GG",
    name: "Grid",
    role: "Systems",
    description: "Builds the scalable infrastructure and deep architectural SOPs.",
    color: "from-emerald-600 to-green-700",
    icon: "🏁",
    url: "https://nexus.ai/grid",
    toolCard: {
      purpose: "Builds the scalable infrastructure and deep architectural SOPs.",
      useThisWhen: ["Scaling operations", "Chaos is increasing", "Team growing"],
      inputNeeded: "Current workflows; Resource list.",
      outputDelivered: ["Systems Map", "Infrastructure SOP"],
      doNotUseWhen: ["Pre-product market fit"],
      bestNextStep: "NN (Automation)",
      useCases: ["Scaling infrastructure", "Departmental sync", "Backend build"]
    }
  },
  // --- PAIR H ---
  {
    id: "H",
    name: "Hush",
    role: "PR",
    description: "Neutralizes friction and manages reputation in high-stress environments.",
    color: "from-slate-700 to-black",
    icon: "🤫",
    url: "https://nexus.ai/hush",
    toolCard: {
      purpose: "Neutralizes friction and manages reputation in high-stress environments.",
      useThisWhen: ["Negative press hits", "Crisis emerging", "Reputation management needed"],
      inputNeeded: "Negative signal; Public record.",
      outputDelivered: ["Response Script", "Damage Control Plan"],
      doNotUseWhen: ["Environment is stable"],
      bestNextStep: "V (Pivot)",
      useCases: ["Crisis management", "Brand protection", "Dark PR neutralization"]
    }
  },
  {
    id: "HH",
    name: "Hive",
    role: "Tribal",
    description: "Engineers tribal loyalty, audience engagement, and community logic.",
    color: "from-green-500 to-lime-600",
    icon: "🐝",
    url: "https://nexus.ai/hive",
    toolCard: {
      purpose: "Engineers tribal loyalty, audience engagement, and community logic.",
      useThisWhen: ["Building a movement", "Engagement is key", "Loyalty needed"],
      inputNeeded: "User base; Engagement metrics.",
      outputDelivered: ["Tribal Strategy", "Engagement Map"],
      doNotUseWhen: ["Transactional model only"],
      bestNextStep: "OO (Loops)",
      useCases: ["Community launch", "Engagement loop", "Viral challenge"]
    }
  },
  // --- PAIR I ---
  {
    id: "I",
    name: "Infra",
    role: "Tech",
    description: "Builds the logic bridges and technical stack required for scale.",
    color: "from-indigo-500 to-purple-600",
    icon: "🏗️",
    url: "https://nexus.ai/infra",
    toolCard: {
      purpose: "Builds the logic bridges and technical stack required for scale.",
      useThisWhen: ["Tools are disconnected", "Scaling breaks systems", "Manual data entry is high"],
      inputNeeded: "Tool list; API documentation.",
      outputDelivered: ["Stack Map", "Technical Specs"],
      doNotUseWhen: ["Process is not defined"],
      bestNextStep: "NN (Automation)",
      useCases: ["Stack integration", "Database mapping", "Security hardening"]
    }
  },
  {
    id: "II",
    name: "Intel",
    role: "Research",
    description: "Mines competitive data for hidden insights and 'Blue Ocean' advantages.",
    color: "from-lime-600 to-yellow-600",
    icon: "🕵️",
    url: "https://nexus.ai/intel",
    toolCard: {
      purpose: "Mines competitive data for hidden insights and 'Blue Ocean' advantages.",
      useThisWhen: ["Strategy is blind", "Competitors are winning", "Seeking edge"],
      inputNeeded: "Rival URLs; Industry data.",
      outputDelivered: ["Intel Report", "Competitive Edge Map"],
      doNotUseWhen: ["Overwhelmed with data"],
      bestNextStep: "RR (Disruption)",
      useCases: ["Funnel autopsy", "Gap analysis", "Shadow intel mining"]
    }
  },
  // --- PAIR J ---
  {
    id: "J",
    name: "Juno",
    role: "DMs",
    description: "Snipe appointments through 1-on-1 direct message conversations.",
    color: "from-pink-500 to-rose-600",
    icon: "🏹",
    url: "https://nexus.ai/juno",
    toolCard: {
      purpose: "Snipe appointments through 1-on-1 direct message conversations.",
      useThisWhen: ["Leads are in inbox", "High-ticket sales", "Conversational conversion"],
      inputNeeded: "Inbox access; Appointment calendar.",
      outputDelivered: ["DM Script Set", "Booking Confirmation"],
      doNotUseWhen: ["Traffic is zero"],
      bestNextStep: "K (VSLs)",
      useCases: ["Lead qualification", "Objection handling", "Link drop"]
    }
  },
  {
    id: "JJ",
    name: "Jolt",
    role: "Sales",
    description: "Shocks stagnant leads or inactive systems into immediate cash-flow action.",
    color: "from-yellow-500 to-orange-600",
    icon: "🔋",
    url: "https://nexus.ai/jolt",
    toolCard: {
      purpose: "Shocks stagnant leads or inactive systems into immediate cash-flow action.",
      useThisWhen: ["Cash flow urgency", "Leads are stalling", "Pipeline frozen"],
      inputNeeded: "Dead list; Cash need.",
      outputDelivered: ["Jolt Campaign", "Cash Spike Model"],
      doNotUseWhen: ["Pipeline is full and moving"],
      bestNextStep: "LL (Closing)",
      useCases: ["Flash sale shock", "Deadline pressure", "Contradictory subject line"]
    }
  },
  // --- PAIR K ---
  {
    id: "K",
    name: "Kinetix",
    role: "VSLs",
    description: "Scripts high-intensity Video Sales Letters that convert at scale.",
    color: "from-red-600 to-orange-600",
    icon: "🎥",
    url: "https://nexus.ai/kinetix",
    toolCard: {
      purpose: "Scripts high-intensity Video Sales Letters that convert at scale.",
      useThisWhen: ["Conversions are low", "Explaining complex offers", "Scaling ads"],
      inputNeeded: "Product specs; Testimonials.",
      outputDelivered: ["Full Script", "Storyboard"],
      doNotUseWhen: ["Offer is weak"],
      bestNextStep: "L (Intent)",
      useCases: ["Long-form VSL", "60-second 'Short' VSL", "Demo video"]
    }
  },
  {
    id: "KK",
    name: "Knot",
    role: "Scarcity",
    description: "Uses gates, limits, and waitlists to increase perceived value and demand.",
    color: "from-orange-600 to-red-600",
    icon: "🪢",
    url: "https://nexus.ai/knot",
    toolCard: {
      purpose: "Uses gates, limits, and waitlists to increase perceived value and demand.",
      useThisWhen: ["Demand is high", "Exclusivity needed", "Launching new tier"],
      inputNeeded: "Available slots; Current demand.",
      outputDelivered: ["Scarcity Protocol", "Value Gate Plan"],
      doNotUseWhen: ["Demand is low"],
      bestNextStep: "DD (Growth)",
      useCases: ["Waitlist strategy", "Application-only logic", "Countdown build"]
    }
  },
  // --- PAIR L ---
  {
    id: "L",
    name: "Locus",
    role: "Intent",
    description: "Tracks 'ready-to-buy' behavior patterns and identifying hot leads.",
    color: "from-blue-500 to-cyan-500",
    icon: "🎯",
    url: "https://nexus.ai/locus",
    toolCard: {
      purpose: "Tracks 'ready-to-buy' behavior patterns and identifying hot leads.",
      useThisWhen: ["Leads are cold", "Retargeting is generic", "Identifying buyers"],
      inputNeeded: "Pixel data; Website heatmaps.",
      outputDelivered: ["Lead Intent Score", "Retargeting Map"],
      doNotUseWhen: ["No tracking data available"],
      bestNextStep: "F (Outreach)",
      useCases: ["Behavior scoring", "Retargeting logic", "Intent-based routing"]
    }
  },
  {
    id: "LL",
    name: "Link",
    role: "Closing",
    description: "Converts interest into high-ticket transactions with zero friction.",
    color: "from-red-600 to-rose-700",
    icon: "🔗",
    url: "https://nexus.ai/link",
    toolCard: {
      purpose: "Converts interest into high-ticket transactions with zero friction.",
      useThisWhen: ["High leads, low sales", "Closing rate is poor", "Friction at checkout"],
      inputNeeded: "Qualified lead; Closing script.",
      outputDelivered: ["Closing Protocol", "Conversion Audit"],
      doNotUseWhen: ["No qualified leads"],
      bestNextStep: "CC (Finance)",
      useCases: ["Closing call script", "One-click checkout", "Objection nuke"]
    }
  },
  // --- PAIR M ---
  {
    id: "M",
    name: "Midas",
    role: "Referrals",
    description: "Turns client wins into structural, automated referral events.",
    color: "from-yellow-400 to-amber-500",
    icon: "🥇",
    url: "https://nexus.ai/midas",
    toolCard: {
      purpose: "Turns client wins into structural, automated referral events.",
      useThisWhen: ["Clients are happy but silent", "Growth is purely paid", "Seeking viral loops"],
      inputNeeded: "Success story; Client list.",
      outputDelivered: ["Referral SOP", "Affiliate Link Map"],
      doNotUseWhen: ["Product quality is low"],
      bestNextStep: "Y (Upsell)",
      useCases: ["Referral loop build", "Reward system", "Affiliate tracking"]
    }
  },
  {
    id: "MM",
    name: "Mind",
    role: "Psychology",
    description: "Leverages behavioral economics and buyer psychology to influence choice.",
    color: "from-rose-600 to-pink-700",
    icon: "🧠",
    url: "https://nexus.ai/mind",
    toolCard: {
      purpose: "Leverages behavioral economics and buyer psychology to influence choice.",
      useThisWhen: ["Conversion logic fails", "Persuasion needed", "Refining offers"],
      inputNeeded: "Persona profile; Current copy.",
      outputDelivered: ["Psychological Profile", "Influence Strategy"],
      doNotUseWhen: ["Product is utility only"],
      bestNextStep: "LL (Closing)",
      useCases: ["Status-vs-Savings test", "Authority build", "Reciprocity loop"]
    }
  },
  // --- PAIR N ---
  {
    id: "N",
    name: "Net",
    role: "SOPs",
    description: "Turns messy manual tasks into clean, industrial Standard Operating Procedures.",
    color: "from-slate-500 to-gray-600",
    icon: "🔗",
    url: "https://nexus.ai/net",
    toolCard: {
      purpose: "Turns messy manual tasks into clean, industrial Standard Operating Procedures.",
      useThisWhen: ["Team is confused", "Quality is inconsistent", "Delegation fails"],
      inputNeeded: "Task recording; Desired outcome.",
      outputDelivered: ["Step-by-Step SOP", "Operational Map"],
      doNotUseWhen: ["Task is a one-off event"],
      bestNextStep: "GG (Systems)",
      useCases: ["Onboarding SOP", "Hiring guide", "Fulfillment checklist"]
    }
  },
  {
    id: "NN",
    name: "Node",
    role: "Automation",
    description: "Connects disparate tools into a single self-driving 'Sovereign Machine'.",
    color: "from-purple-600 to-indigo-700",
    icon: "🕸️",
    url: "https://nexus.ai/node",
    toolCard: {
      purpose: "Connects disparate tools into a single self-driving 'Sovereign Machine'.",
      useThisWhen: ["Manual tasks overwhelming", "Systems disconnected", "Scaling up"],
      inputNeeded: "App list; API keys.",
      outputDelivered: ["Automation Script", "Data Flow Map"],
      doNotUseWhen: ["Process is undefined"],
      bestNextStep: "GG (Systems)",
      useCases: ["Lead-to-Sale automation", "CRM sync", "Automated reporting"]
    }
  },
  // --- PAIR O ---
  {
    id: "O",
    name: "Omega",
    role: "Exit",
    description: "Audits the business for 'Built-to-Sell' scores and exit readiness.",
    color: "from-violet-600 to-purple-800",
    icon: "Ω",
    url: "https://nexus.ai/omega",
    toolCard: {
      purpose: "Audits the business for 'Built-to-Sell' scores and exit readiness.",
      useThisWhen: ["Preparing to sell", "Valuation is unclear", "Checking business health"],
      inputNeeded: "3-year P&L; Operational manuals.",
      outputDelivered: ["Exit Scorecard", "Sellability Report"],
      doNotUseWhen: ["Business is in infancy"],
      bestNextStep: "ZZ (Legacy)",
      useCases: ["Multiplier audit", "Liability cleanup", "Broker prep"]
    }
  },
  {
    id: "OO",
    name: "Orbit",
    role: "Loops",
    description: "Designs retention loops that keep customers within the ecosystem forever.",
    color: "from-indigo-600 to-blue-700",
    icon: "🪐",
    url: "https://nexus.ai/orbit",
    toolCard: {
      purpose: "Designs retention loops that keep customers within the ecosystem forever.",
      useThisWhen: ["LTV is limited", "Churn is an issue", "Building ecosystem"],
      inputNeeded: "Renewal rate; Product map.",
      outputDelivered: ["Orbit Strategy", "LTV Projection"],
      doNotUseWhen: ["One-time purchase model"],
      bestNextStep: "Y (Profit)",
      useCases: ["Retention loop build", "Habit-forming UX", "Echo-loop design"]
    }
  },
  // --- PAIR P ---
  {
    id: "P",
    name: "Pulse",
    role: "Clips",
    description: "Shreds long-form video content into 50+ high-engagement micro-assets.",
    color: "from-pink-500 to-red-500",
    icon: "💓",
    url: "https://nexus.ai/pulse",
    toolCard: {
      purpose: "Shreds long-form video content into 50+ high-engagement micro-assets.",
      useThisWhen: ["Long content exists", "Social feed is empty", "Maximizing content ROI"],
      inputNeeded: "Raw video file; Brand guidelines.",
      outputDelivered: ["Asset Library", "Caption Set"],
      doNotUseWhen: ["No long-form source material"],
      bestNextStep: "E (Social)",
      useCases: ["TikTok/Reels edit", "Quote card gen", "Newsletter snippet"]
    }
  },
  {
    id: "PP",
    name: "Prime",
    role: "Quality",
    description: "Refines the core product/service to a world-class, undisputed standard.",
    color: "from-blue-600 to-cyan-700",
    icon: "💎",
    url: "https://nexus.ai/prime",
    toolCard: {
      purpose: "Refines the core product/service to a world-class, undisputed standard.",
      useThisWhen: ["Competition is high", "Reviews are mixed", "Premium positioning"],
      inputNeeded: "Product reviews; Feature list.",
      outputDelivered: ["Product Audit", "Quality Roadmap"],
      doNotUseWhen: ["MVP phase"],
      bestNextStep: "BB (Validation)",
      useCases: ["UI/UX refinement", "Fulfillment speed", "Unboxing experience"]
    }
  },
  // --- PAIR Q ---
  {
    id: "Q",
    name: "Quark",
    role: "Copy",
    description: "Logic-tests every headline and sentence for maximum conversion.",
    color: "from-teal-400 to-teal-600",
    icon: "✒️",
    url: "https://nexus.ai/quark",
    toolCard: {
      purpose: "Logic-tests every headline and sentence for maximum conversion.",
      useThisWhen: ["Copy isn't converting", "Messaging is fuzzy", "A/B testing"],
      inputNeeded: "Draft copy; Target persona.",
      outputDelivered: ["Optimized Copy", "Logic Score"],
      doNotUseWhen: ["Offer is undefined"],
      bestNextStep: "D (Hooks)",
      useCases: ["Sales page edit", "A/B headline test", "Micro-copy polish"]
    }
  },
  {
    id: "QQ",
    name: "Quota",
    role: "Metrics",
    description: "Tracks, measures, and visualizes success against hard industrial targets.",
    color: "from-cyan-600 to-teal-700",
    icon: "📊",
    url: "https://nexus.ai/quota",
    toolCard: {
      purpose: "Tracks, measures, and visualizes success against hard industrial targets.",
      useThisWhen: ["Blind to performance", "Accountability needed", "Data driven"],
      inputNeeded: "KPI list; Goal numbers.",
      outputDelivered: ["Live Metrics Dashboard", "Quota Report"],
      doNotUseWhen: ["No data streams"],
      bestNextStep: "XX (Diagnostics)",
      useCases: ["Dashboard build", "Weekly target audit", "Underperformance alert"]
    }
  },
  // --- PAIR R ---
  {
    id: "R",
    name: "Root",
    role: "SEO",
    description: "Dominates high-intent search terms to capture organic traffic.",
    color: "from-green-500 to-lime-600",
    icon: "🌳",
    url: "https://nexus.ai/root",
    toolCard: {
      purpose: "Dominates high-intent search terms to capture organic traffic.",
      useThisWhen: ["Paid ads are expensive", "Seeking long-term traffic", "Authority building"],
      inputNeeded: "Keyword list; Competitor URLs.",
      outputDelivered: ["SEO Roadmap", "Keyword Hierarchy"],
      doNotUseWhen: ["Need results today"],
      bestNextStep: "L (Intent)",
      useCases: ["On-page audit", "Backlink strategy", "Content silo build"]
    }
  },
  {
    id: "RR",
    name: "Rift",
    role: "Disruption",
    description: "Identifies and exploits major gaps in competitor armor or market standard.",
    color: "from-teal-600 to-emerald-700",
    icon: "🌋",
    url: "https://nexus.ai/rift",
    toolCard: {
      purpose: "Identifies and exploits major gaps in competitor armor or market standard.",
      useThisWhen: ["Market is saturated", "Need new angle", "Breaking through"],
      inputNeeded: "Market standard; Competitor spend.",
      outputDelivered: ["Disruption Strategy", "Rift Analysis"],
      doNotUseWhen: ["Leading the market"],
      bestNextStep: "AA (Strategy)",
      useCases: ["Business model rift", "Pricing disruption", "Positioning twist"]
    }
  },
  // --- PAIR S ---
  {
    id: "S",
    name: "Scroll",
    role: "Identity",
    description: "Ingests the Brand Bible to ensure the AI sounds exactly like you.",
    color: "from-fuchsia-500 to-purple-600",
    icon: "📜",
    url: "https://nexus.ai/scroll",
    toolCard: {
      purpose: "Ingests the Brand Bible to ensure the AI sounds exactly like you.",
      useThisWhen: ["Voice is inconsistent", "Delegating content", "Rebranding"],
      inputNeeded: "Voice samples; Writing style.",
      outputDelivered: ["Brand Voice Map", "Persona File"],
      doNotUseWhen: ["Brand personality is undefined"],
      bestNextStep: "P (Clips)",
      useCases: ["Tone-of-voice sync", "Persona hardening", "Style guide gen"]
    }
  },
  {
    id: "SS",
    name: "Sync",
    role: "Culture",
    description: "Harmonizes human resources, operational rhythm, and brand culture.",
    color: "from-emerald-600 to-green-700",
    icon: "🤝",
    url: "https://nexus.ai/sync",
    toolCard: {
      purpose: "Harmonizes human resources, operational rhythm, and brand culture.",
      useThisWhen: ["Team is misaligned", "Culture is toxic", "Hiring fast"],
      inputNeeded: "Team size; Culture goals.",
      outputDelivered: ["Culture Manual", "Alignment SOP"],
      doNotUseWhen: ["Solo founder"],
      bestNextStep: "GG (Systems)",
      useCases: ["Hiring filter", "Ritual sync", "Brand alignment"]
    }
  },
  // --- PAIR T ---
  {
    id: "T",
    name: "Tome",
    role: "Rivals",
    description: "Performs a deep autopsy on competitor weaknesses and funnel structure.",
    color: "from-slate-600 to-slate-900",
    icon: "📖",
    url: "https://nexus.ai/tome",
    toolCard: {
      purpose: "Performs a deep autopsy on competitor weaknesses and funnel structure.",
      useThisWhen: ["Entering new market", "Losing market share", "Strategic planning"],
      inputNeeded: "Rival name; Ad library access.",
      outputDelivered: ["Rival Forensics Report", "Exploit Map"],
      doNotUseWhen: ["No clear competitors"],
      bestNextStep: "II (Research)",
      useCases: ["Funnel hack", "Ad spend audit", "Weakness exploit"]
    }
  },
  {
    id: "TT",
    name: "Traction",
    role: "Momentum",
    description: "Turns static energy into high-velocity kinetic forward motion.",
    color: "from-green-600 to-lime-700",
    icon: "🚜",
    url: "https://nexus.ai/traction",
    toolCard: {
      purpose: "Turns static energy into high-velocity kinetic forward motion.",
      useThisWhen: ["Project stalled", "Launch failed", "Need speed"],
      inputNeeded: "Stalled project; Resource list.",
      outputDelivered: ["Traction Roadmap", "Momentum Score"],
      doNotUseWhen: ["Already moving fast"],
      bestNextStep: "WW (Speed)",
      useCases: ["Project kickstart", "Momentum audit", "Friction removal"]
    }
  },
  // --- PAIR U ---
  {
    id: "U",
    name: "Uplift",
    role: "Workflow",
    description: "Secures the perimeter of your deep-work hours and team productivity.",
    color: "from-sky-400 to-blue-500",
    icon: "🌤️",
    url: "https://nexus.ai/uplift",
    toolCard: {
      purpose: "Secures the perimeter of your deep-work hours and team productivity.",
      useThisWhen: ["Overwhelmed", "Missed deadlines", "Focus is scattered"],
      inputNeeded: "Calendar; Task list.",
      outputDelivered: ["Optimized Schedule", "Focus Protocol"],
      doNotUseWhen: ["Workload is light"],
      bestNextStep: "N (SOPs)",
      useCases: ["Time-blocking build", "Distraction audit", "Ritual design"]
    }
  },
  {
    id: "UU",
    name: "Util",
    role: "Efficiency",
    description: "Optimizes the allocation of time, money, and energy across the stack.",
    color: "from-lime-600 to-yellow-700",
    icon: "🔋",
    url: "https://nexus.ai/util",
    toolCard: {
      purpose: "Optimizes the allocation of time, money, and energy across the stack.",
      useThisWhen: ["Burnout risk", "Wasting resources", "Cost cutting"],
      inputNeeded: "Budget; Resource logs.",
      outputDelivered: ["Efficiency Report", "Utilization Plan"],
      doNotUseWhen: ["Resources are abundant"],
      bestNextStep: "CC (Finance)",
      useCases: ["Cost audit", "Resource reallocation", "Efficiency hack"]
    }
  },
  // --- PAIR V ---
  {
    id: "V",
    name: "Verve",
    role: "Pivot",
    description: "Injects creative 'shocks' into stagnant systems or failing offers.",
    color: "from-yellow-400 to-orange-500",
    icon: "💫",
    url: "https://nexus.ai/verve",
    toolCard: {
      purpose: "Injects creative 'shocks' into stagnant systems or failing offers.",
      useThisWhen: ["Growth has stalled", "Offer fatigue", "Market saturation"],
      inputNeeded: "Performance drop; Stale heartbeat.",
      outputDelivered: ["New Angle Deck", "Creative Brief"],
      doNotUseWhen: ["Things are working well"],
      bestNextStep: "JJ (Activation)",
      useCases: ["Offer refresh", "Creative angle shift", "Viral pivot"]
    }
  },
  {
    id: "VV",
    name: "View",
    role: "Forecasting",
    description: "Predicts future trends and sets long-term sovereign vectors.",
    color: "from-yellow-600 to-orange-700",
    icon: "🔭",
    url: "https://nexus.ai/view",
    toolCard: {
      purpose: "Predicts future trends and sets long-term sovereign vectors.",
      useThisWhen: ["Planning long term", "Market shifting", "Future proofing"],
      inputNeeded: "Industry news; 10-year goal.",
      outputDelivered: ["Vision Roadmap", "Forecasting Model"],
      doNotUseWhen: ["Survival mode"],
      bestNextStep: "ZZ (Legacy)",
      useCases: ["Future-proofing", "Trend forecasting", "Long-term mapping"]
    }
  },
  // --- PAIR W ---
  {
    id: "W",
    name: "Warp",
    role: "Launch",
    description: "Accelerates an idea from concept to checkout in 168 hours or less.",
    color: "from-indigo-500 to-blue-600",
    icon: "🚀",
    url: "https://nexus.ai/warp",
    toolCard: {
      purpose: "Accelerates an idea from concept to checkout in 168 hours or less.",
      useThisWhen: ["Speed is critical", "Testing new ideas", "Beating competitors"],
      inputNeeded: "Minimum Viable Product; Basic offer.",
      outputDelivered: ["7-Day Sprint Map", "Launch Assets"],
      doNotUseWhen: ["Quality requires long timeline"],
      bestNextStep: "DD (Growth)",
      useCases: ["MVP Launch", "Flash sale build", "Beta test setup"]
    }
  },
  {
    id: "WW",
    name: "Warp+",
    role: "Speed",
    description: "Bends time and market cycles to execute faster than humanly possible.",
    color: "from-orange-600 to-red-700",
    icon: "🚄",
    url: "https://nexus.ai/warp-speed",
    toolCard: {
      purpose: "Bends time and market cycles to execute faster than humanly possible.",
      useThisWhen: ["Too slow", "Competitors faster", "Urgency high"],
      inputNeeded: "Desired speed; Bottlenecks.",
      outputDelivered: ["Warp Schedule", "Velocity Audit"],
      doNotUseWhen: ["Quality will suffer"],
      bestNextStep: "QQ (Metrics)",
      useCases: ["Time-compression", "Rapid deployment", "High-velocity growth"]
    }
  },
  // --- PAIR X ---
  {
    id: "X",
    name: "X-Ray",
    role: "Funnels",
    description: "Identifies the invisible friction points killing your funnel conversion.",
    color: "from-slate-500 to-blue-900",
    icon: "🩻",
    url: "https://nexus.ai/xray",
    toolCard: {
      purpose: "Identifies the invisible friction points killing your funnel conversion.",
      useThisWhen: ["Traffic high, sales low", "Drop-offs are unexplained", "Optimizing leaks"],
      inputNeeded: "Funnel stats; Page speed data.",
      outputDelivered: ["Friction Report", "Optimization List"],
      doNotUseWhen: ["No funnel data exists"],
      bestNextStep: "L (Intent)",
      useCases: ["Drop-off audit", "Checkout optimization", "Speed test"]
    }
  },
  {
    id: "XX",
    name: "Xenon",
    role: "Diagnostics",
    description: "Performs deep X-ray diagnostics to find hidden fractures in the machine.",
    color: "from-red-600 to-rose-700",
    icon: "🔦",
    url: "https://nexus.ai/xenon",
    toolCard: {
      purpose: "Performs deep X-ray diagnostics to find hidden fractures in the machine.",
      useThisWhen: ["System failing", "Unknown errors", "Health check"],
      inputNeeded: "Full business data; System logs.",
      outputDelivered: ["Diagnostic Report", "Repair List"],
      doNotUseWhen: ["Ignorance is preferred"],
      bestNextStep: "UU (Efficiency)",
      useCases: ["Vulnerability audit", "Fracture detection", "Structural check"]
    }
  },
  // --- PAIR Y ---
  {
    id: "Y",
    name: "Yield",
    role: "Upsell",
    description: "Squeezes maximum lifetime value (LTV) through value-add upsells.",
    color: "from-emerald-500 to-green-600",
    icon: "🌾",
    url: "https://nexus.ai/yield",
    toolCard: {
      purpose: "Squeezes maximum lifetime value (LTV) through value-add upsells.",
      useThisWhen: ["LTV is low", "Customer trust is high", "Leaving money on table"],
      inputNeeded: "Customer list; Product suite.",
      outputDelivered: ["Upsell Map", "Value-Add Copy"],
      doNotUseWhen: ["Initial offer is failing"],
      bestNextStep: "M (Referrals)",
      useCases: ["Post-purchase offer", "Downsell sequence", "Bundle design"]
    }
  },
  {
    id: "YY",
    name: "Yield+",
    role: "Profit",
    description: "Squeezes every drop of profit from existing assets and dead leads.",
    color: "from-rose-600 to-pink-700",
    icon: "💰",
    url: "https://nexus.ai/yield-strat",
    toolCard: {
      purpose: "Squeezes every drop of profit from existing assets and dead leads.",
      useThisWhen: ["Maximizing return", "Assets underutilized", "Cash flow needed"],
      inputNeeded: "Asset list; Dead leads.",
      outputDelivered: ["Profit Yield Map", "Asset Report"],
      doNotUseWhen: ["No assets exist"],
      bestNextStep: "ZZ (Legacy)",
      useCases: ["Dead-lead monetizing", "License strategy", "Yield maximization"]
    }
  },
  // --- PAIR Z ---
  {
    id: "Z",
    name: "Zenith",
    role: "Trigger",
    description: "Initiates the multi-agent work chains that run the entire itsAI machine.",
    color: "from-purple-600 to-indigo-600",
    icon: "⚡",
    url: "https://nexus.ai/zenith",
    toolCard: {
      purpose: "Initiates the multi-agent work chains that run the entire itsAI machine.",
      useThisWhen: ["Starting a complex workflow", "Connecting multiple agents", "Orchestration"],
      inputNeeded: "User intent; Goal status.",
      outputDelivered: ["Active Work-Chain", "Status Update"],
      doNotUseWhen: ["Task is simple single-step"],
      bestNextStep: "ALL",
      useCases: ["Starting the engine", "Chain handoff", "Global status check"]
    }
  },
  {
    id: "ZZ",
    name: "Zenith+",
    role: "Legacy",
    description: "Architecting the final payout, transition to Chairman, and 2026 legacy.",
    color: "from-pink-600 to-purple-800",
    icon: "🌌",
    url: "https://nexus.ai/zenith-legacy",
    toolCard: {
      purpose: "Architecting the final payout, transition to Chairman, and 2026 legacy.",
      useThisWhen: ["Exiting", "Retiring", "Legacy building"],
      inputNeeded: "Exit goals; Wealth target.",
      outputDelivered: ["Legacy Blueprint", "Zenith Document"],
      doNotUseWhen: ["Just starting out"],
      bestNextStep: "EXIT",
      useCases: ["Succession plan", "Sale negotiation", "Legacy design"]
    }
  }
];

export const INITIAL_GREETING = "Nexus connection established. I am [TELEPORT -> ORC].\n\nTo begin our orchestration protocol, please specify the **Target Tone for your project assets** from the options below.";

export const INITIAL_CHOICES = [
  "Elite Authority",
  "Direct Response",
  "Empathetic Partner",
  "Clinical Logic",
  "Rebellious Challenger",
  "Quiet Luxury",
  "High-Octane Hype",
  "Radical Transparency"
];