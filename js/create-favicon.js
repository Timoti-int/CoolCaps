const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = [16, 32, 48, 64, 128, 256];
const inputFile = path.join(__dirname, '../images/logo.png');
const outputDir = path.join(__dirname, '..');

async function createFavicons() {
    try {
        // Kreiramo favicon.ico (kombinacija 16x16 i 32x32)
        await sharp(inputFile)
            .resize(32, 32)
            .toFile(path.join(outputDir, 'favicon.ico'));
        console.log('Kreiran favicon.ico');

        // Kreiramo PNG favicon-e različitih veličina
        for (const size of sizes) {
            await sharp(inputFile)
                .resize(size, size)
                .toFile(path.join(outputDir, `favicon-${size}x${size}.png`));
            console.log(`Kreiran favicon-${size}x${size}.png`);
        }

        // Kreiramo Apple Touch ikonu
        await sharp(inputFile)
            .resize(180, 180)
            .toFile(path.join(outputDir, 'apple-touch-icon.png'));
        console.log('Kreirana apple-touch-icon.png');

        console.log('Svi favicon-i su uspešno kreirani!');
    } catch (error) {
        console.error('Greška prilikom kreiranja favicon-a:', error);
    }
}

createFavicons(); 