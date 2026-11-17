# Spark Frontend

React chat UI (created with Create React App, `react-scripts` 5.0.1) that sends
messages to a chat backend and shows the replies. It keeps the conversation in
browser `localStorage`.

## Setup

```sh
npm install
```

## Scripts

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm start`     | Starts the dev server                 |
| `npm run build` | Builds the production bundle into `build/` |
| `npm test`      | Runs the tests with `react-scripts test` |

## Backend

The API base URL is hardcoded in `src/config.js` (`API_CONFIG.BASE_URL`), and
there are no environment variables. The app calls these endpoints:

- `POST /chat` with `{ message, session_id }`
- `POST /reset` with `{ session_id }`

The backend is not part of this repository. Requests time out after 25 seconds
(`API_CONFIG.TIMEOUT`).

## Layout

- `src/App.js`: main app component
- `src/components/`: chat UI pieces (message list, input, welcome section, footer)
- `src/hooks/useChat.js`: chat state and API calls
- `src/services/apiService.js`: `fetch` wrappers for `/chat` and `/reset`
- `src/utils/storage.js`: `localStorage` helpers
- `public/`: static HTML, manifest and robots.txt
