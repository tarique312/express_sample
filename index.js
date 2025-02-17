import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

// create a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with specific id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send(`Tea not found`);
  }
  return res.status(200).send(tea);
});

// update tea

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send(`Tea not found`);
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  // teaData.push(tea)
  res.status(200).send(tea);
});

// delete tea

app.delete("/teas/:id", (req, res) => {
  teaData = teaData.filter((t) => t.id !== parseInt(req.params.id));
  res.status(200).send(`item deleted \n ${JSON.stringify(teaData)}`);
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});
