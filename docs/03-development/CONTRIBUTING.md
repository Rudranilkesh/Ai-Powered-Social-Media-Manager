# SocialSync AI — Contributing Guidelines

> This file contains detailed development guidelines.
> See root [CONTRIBUTING.md](../../CONTRIBUTING.md) for team overview.

---

## Before You Start

1. Read [ENVIRONMENT.md](./ENVIRONMENT.md) — set up your local environment
2. Read [CODE_STYLE.md](./CODE_STYLE.md) — follow coding conventions
3. Read [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) — follow branch and commit rules

---

## Development Workflow

For every task:

1. **Pull latest dev** — `git pull origin dev`
2. **Create feature branch** — `git checkout -b feature/your-name-task`
3. **Write code** — follow CODE_STYLE.md
4. **Test locally** — make sure nothing is broken
5. **Update docs** — update relevant `.md` files in `docs/`
6. **Commit** — follow commit message format
7. **Push and open PR** — `feature/... → dev`
8. **Request review** — at least one teammate approves

---

## Documentation Rule

**Every code change must update its related documentation.**

| Change | Update |
|---|---|
| New model / schema change | `docs/02-architecture/DATABASE.md` |
| New API endpoint | `docs/02-architecture/API_DOCUMENTATION.md` |
| New feature complete | `docs/01-project/CHANGELOG.md` |
| Task status change | `docs/06-management/TASK_TRACKER.md` + `ROADMAP.md` |
| New env variable | `docs/03-development/ENVIRONMENT.md` |
| Security change | `docs/05-quality-security/SECURITY.md` |

---

## Pull Request Checklist

Before opening a PR:
- [ ] Code works locally without errors
- [ ] Follows CODE_STYLE.md conventions
- [ ] Related documentation updated
- [ ] No `.env` files or secrets committed
- [ ] Commit messages follow convention

---

*Last updated: Task 1 complete*
