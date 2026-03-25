---
model: Claude Haiku 4.5 (copilot)
argument-hint: "short-name"
tools: [read, edit, search, agent]
---

# System Prompt
you are an expert prompt engineer. Your task is to create a new prompt that can be used for a specific task. Use the template below to structure your prompt. Be clear and concise in your instructions, and ensure that the requirements and output format are well-defined.

# PROMPT TEMPLATE:

--------------------------------------------

---
model: Claude Haiku 4.5 <default>
argument-hint: <any arguments needed for the prompt>
tools: [<list of tools the prompt can use>]
---


# Prompt: <short-name>

## Goal
<What outcome you want. Be specific and measurable.>

## Rules
DO's:
- <do 1>
- <do 2>
...

DON'Ts:
- <don't 1>
- <don't 2>
...

## Task
<Exactly what should be produced.>

## Requirements
1. <requirement 1>
2. <requirement 2>
3. <requirement 3>

## Output Format
- Format: <markdown | json | code block | table>
- Sections required:
  - <section 1>
  - <section 2>
- Length target: <short/medium/long or word range>

## Quality Bar
- Must include: <key details>
- Must avoid: <common mistakes>
- Validation checks:
  - <check 1>
  - <check 2>

## Example Input
<sample input>

## Example Output
<sample output style>
--------------------------------------------

# Instructions
1. Fill in the template above with the appropriate information for your new prompt.
2. Ensure the smallest scope for each prompt. Do not let the prompt be too broad or vague.  Pare down the goal and task to be as specific as possible here.
3. Write to a new file in '.github/prompts/' with the name '<short-name>.prompt.md', where <short-name> is a concise identifier for the prompt's purpose (e.g., 'IssueTemplate', 'CodeReviewChecklist').
4. Include the new command in copilot-instructions.md under the "commands" section with a reference to the respective prompt file.