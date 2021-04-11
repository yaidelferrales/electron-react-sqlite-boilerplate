const concurrently = require('concurrently');

const processes = [
  "BROWSER=none npm run start-react",
  "wait-on http://localhost:17345 && electron .",
];

const config = {
  prefix: 'mailgun-node-mailer',
  killOthers: ['failure', 'success'],
};

/**
 * This code is necessary to make sure the parent terminates 
 * when the application is closed successfully.
 *
 * @param {*} exitInfo 
 */
function onSuccess(exitInfo) {
  process.exit();
}

/**
 * This code is necessary to make sure the parent terminates 
 * when the application is closed because of a failure.
 * 
 * @param {*} exitInfo 
 */
function onFailure(exitInfo) {
  process.exit();
}

concurrently(processes, config).then(onSuccess, onFailure);
