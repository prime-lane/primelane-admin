---
trigger: always_on
---

# Frontend Architecture

This document defines the authoritative frontend architecture for this project.
All code (human or AI-generated) must follow these rules.

---

## Tech Stack

- React (Vite)
- TypeScript (strict)
- Material UI (MUI v5)
- REST APIs only
- Table: React Table
- pnpm for package management
- [react router](https://reactrouter.com/home)

## Path Conventions
- define routes in a `path` file
- path name in caps

## Misc
- No additional libraries should be introduced without explicit approval.
- Never style MUI internals with Tailwind.
- Use Tailwind for styling native html elements.
- Use comments sparingly.


---

## Architecture Style

- Feature-based folder structure
- UI system separated from business logic
- API consumption only (no frontend business rules)
- kebab-case for file, folder names
- PascalCase for component names
- camelCase for variable names
- All components must be pure and side-effect-free in render.
- Component should be less than 1000
- Use reusable components from ui folder if it exists otherwise create one

### TypeScript
- Never use:
  - any
  - untyped function parameters
  - implicit any

  - untyped API responses

- Always explicitly type:
  - component props (Props interface)
  - state shape
  - API response types
  - function arguments + return types

Prefer interface for object typings and type for unions.

---

## Directory Structure

src/

- app/ → app bootstrap, routing, providers
- features/ → domain-based modules (auth, booking, trips)
- components/
  - ui/ → reusable design-system components
  - layout/ → page layouts and shells
- theme/ → MUI theme + component overrides
- services/ → API and platform services
- hooks/ → shared hooks
- utils/ → pure utility functions

Features must not import from other features.

---

## Component Boundaries

- Pages orchestrate data and layout
- Components are presentational
- UI components must be reusable and stateless where possible

No API calls inside UI components.

---

## Styling Rules

Order of precedence:

1. MUI theme overrides
2. Wrapped UI components
3. styled() utility
4. sx prop (layout only)

Inline styles and external CSS files are discouraged.

---

## State Management

- Server state: React Query
- Local UI state: React hooks
- No global Redux store

---

## API Layer

- RTK for API consumption
- API logic lives inside feature folders
- No direct API calls inside pages or UI components

---

## Performance Guidelines

- Lazy-load routes when appropriate
- Avoid unnecessary re-renders
- Prefer composition over prop drilling

---

## Constraints

- Follow Figma strictly
- Mobile-first UI
- Accessibility is mandatory
