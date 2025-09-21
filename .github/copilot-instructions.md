# Yuki UI - Copilot Coding Agent Instructions

## Repository Overview

**Yuki UI** is a modern React UI component library built on top of shadcn/ui. It follows a copy-paste methodology where components are copied directly into projects rather than being installed as dependencies. The repository includes a documentation website and a component registry system.

### Key Features
- Modern React components with TypeScript and React 18+
- Accessible by default (WAI-ARIA guidelines with jsx-a11y linting)
- Tailwind CSS integration with custom design tokens
- Monorepo architecture with shared tooling and configurations
- Component registry system for easy copying via shadcn CLI
- Authentication system with multiple database adapters

### Repository Statistics
- **Size**: ~127 source files (89 TypeScript, 38 JavaScript, 11 MDX)
- **Type**: Monorepo using Bun + Turbo
- **Languages**: TypeScript, React, Next.js
- **Package Manager**: Bun v1.2.21+ required
- **Build Tool**: Turbo for monorepo orchestration

## Essential Build and Validation Commands

### Prerequisites
**CRITICAL**: This project requires Bun. Always install Bun first:
```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
export PATH="$HOME/.bun/bin:$PATH"
```

### Installation
**Always run in order**:
```bash
# 1. Install dependencies (REQUIRED first step)
bun install

# 2. Build registry (REQUIRED before type checking Kaze)  
cd kaze && bun run build:registry && cd ..
```

### Development Workflow
```bash
# Start development servers for all packages
bun dev

# Development for documentation site only
cd kaze && bun dev
```

### Build Commands
```bash
# Build all packages
bun run build

# Individual package builds
cd packages/ui && bun run build      # UI components
cd packages/validators && bun run build  # Validators
cd kaze && bun run build            # Documentation site
```

