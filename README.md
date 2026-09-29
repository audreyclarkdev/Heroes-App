# Heroes App

A full-stack application that displays a set of superhero characters — name, full name, and image — by fetching data through a custom Express backend, which in turn calls the [SuperHero API](https://akabab.github.io/superhero-api/api).

## Live Demo coming soon


## Architecture

```
User's Browser → React Frontend → Express Backend → SuperHero API
```

The frontend never calls the SuperHero API directly. All requests go through the Express backend, which fetches from the SuperHero API and forwards the data back to the frontend. This keeps API access on the server side rather than exposing it to the client.

## Tech Stack

- **Frontend:** React (Vite), PropTypes, CSS
- **Backend:** Node.js, Express, CORS
- **External API:** [SuperHero API](https://akabab.github.io/superhero-api/api)

## Project Structure

```
├── server.js              # Express backend — handles /heroes route
├── src/
│   ├── App.jsx
│   ├── HeroList.jsx       # Fetches heroes from backend, owns state
│   ├── HeroDetail.jsx     # Renders a single hero's name, image, full name
│   └── *.css              # Component + global styling
└── README.md
```

## Getting Started (Local Setup)

### Backend

```bash
# from the backend's root directory
npm install
node server.js
```

The server runs on `http://localhost:3000` by default

### Frontend

```bash
# from the frontend's root directory
npm install
npm run dev
```

Vite will start the frontend on `http://localhost:5173` by default.

Make sure the backend is running first, since the frontend fetches hero data from it on load.

## API

### `GET /heroes?ids=<comma-separated-ids>`

Returns an array of hero objects matching the provided IDs.

**Example:**
```
GET /heroes?ids=70,644,370
```

**Response:** an array of hero objects, each including `name`, `biography.fullName`, and `images.md`, among other fields from the SuperHero API.

If `ids` is missing from the query string, the server responds with a `400` status and an error message.

## Notes

- Hero IDs are currently hardcoded on the frontend to display a fixed set of three heroes, per the assignment requirements.
- Failed individual hero lookups (e.g. an invalid ID) are logged on the server and skipped, rather than failing the entire request — so a request for multiple heroes will still return the ones that succeeded.
