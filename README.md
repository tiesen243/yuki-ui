# Yuki UI

Yuki UI is a source-first UI registry for modern web and React Native applications.

It provides reusable components, hooks, utilities, and application building blocks that can be installed directly into your project. Instead of depending on an opaque component package, Yuki UI gives you the source so you can customize and maintain it alongside your application.

## Features

- Source-first and fully customizable
- Web and React Native components
- Reusable React hooks and utilities
- Application-level libraries and helpers
- Authentication-related building blocks
- Registry-based installation
- TypeScript-first
- Modern React ecosystem
- Designed for composition and reuse

## Registry

Yuki UI organizes reusable code into several registry categories, including UI components, React hooks, application utilities, authentication tools, and React Native components.

The registry is continuously evolving, so new components and utilities may be added over time without requiring changes to the overall project structure.

## Installation

Yuki UI is designed to work with a registry-based workflow.

Registry items can be installed directly into your application, allowing you to own and customize the generated source code.

When installing an item, make sure the required dependencies are available in your project.

## Development

### Requirements

- Bun `>= 1.4.0`
- Node.js `>= 24.20.0`

### Install dependencies

```bash
bun install
```

### Development

```bash
bun dev
```

### Build

```bash
bun run build
```

### Type check

```bash
bun run typecheck
```

### Lint

```bash
bun run lint
```

### Format

```bash
bun run format
```

To apply formatting:

```bash
bun run format:fix
```

## Project Structure

```text
yuki-ui/
├── apps/
│   ├── web/          # Documentation and registry website
│   └── mobile/       # React Native / Expo application
├── tools/
│   ├── github/       # GitHub tooling
│   ├── oxc/          # Shared Oxlint/Oxc configuration
│   └── typescript/   # Shared TypeScript configuration
├── package.json
└── README.md
```

## Design Principles

### Source Ownership

Installed registry items become part of your application source code. You can modify, extend, or remove them without being tied to an internal implementation.

### Composability

Yuki UI focuses on small, reusable building blocks that can be composed with the rest of your application.

### Accessibility

Web UI is built with accessibility and established UI primitives in mind.

### Cross-platform

Yuki UI supports both web and React Native development while maintaining a consistent approach to component design and application architecture.

### Minimal Abstraction

The project focuses on practical, reusable application building blocks rather than trying to cover every possible use case.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/my-feature
```

3. Make your changes.
4. Run the project checks:

```bash
bun run typecheck
bun run lint
bun run format
```

5. Commit your changes:

```bash
git commit -m "Add my feature"
```

6. Push your branch and open a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
