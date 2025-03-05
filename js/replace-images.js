const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../images');

async function replaceImages() {
    try {
        const files = fs.readdirSync(imagesDir);
        
        // Prvo pravimo backup folder
        const backupDir = path.join(imagesDir, 'backup');
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }

        // Prolazimo kroz sve fajlove
        for (const file of files) {
            if (file.startsWith('optimized-')) {
                const originalName = file.replace('optimized-', '');
                const originalPath = path.join(imagesDir, originalName);
                const optimizedPath = path.join(imagesDir, file);
                
                // Ako postoji originalna slika
                if (fs.existsSync(originalPath)) {
                    // Pravimo backup originalne slike
                    const backupPath = path.join(backupDir, originalName);
                    fs.renameSync(originalPath, backupPath);
                    console.log(`Backup napravljen: ${originalName}`);
                    
                    // Preimenujemo optimizovanu sliku
                    fs.renameSync(optimizedPath, originalPath);
                    console.log(`Zamenjena slika: ${originalName}`);
                }
            }
        }
        
        console.log('Sve slike su uspešno zamenjene! Originalne slike su sačuvane u backup folderu.');
    } catch (error) {
        console.error('Greška prilikom zamene slika:', error);
    }
}

replaceImages(); 