# Marvel Downloader
#### A simple test application that downloads the Marvel character DB into a MongoDB instance and exposes an authenticated API to retrieve data (OAuth2)

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

Then install all the required dipendences with:
```bash
# With yarn
$ yarn install

# Or with npm if you prefer
$ npm install
```

## Run the application
In order to run the application you can use the following command with Yarn:
```bash
$ yarn run start
```
Or this one with npm:
```bash
$ npm run start
```