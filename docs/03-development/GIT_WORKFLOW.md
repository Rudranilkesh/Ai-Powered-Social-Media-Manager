# SocialSync AI — Git Workflow

---

## Branch Structure

```
main          ← production only, stable code
└── dev       ← integration branch, all features merge here
    ├── feature/ritam-auth
    ├── feature/ritam-models
    ├── feature/rudranil-dashboard
    ├── feature/rudranil-ai-content
    ├── feature/sagnik-posts
    └── feature/sagnik-scheduling
```

## Rules
- ❌ Never push directly to `main`
- ❌ Never push directly to `dev`
- ✅ Always create `feature/your-name-task` branch
- ✅ Open PR to merge into `dev`
- ✅ At least one teammate reviews before merge

---

## Daily Workflow

```bash
# Start new feature
git checkout dev
git pull origin dev
git checkout -b feature/ritam-models

# After coding
git add .
git commit -m "feat(database): add User and SocialAccount models"
git push origin feature/ritam-models

# Open Pull Request on GitHub: feature/ritam-models → dev
```

---

## Commit Message Format

```
type(scope): short description
```

| Type | Use for |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code restructuring |
| `chore` | Config, dependencies |

### Examples
```
feat(auth): add JWT login endpoint
feat(database): implement all 8 mongoose models
fix(scheduler): handle failed job retry logic
docs(readme): update environment setup section
chore(deps): update mongoose to latest version
```

---

*See full team guidelines in root [CONTRIBUTING.md](../../CONTRIBUTING.md)*
