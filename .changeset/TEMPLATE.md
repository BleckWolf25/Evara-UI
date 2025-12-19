# Changeset Template

## Before Creating a Changeset

Add a changeset before opening a Pull Request:

```bash
pnpm changeset:add
```

## Changeset Format

Changesets are stored in `.changeset/` as markdown files with frontmatter:

```markdown
---
"@evara-ui/core": minor
"@evara-ui/react": patch
---

Brief description of the changes. This will appear in the CHANGELOG.
```

## Bump Types

- **major**: Breaking changes (e.g., API redesign, removed features)
- **minor**: New features (backward compatible)
- **patch**: Bug fixes, documentation, internal improvements

## Example Changeset

```markdown
---
"@evara-ui/core": minor
"@evara-ui/react": minor
"@evara-ui/vue": minor
---

Add new `Avatar` component with support for images, initials, and custom fallback slots.
```

## Notes

- One changeset per PR (in most cases)
- Include all affected packages in the frontmatter
- Keep the description clear and user-focused
- See `.changeset/README.md` for more details
