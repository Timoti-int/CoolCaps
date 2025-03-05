const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const imageDirectory = path.join(__dirname, '../images');
const outputDirectory = path.join(__dirname, '../images/optimized');

async function ensureOutputDirectoryExists() {
    try {
        await fs.mkdir(outputDirectory, { recursive: true });
    } catch (error) {
        if (error.code !== 'EEXIST') {
            throw error;
        }
    }
}

async function optimizeImage(inputPath, outputPath) {
    try {
        const imageInfo = await sharp(inputPath).metadata();
        
        // Optimizacija na osnovu tipa slike
        if (path.extname(inputPath).toLowerCase() === '.png') {
            await sharp(inputPath)
                .png({ quality: 85, compressionLevel: 9 })
                .toFile(outputPath);
        } else if (['.jpg', '.jpeg'].includes(path.extname(inputPath).toLowerCase())) {
            await sharp(inputPath)
                .jpeg({ quality: 85, progressive: true })
                .toFile(outputPath);
        }
        
        console.log(`Uspešno optimizovana slika: ${path.basename(inputPath)}`);
    } catch (error) {
        console.error(`Greška pri optimizaciji ${path.basename(inputPath)}:`, error);
    }
}

async function optimizeAllImages() {
    try {
        await ensureOutputDirectoryExists();
        
        const files = await fs.readdir(imageDirectory);
        const imageFiles = files.filter(file => 
            ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())
        );
        
        console.log(`Pronađeno ${imageFiles.length} slika za optimizaciju...`);
        
        for (const file of imageFiles) {
            const inputPath = path.join(imageDirectory, file);
            const outputPath = path.join(outputDirectory, file);
            await optimizeImage(inputPath, outputPath);
        }
        
        console.log('Optimizacija svih slika je završena!');
    } catch (error) {
        console.error('Greška prilikom optimizacije slika:', error);
    }
}

optimizeAllImages(); 