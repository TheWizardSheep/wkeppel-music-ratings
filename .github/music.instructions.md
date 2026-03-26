---
applyTo: "*"
---
# Music Rating Guidelines
## Directory Structure
- All music ratings should be stored in the `ratings` directory.
## File Naming
- Use lowercase letters and hyphens for file names (e.g., `my-first-rating.html`).
## File Content
- Each music rating should start with a title and date.
- Use json fields declared in the (`example-rating.json`).
- When generating a new music rating, DO NOT GENERATE CONTENT. ONLY generate the LAYOUT and fill in meta information such as date, title, and author.
## File Naming
- Use lowercase letters and hyphens for file names (e.g., `my-first-rating.html`).
## Ratings
- Each music rating should be given in commands
- When generating a new music rating, DO NOT GENERATE CONTENT. ONLY generate the LAYOUT and fill in meta information such as date, title, and author.
## Linking
- Add a link in the index page (`ratings-index.html`) to the new rating in the appropriate section.
- Ensure all internal links are relative and point to the correct files within the `ratings` directory.
## Styling
- Follow the existing CSS classes and styles defined in the blog's stylesheet.
- Maintain a consistent layout for all blog posts to ensure a uniform user experience.
- If the page is not interesting, generate a more engaging layout and ASK if you can apply

* Whenever there is a change, UPDATE THE METADATA IN [ratings-index.json](../ratings-index.json) TO REFLECT THE MOST RECENT CHANGE. This is critical for ensuring the correct instructions are applied to future edits.


## Commands
### @newRating
Use [.github/prompts/newRating.md](./prompts/newRating.prompt.md).
