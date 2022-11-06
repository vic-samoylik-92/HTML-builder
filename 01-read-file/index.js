// Imports
const { stdout } = process
const fs = require('fs')
const path = require('path')

// Defining ReadStream
const stream = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8'
  )

// Data Holder
let data = ''

// Fullfilling Data Holder With chunk/chunks
stream.on('data', (chunk) => {
  data += chunk
})

// Printing Full Data
stream.on('end', () => {
  stdout.write(data)
})

// In Case of Error
stream.on('error', (error) => {
  console.error(error.message)
})