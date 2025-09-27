# GitHub Issue Workflow

The GitHub repo we are working in is `jordyvanvorselen/portfolio`.

When working on GitHub issues, follow this precise workflow:

## Issue Processing Workflow

1. **Read Issue**: Analyze the GitHub issue and understand all acceptance criteria
2. **Plan Tasks**: Use TodoWrite to create a structured task list breaking down the work
3. **Write acceptance test**: Write an integration test using Playwright for one acceptance criterion
4. **Run integration test**: ALWAYS run `pnpm test:integration` to verify the integration test fails before writing unit tests
5. **Write unit test**: Write the simplest failing test for the first acceptance criterion
6. **Implement**: Write minimal code to make the test pass
7. **Verify Green**: Run unit tests using `pnpm test:unit` to ensure they pass
8. **Refactor**: Check for and make structural improvements
9. **Repeat**: Continue Red → Green → Refactor cycle until the integration test and all unit tests pass. Check with `pnpm test:integration`.
10. **Visual Regression Test**: MANDATORY after any styling changes - Use Task tool with qa agent to take Playwright screenshot of localhost:3000 and compare against design files for pixel-perfect implementation
11. **Review Tests**: Ensure all tests focus on behavior rather than implementation details
12. **Document**: Update issue with completion status and evidence
13. **Commit**: Use conventional commits for all changes
14. **Start on the next acceptance criterion**: Start back at step 3 if not all acceptance criteria are complete

Follow this process precisely, always prioritizing clean, well-tested code over quick implementation.

Always write one test at a time, make it run, then improve structure. Always run all the tests using `pnpm test` (except visual regression tests) each time.

Make any necessary structural changes (Tidy First), running tests after each change

Commit structural changes separately

## Test-First Acceptance Criteria

- Every acceptance criterion MUST have a corresponding integration test
- Tests MUST pass before marking criteria as complete
- Prefer simple, focused tests over complex tests
- Tests should validate the "what" not document the "how"

## SUBAGENT USAGE

- **MANDATORY**: Always use the Task tool with the most appropriate specialized subagent for the task at hand
- Match the subagent type to the specific task requirements:
  - **general-purpose**: Complex research, multi-step tasks, broad searches
  - **analyzer**: Root cause analysis, systematic problem investigation
  - **devops**: Infrastructure, deployment, automation tasks
  - **frontend**: UX, accessibility, frontend performance, visual design
  - **mentor**: Learning, understanding, knowledge transfer
  - **backend**: Server-side systems, APIs, data integrity, security
  - **refactorer**: Code quality, maintainability, technical debt
  - **performance**: Optimization, bottleneck analysis, metrics
  - **qa**: Testing, quality assurance, visual regression, screenshots
  - **architect**: System design, scalability, long-term architecture
  - **orchestrator**: Complex multi-agent coordination
- Never default to manual execution when a specialized subagent would be more effective
- Use the qa subagent specifically for visual testing and screenshot comparisons
- **MAXIMIZE PARALLELIZATION**: When working on multiple independent tasks (like extending UI components, refactoring different files, or similar operations), ALWAYS use multiple Task tool calls in a single message to run them in parallel for optimal performance and efficiency
