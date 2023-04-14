# How to Contribute

We'd love to get patches from you!

## Getting Started

If you find a bug, please open an issue, create a PR or [chat to the team on our forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).

## Building dependencies

Because this SDK uses `fetch` both in Node and the Browser, and ESM, it requires the following:

- Node 18.0.0 or higher
- A modern, version infinite, browser

To install the project, cd into the project and run

```bash
npm install
```

## Building the Project

To run the project, cd into the project and run

```bash
npm run start
```

## Tests

To run the tests, you need to have a Spotify account.

You will need to create a new app in the Spotify Developer portal, and add a redirect URI of `http://localhost:3000`.

Add the following environment variables:

- `INTEGRATION_TESTS_SPOTIFY_CLIENT_ID`
- `INTEGRATION_TESTS_SPOTIFY_CLIENT_SECRET`
- `INTEGRATION_TESTS_USER_EMAIL`
- `INTEGRATION_TESTS_USER_PASSWORD`

The latter two credentials are used to run integration tests in the scope of a *real user account*. This is required to test endpoints that require a user's authorization, such as `followPlaylist`. You need to make sure that your user has access to whichever Spotify app your client credentials and secret are for.

You can run the tests with `npm run test`, or using a plugin like [Wallaby](https://wallabyjs.com/).

We support `dotenv`, so you can add these to a `.env` file in the root of the repository.

To run the embedded example app, you will need to add the following environment variables:

- `VITE_SPOTIFY_CLIENT_ID`=the same value as set in INTEGRATION_TESTS_SPOTIFY_CLIENT_ID
- `VITE_REDIRECT_TARGET`=http://localhost:3000

For the example app to work, this .env file needs to be in the ./example folder.

## Workflow

We follow the [GitHub Flow Workflow](https://guides.github.com/introduction/flow/)

### TODO: Below is an Example

1. Fork the project
2. Check out the `main` branch
3. Create a feature branch
4. Write code and tests for your change
5. From your branch, make a pull request
6. Work with repo maintainers to get your change reviewed
7. Wait for your change to be pulled
8. Delete your feature branch

## Testing

To run the tests, you need to have a Spotify account.

You will need to create a new app in the Spotify Developer portal, and add a redirect URI of `http://localhost:3000`.

You will need to add the following environment variables:

- `INTEGRATION_TESTS_SPOTIFY_CLIENT_ID`
- `INTEGRATION_TESTS_SPOTIFY_CLIENT_SECRET`
- `INTEGRATION_TESTS_USER_EMAIL`
- `INTEGRATION_TESTS_USER_PASSWORD`

The latter two credentials are used to run integration tests in the scope of a *real user account*. This is required to test endpoints that require a user's authorization, such as `followPlaylist`. You need to make sure that your user has access to whichever Spotify app your client credentials and secret are for.

You can run the tests with `npm run test`, or using a plugin like [Wallaby](https://wallabyjs.com/).

We support `dotenv`, so you can add these to a `.env` file in the root of the repository.

To run the embedded example app, you will need to add the following environment variables:

```bash
VITE_SPOTIFY_CLIENT_ID=the same value as set in INTEGRATION_TESTS_SPOTIFY_CLIENT_ID
VITE_REDIRECT_TARGET=http://localhost:3000
```

For the example app to work, this .env file needs to be in the ./example folder.

## Issues

When creating an issue please try to adhere to the following format:

    module-name: One line summary of the issue (less than 72 characters)

    ### Expected behavior

    As concisely as possible, describe the expected behavior.

    ### Actual behavior

    As concisely as possible, describe the observed behavior.

    ### Steps to reproduce the behavior

    List all relevant steps to reproduce the observed behavior.

## Pull Requests

We adhere to a specific format for commit messages. Please write your commit
messages along these guidelines:

    module-name: One line description of your change (less than 72 characters)

    Problem

    Explain the context and why you're making that change.  What is the problem
    you're trying to solve? In some cases there is not a problem and this can be
    thought of being the motivation for your change.

    Solution

    Describe the modifications you've done.

    Result

    What will change as a result of your pull request? Note that sometimes this
    section is unnecessary because it is self-explanatory based on the solution.

Some important notes regarding the summary line:

- Describe what was done; not the result
- Use the active voice
- Use the present tense
- Capitalize properly
- Do not end in a period — this is a title/subject
- Prefix the subject with its scope

# License

By contributing your code, you agree to license your contribution under the 
terms of the [LICENSE](LICENSE)

# Code of Conduct

Read our [Code of Conduct](CODE_OF_CONDUCT.md) for the project.
