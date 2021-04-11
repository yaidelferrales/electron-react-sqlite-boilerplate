const fse = require('fs-extra');
const path = require('path');

// common path
const buildPath = path.join(__dirname, '..', 'build');
const iconOriginalPath = path.join(__dirname, '..', 'build', 'frontend', 'icon.png');
const iconsInBuildPath = path.join(__dirname, '..', 'build', 'icon.png');

// build folder paths
const frontendPath = path.join(__dirname, '..', 'frontend');
const frontendInBuildPath = path.join(__dirname, '..', 'build', 'frontend');

// backend folder paths
const backedPath = path.join(__dirname, '..', 'src', 'backend');
const backedInBuildPath = path.join(__dirname, '..', 'build', 'backend');

// shared folder paths
const sharedPath = path.join(__dirname, '..', 'src', 'shared');
const sharedInBuildPath = path.join(__dirname, '..', 'build', 'shared');

// First rename the build folder
fse.renameSync(buildPath, frontendPath);
// Create the build folder again
fse.mkdirSync(buildPath);
// Move the frontend folder inside the build folder
fse.renameSync(frontendPath, frontendInBuildPath);
// Copy the backend folder inside the build folder
fse.copySync(backedPath, backedInBuildPath);
// Copy the shared folder inside the build folder
fse.copySync(sharedPath, sharedInBuildPath);
// Copy icons inside the build folder
fse.copySync(iconOriginalPath, iconsInBuildPath);
