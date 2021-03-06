const Person = require('../models/people')
/**
 * add to add new person
 * edit to edit one tag required new fname and lname and the person id
 * get all to get all people
 */
const add = ('/', (req, res) => {
    if (!req.body.fname) return res.status(400).json({ error: { message: 'the first name is required' } })

    // extract the data
    const data = req.body
    data.user = req.user.id

    // create person object: 
    const person = new Person(data)

    // save person to the database :
    person.save((err, result) => {
        if (err) return res.status(500).json(err)
        return res.json(result)
    })
})

const edit = ('/', (req, res) => {
    if (!req.body.fname || !req.body.id) return res.status(400).json({ error: { message: 'first name and id is required' } })
    // update person name by id function 
    Person.updateNameById(req.body.id, req.body.fname, req.body.lname, (err, result) => {
        if (err) return res.status(500).json(err)
        if (result.affectedRows > 0) return res.json({ edited: true, fname: req.body.fname, lname: req.body.lname })
        return res.json({ edited: false, msg: 'person cannot be found' })
    })
})

const getAll = ('/', (req, res) => {
    Person.getAll(req.user.id, (err, result) => {
        if (err) return res.status(500).json(err)
        res.json(result)
    })
})

module.exports = {
    add,
    edit,
    getAll
}