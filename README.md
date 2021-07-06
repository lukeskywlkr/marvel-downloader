# Marvel Downloader
#### A simple test application that downloads the Marvel character DB into a MongoDB instance and exposes an authenticated API endpoint to retrieve data (OAuth2)

## Application configuration
Before starting the app copy the `.env.example` file as `.env` and fill missing values in `.env`.

```bash
$ cp .env.example .env
```

The required values are:
```
# Environment
NODE_ENV=development

# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/marvel-characters

# developer.marvel.com Configuration
MARV_PUB_KEY=key
MARV_PRIV_KEY=key
MARV_BASE_URL=https://gateway.marvel.com

# Google OAuth parameters
GOOGLE_CLIENT_ID=clientID
GOOGLE_CLIENT_SECRET=clientSecret
GOOGLE_CALLBACK_URL=http://localhost:3000/v1/auth/callback
```

Then install all the required dependencies with:
```bash
# With yarn
$ yarn install

# Or with npm if you prefer
$ npm install
```

Be sure to spin a MongoDB instance before running the app, otherwise an error will be thrown.

## Run the application
In order to run the application use the following command with Yarn:
```bash
$ yarn run start
```
Or this one with npm:
```bash
$ npm run start
```

To get an auth_token in order to make an authenticated call to the server go to:
```
http://localhost:<PORT>/v1/auth/login
```
Authenticate with Google and then the browser will redirect you to:
```
http://localhost:<PORT>/v1/auth/callback
```
Here it will be found the authentication token to add in the `Authorization` header of the requests to the server.

Now is possible to call the APIs that require authentication. To retrieve the list of Marvel Characters make an authenticated call to:
```
http://localhost:<PORT>/v1/characters
```
To get all the characters in one call, or use:
```
http://localhost:<PORT>/v1/characters?page=<number>&limit=<number>
```
To use pagination.