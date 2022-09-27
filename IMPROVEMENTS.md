# THINGS TO IMPROVE QUALITY
- Change `Jest` for tests (too slow) - use `Vitest` instead
- Make one repository per route
- Choosing a strategy side (only code-first or only database-first)
- Resources return either a `Success<T>` or `Failure<HttpError>` response
- Error handling at process level (with `process.on()` events, such as `uncaughtException`, `unhandledRejection`, etc.)