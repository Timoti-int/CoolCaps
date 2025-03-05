const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../images');

async function optimizeImages() {
    try {
        const files = fs.readdirSync(imagesDir);
        
        for (const file of files) {
            const filePath = path.join(imagesDir, file);
            const ext = path.extname(file).toLowerCase();
            
            // Preskačemo već optimizovane slike i nepodržane formate
            if (file.includes('optimized') || !['.jpg', '.jpeg', '.png'].includes(ext)) {
                continue;
            }
            
            const outputPath = path.join(imagesDir, `optimized-${file}`);
            
            if (ext === '.png') {
                await sharp(filePath)
                    .png({ quality: 80, compressionLevel: 9 })
                    .toFile(outputPath);
            } else {
                await sharp(filePath)
                    .jpeg({ quality: 80, mozjpeg: true })
                    .toFile(outputPath);
            }
            
            console.log(`Optimizovana slika: ${file}`);
        }
        
        console.log('Sve slike su optimizovane!');
    } catch (error) {
        console.error('Greška prilikom optimizacije:', error);
    }
}

optimizeImages(); 