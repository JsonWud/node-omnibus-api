# node-omnibus-api

This project is currently a POC for a minimal node+express API server that can be packaged into a fully portable executable using pkg (https://github.com/vercel/pkg).

This project includes an exported postman collection that is ready to test all endpoints that are currently implemented.

## Endpoints
- GET / - Returns the text 'Hello World!'
- POST /post - Returns a JSON object which includes your original request body
- GET /spawn-pwsh-location - Returns the cwd of the pwsh process without specifying it in the spawn options
- GET /spawn-pwsh-location-wconfig - Returns the cwd of the pwsh process with the cwd specified in the spawn options
- POST /pwsh-command - Demonstrates how a dynamic pwsh command can be run with JSON input (command1 or command2)
- POST /pwsh-temp-file - Demonstrates how a pwsh file can be run with JSON input (file copied to temp directory on disk)


## Steps to run the API server and test:

1. Clone the repo
2. Run `npm install`
3. Run `npm run package`
4. Locate the executable in the `dist` folder for your OS and run it
5. Import the postman collection into postman
6. Run the requests in the collection