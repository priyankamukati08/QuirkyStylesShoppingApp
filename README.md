# QuirkyStyles WebApplication

QuirkyStyles website is a fashion e-commerce platform, making shopping quirky and stylish!

## Installation (easiest way)

1. Clone the repo

```bash
    git clone https://github.com/priyankamukati08/QuirkyStylesShoppingApp
```

2. On the project's root folder, Run following to start UI, API and DB server.

Install docker, make sure the docker agent is running.

```bash
    docker-compose up --build
```

3. Run the following script that execute stored functions periodically and updates stock price and executes pending orders every 2secs.

```bash
    chmod +x ./Database/run_dbfuncs.sh
    ./Database/run_dbfuns.sh
```

4. QuirkyStyles should be serving at http://localhost:3000 (may take a couple of minutes to load if it's not loaded yet).

This application is build for high resolution big monitors (preferred).

5. To become an admin user, please enter admin code : @2304# in "Nickname" field of Cognito's Create Acount page. Users can leave the "Nickname" field blank.

6. Happy Shopping!

# Following describes the 3 major components of this application in detail and their individual setup.

![QuirkyStyles- Arch Diagram](https://user-images.githubusercontent.com/112794721/227240799-34ad1311-daea-47c0-a48a-e5ebbf289ebf.svg)

# QuirkyStyles

DB setup

DB scripts to manage Track Package after Order.

## Installation

1. Postgres Server - Store user and product info
2. Pgadmin - GUI to view and manage data

## Usage

1. Run the server
2. Create a database and run the scripts provided in `sql` directory
3. Execute following script to start running db function that executes transactions and generates status in track package page.

```bash
./run_dbfuns.sh
```

# QuirkyStyles

APIs (Backend)

Shop with QuirkyStyles by connecting to our easy to use APIs.

## Get Started

Install Node.js https://nodejs.org/

- Update config.js file and update with database connection string

```bash
npm install
node server.js
```

## Usage

Swagger docs: http://localhost:3001/api-docs/

## Future work

1. APIs to manage discounts and promotions.
2. APIs to track user activity and preferences.

# QuirkyStyles UI (Frontend)

Shop with QuirkyStyles with our easy to use UI.

## Get Started

1. Learn about React https://react.dev/
2. Redux https://redux.js.org/
3. Amplify https://docs.amplify.aws/start/q/integration/react/

- The package containes aws-export-new file that has amplify connection details.
- Now run the following scripts

```bash
npm install
npm run start
```

## Usage

1. Create an account using /login page
2. Become an admin by putting @2304# in Nickname field

## Future work

1. Add a feature for Admin to manage discounts and promotions
2. Disable placing orders during certain promotions
3. Integrate social media sharing options for products
5. Replace Nickname with custom attribute Passcode


