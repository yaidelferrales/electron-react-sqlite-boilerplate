const Sequelize = require('sequelize');
const isDev = require('electron-is-dev');
const path = require('path');

module.exports = {
  init: () => {
    return new Promise((resolve, reject) => {
      const dbPath = isDev
        ? path.join(__dirname, '..', '..', 'tmp-database.sqlite')
        : path.join(__dirname, '..', 'database.sqlite');
    
      const sequelize = new Sequelize(null, null, 'your-encryption-key', {
        dialect: 'sqlite',
        dialectModulePath: '@journeyapps/sqlcipher',
        storage: dbPath
      });
    
      sequelize.sync();
    
      resolve(sequelize);
    });
  }
}