**Known Build Issues**:
- Documentation build may fail due to Google Fonts network dependency (ENOTFOUND fonts.googleapis.com)
- Image processing may fail for external URLs in MDX files
- Registry must be built before type checking the Kaze documentation package
- Type checking in Kaze package has fumadocs-mdx type annotation issues (expected, doesn't affect functionality)

### Code Quality
```bash
# Linting (works reliably)
bun run lint

# Type checking (has known issues in Kaze package)
cd kaze && bun run build:registry && cd ..
bun run typecheck  

# Formatting check (works reliably)
bun run format

# Auto-fix formatting
bun run format:fix

# Workspace validation (works reliably)
bun run lint:ws
```

### Testing
**Note**: This repository does not have traditional unit tests. Validation is done through:
- TypeScript compilation
- ESLint linting
- Build success
- Manual testing of development server

## Project Architecture and Layout

### Monorepo Structure
```
yuki-ui/
├── .github/                    # GitHub configurations
├── kaze/                       # Documentation website (Next.js + Fumadocs)
│   ├── app/                    # Next.js app directory
│   ├── content/docs/           # MDX documentation files
│   ├── registry/               # Component registry definitions
│   ├── scripts/                # Build scripts for registry
│   └── __registry__/           # Generated registry files (auto-generated)
├── packages/
│   ├── ui/                     # Core UI components library
│   │   ├── src/components/     # React components
│   │   ├── src/hooks/          # Custom React hooks
│   │   └── src/lib/            # Utility functions
│   └── validators/             # Zod validation schemas
├── tools/                      # Shared tooling
│   ├── eslint/                 # ESLint configurations
│   ├── prettier/               # Prettier configuration
│   └── typescript/             # TypeScript configurations
├── package.json                # Root package.json with workspaces
├── turbo.json                  # Turbo configuration
└── tsconfig.json               # Root TypeScript configuration
```

### Key Configuration Files
- `turbo.json` - Turbo build orchestration and caching
- `package.json` - Workspace configuration and scripts
- `kaze/next.config.ts` - Next.js configuration for documentation
- `kaze/source.config.ts` - Fumadocs configuration
- Individual `eslint.config.js` files in each package
- `tools/prettier/index.js` - Shared Prettier configuration

### Component Registry System
The registry system allows components to be installed via shadcn CLI:
- Components defined in `kaze/registry/registry-*.ts` files
- Built into `kaze/__registry__/` via `build-registry.ts` script
- Accessible at `https://yuki-ui.vercel.app/r/{component}.json`
- **Must build registry before type checking Kaze package**

### Build Pipeline Dependencies
1. **Registry Generation**: `kaze/scripts/build-registry.ts` generates `__registry__/index.ts`
2. **shadcn Build**: Processes registry into shadcn-compatible format
3. **Next.js Build**: Builds documentation site with registry
4. **Component Dependencies**: UI package components can be imported in registry examples

## Package-Specific Information

### @yuki/ui (packages/ui/)
- Main UI components library
- Exports components and utilities
- Built with TypeScript, uses Tailwind CSS
- Dependencies: Radix UI primitives, Lucide icons, class-variance-authority

### @yuki/kaze (kaze/)
- Documentation website using Next.js 15 + Fumadocs
- Component preview and copy-paste functionality
- MDX-based documentation
- Registry system for component distribution

### @yuki/validators (packages/validators/)
- Zod-based validation schemas
- Lightweight package with minimal dependencies

### Tool Packages
- `@yuki/eslint-config`: Shared ESLint configurations for base, React, and Next.js
- `@yuki/prettier-config`: Shared Prettier configuration
- `@yuki/tsconfig`: Shared TypeScript configurations

## Validation and CI/CD

### Pre-commit Checks
This repository runs the following checks:
```bash
bun run lint:ws          # Workspace validation with sherif
bun run lint             # ESLint across all packages  
bun run format           # Prettier formatting check
# Note: typecheck has known issues in Kaze package, focus on individual package type checking
```

### Manual Validation Steps
1. Ensure Bun is installed and in PATH
2. Run `bun install` to install dependencies
3. Build registry: `cd kaze && bun run build:registry`
4. Run linting: `bun run lint`
5. Run formatting check: `bun run format`
6. Test development server: `bun dev` (should start without errors)
7. Individual package type checking: `cd packages/ui && bun run typecheck`

### Common Issues and Workarounds
1. **Registry not found error**: Always run `cd kaze && bun run build:registry` before working with Kaze
2. **Type checking failures in Kaze**: fumadocs-mdx type annotation issues are expected, focus on individual package type checking
3. **Network failures during build**: Documentation build may fail due to external dependencies (fonts, images)
4. **Lock file warnings**: Ignore warnings about '@emnapi/wasi-threads' - this is expected
5. **Font loading failures**: Expected in sandboxed environments, doesn't affect functionality

## Environment Requirements

### Required Tools
- **Bun v1.2.21+** (primary package manager and runtime)
- **Node.js** (for compatibility with some tools)
- **Git** (for repository operations)

### Environment Variables
- Basic `.env.example` provided but mostly empty
- Environment validation handled via `@yuki/validators` package
- Skip validation flags: `SKIP_ENV_VALIDATION`, `CI`, `npm_lifecycle_event=lint`

## Working with This Repository

### Making Changes to Components
1. Edit files in `packages/ui/src/components/`
2. If adding new registry components, update `kaze/registry/registry-*.ts`
3. Run `cd kaze && bun run build:registry` to regenerate registry
4. Test with `bun dev` to see changes in documentation

### Adding New Dependencies
- Use `bun add` in appropriate workspace
- Update catalog entries in root `package.json` for shared dependencies
- Run `bun run lint:ws` to validate workspace consistency

### Documentation Changes
- Edit MDX files in `kaze/content/docs/`
- Use Fumadocs MDX components (Steps, InstallComponent, etc.)
- Preview with `cd kaze && bun dev`

**Trust these instructions** - they are comprehensive and tested. Only search for additional information if these instructions are incomplete or produce errors. The build issues mentioned are known limitations in sandboxed environments and do not indicate problems with your changes.