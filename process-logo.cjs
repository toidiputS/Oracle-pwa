const fs = require('fs');
const Jimp = require('jimp');

async function processIcons() {
    console.log('Processing icons...');
    try {
        const svgContent = fs.readFileSync('./public/icon.svg', 'utf8');

        // Extract base64 image
        const match = svgContent.match(/xlink:href="data:image\/png;base64,([^"]+)"/);

        if (!match) {
            console.log('No base64 png found in SVG. Checking icon-512.png directly...');
            await makeTransparent('./public/icon-512.png', './public/icon-512.png');
            await makeTransparent('./public/icon-192.png', './public/icon-192.png');
            return;
        }

        const base64Data = match[1];
        const buffer = Buffer.from(base64Data, 'base64');

        // Save extracted image temporarily
        fs.writeFileSync('temp.png', buffer);

        console.log('Replacing background...');

        const img = await Jimp.read('temp.png');

        // Get background color from top-left pixel
        const bgColor = img.getPixelColor(0, 0);

        const { r: bgR, g: bgG, b: bgB } = Jimp.intToRGBA(bgColor);

        // Make matching colors transparent (with tolerance)
        img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];

            // If color is close to background color, make transparent
            if (Math.abs(r - bgR) < 15 && Math.abs(g - bgG) < 15 && Math.abs(b - bgB) < 15) {
                this.bitmap.data[idx + 3] = 0; // alpha
            }
        });

        // Save 512x512
        const img512 = img.clone().resize(512, 512);
        await img512.writeAsync('./public/icon-512.png');

        // Save 192x192
        const img192 = img.clone().resize(192, 192);
        await img192.writeAsync('./public/icon-192.png');

        // create a new base64 to put back into the SVG
        const newBase64 = await img512.getBase64Async(Jimp.MIME_PNG);

        // Write the animated SVG
        console.log('Updating SVG with new base64 and animation...');
        const newSvgContent = svgContent.replace(match[0], `xlink:href="${newBase64}"`)
            .replace('<svg ', `<svg style="animation: pulse 4s infinite alternate; filter: drop-shadow(0px 0px 8px rgba(59, 130, 246, 0.5));" `)
            .replace('</svg>', `
<style>
  @keyframes pulse {
    0% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5)); }
    50% { transform: scale(1.05); filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8)); }
    100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5)); }
  }
</style>
</svg>`);

        fs.writeFileSync('./public/icon.svg', newSvgContent);

        if (fs.existsSync('temp.png')) {
            fs.unlinkSync('temp.png');
        }

        console.log('Done!');

    } catch (e) {
        console.error(e);
    }
}

async function makeTransparent(input, output) {
    if (!fs.existsSync(input)) return;
    const img = await Jimp.read(input);
    const bgColor = img.getPixelColor(0, 0);
    const { r: bgR, g: bgG, b: bgB } = Jimp.intToRGBA(bgColor);
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        if (Math.abs(r - bgR) < 15 && Math.abs(g - bgG) < 15 && Math.abs(b - bgB) < 15) {
            this.bitmap.data[idx + 3] = 0;
        }
    });
    await img.writeAsync(output);
}

processIcons();
