# (Electron + React + SQLite) boilerplate

This project is an attempt to configure a [Create React App](https://github.com/facebook/create-react-app) application with [Electron](https://www.electronjs.org/) and [SQLite](https://www.sqlite.org/) on a structure as intuitive as possible.

## Structure

The directory structure is very similar to the one provided by [Create React App](https://github.com/facebook/create-react-app), but the `src` folder is not divided into three folders:
- `frontend`: This directory contains the entire `React` code.
- `backend`: This directory is reserved for the `Electron` and `SQLite` code.
- `shared`: This directory is reserved for the code that is common between the `React` and `Electron` code.

## Configuration before running

If we have code been shared between the `React` and the `Electron` code you should create a symbolic link pointing to the `src/shared` directory inside `src/frontend`.

## Available Scripts

In the project directory, you can run:

### `start-react`

Runs the `React` code in the development mode. This script is not meant to be run independently as the `React` code is highly coupled to the `Electron` code.

### `build-react`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `test`

Runs all the tests available on the code. The script is configure to exit when all the tests are run instead of using the interactive config the typical `Create React App` uses.

### `dev`

Starts the `React` and `Electron` apps on develoment mode. The startup is sequential, so if the `React` code has problems starting then `Electron` is not going to start.

### `package`

Generates a distribution ready application with the source code.
