import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the dist directory
const distPath = path.join(__dirname, 'dist');

// Check if dist folder exists, if not use root for development
const staticPath = fs.existsSync(distPath) ? distPath : __dirname;

app.use(express.static(staticPath));

// For SPA client-side routing - serve index.html for all non-file routes
app.get('*', (req, res) => {
    const indexPath = path.join(staticPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('index.html not found. Please run npm run build first.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Serving static files from: ${staticPath}`);
});
