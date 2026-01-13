# Git Workflow Guide

This document outlines the recommended Git workflow for this project.

## Branch Strategy

### Main Branches

- **`main`**: Production-ready code
- **`develop`**: Integration branch for features

### Feature Branches

- **`feature/feature-name`**: New features
- **`bugfix/bug-name`**: Bug fixes
- **`hotfix/hotfix-name`**: Critical production fixes

## Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(auth): add JWT token refresh mechanism

Implement token refresh endpoint and update frontend
to automatically refresh expired tokens.

Closes #123
```

```
fix(posts): enforce ownership check on post update

Previously, users could update posts they didn't own.
Added ownership validation in PostService.

Fixes #456
```

## Workflow Steps

### 1. Starting a New Feature

```bash
# Update develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/new-feature-name

# Make changes and commit
git add .
git commit -m "feat(scope): description"
```

### 2. Committing Changes

```bash
# Stage specific files
git add path/to/file.js

# Or stage all changes
git add .

# Commit with descriptive message
git commit -m "feat(auth): add password reset functionality"

# Push to remote
git push origin feature/new-feature-name
```

### 3. Creating Pull Request

1. Push your feature branch to remote
2. Create Pull Request on GitHub/GitLab
3. Request code review
4. Address review comments
5. Merge to `develop` after approval

### 4. Merging to Main

```bash
# Update develop
git checkout develop
git pull origin develop

# Merge to main
git checkout main
git pull origin main
git merge develop

# Tag release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags
```

## Best Practices

### 1. Commit Often

- Make small, logical commits
- Each commit should represent a single change
- Don't accumulate many changes in one commit

### 2. Write Clear Commit Messages

- Use imperative mood ("add feature" not "added feature")
- Be specific about what changed
- Explain why if not obvious

### 3. Keep Branches Up to Date

```bash
# Regularly sync with develop
git checkout feature/my-feature
git fetch origin
git rebase origin/develop
```

### 4. Review Before Committing

```bash
# Check what will be committed
git status
git diff

# Review staged changes
git diff --staged
```

### 5. Use .gitignore

Never commit:
- `node_modules/`
- `.env` files
- Build artifacts
- IDE configuration files
- Log files

## Common Commands

### Viewing History

```bash
# View commit history
git log --oneline --graph --all

# View changes in a file
git log -p path/to/file.js

# View commit details
git show <commit-hash>
```

### Undoing Changes

```bash
# Unstage files
git reset HEAD <file>

# Discard changes in working directory
git checkout -- <file>

# Amend last commit
git commit --amend -m "new message"

# Revert a commit
git revert <commit-hash>
```

### Branch Management

```bash
# List all branches
git branch -a

# Delete local branch
git branch -d feature/old-feature

# Delete remote branch
git push origin --delete feature/old-feature

# Rename branch
git branch -m old-name new-name
```

## Pre-commit Checklist

Before committing, ensure:

- [ ] Code follows project style guide
- [ ] No console.logs or debug code
- [ ] No commented-out code
- [ ] Environment variables are in .env.example (not .env)
- [ ] Dependencies are updated in package.json
- [ ] Commit message follows convention
- [ ] Changes are tested (if applicable)

## Code Review Guidelines

When reviewing pull requests:

1. **Functionality**: Does it work as intended?
2. **Architecture**: Does it follow clean architecture principles?
3. **Security**: Are there any security concerns?
4. **Performance**: Any performance issues?
5. **Testing**: Are there tests? Should there be?
6. **Documentation**: Is documentation updated?

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release branch from `main`
4. Tag release: `git tag -a v1.0.0 -m "Release v1.0.0"`
5. Push tags: `git push origin --tags`
6. Create GitHub release with changelog

## Troubleshooting

### Merge Conflicts

```bash
# Abort merge
git merge --abort

# Resolve conflicts manually, then:
git add .
git commit -m "Merge branch 'feature/xyz'"
```

### Accidentally Committed Sensitive Data

```bash
# Remove from history (use with caution)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (coordinate with team first!)
git push origin --force --all
```

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

