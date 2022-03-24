const fs = require('fs/promises')
async function readTextFile() {
    console.log('this is before readfile')
    let content = await fs.readFile("sample.txt", { encoding: "ascii" });
    console.log('This is content:', content)
    console.log('this is after readfile')
}
readTextFile()

// console.log('this is before readfile')

// fs.readFile('sample.txt',{encoding:"ascii"})
// .then((content) => {

//     console.log('This is content:', content)
// })
// .catch((err) => {
//     console.log("error is:", err);
// })

// console.log('this is after readfile')

// let content1 = await fs.readFile('bababab')
// let content2 = await fs.readFile(content1)
// let content3 = await fs.readFile(content2)
          
        