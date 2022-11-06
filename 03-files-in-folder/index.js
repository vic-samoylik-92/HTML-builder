// Imports
const fsPromises = require('fs/promises')
const path = require('path')
const { stdout } = process

// Defining Function
async function showFiles() {
  try {
    // Getting All Files in 'Secret Folder'
    const secretFolderPath = path.join(__dirname, 'secret-folder')
    const files = await fsPromises.readdir(secretFolderPath, {withFileTypes: true});
    // Running Through The Files
    for (const file of files) {
      // Checking if 'file' is actual file
      if(file.isFile()) {
        const filePath = path.join(
          __dirname,
          './secret-folder',
          file.name
        )
        // Getting All Needed Data
        const fileName = file.name.split('.')[0]
        const fileType = file.name.split('.')[1]
        const fileSize = (await fsPromises.stat(filePath)).size
        // Printing Data in Special Order
        stdout.write(`${fileName} - ${fileType} - ${(fileSize / 1024).toFixed(3)}kb \n`);
      }
    }
  } catch (err) {
    // In Case of Error
    console.error(err.message);
  }
}

// Run
showFiles()