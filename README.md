# node-omnibus-api

This project is currently a POC for a minimal node+express API server that can be packaged into a fully portable executable using pkg (https://github.com/vercel/pkg).

This project includes an exported postman collection that is ready to test the three endpoints that are currently implemented.

## Steps to run the API server and test:

1. Clone the repo
2. Run `npm install`
3. Run `npm run package`
4. Locate the executable in the `dist` folder for your OS and run it
5. Import the postman collection into postman
6. Run the collection