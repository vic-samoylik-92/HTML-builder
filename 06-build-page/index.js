const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')

async function processBundle() {
  try {
    // Process CSS Files
    await fsPromises.rm(path.join(
      __dirname,
      './project-dist',
      {
        recursive: true,
        force: true
    }
    ))
    await fsPromises.mkdir(path.join(
      __dirname,
      './project-dist',
      {
        recursive: true
      }
    ))
    const styles = await fsPromises.readdir(path.join(
      __dirname,
      './styles',
      {
        withFileTypes: true
      }
    ))
    const stylesStream = fs.createWriteStream(path.join(
      __dirname,
      './project-dist/style.css'
    ))
    styles.forEach(async (file) => {
      if(file.name.split('.')[1] === 'css') {
        fs.createReadStream(path.join(
          __dirname,
          './styles',
          file.name
        ), 'utf8'
        ).addListener('data', data => {
          stylesStream.write(data)
        })
      }
    })
    // Process HTML Files
    // не успел... =(

    // Process Assets Directory
    // тоже не успел... =(
    
  } catch(error) {
    console.error(error.message)
  }
}

processBundle()