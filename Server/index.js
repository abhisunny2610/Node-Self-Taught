const http = require('http')
const fs = require('fs')
const url = require("url")

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Request Received \n`;
    const myUrl = url.parse(req.url, true)

    console.log("Url", myUrl)

    fs.appendFile("./log.txt", log, (err, data) => {

        switch (myUrl.pathname) {
            case "/":
                res.end("Home Page");
                break;
            case '/about':
                const username = myUrl.query.myname
                res.end(`Hii, ${username}`);
                break;
            case "/search":
                const search = myUrl.query.q;
                res.end(`Here are your result for ${search}` );
                break;
            default:
                res.end("404 Page Not Found")

        }
    })
})


myServer.listen(8000, () => console.log("Server Started!"))