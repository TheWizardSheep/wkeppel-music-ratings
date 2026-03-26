const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

        // Format as: album-Title-Artist or song-Title-Artist
        let entry = `album-${title}-${artist}`;
        if (type === 'song') {
            entry = `song-${title}-${artist}`;
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
