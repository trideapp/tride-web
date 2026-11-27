# Changelog

## v0.20.0 — 2026-11-27

- `setLogLevel(level)` (`'off'`, `'error'`, `'warning'` by default, `'info'`, `'debug'`) sets how much Tride writes to the page's console, `setLogHandler(fn)` takes the lines instead, and `localStorage.setItem('tride-log-level', 'debug')` raises the level for 60 seconds without changing code. A playing scene writes no line at any level. The runtime's notices are written once and reach `onProblem` and `tride-problem` with code `core.notice`.
- A log handler set with `setLogHandler` that throws no longer fails a scene load or stops a playing scene: that line goes to the console instead, with one console error saying the handler threw, and every runtime notice still reaches `onProblem`.
- A page that calls `pause()` from a handler of the scene itself (a state change, an event, an input change) now stops the scene: before, the running loop asked for its next frame after the handler and kept playing, with `isPlaying` still true.
