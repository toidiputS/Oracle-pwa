const fs = require('fs');

try {
    let content = fs.readFileSync('constants.ts', 'utf8');

    // Replace ORACLE_NODE icon
    content = content.replace(/export const ORACLE_NODE: Agent = \{[\s\S]*?icon:\s*['"].*?['"]/m, (match) => {
        return match.replace(/icon:\s*['"].*?['"]/, 'icon: "/icon.svg"');
    });

    // Replace all other Agent icons based on their ID
    const agentRegex = /id:\s*['"]([^'"]+)['"][\s\S]*?icon:\s*['"][^'"]*['"]/g;
    content = content.replace(agentRegex, (match, id) => {
        if (id !== "ORACLE" && id !== "ONE") {
            const svgName = id.toLowerCase() + '.svg';
            return match.replace(/icon:\s*['"][^'"]*['"]/, `icon: "/agent-icons/${svgName}"`);
        }
        return match;
    });

    fs.writeFileSync('constants.ts', content, 'utf8');
    console.log("Replaced icons in constants.ts successfully!");
} catch (e) {
    console.error("Error modifying constants.ts:", e);
}
