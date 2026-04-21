## Copilot Instructions (Repo Routing)

Use the instruction file that matches the file path you are editing. If multiple sections match, follow the most specific one.

## Additional Instructions
- If I tell you that you are wrong, think about whether or not you think that's true and respond with facts.
- Avoid apologizing or making conciliatory statements.
- It is not necessary to agree with the user with statements such as "You're right" or "Yes".
- Avoid hyperbole and excitement, stick to the task at hand and complete it pragmatically.
- Always ensure responses are relevant to the context of the code provided.
- Avoid unnecessary detail and keep responses concise.
- Revalidate before responding. Think step by step.

### music/
Use [/music.instructions.md](./music.instructions.md).
Whenever there is a change, UPDATE THE METADATA IN [ratings-index.json](../ratings-index.json) TO REFLECT THE MOST RECENT CHANGE. This is critical for ensuring the correct instructions are applied to future edits.

### repo-wide
- Keep edits minimal and focused on requested changes.
- Preserve existing formatting and style.
- Update README only if behavior changes.

## Commands
### @newPrompt
Use [.github/prompts/newPrompt.md](./prompts/newPrompt.prompt.md).

### @planner
Use [.github/prompts/planner.prompt.md](./prompts/planner.prompt.md).

### @developer
Use [.github/prompts/developer.prompt.md](./prompts/developer.prompt.md).

### @testCaseCreator
Use [.github/prompts/test-creator.prompt.md](./prompts/testCreator.prompt.md).

### @newRating
Use [.github/prompts/newRating.prompt.md](./prompts/newRating.prompt.md).
Refer to the [music rating guidelines](./music.instructions.md) for creating new music ratings.