const express = require("express")
const app = express()
const path = require('path');

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/images'))

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'))
})

app.post("/order", (request, response) => {
    response.send("INVALID PATH")
})

app.get("/view", (request, response) => {
    response.send("INVALID PATH")
})

app.get("*", (request, response) => {
    response.send("INVALID PATH")
})

app.listen(3000, async () => {
	console.log(`Began listening on port 3000`);
});
