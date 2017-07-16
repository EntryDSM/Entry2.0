'use strict';

const app = require('./app');
const PORT = process.env.RORT || 80;

app.listen(PORT,()=>{
    console.log(`App listen on port ${PORT}`);
});