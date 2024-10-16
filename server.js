const express = require('express');
const app = express();
const path = require('path');
const route = require('./route/index');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, './frontent-client/build')));

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, './frontent-client/build', 'index.html'));
});

app.get('/api/avaiable/:seat', (req, res) => {
    const seat = req.params.seat;

});
app.use('/api', route);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

