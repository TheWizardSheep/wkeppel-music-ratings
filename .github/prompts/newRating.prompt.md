---
model: Claude Haiku 4.5 (copilot)
argument-hint: "album-name"
tools: [read, edit, search]
---

# Prompt: New Album Rating

## Goal
Create a new album rating entry with all required metadata and automatically update the ratings index to include it.

## Rules
DO's:
- Generate a kebab-case filename from the album/artist name
- Include all required fields: type, artist, title, year, genre, rating, updatedAt, coverImage
- Validate that the rating is between 1-10
- Use today's date for updatedAt field
- Update the ratings-index.json files array with the new rating file path
- Follow the existing JSON format and structure
- If a field is missing, fill it with a placeholder
- create a list of missing fields and prompt the user to provide them

DON'Ts:
- Don't create duplicate entries if album already exists
- Don't overwrite existing entries
- Don't use special characters in filenames (only alphanumeric and hyphens)

## Task
Create a new album rating JSON file in the `/music/ratings` folder based on the provided album name. Gather all necessary metadata (artist, year, genre, rating 1-10, notes, favorite track, cover image filename) and generate both the rating file and update the ratings-index.json file to include it.

## Requirements
1. Accept an album name as primary input (can prompt for additional details interactively)
2. Generate a properly formatted JSON rating file with all required fields
3. Create a valid kebab-case filename from the album/artist information
4. Update the ratings-index.json to add the new rating file to the files array
5. Provide clear feedback on what was created/updated

## Output Format
- Format: json file + index update confirmation
- Sections required:
  - New rating JSON file content
  - Updated ratings-index.json content
  - Summary of changes
  - List of any missing fields that need user input (if applicable)
- Length target: small (clear and complete with all metadata)

## Example Input
Album name: "Random Access Memories by Daft Punk"

## Example Output
**New Rating File:** `ratings/random-access-memories.json`
```json
{
  "type": "album",
  "artist": "Daft Punk",
  "title": "Random Access Memories",
  "year": 2013,
  "genre": "Electronic",
  "rating": 9,
  "notes": "Great production and consistent replay value.",
  "favoriteTrack": "Instant Crush",
  "updatedAt": "2026-03-24",
  "coverImage": "album-daft-punk-random-access-memories-20260324.jpg"
}
```

**Updated Index File:**
- Added `"ratings/random-access-memories.json"` to the files array in ratings-index.json
