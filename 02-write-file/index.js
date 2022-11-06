// Imports
const path = require('path')
const fs = require('fs')
const {stdin, stdout} = process
const readline = require('readline')

// Defining Path of Output Text File
const textFilePath = path.join(__dirname, 'output.txt')

// Creating WriteStream
const textOutputFile = fs.createWriteStream(textFilePath, 'utf-8')

// Opening Interface of Readline Module
const readLine = readline.createInterface({
  input: stdin,
  output: stdout
})

// Ending Function
const end = () => {
  readLine.write('See you!')
  readLine.close()
  textOutputFile.end()
  process.exit()
}

// Writing Data
readLine.write('What text do you want to write in output.txt file? \n')

readLine.on('line', input => {
  input.toString().toLowerCase() === 'exit' ? end() : textOutputFile.write(input + '\n')
})

// Ctrl+C Handler
readLine.on('SIGINT', () => {
  end()
})