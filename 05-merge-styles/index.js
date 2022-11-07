// Imports
const fsPromises = require('fs/promises')
const fs = require('fs')
const path = require('path')

// Main Function
async function processFiles() {
  try {
    // Defining Source Folder and Write Stream
    const stylesFolder = path.join(__dirname, 'styles')
    const files = await fsPromises.readdir(stylesFolder, {withFileTypes: true});
    const writeStream = await fs.createWriteStream(path.join(
      __dirname,
      'project-dist',
      'bundle.css')
      )
    // Running Through Files, Reading Them and Writting to Destination Folder via Pipe
    for (const file of files) {
      const fileType = file.name.split('.')[1]
      if(file.isFile() && fileType === 'css') {
        const filePath = path.join(
          __dirname,
          './styles',
          file.name
        )
        const readStyles = fs.createReadStream(filePath, 'utf-8')
        readStyles.pipe(writeStream)
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

// Run Main Function
processFiles()
