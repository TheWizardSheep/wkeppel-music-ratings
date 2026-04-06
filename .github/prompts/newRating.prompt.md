---
model: Claude Haiku 4.5 (copilot)
argument-hint: "album-name [notes-file]"
tools: [read, edit, search, fetch]
---

# Prompt: New Album Rating

## Goal
Create a new album rating entry JSON with all required metadata and automatically update the ratings index to include it.

## Rules
DO's:
- Use MusicBrainz API to look up album metadata (artist, title, year) by album/artist name
- Extract the release MBID from the MusicBrainz response
- Use Cover Art Archive API with the release MBID to retrieve cover art using direct image endpoint
- Download and save the cover art to the `/covers/` folder using curl with the direct image URL
- Generate a kebab-case filename from the album/artist name (format: `[artist-name]-[album-title].jpg`)
- Ask user for genre if not available from metadata (genre is not in standard MusicBrainz release queries)
- Include all required fields: type, artist, title, year, genre, rating, notes, highlights, lowlights, favoriteTrack, updatedAt, coverImage
- **Collect the rating (1-10) from the user at the END of the process**, after confirming all API metadata
- **Populate notes, highlights, and lowlights ONLY if provided by user**; otherwise set to empty string
- Separate notes (general thoughts), highlights (what stood out positively), and lowlights (what could improve)
- Validate that the rating is between 1-10
- Use today's date for updatedAt field
- Update the ratings-index.json files array with the new rating file path (`ratings/<filename>.json`)
- Follow the existing JSON format and structure

DON'Ts:
- Don't create duplicate entries if album already exists in `ratings-index.json`
- Don't overwrite existing entries
- Don't use special characters in filenames (only alphanumeric and hyphens)
- Don't fail if Cover Art Archive has no cover art available (use a default or skip coverImage)

## Task
Create a new album rating JSON file in the `/ratings` folder based on the provided album name. Use the MusicBrainz API to automatically look up album metadata (artist, title, year). Retrieve the cover art from Cover Art Archive using the direct image endpoint (e.g., `/release/{mbid}/front`) and download with curl. If the notes, genre, highlights, or lowlights are not available from the user, set them to empty strings. Finally, generate both the rating file and update the ratings-index.json file to include it.

## Steps
1. Accept an album name as primary input and optional notes file path
2. Query MusicBrainz API with the album/artist name to retrieve metadata
3. Parse the MusicBrainz response to extract: artist, title, year, and release MBID
4. Use Cover Art Archive direct image endpoint to check if cover art is available
5. If available, download cover art to `/covers/` using curl with direct endpoint (format: `[artist]-[title].jpg`)
6. If no cover image found, skip the coverImage field or set to empty string
7. Show user the metadata found (artist, title, year, release MBID, cover art downloaded)
8. **Ask user to provide genre** (MusicBrainz API doesn't include this in standard queries)
9. **ONLY IF a notes file was provided**: Read the notes file and extract its content
10. **Prompt user for rating (1-10), favorite track, notes, highlights, and lowlights** - collected at the end
11. **Generate a properly formatted JSON rating file** with all required fields including highlights/lowlights
12. Create a valid kebab-case filename from the album/artist information
13. Update the ratings-index.json to add `ratings/<new-file>.json` to the files array
14. If the album exists in the `todo.txt` file, remove it from the list
15. Provide clear feedback on what was created/updated, including API lookup results

----------------------------------------------------------------------

## API Integration

### MusicBrainz Query
```
GET https://musicbrainz.org/ws/2/release/?query={title}%20{artist}&fmt=json
```
Extract from response:
- `releases[0].id` → release MBID
- `artist-credit[0].name` → artist name
- `releases[0].date` → rele - Direct Image Download
**Primary endpoint for front cover:**
```
GET https://coverartarchive.org/release/{release_mbid}/front
```
Download directly with curl:
```bash
curl -s 'https://coverartarchive.org/release/{release_mbid}/front' -L -o /covers/[artist-name]-[album-title].jpg
```

**Alternative endpoints if front unavailable:**
- Back cover: `https://coverartarchive.org/release/{release_mbid}/back`
- Preview metadata (JSON): `https://coverartarchive.org/release/{release_mbid}` (check images[0].image URL)

**Note:** The generic `/release/{mbid}` endpoint may return redirects; use direct `/front` or `/back` endpoints for reliable image downloads. https://musicbrainz.org/ws/2/release/{release_mbid}?fmt=json
GET https://coverartarchive.org/release-group/{release_group_mbid}
```

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
- Release MBID: 48e37f4f-d249-4fec-a314-ddcc2a0b4daa
- Artist: Daft Punk
- Title: Random Access Memories
- Year: 2013
- Genre: (Not available in standard API — will ask user)
```

**Cover Art Archive Results:**
```
Download command:
$ curl -s 'https://coverartarchive.org/release/48e37f4f-d249-4fec-a314-ddcc2a0b4daa/front' -L -o /covers/daft-punk-random-access-memories.jpg

Result: ✅ Cover art downloaded (242K)
File saved: /covers/daft-punk-random-access-memories.jpg
```

**User Prompts:**
```
Genre: Electronic
Rating (1-10): 9
Favorite Track: Instant Crush
Notes: Great production and consistent replay value.
Highlights: Exceptional production quality and arrangement throughout.
Lowlights: Some tracks feel overly long.
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
  "notes": "Great production and consistent replay value.",
  "highlights": "Exceptional production quality and arrangement throughout.",
  "lowlights": "Some tracks feel overly long.",
  "favoriteTrack": "Instant Crush",
  "updatedAt": "2026-03-24",
  "coverImage": "daft-punk-random-access-memories.jpg"
}
```

**Notes:**
- Genre is collected from user input (not available in MusicBrainz standard queries)
- Cover art downloaded using direct `/front` endpoint to avoid redirect issues
- `rating` is collected from user input at the end
- `notes` is general impressions/thoughts about the album
- `highlights` captures what stood out positively
- `lowlights` captures what could improve
- `favoriteTrack` is collected from user preference
- `coverImage` references the filename saved in `/covers/`

**Updated Index File:**
- Added `"ratings/random-access-memories.json"` to the files array in ratings-index.json
