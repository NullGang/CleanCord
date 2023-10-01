const fs = require('fs');
const path = require('path');

const localAppDataPath = process.env.LOCALAPPDATA;

if (localAppDataPath) {
  //If you have Discord Canary or Discord PTB change this.
  const discordPath = path.join(localAppDataPath, 'Discord');

  if (fs.existsSync(discordPath)) {
    console.log(`Discord directory found: ${discordPath}`);

    const files = fs.readdirSync(discordPath);

    const appFolders = files.filter(file => file.startsWith('app-'));

    if (appFolders.length > 0) {
      appFolders.forEach(folder => {
        const core1Path = path.join(discordPath, folder, 'modules', 'discord_desktop_core-1');
        const corePath = path.join(core1Path, 'discord_desktop_core');
        const indexPath = path.join(corePath, 'index.js');

        if (fs.existsSync(indexPath)) {
          console.log(`Reseting index.js file: ${indexPath}`);

          let indexContent = fs.readFileSync(indexPath, 'utf8');

          indexContent = `//Cleaned by NullOnRise Anti-Token Virus\nmodule.exports = require('./core.asar');`;

          fs.writeFileSync(indexPath, indexContent);

          console.log('index.js file reseted.');
        } else {
          console.error('The index.js was not found.');
        }
      });
    } else {
      console.log(`There is't any "app-". dir`);
    }
  } else {
    console.error('The Discord directory does not have that directories.');
  }
} else {
  console.error('Cannot found LOCALAPPDATA Path.');
}
