// Imports
const { mkdir, rm, readdir, copyFile } = require('fs/promises');
const path = require('path');

// Defining Main Function
async function makeDirectory() {
  // Defining Paths
  const originalFolderPath = path.join(
    __dirname,
    'files'
  )
  const copyFolderPath = path.join(
    __dirname,
    'files-copy');
  // Remove Folder in Case if it Exists
  await rm(copyFolderPath, {
    recursive: true,
    force: true
  })
  // Making New Folder
  await mkdir(copyFolderPath, { recursive: true });
  // Get All Files to Copy
  const filesToCopy = await readdir(path.join(
    __dirname,
    'files'
  ))
  // Running Through the Files and Copying It From Source-Path to Destination-Path
  for(const file of filesToCopy) {
    const sourceFilePath = path.join(
      path.join(__dirname, 'files'),
      file
    )
    const destinationPath = path.join(
      path.join(__dirname, 'files-copy'),
      file
    )
    await copyFile(sourceFilePath, destinationPath)
  }
  console.log('Work is Done!')
}

// Run Main Function and Catching Error
makeDirectory().catch(console.error);