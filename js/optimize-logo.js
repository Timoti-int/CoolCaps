const sharp = require('sharp');
const path = require('path');

const inputFile = path.join(__dirname, '../images/logo.png');
const outputFile = path.join(__dirname, '../images/logo-optimized.png');

async function optimizeLogo() {
    try {
        // Optimizujemo logo na 512x512px (preporučena veličina za Google)
        await sharp(inputFile)
            .resize(512, 512, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .png({
                quality: 100,
                compressionLevel: 9
            })
            .toFile(outputFile);
        
        console.log('Logo je uspešno optimizovan!');
    } catch (error) {
        console.error('Greška prilikom optimizacije loga:', error);
    }
}

optimizeLogo(); 