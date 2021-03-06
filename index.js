require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users')
const tagsRoutes = require('./routes/tags')
const peopleRoutes = require('./routes/people')
const groupsRoutes = require('./routes/groups')
const branchesRoutes = require('./routes/branches')

// create express app
const app = express();

//use body-parser:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// routes: 
app.use('/users', userRoutes)
app.use('/tags', tagsRoutes)
app.use('/people', peopleRoutes)
app.use('/groups', groupsRoutes)
app.use('/branches', branchesRoutes)


app.get('/', (req, res, next) => {
    res.send('app working fine')
})

// create port 
const port = process.env.PORT || 3000
// starting the server 
app.listen(port, () => {
    console.log('server running on: ' + port)
});
