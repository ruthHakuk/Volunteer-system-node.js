const helpRequestsRoute = require('./routes/helpRequests');
const volunteersRoute = require('./routes/Volunteers');
const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

app.use('/api/helpRequests', helpRequestsRoute);
app.use('/api/Volunteers', volunteersRoute);


app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
});



    
