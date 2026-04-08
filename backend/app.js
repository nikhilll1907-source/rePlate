const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(8081, () => {
    console.log('Server is running http://localhost:8081 ');
})
