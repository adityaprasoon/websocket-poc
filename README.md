# websocket-poc

This is small web application that showcases an usecase for synchorinzing the cursor position between serveral clients.
This application uses NodeJS as the backend application which receives mouse cusror from connected clients and then broadcasts to all other connected clients.

## How to run this POC
1. Clone this repo locally.
2. Ensure to have nodejs v22+ and `pnpm` installed.
3. `cd server`, `pnpm install` then `node index.js`.
4. In another terminal, `cd client`, `pnpm install`, then `./node_modules/http-server/bin/http-server`.
5. Access the webpage at `localhost:8080`.
6. Open the webpage on several tabs and move the mouse on one to see the correspoding change in other tabs.

    