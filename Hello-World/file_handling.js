const fs = require("fs")
const os = require('os')

// find how many cpu's my laptop have
console.log("CPU", os.cpus().length)

// 1. Create a file

// Sync...
// fs.writeFileSync('./test.txt', "hey There")

// Async
// fs.writeFile('./test.txt', "Hello World of Async",(err) => {})

// 2. Read a file

// Sync...
// const result = fs.readFileSync("./test.txt", "utf-8")
// console.log(result)

// Async...
// fs.readFile("./test.txt", "utf-8", (err, result)=> {
//     if (err){
//         console.log("Error: ",err)
//     }else{
//         console.log("Result:", result)
//     }
// })

// 3. Append File
// fs.appendFileSync('./test.txt', `${Date.now()} Hey There\n`)

// 4. Copy a file
// fs.cpSync('./test.txt', "./copy.txt")

// 5. Delete file
// fs.unlinkSync('./copy.txt')

// 6. Getting Details of file (stats)
// console.log(fs.statSync('./test.txt'))