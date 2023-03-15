//Using Express
const express = require("express");
const PORT = 2000;
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let products = [{
  id: 1,
  name: "nasi goreng",
  price: 15000
}, {
  id: 2,
  name: "bakso",
  price: 20000
}]

app.get("/api", (req, res) => {
  // res.send("This is GET method");
  res.json({
    status: 'ok',
    data: products
  })
});

app.post("/api", (req, res) => {
  console.log("POST", req.body);
  const newProduct = req.body;

  const productsId = products.map((product) => product.id);
  const newId = Math.max(...productsId) + 1;

  products.push({
    id: newId,
    ...newProduct
  });
  res.json({
    status: 'ok',
    message: "data successfully created"
  })
});

app.put("/api", (req, res) => {
  console.log("PUT", req.body);
  const replacedProduct = req.body;
  const productsId = products.map((product) => product.id);
  const index = productsId.indexOf(replacedProduct.id);

  if (index === -1) {
    res.json({
      status: 'error',
      message: "product ID not exist"
    })
  } else {
    products[index] = replacedProduct;
    res.json({
      status: 'ok',
      message: "data successfully replaced"
    })
  }

});

app.patch("/api", (req, res) => {
  console.log("PATCH", req.body); 
  const updatedProduct = req.body;
  const productsId = products.map((product) => product.id);
  const index = productsId.indexOf(updatedProduct.id);

  if (index === -1) {
    res.json({
      status: 'error',
      message: "product ID not exist"
    })
  } else {
    products[index] = updatedProduct;
    res.json({
      status: 'ok',
      message: "data successfully updated"
    })
  }
});

app.delete("/api", (req, res) => {
  console.log("DELETE", req.body);

  const deletedProduct = req.body;
  const productsId = products.map((product) => product.id);
  const index = productsId.indexOf(deletedProduct.id);

  if (index === -1) {
    res.json({
      status: 'error',
      message: "product ID not exist"
    })
  } else {
    products.splice(index, 1);
    res.json({
      status: 'ok',
      message: "data successfully deleted"
    })
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});

// const http = require('http');
// const PORT = 2000;

// const server = http.createServer(async (req, res) => {
//   console.log(req);

//   if (req.url === '/api' && req.method === 'GET') {
//     res.writeHead(200, {"Content-Type": "application/json"});
//     res.write("Hi there, this is vanilla Node.js API");
//     res.end();
//   } else {
//     res.writeHead(404, {"Content-Type": "application/json"});
//     res.end(JSON.stringify({
//       message: "Route not found"
//     }));
//   }
// });

// server.listen(PORT, () => {
//   console.log(`server running on port ${PORT}...`);
// });