---
model: Claude Haiku 4.5 (copilot)
argument-hint: "album-name [notes-file]"
tools: [read, edit, search, fetch]
---

# Prompt: New Album Rating

## Goal
Create a new album rating entry with all required metadata and automatically update the ratings index to include it.

## Rules
DO's:
- Use MusicBrainz API to look up album metadata (artist, title, year, genre) by album/artist name
- Extract the release MBID from the MusicBrainz response
- Use Cover Art Archive API with the release MBID to retrieve cover art
- Download and save the cover art to the `/music/covers/` folder with a descriptive filename
- Generate a kebab-case filename from the album/artist name
- Include all required fields: type, artist, title, year, genre, rating, updatedAt, coverImage
- **Collect the rating (1-10) from the user at the END of the process**, after confirming all API metadata
- **Populate notes ONLY if a notes file is provided**; otherwise set to empty string or null
- If a notes file is provided, read it and incorporate its contents into the notes field
- Validate that the rating is between 1-10
- Use today's date for updatedAt field
- Update the ratings-index.json files array with the new rating file path
- Follow the existing JSON format and structure
- If a field is missing, fill it with a placeholder (but prioritize API data)

DON'Ts:
- Don't create duplicate entries if album already exists in `recordings-index.json`
- Don't overwrite existing entries
- Don't use special characters in filenames (only alphanumeric and hyphens)
- Don't fail if Cover Art Archive has no cover art available (use a default or skip coverImage)

## Task
Create a new album rating JSON file in the `/music/ratings` folder based on the provided album name. Use the MusicBrainz API to automatically look up album metadata (artist, title, year, genre). Retrieve the cover art from Cover Art Archive using the release MBID and save it locally. After confirming all API metadata with the user, collect the rating (1-10) and favorite track at the end. If a notes file is provided, read and incorporate it; otherwise leave notes empty. Finally, generate both the rating file and update the ratings-index.json file to include it.

## Steps
1. Accept an album name as primary input and optional notes file path
2. Query MusicBrainz API with the album/artist name to retrieve metadata
3. Parse the MusicBrainz response to extract: artist, title, year, genre, and release MBID
4. Query Cover Art Archive API using the release MBID to retrieve cover art
5. Download and save the cover art to `/music/covers/` with a descriptive filename (format: `[artist]-[title].jpg`)
6. Show user the metadata found (artist, title, year, genre, cover art preview)
7. **ONLY IF a notes file was provided**: Read the notes file and extract its content
8. **Prompt user for rating (1-10)** - this is always collected at the end
9. **Generate a properly formatted JSON rating file** with all required fields
10. Create a valid kebab-case filename from the album/artist information
11. Update the ratings-index.json to add the new rating file to the files array
12. Provide clear feedback on what was created/updated, including API lookup results

----------------------------------------------------------------------

## API Integration

### MusicBrainz Query
```
GET https://musicbrainz.org/ws/2/release/?query={title}%20{artist}&fmt=json
```
Extract from response:
- `releases[0].id` → release MBID
- `artist-credit[0].name` → artist name
- `releases[0].date` → release year

### Cover Art Archive Query
```
GET https://coverartarchive.org/release/{release_mbid}
```
Extract and download:
- `images[0].image` → URL to cover art image
- Save to `/music/covers/[artist]-[title].jpg`

----------------------------------------------------------------------

## Output Format
- Format: json file + cover art + index update confirmation
- Sections required:
  - MusicBrainz lookup results (metadata found)
  - Cover Art Archive results (URL + downloaded file path)
  - New rating JSON file content
  - Updated ratings-index.json content
  - Summary of changes
  - List of any missing fields that need user input (if applicable)
- Length target: small (clear and complete with all metadata)

## Example Input
Album name: "Random Access Memories by Daft Punk"

## Example Output

**MusicBrainz Lookup Results:**
```
Query: https://musicbrainz.org/ws/2/release/?query=Random%20Access%20Memories%20Daft%20Punk&fmt=json
Response contains:
- Release ID: 48e37f4f-d249-4fec-a314-ddcc2a0b4daa
- Artist: Daft Punk
- Title: Random Access Memories
- Year: 2013
- Genre: Electronic
```

**Cover Art Archive Results:**
```
Query: https://coverartarchive.org/release/48e37f4f-d249-4fec-a314-ddcc2a0b4daa
Result: Cover art found and downloaded
File saved: /music/covers/daft-punk-random-access-memories.jpg
```

**New Rating File:** `ratings/random-access-memories.json`
```json
{
  "type": "album",
  "artist": "Daft Punk",
  "title": "Random Access Memories",
  "year": 2013,
  "genre": "Electronic",
  "rating": 9,
  "notes": "",
  "favoriteTrack": "Instant Crush",
  "updatedAt": "2026-03-24",
  "coverImage": "daft-punk-random-access-memories.jpg"
}
```

**Notes:**
- `rating` is collected from user input at the end
- `notes` is empty (no notes file was provided)
- `favoriteTrack` can be collected or left empty based on user preference
- `coverImage` references the filename saved in `/music/covers/`

**Updated Index File:**
- Added `"ratings/random-access-memories.json"` to the files array in ratings-index.json
