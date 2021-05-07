# Description

Projet front

# Visit the site in production

Not available yet

## Libraries used

Front:

- React
- TailwindCSS
- Axios
- Heroicons
- AntDesign

Back:

[API Express for fetching data](https://github.com/Redskinsjo/Dreamquark-REST-api)

- Express

[API GraphQL for fetching data](https://github.com/Redskinsjo/Dreamquark-GraphQL-api)

- GraphQL

DB:

- MongoDB

## To start

1. Clone the project with :

```js
git clone https://github.com/Redskinsjo/Dreamquark-test
```

2. Navigate toward the folder :

```js
cd Dreamquark-test/
```

3. Install the dependencies avec :

```js
yarn install
```

4. Developp the project locally with :

```js
yarn start
```

## Functions

- Create Users, Teams or Organisations on a MongoDB database
- Read and display teams
- Modify Users and their content data

# Environment variables

Create a `.env`file at the root of the projet and copy paste :

if you plan to see the whole project (and the APIs too) locally

```js
REACT_APP_API_REST_URI=http://localhost:3030
REACT_APP_API_GRAPHQL_URI=http://localhost:3000
```

or if you plan to only see with this repo locally (and the APIs in production)

```js
REACT_APP_API_REST_URI=https://dreamquark-rest-api.herokuapp.com
REACT_APP_API_GRAPHQL_URI=https://dreamquark-graphql-api.herokuapp.com
```
