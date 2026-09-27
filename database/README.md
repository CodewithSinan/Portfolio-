# Database Layer

This folder is reserved for MongoDB-related configuration and session data.

## Purpose
- Keep database connection logic and schema definitions separate from the API layer.
- Store environment-specific database configuration and migration notes.
- Maintain a clean boundary between application logic and data persistence.

## Suggested structure
- `connections/` for MongoDB connection helpers
- `models/` for Mongoose schemas
- `seed/` for optional seed scripts
- `docs/` for schema notes and data contracts

## Notes
- Keep credential values in `.env` rather than in source files.
- Use `MONGODB_URI` as the standard environment variable for the database connection.
