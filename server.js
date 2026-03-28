const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');
const cron = require('node-cron');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const TODO_FILE = path.join(__dirname, 'ratings', 'todo.txt');
const REPO_DIR = __dirname;

app.post('/api/suggestion', (req, res) => {
    try {
        const { type, artist, title, notes } = req.body;

        if (!artist || !title) {
            return res.json({ success: false, error: 'Missing artist or title' });
        }

        // Format as: album-Artist-Title or song-Artist-Title
        let entry = `album-${artist}-${title}`;
        if (type === 'song') {
            entry = `song-${artist}-${title}`;
        }
        if (notes) {
            entry += `\n  ${notes}`;
        }

        // Append to todo.txt
        fs.appendFileSync(TODO_FILE, entry + '\n');

        // Git commit and push
        process.chdir(REPO_DIR);
        execSync('git add ratings/todo.txt');
        execSync(`git commit -m "Add suggestion: ${title} by ${artist}"`);
        execSync('git push origin main');

        res.json({ success: true, message: 'Suggestion added and pushed!' });
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, error: error.message });
    }
});

// Run git pull every 5 minutes
cron.schedule('0 */1 * * *', () => {
    console.log('🔄 Pulling latest changes from repo...');

    exec('git pull', (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`⚠️ Stderr: ${stderr}`);
            return;
        }
        console.log(`✅ Git pull successful:\n${stdout}`);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
