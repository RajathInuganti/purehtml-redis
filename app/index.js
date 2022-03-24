const express = require("express")
const app = express()
const path = require('path');
const redis = require('redis');

const client = redis.createClient({
    url: "redis://cache"
});

const connect_redis = async function() {
    await client.connect()
}
connect_redis()

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/images'))

app.get("/", async (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'))
})

app.get("/order", async (request, response) => {
	const date = new Date();
	const orderDetail = {...request.query, date: date.toLocaleDateString("en-US")};
	var res = await client.lPush('orders', JSON.stringify(orderDetail))
    return response.render('confirmation')
})

app.get("/view", async (request, response) => {
    const items = await client.lRange("orders", 0, -1)
    const orders = items.map((item) => {
        return JSON.parse(item)
    })
    return response.render('orders', {orders: orders})
})

app.listen(80, async () => {
	console.log(`Began listening on port 80`);
});
