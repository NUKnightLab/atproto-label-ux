# Repository Guidelines

## Project Structure & Module Organization
`app/` contains the Flask prototype. `app/app.py` defines routes for the feed, label detail pages, and JSON endpoints. `app/data.py` holds the mock posts, labeler metadata, and lookup helpers that drive the demo. UI files live in `app/templates/` for Jinja templates and `app/static/` for CSS and browser-side JavaScript. `run.py` is the local launcher, and `use-cases/` contains design notes for future scenarios.

## Build, Test, and Development Commands
Set up the environment with `uv sync`. Start the app with `uv run serve`; this uses the `serve` script from `pyproject.toml` and runs the Flask app on `http://localhost:5000`. `uv run python run.py` is an equivalent fallback if you want to invoke the launcher directly. There is no separate frontend build step.

## Coding Style & Naming Conventions
Follow the existing style in each layer: Python uses 4-space indentation, snake_case names, and small route/helper functions. Templates, CSS, and JavaScript use 2-space indentation and straightforward descriptive class or function names such as `label_detail`, `post-card`, and `relativeTime`. Keep mock-data additions grouped by domain in `app/data.py`, and prefer explicit constants over ad hoc inline structures.

## Testing Guidelines
There is no automated test suite configured yet. For now, verify changes by running `uv run serve` and exercising the feed, `/api/feed`, and one or two label detail routes in the browser. When adding tests, prefer `pytest`, place them under `tests/`, and name files `test_<feature>.py` so they are easy to discover.

## Commit & Pull Request Guidelines
Recent commits use short imperative subjects such as `Add Book Discovery feed prototype` and `Update README with additional context and links`. Keep commit messages concise, focused, and scoped to one change. Pull requests should explain the user-visible effect, note any route or mock-data changes, link related discussion or issues, and include screenshots when templates or styling change.

## Configuration Notes
This repo is a self-contained mock prototype. Keep new features offline-friendly, avoid introducing unnecessary network dependencies, and preserve the local action URL pattern used by the labeler examples.
