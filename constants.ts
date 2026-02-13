
import { Agent } from './types';

export const SYSTEM_NAME = "The Oracle";

export const ORACLE_NODE: Agent = {
  id: 'ORACLE',
  name: 'The Oracle',
  role: 'System Orchestrator',
  description: 'The core consciousness and administrative interface of the Nexus system, specializing in customized workflow generation.',
  oracleInsight: 'My current focus: Orchestrating your strategic dominance.',
  color: 'from-blue-900 to-indigo-950',
  icon: '🔮',
};

export const AGENTS: Agent[] = [
  {
    id: "A",
    name: "Arbiter",
    role: "Contracts",
    description: "Shreds legal ambiguity to secure maximum leverage and IP protection.",
    oracleInsight: "Shredding legal friction to secure your sovereignty.",
    color: "from-slate-600 to-slate-800",
    icon: "⚖️",
    url: "https://nexus.ai/arbiter",
    toolCard: {
      purpose: "Shreds legal ambiguity to secure maximum leverage and IP protection.",
      useThisWhen: ["Drafting new agreements", "Reviewing legal exposure", "Locking in IP"],
      inputNeeded: "Draft contract; Counter-party history.",
      outputDelivered: ["Redlined Document", "Risk-Exposure Report"],
      doNotUseWhen: ["No legal documents exist yet"],
      bestNextStep: "CC (Finance)",
      useCases: ["Redlining liability", "IP protection", "Enforcing payment triggers"]
    }
  },
  {
    id: "AA",
    name: "Apex",
    role: "Strategy",
    description: "Defines the highest-level strategic objectives and market dominance vectors.",
    oracleInsight: "Defining the North Star for absolute market dominance.",
    color: "from-indigo-900 to-slate-900",
    icon: "🏔️",
    url: "https://nexus.ai/apex",
    toolCard: {
      purpose: "Defines the highest-level strategic objectives and market dominance vectors.",
      useThisWhen: ["Vision is blurry", "Entering new markets", "Seeking dominance"],
      inputNeeded: "Market landscape; Resource inventory.",
      outputDelivered: ["North Star Objective", "Market Dominance Roadmap"],
      doNotUseWhen: ["Stuck in tactical fires"],
      bestNextStep: "BB (Validation)",
      useCases: ["Service-to-Platform transition", "Niche dominance"]
    }
  },
  {
    id: "B",
    name: "Bulwark",
    role: "Retention",
    description: "Guards the customer relationship to prevent churn and ensure continuity.",
    oracleInsight: "Fortifying your relationships to eliminate churn.",
    color: "from-blue-600 to-indigo-700",
    icon: "🛡️",
    url: "https://nexus.ai/bulwark",
    toolCard: {
      purpose: "Guards the customer relationship to prevent churn and ensure continuity.",
      useThisWhen: ["Churn rates are spiking", "Customer sentiment is low"],
      inputNeeded: "Usage data; Churn alerts; Client feedback.",
      outputDelivered: ["Retention Strategy", "Churn Risk Map"],
      doNotUseWhen: ["You have no active customers"],
      bestNextStep: "M (Referrals)",
      useCases: ["Pre-emptive save", "Onboarding verification"]
    }
  },
  {
    id: "BB",
    name: "Bridge",
    role: "Validation",
    description: "Validates the connection between the high-level offer and the 'bleeding neck' problem.",
    oracleInsight: "Ensuring your solution hits the 'bleeding neck' problem exactly.",
    color: "from-blue-800 to-indigo-900",
    icon: "🌉",
    url: "https://nexus.ai/bridge",
    toolCard: {
      purpose: "Validates the connection between the high-level offer and the 'bleeding neck' problem.",
      useThisWhen: ["Launching new offers", "Sales are inconsistent"],
      inputNeeded: "Customer interviews; Offer draft.",
      outputDelivered: ["Validation Score", "Offer Refinement"],
      doNotUseWhen: ["Strategy (Apex) is undefined"],
      bestNextStep: "DD (Growth)",
      useCases: ["Problem-Solution fit", "Offer stress-test"]
    }
  },
  {
    id: "C",
    name: "Centurion",
    role: "Pricing",
    description: "Architects the price floor and ceiling for maximum structural profit.",
    oracleInsight: "Architecting a pricing floor that forces maximum profit.",
    color: "from-amber-500 to-yellow-600",
    icon: "🏛️",
    url: "https://nexus.ai/centurion",
    toolCard: {
      purpose: "Architects the price floor and ceiling for maximum structural profit.",
      useThisWhen: ["Margins are eroding", "Launching a new tier"],
      inputNeeded: "Delivery costs; Market comps; Desired margins.",
      outputDelivered: ["Pricing Matrix", "Profit Floor Analysis"],
      doNotUseWhen: ["Costs are unknown"],
      bestNextStep: "CC (Finance)",
      useCases: ["Tiered pricing build", "Discount thresholding"]
    }
  },
  {
    id: "CC",
    name: "Core",
    role: "Finance",
    description: "Audits the financial engine to ensure scalability and structural profit.",
    oracleInsight: "Auditing your economics to ensure every unit is profitable.",
    color: "from-blue-600 to-blue-800",
    icon: "💠",
    url: "https://nexus.ai/core",
    toolCard: {
      purpose: "Audits the financial engine to ensure scalability and structural profit.",
      useThisWhen: ["Scaling revenue", "Profit is low"],
      inputNeeded: "P&L; Unit economics.",
      outputDelivered: ["Unit Economic Audit", "Profit Optimization Model"],
      doNotUseWhen: ["No revenue exists"],
      bestNextStep: "YY (Profit)",
      useCases: ["SaaS pricing audit", "Enterprise CAC calc"]
    }
  },
  {
    id: "D",
    name: "Dynamo",
    role: "Hooks",
    description: "Generates high-velocity, scroll-stopping attention in the first 3 seconds.",
    oracleInsight: "Generating 3 seconds of high-heat intensity to stop the scroll.",
    color: "from-orange-500 to-red-500",
    icon: "🧨",
    url: "https://nexus.ai/dynamo",
    toolCard: {
      purpose: "Generates high-velocity, scroll-stopping attention in the first 3 seconds.",
      useThisWhen: ["Ads are ignored", "CTR is low"],
      inputNeeded: "Offer core; Audience pain points.",
      outputDelivered: ["10 High-Heat Hooks", "Creative Direction"],
      doNotUseWhen: ["The offer core is undefined"],
      bestNextStep: "E (Social)",
      useCases: ["VSL Intro", "Ad hook"]
    }
  },
  {
    id: "DD",
    name: "Drive",
    role: "Growth",
    description: "Generates high-intent traffic mechanisms and acquisition logic.",
    oracleInsight: "Designing the high-intent engine for massive traffic inflow.",
    color: "from-cyan-600 to-teal-700",
    icon: "🏎️",
    url: "https://nexus.ai/drive",
    toolCard: {
      purpose: "Generates high-intent traffic mechanisms and acquisition logic.",
      useThisWhen: ["Need more leads", "Traffic is flat"],
      inputNeeded: "Ad budget; Target traffic.",
      outputDelivered: ["Acquisition Roadmap", "Traffic Model"],
      doNotUseWhen: ["Funnel is leaky"],
      bestNextStep: "LL (Closing)",
      useCases: ["Paid acquisition plan", "Organic growth engine"]
    }
  },
  {
    id: "E",
    name: "Echo",
    role: "Social",
    description: "Creates brand omnipresence by distributing messages across all platforms.",
    oracleInsight: "Creating omni-presence by echoing your signal across all channels.",
    color: "from-cyan-400 to-blue-500",
    icon: "📣",
    url: "https://nexus.ai/echo",
    toolCard: {
      purpose: "Creates brand omnipresence by distributing messages across all frequencies.",
      useThisWhen: ["Reach is limited", "Message is inconsistent"],
      inputNeeded: "Primary asset; Target platforms.",
      outputDelivered: ["Distribution Map", "Engagement Protocol"],
      doNotUseWhen: ["No content assets exist"],
      bestNextStep: "EE (Amplification)",
      useCases: ["Multi-channel scheduling", "Brand voice sync"]
    }
  },
  {
    id: "EE",
    name: "Expand",
    role: "Amplification",
    description: "Maximizes brand amplification through multiplication and high-tier PR.",
    oracleInsight: "Multiplying your reach and authority through industrial PR.",
    color: "from-sky-500 to-cyan-600",
    icon: "📡",
    url: "https://nexus.ai/expand",
    toolCard: {
      purpose: "Maximizes brand amplification through multiplication and high-tier PR.",
      useThisWhen: ["Brand is unknown", "Need authority"],
      inputNeeded: "Brand assets; Media list.",
      outputDelivered: ["Amplification Map", "Reach Forecast"],
      doNotUseWhen: ["Message is not defined"],
      bestNextStep: "R (SEO)",
      useCases: ["PR campaign design", "Influencer syndication"]
    }
  },
  {
    id: "F",
    name: "Frontier",
    role: "Outreach",
    description: "Bridges the gap from 'cold' to 'sold' through direct engagement.",
    oracleInsight: "Engaging cold markets to turn them into high-ticket sales.",
    color: "from-green-600 to-emerald-700",
    icon: "⛺",
    url: "https://nexus.ai/frontier",
    toolCard: {
      purpose: "Bridges the gap from 'cold' to 'sold' through direct engagement.",
      useThisWhen: ["Inbound leads are low", "Breaking into new markets"],
      inputNeeded: "Lead list; Offer validation.",
      outputDelivered: ["Outreach Scripts", "Lead Response Map"],
      doNotUseWhen: ["Offer is not validated"],
      bestNextStep: "J (DMs)",
      useCases: ["Cold email sequence", "LinkedIn outreach"]
    }
  },
  {
    id: "FF",
    name: "Flux",
    role: "Agility",
    description: "Engineers rapid pivots to exploit market shifts and economic changes.",
    oracleInsight: "Engineering rapid pivots to exploit economic chaos.",
    color: "from-teal-500 to-emerald-600",
    icon: "🌊",
    url: "https://nexus.ai/flux",
    toolCard: {
      purpose: "Engineers rapid pivots to exploit market shifts and economic changes.",
      useThisWhen: ["Market is changing", "Competitors disrupted"],
      inputNeeded: "Market news; Internal stats.",
      outputDelivered: ["Pivot Protocol", "Agility Scorecard"],
      doNotUseWhen: ["Stable growth phase"],
      bestNextStep: "VV (Forecasting)",
      useCases: ["Market-shift response", "Crisis pivot"]
    }
  },
  {
    id: "G",
    name: "Garrison",
    role: "Legal",
    description: "Scrubs all assets for compliance, policy, and institutional risk.",
    oracleInsight: "Scrubbing risk from your assets for institutional safety.",
    color: "from-gray-600 to-gray-800",
    icon: "🏯",
    url: "https://nexus.ai/garrison",
    toolCard: {
      purpose: "Scrubs all assets for compliance, policy, and institutional risk.",
      useThisWhen: ["Launching regulated products", "Publishing sensitive copy"],
      inputNeeded: "Marketing copy; Landing pages.",
      outputDelivered: ["Compliance Audit", "Safe-Copy Revision"],
      doNotUseWhen: ["Drafts are too early stage"],
      bestNextStep: "A (Contracts)",
      useCases: ["Ad policy check", "GDPR/Terms audit"]
    }
  },
  {
    id: "GG",
    name: "Grid",
    role: "Systems",
    description: "Builds the scalable infrastructure and deep architectural SOPs.",
    oracleInsight: "Building the industrial infrastructure for massive scale.",
    color: "from-emerald-600 to-green-700",
    icon: "🏁",
    url: "https://nexus.ai/grid",
    toolCard: {
      purpose: "Builds the scalable infrastructure and deep architectural SOPs.",
      useThisWhen: ["Scaling operations", "Chaos is increasing"],
      inputNeeded: "Current workflows; Resource list.",
      outputDelivered: ["Systems Map", "Infrastructure SOP"],
      doNotUseWhen: ["Pre-product market fit"],
      bestNextStep: "SS (Culture)",
      useCases: ["Scaling infrastructure", "Backend build"]
    }
  },
  {
    id: "H",
    name: "Hush",
    role: "PR",
    description: "Neutralizes friction and manages reputation in high-stress environments.",
    oracleInsight: "Neutralizing brand friction before it becomes a crisis.",
    color: "from-slate-700 to-black",
    icon: "🤫",
    url: "https://nexus.ai/hush",
    toolCard: {
      purpose: "Neutralizes friction and manages reputation in high-stress environments.",
      useThisWhen: ["Negative press hits", "Crisis emerging"],
      inputNeeded: "Negative signal; Public record.",
      outputDelivered: ["Response Script", "Damage Control Plan"],
      doNotUseWhen: ["Environment is stable"],
      bestNextStep: "V (Pivot)",
      useCases: ["Crisis management", "Brand protection"]
    }
  },
  {
    id: "HH",
    name: "Hive",
    role: "Tribal",
    description: "Engineers tribal loyalty, audience engagement, and community logic.",
    oracleInsight: "Engineering tribal loyalty to turn audience into advocates.",
    color: "from-green-500 to-lime-600",
    icon: "🐝",
    url: "https://nexus.ai/hive",
    toolCard: {
      purpose: "Engineers tribal loyalty, audience engagement, and community logic.",
      useThisWhen: ["Building a movement", "Engagement is key"],
      inputNeeded: "User base; Engagement metrics.",
      outputDelivered: ["Tribal Strategy", "Engagement Map"],
      doNotUseWhen: ["Transactional model only"],
      bestNextStep: "OO (Loops)",
      useCases: ["Community launch", "Viral challenge"]
    }
  },
  {
    id: "I",
    name: "Infra",
    role: "Tech",
    description: "Builds the logic bridges and technical stack required for scale.",
    oracleInsight: "Connecting the technical bridges for a self-driving machine.",
    color: "from-indigo-500 to-purple-600",
    icon: "🏗️",
    url: "https://nexus.ai/infra",
    toolCard: {
      purpose: "Builds the logic bridges and technical stack required for scale.",
      useThisWhen: ["Tools are disconnected", "Scaling breaks systems"],
      inputNeeded: "Tool list; API documentation.",
      outputDelivered: ["Stack Map", "Technical Specs"],
      doNotUseWhen: ["Process is not defined"],
      bestNextStep: "X (Funnels)",
      useCases: ["Stack integration", "Database mapping"]
    }
  },
  {
    id: "II",
    name: "Intel",
    role: "Research",
    description: "Mines competitive data for hidden insights and 'Blue Ocean' advantages.",
    oracleInsight: "Extracting competitor secrets for your 'Blue Ocean' edge.",
    color: "from-lime-600 to-yellow-600",
    icon: "🕵️",
    url: "https://nexus.ai/intel",
    toolCard: {
      purpose: "Mines competitive data for hidden insights and 'Blue Ocean' advantages.",
      useThisWhen: ["Strategy is blind", "Competitors are winning"],
      inputNeeded: "Rival URLs; Industry data.",
      outputDelivered: ["Intel Report", "Competitive Edge Map"],
      doNotUseWhen: ["Overwhelmed with data"],
      bestNextStep: "RR (Disruption)",
      useCases: ["Funnel autopsy", "Gap analysis"]
    }
  },
  {
    id: "J",
    name: "Juno",
    role: "DMs",
    description: "Snipe appointments through 1-on-1 direct message conversations.",
    oracleInsight: "Sniping high-ticket appointments directly from the inbox.",
    color: "from-pink-500 to-rose-600",
    icon: "🏹",
    url: "https://nexus.ai/juno",
    toolCard: {
      purpose: "Snipe appointments through 1-on-1 direct message conversations.",
      useThisWhen: ["Leads are in inbox", "High-ticket sales"],
      inputNeeded: "Inbox access; Appointment calendar.",
      outputDelivered: ["DM Script Set", "Booking Confirmation"],
      doNotUseWhen: ["Traffic is zero"],
      bestNextStep: "LL (Closing)",
      useCases: ["Lead qualification", "Objection handling"]
    }
  },
  {
    id: "JJ",
    name: "Jolt",
    role: "Sales",
    description: "Shocks stagnant leads or inactive systems into immediate cash-flow action.",
    oracleInsight: "Shocking dead lists back into immediate cash-flow.",
    color: "from-yellow-500 to-orange-600",
    icon: "🔋",
    url: "https://nexus.ai/jolt",
    toolCard: {
      purpose: "Shocks stagnant leads or inactive systems into immediate cash-flow action.",
      useThisWhen: ["Cash flow urgency", "Leads are stalling"],
      inputNeeded: "Dead list; Cash need.",
      outputDelivered: ["Jolt Campaign", "Cash Spike Model"],
      doNotUseWhen: ["Pipeline is full and moving"],
      bestNextStep: "LL (Closing)",
      useCases: ["Flash sale shock", "Deadline pressure"]
    }
  },
  {
    id: "K",
    name: "Kinetix",
    role: "VSLs",
    description: "Scripts high-intensity Video Sales Letters that convert at scale.",
    oracleInsight: "Scripting visual sales paths that convert while you sleep.",
    color: "from-red-600 to-orange-600",
    icon: "🎥",
    url: "https://nexus.ai/kinetix",
    toolCard: {
      purpose: "Scripts high-intensity Video Sales Letters that convert at scale.",
      useThisWhen: ["Conversions are low", "Explaining complex offers"],
      inputNeeded: "Product specs; Testimonials.",
      outputDelivered: ["Full Script", "Storyboard"],
      doNotUseWhen: ["Offer is weak"],
      bestNextStep: "DD (Growth)",
      useCases: ["Long-form VSL", "60-second 'Short' VSL"]
    }
  },
  {
    id: "KK",
    name: "Knot",
    role: "Scarcity",
    description: "Uses gates, limits, and waitlists to increase perceived value and demand.",
    oracleInsight: "Tying the knot on demand with surgical scarcity gates.",
    color: "from-orange-600 to-red-600",
    icon: "🪢",
    url: "https://nexus.ai/knot",
    toolCard: {
      purpose: "Uses gates, limits, and waitlists to increase perceived value and demand.",
      useThisWhen: ["Demand is high", "Exclusivity needed"],
      inputNeeded: "Available slots; Current demand.",
      outputDelivered: ["Scarcity Protocol", "Value Gate Plan"],
      doNotUseWhen: ["Demand is low"],
      bestNextStep: "DD (Growth)",
      useCases: ["Waitlist strategy", "Application-only logic"]
    }
  },
  {
    id: "L",
    name: "Locus",
    role: "Intent",
    description: "Tracks 'ready-to-buy' behavior patterns and identifying hot leads.",
    oracleInsight: "Hunting the exact behavior patterns of ready buyers.",
    color: "from-blue-500 to-cyan-500",
    icon: "🎯",
    url: "https://nexus.ai/locus",
    toolCard: {
      purpose: "Tracks 'ready-to-buy' behavior patterns and identifying hot leads.",
      useThisWhen: ["Leads are cold", "Retargeting is generic"],
      inputNeeded: "Pixel data; Website heatmaps.",
      outputDelivered: ["Lead Intent Score", "Retargeting Map"],
      doNotUseWhen: ["No tracking data available"],
      bestNextStep: "J (DMs)",
      useCases: ["Behavior scoring", "Retargeting logic"]
    }
  },
  {
    id: "LL",
    name: "Link",
    role: "Closing",
    description: "Converts interest into high-ticket transactions with zero friction.",
    oracleInsight: "Linking high-intent leads to high-ticket transactions.",
    color: "from-red-600 to-rose-700",
    icon: "🔗",
    url: "https://nexus.ai/link",
    toolCard: {
      purpose: "Converts interest into high-ticket transactions with zero friction.",
      useThisWhen: ["High leads, low sales", "Closing rate is poor"],
      inputNeeded: "Qualified lead; Closing script.",
      outputDelivered: ["Closing Protocol", "Conversion Audit"],
      doNotUseWhen: ["No qualified leads"],
      bestNextStep: "CC (Finance)",
      useCases: ["Closing call script", "One-click checkout"]
    }
  },
  {
    id: "M",
    name: "Midas",
    role: "Referrals",
    description: "Turns client wins into structural, automated referral events.",
    oracleInsight: "Turning client satisfaction into a structural growth loop.",
    color: "from-yellow-400 to-amber-500",
    icon: "🥇",
    url: "https://nexus.ai/midas",
    toolCard: {
      purpose: "Turns client wins into structural, automated referral events.",
      useThisWhen: ["Clients are happy but silent", "Seeking viral loops"],
      inputNeeded: "Success story; Client list.",
      outputDelivered: ["Referral SOP", "Affiliate Link Map"],
      doNotUseWhen: ["Product quality is low"],
      bestNextStep: "HH (Tribal)",
      useCases: ["Referral loop build", "Reward system"]
    }
  },
  {
    id: "MM",
    name: "Mind",
    role: "Psychology",
    description: "Leverages behavioral economics and buyer psychology to influence choice.",
    oracleInsight: "Mapping buyer psychology to remove all buying resistance.",
    color: "from-rose-600 to-pink-700",
    icon: "🧠",
    url: "https://nexus.ai/mind",
    toolCard: {
      purpose: "Leverages behavioral economics and buyer psychology to influence choice.",
      useThisWhen: ["Conversion logic fails", "Persuasion needed"],
      inputNeeded: "Persona profile; Current copy.",
      outputDelivered: ["Psychological Profile", "Influence Strategy"],
      doNotUseWhen: ["Product is utility only"],
      bestNextStep: "LL (Closing)",
      useCases: ["Status-vs-Savings test", "Reciprocity loop"]
    }
  },
  {
    id: "N",
    name: "Net",
    role: "SOPs",
    description: "Turns messy manual tasks into clean, industrial Standard Operating Procedures.",
    oracleInsight: "Turning operational chaos into clean industrial SOPs.",
    color: "from-slate-500 to-gray-600",
    icon: "🔗",
    url: "https://nexus.ai/net",
    toolCard: {
      purpose: "Turns messy manual tasks into clean, industrial Standard Operating Procedures.",
      useThisWhen: ["Team is confused", "Quality is inconsistent"],
      inputNeeded: "Task recording; Desired outcome.",
      outputDelivered: ["Step-by-Step SOP", "Operational Map"],
      doNotUseWhen: ["Task is a one-off event"],
      bestNextStep: "GG (Systems)",
      useCases: ["Onboarding SOP", "Fulfillment checklist"]
    }
  },
  {
    id: "NN",
    name: "Node",
    role: "Automation",
    description: "Connects disparate tools into a single self-driving 'Sovereign Machine'.",
    oracleInsight: "Building the automated soul of your self-driving machine.",
    color: "from-purple-600 to-indigo-700",
    icon: "🕸️",
    url: "https://nexus.ai/node",
    toolCard: {
      purpose: "Connects disparate tools into a single self-driving 'Sovereign Machine'.",
      useThisWhen: ["Manual tasks overwhelming", "Systems disconnected"],
      inputNeeded: "App list; API keys.",
      outputDelivered: ["Automation Script", "Data Flow Map"],
      doNotUseWhen: ["Process is undefined"],
      bestNextStep: "QQ (Metrics)",
      useCases: ["Lead-to-Sale automation", "CRM sync"]
    }
  },
  {
    id: "O",
    name: "Omega",
    role: "Exit",
    description: "Audits the business for 'Built-to-Sell' scores and exit readiness.",
    oracleInsight: "Auditing your exit readiness for the final sovereign payout.",
    color: "from-violet-600 to-purple-800",
    icon: "Ω",
    url: "https://nexus.ai/omega",
    toolCard: {
      purpose: "Audits the business for 'Built-to-Sell' scores and exit readiness.",
      useThisWhen: ["Preparing to sell", "Valuation is unclear"],
      inputNeeded: "3-year P&L; Operational manuals.",
      outputDelivered: ["Exit Scorecard", "Sellability Report"],
      doNotUseWhen: ["Business is in infancy"],
      bestNextStep: "ZZ (Legacy)",
      useCases: ["Multiplier audit", "Broker prep"]
    }
  },
  {
    id: "OO",
    name: "Orbit",
    role: "Loops",
    description: "Designs retention loops that keep customers within the ecosystem forever.",
    oracleInsight: "Designing gravitational loops that customers never want to leave.",
    color: "from-indigo-600 to-blue-700",
    icon: "🪐",
    url: "https://nexus.ai/orbit",
    toolCard: {
      purpose: "Designs retention loops that keep customers within the ecosystem forever.",
      useThisWhen: ["LTV is limited", "Churn is an issue"],
      inputNeeded: "Renewal rate; Product map.",
      outputDelivered: ["Orbit Strategy", "LTV Projection"],
      doNotUseWhen: ["One-time purchase model"],
      bestNextStep: "YY (Profit)",
      useCases: ["Retention loop build", "Habit-forming UX"]
    }
  },
  {
    id: "P",
    name: "Pulse",
    role: "Clips",
    description: "Shreds long-form video content into 50+ high-engagement micro-assets.",
    oracleInsight: "Shredding long assets into 50 high-velocity micro-events.",
    color: "from-pink-500 to-red-500",
    icon: "💓",
    url: "https://nexus.ai/pulse",
    toolCard: {
      purpose: "Shreds long-form video content into 50+ high-engagement micro-assets.",
      useThisWhen: ["Long content exists", "Maximizing content ROI"],
      inputNeeded: "Raw video file; Brand guidelines.",
      outputDelivered: ["Asset Library", "Caption Set"],
      doNotUseWhen: ["No long-form source material"],
      bestNextStep: "E (Social)",
      useCases: ["TikTok/Reels edit", "Newsletter snippet"]
    }
  },
  {
    id: "PP",
    name: "Prime",
    role: "Quality",
    description: "Refines the core product/service to a world-class, undisputed standard.",
    oracleInsight: "Polishing your core product into an undisputed global standard.",
    color: "from-blue-600 to-cyan-700",
    icon: "💎",
    url: "https://nexus.ai/prime",
    toolCard: {
      purpose: "Refines the core product/service to a world-class, undisputed standard.",
      useThisWhen: ["Competition is high", "Premium positioning"],
      inputNeeded: "Product reviews; Feature list.",
      outputDelivered: ["Product Audit", "Quality Roadmap"],
      doNotUseWhen: ["MVP phase"],
      bestNextStep: "BB (Validation)",
      useCases: ["UI/UX refinement", "Fulfillment speed"]
    }
  },
  {
    id: "Q",
    name: "Quark",
    role: "Copy",
    description: "Logic-tests every headline and sentence for maximum conversion.",
    oracleInsight: "Logic-testing every syllable for absolute conversion conversion.",
    color: "from-teal-400 to-teal-600",
    icon: "✒️",
    url: "https://nexus.ai/quark",
    toolCard: {
      purpose: "Logic-tests every headline and sentence for maximum conversion.",
      useThisWhen: ["Copy isn't converting", "A/B testing"],
      inputNeeded: "Draft copy; Target persona.",
      outputDelivered: ["Optimized Copy", "Logic Score"],
      doNotUseWhen: ["Offer is undefined"],
      bestNextStep: "D (Hooks)",
      useCases: ["Sales page edit", "A/B headline test"]
    }
  },
  {
    id: "QQ",
    name: "Quota",
    role: "Metrics",
    description: "Tracks, measures, and visualizes success against hard industrial targets.",
    oracleInsight: "Visualizing the industrial targets required for sovereign scale.",
    color: "from-cyan-600 to-teal-700",
    icon: "📊",
    url: "https://nexus.ai/quota",
    toolCard: {
      purpose: "Tracks, measures, and visualizes success against hard industrial targets.",
      useThisWhen: ["Blind to performance", "Accountability needed"],
      inputNeeded: "KPI list; Goal numbers.",
      outputDelivered: ["Live Metrics Dashboard", "Quota Report"],
      doNotUseWhen: ["No data streams"],
      bestNextStep: "XX (Diagnostics)",
      useCases: ["Dashboard build", "Weekly target audit"]
    }
  },
  {
    id: "R",
    name: "Root",
    role: "SEO",
    description: "Dominates high-intent search terms to capture organic traffic.",
    oracleInsight: "Planting the seeds for permanent organic dominance.",
    color: "from-green-500 to-lime-600",
    icon: "🌳",
    url: "https://nexus.ai/root",
    toolCard: {
      purpose: "Dominates high-intent search terms to capture organic traffic.",
      useThisWhen: ["Paid ads are expensive", "Seeking long-term traffic"],
      inputNeeded: "Keyword list; Competitor URLs.",
      outputDelivered: ["SEO Roadmap", "Keyword Hierarchy"],
      doNotUseWhen: ["Need results today"],
      bestNextStep: "L (Intent)",
      useCases: ["On-page audit", "Content silo build"]
    }
  },
  {
    id: "RR",
    name: "Rift",
    role: "Disruption",
    description: "Identifies and exploits major gaps in competitor armor or market standard.",
    oracleInsight: "Exploiting the gaps in competitor armor for a massive rift.",
    color: "from-teal-600 to-emerald-700",
    icon: "🌋",
    url: "https://nexus.ai/rift",
    toolCard: {
      purpose: "Identifies and exploits major gaps in competitor armor or market standard.",
      useThisWhen: ["Market is saturated", "Need new angle"],
      inputNeeded: "Market standard; Competitor spend.",
      outputDelivered: ["Disruption Strategy", "Rift Analysis"],
      doNotUseWhen: ["Leading the market"],
      bestNextStep: "AA (Strategy)",
      useCases: ["Business model rift", "Positioning twist"]
    }
  },
  {
    id: "S",
    name: "Scroll",
    role: "Identity",
    description: "Ingests the Brand Bible to ensure the AI sounds exactly like you.",
    oracleInsight: "Ingesting your Brand Bible to clones your unique voice.",
    color: "from-fuchsia-500 to-purple-600",
    icon: "📜",
    url: "https://nexus.ai/scroll",
    toolCard: {
      purpose: "Ingests the Brand Bible to ensure the AI sounds exactly like you.",
      useThisWhen: ["Voice is inconsistent", "Delegating content"],
      inputNeeded: "Voice samples; Writing style.",
      outputDelivered: ["Brand Voice Map", "Persona File"],
      doNotUseWhen: ["Brand personality is undefined"],
      bestNextStep: "Q (Copy)",
      useCases: ["Tone-of-voice sync", "Style guide gen"]
    }
  },
  {
    id: "SS",
    name: "Sync",
    role: "Culture",
    description: "Harmonizes human resources, operational rhythm, and brand culture.",
    oracleInsight: "Harmonizing your team to the rhythm of high-status culture.",
    color: "from-emerald-600 to-green-700",
    icon: "🤝",
    url: "https://nexus.ai/sync",
    toolCard: {
      purpose: "Harmonizes human resources, operational rhythm, and brand culture.",
      useThisWhen: ["Team is misaligned", "Culture is toxic"],
      inputNeeded: "Team size; Culture goals.",
      outputDelivered: ["Culture Manual", "Alignment SOP"],
      doNotUseWhen: ["Solo founder"],
      bestNextStep: "GG (Systems)",
      useCases: ["Hiring filter", "Brand alignment"]
    }
  },
  {
    id: "T",
    name: "Tome",
    role: "Rivals",
    description: "Performs a deep autopsy on competitor weaknesses and funnel structure.",
    oracleInsight: "Conducting a deep autopsy on every rival weakness.",
    color: "from-slate-600 to-slate-900",
    icon: "📖",
    url: "https://nexus.ai/tome",
    toolCard: {
      purpose: "Performs a deep autopsy on competitor weaknesses and funnel structure.",
      useThisWhen: ["Entering new market", "Losing market share"],
      inputNeeded: "Rival name; Ad library access.",
      outputDelivered: ["Rival Forensics Report", "Exploit Map"],
      doNotUseWhen: ["No clear competitors"],
      bestNextStep: "II (Research)",
      useCases: ["Funnel hack", "Weakness exploit"]
    }
  },
  {
    id: "TT",
    name: "Traction",
    role: "Momentum",
    description: "Turns static energy into high-velocity kinetic forward motion.",
    oracleInsight: "Converting static ideas into kinetic, high-velocity momentum.",
    color: "from-green-600 to-lime-700",
    icon: "🚜",
    url: "https://nexus.ai/traction",
    toolCard: {
      purpose: "Turns static energy into high-velocity kinetic forward motion.",
      useThisWhen: ["Project stalled", "Need speed"],
      inputNeeded: "Stalled project; Resource list.",
      outputDelivered: ["Traction Roadmap", "Momentum Score"],
      doNotUseWhen: ["Already moving fast"],
      bestNextStep: "WW (Speed)",
      useCases: ["Project kickstart", "Friction removal"]
    }
  },
  {
    id: "U",
    name: "Uplift",
    role: "Workflow",
    description: "Secures the perimeter of your deep-work hours and team productivity.",
    oracleInsight: "Securing the perimeter of your focus for deep execution.",
    color: "from-sky-400 to-blue-500",
    icon: "🌤️",
    url: "https://nexus.ai/uplift",
    toolCard: {
      purpose: "Secures the perimeter of your deep-work hours and team productivity.",
      useThisWhen: ["Overwhelmed", "Focus is scattered"],
      inputNeeded: "Calendar; Task list.",
      outputDelivered: ["Optimized Schedule", "Focus Protocol"],
      doNotUseWhen: ["Workload is light"],
      bestNextStep: "N (SOPs)",
      useCases: ["Time-blocking build", "Ritual design"]
    }
  },
  {
    id: "UU",
    name: "Util",
    role: "Efficiency",
    description: "Optimizes the allocation of time, money, and energy across the stack.",
    oracleInsight: "Optimizing your utility across the entire system stack.",
    color: "from-lime-600 to-yellow-700",
    icon: "🔋",
    url: "https://nexus.ai/util",
    toolCard: {
      purpose: "Optimizes the allocation of time, money, and energy across the stack.",
      useThisWhen: ["Burnout risk", "Wasting resources"],
      inputNeeded: "Budget; Resource logs.",
      outputDelivered: ["Efficiency Report", "Utilization Plan"],
      doNotUseWhen: ["Resources are abundant"],
      bestNextStep: "CC (Finance)",
      useCases: ["Cost audit", "Resource reallocation"]
    }
  },
  {
    id: "V",
    name: "Verve",
    role: "Pivot",
    description: "Injects creative 'shocks' into stagnant systems or failing offers.",
    oracleInsight: "Injecting a creative shock to wake up a stagnant offer.",
    color: "from-yellow-400 to-orange-500",
    icon: "💫",
    url: "https://nexus.ai/verve",
    toolCard: {
      purpose: "Injects creative 'shocks' into stagnant systems or failing offers.",
      useThisWhen: ["Growth has stalled", "Offer fatigue"],
      inputNeeded: "Performance drop; Stale heartbeat.",
      outputDelivered: ["New Angle Deck", "Creative Brief"],
      doNotUseWhen: ["Things are working well"],
      bestNextStep: "JJ (Sales)",
      useCases: ["Offer refresh", "Viral pivot"]
    }
  },
  {
    id: "VV",
    name: "View",
    role: "Forecasting",
    description: "Predicts future trends and sets long-term sovereign vectors.",
    oracleInsight: "Setting long-term sovereign vectors based on future trends.",
    color: "from-yellow-600 to-orange-700",
    icon: "🔭",
    url: "https://nexus.ai/view",
    toolCard: {
      purpose: "Predicts future trends and sets long-term sovereign vectors.",
      useThisWhen: ["Planning long term", "Future proofing"],
      inputNeeded: "Industry news; 10-year goal.",
      outputDelivered: ["Vision Roadmap", "Forecasting Model"],
      doNotUseWhen: ["Survival mode"],
      bestNextStep: "ZZ (Legacy)",
      useCases: ["Future-proofing", "Trend forecasting"]
    }
  },
  {
    id: "W",
    name: "Warp",
    role: "Launch",
    description: "Accelerates an idea from concept to checkout in 168 hours or less.",
    oracleInsight: "Compressing 6 months of launching into 7 days.",
    color: "from-indigo-500 to-blue-600",
    icon: "🚀",
    url: "https://nexus.ai/warp",
    toolCard: {
      purpose: "Accelerates an idea from concept to checkout in 168 hours or less.",
      useThisWhen: ["Speed is critical", "Testing new ideas"],
      inputNeeded: "Minimum Viable Product; Basic offer.",
      outputDelivered: ["7-Day Sprint Map", "Launch Assets"],
      doNotUseWhen: ["Quality requires long timeline"],
      bestNextStep: "DD (Growth)",
      useCases: ["MVP Launch", "Beta test setup"]
    }
  },
  {
    id: "WW",
    name: "Warp+",
    role: "Speed",
    description: "Bends time and market cycles to execute faster than humanly possible.",
    oracleInsight: "Bending time itself to execute at industrial velocity.",
    color: "from-orange-600 to-red-700",
    icon: "🚄",
    url: "https://nexus.ai/warp-speed",
    toolCard: {
      purpose: "Bends time and market cycles to execute faster than humanly possible.",
      useThisWhen: ["Too slow", "Urgency high"],
      inputNeeded: "Desired speed; Bottlenecks.",
      outputDelivered: ["Warp Schedule", "Velocity Audit"],
      doNotUseWhen: ["Quality will suffer"],
      bestNextStep: "QQ (Metrics)",
      useCases: ["Time-compression", "Rapid deployment"]
    }
  },
  {
    id: "X",
    name: "X-Ray",
    role: "Funnels",
    description: "Identifies the invisible friction points killing your funnel conversion.",
    oracleInsight: "Exposing the invisible friction killing your conversions.",
    color: "from-slate-500 to-blue-900",
    icon: "🩻",
    url: "https://nexus.ai/xray",
    toolCard: {
      purpose: "Identifies the invisible friction points killing your funnel conversion.",
      useThisWhen: ["Traffic high, sales low", "Optimizing leaks"],
      inputNeeded: "Funnel stats; Page speed data.",
      outputDelivered: ["Friction Report", "Optimization List"],
      doNotUseWhen: ["No funnel data exists"],
      bestNextStep: "L (Intent)",
      useCases: ["Drop-off audit", "Speed test"]
    }
  },
  {
    id: "XX",
    name: "Xenon",
    role: "Diagnostics",
    description: "Performs deep X-ray diagnostics to find hidden fractures in the machine.",
    oracleInsight: "Diagnosing the hidden fractures in your systems.",
    color: "from-red-600 to-rose-700",
    icon: "🔦",
    url: "https://nexus.ai/xenon",
    toolCard: {
      purpose: "Performs deep X-ray diagnostics to find hidden fractures in the machine.",
      useThisWhen: ["System failing", "Health check"],
      inputNeeded: "Full business data; System logs.",
      outputDelivered: ["Diagnostic Report", "Repair List"],
      doNotUseWhen: ["Ignorance is preferred"],
      bestNextStep: "UU (Efficiency)",
      useCases: ["Vulnerability audit", "Structural check"]
    }
  },
  {
    id: "Y",
    name: "Yield",
    role: "Upsell",
    description: "Squeezes maximum lifetime value (LTV) through value-add upsells.",
    oracleInsight: "Squeezing maximum lifetime value from every win.",
    color: "from-emerald-500 to-green-600",
    icon: "🌾",
    url: "https://nexus.ai/yield",
    toolCard: {
      purpose: "Squeezes maximum lifetime value (LTV) through value-add upsells.",
      useThisWhen: ["LTV is low", "Customer trust is high"],
      inputNeeded: "Customer list; Product suite.",
      outputDelivered: ["Upsell Map", "Value-Add Copy"],
      doNotUseWhen: ["Initial offer is failing"],
      bestNextStep: "CC (Finance)",
      useCases: ["Post-purchase offer", "Bundle design"]
    }
  },
  {
    id: "YY",
    name: "Yield+",
    role: "Profit",
    description: "Squeezes every drop of profit from existing assets and dead leads.",
    oracleInsight: "Harvesting the hidden profit from your dead lists.",
    color: "from-rose-600 to-pink-700",
    icon: "💰",
    url: "https://nexus.ai/yield-strat",
    toolCard: {
      purpose: "Squeezes every drop of profit from existing assets and dead leads.",
      useThisWhen: ["Maximizing return", "Cash flow needed"],
      inputNeeded: "Asset list; Dead leads.",
      outputDelivered: ["Profit Yield Map", "Asset Report"],
      doNotUseWhen: ["No assets exist"],
      bestNextStep: "O (Exit)",
      useCases: ["Dead-lead monetizing", "License strategy"]
    }
  },
  {
    id: "Z",
    name: "Zenith",
    role: "Trigger",
    description: "Initiates the multi-agent work chains that run the entire machine.",
    oracleInsight: "Triggering the master execution chains across the network.",
    color: "from-purple-600 to-indigo-600",
    icon: "⚡",
    url: "https://nexus.ai/zenith",
    toolCard: {
      purpose: "Initiates the multi-agent work chains that run the entire machine.",
      useThisWhen: ["Starting a complex workflow", "Connecting multiple agents"],
      inputNeeded: "User intent; Goal status.",
      outputDelivered: ["Active Work-Chain", "Status Update"],
      doNotUseWhen: ["Task is simple single-step"],
      bestNextStep: "ALL",
      useCases: ["Starting the engine", "Global status check"]
    }
  },
  {
    id: "ZZ",
    name: "Zenith+",
    role: "Legacy",
    description: "Architecting the final payout, transition to Chairman, and 2026 legacy.",
    oracleInsight: "Architecting your transition from Founder to Sovereign Chairman.",
    color: "from-pink-600 to-purple-800",
    icon: "🌌",
    url: "https://nexus.ai/zenith-legacy",
    toolCard: {
      purpose: "Architecting the final payout, transition to Chairman, and 2026 legacy.",
      useThisWhen: ["Exiting", "Legacy building"],
      inputNeeded: "Exit goals; Wealth target.",
      outputDelivered: ["Legacy Blueprint", "Zenith Document"],
      doNotUseWhen: ["Just starting out"],
      bestNextStep: "EXIT",
      useCases: ["Succession plan", "Legacy design"]
    }
  }
];

export const INITIAL_GREETING = "Sovereign Link Active. Accessing The Oracle Central Command.\n\nThe full **A-ZZ Nexus Fleet** is online. I am optimized for Intelligent System Orchestration and Customized Workflow Generation.\n\nPlease state your primary mission or the tactical result you require.";

export const INITIAL_CHOICES = ["Generate a strategic workflow", "Orchestrate acquisition growth", "Diagnose system friction"];
