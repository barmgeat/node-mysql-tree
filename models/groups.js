const sql = require('../db/connection')

/**
 * save group 
 * get all groups getAll
 * get group by id getById
 * add branch group branchesGroupsInsert
 * remove branch group removeBranchGroup
 */
module.exports = class Group {
    constructor(data) {

        this.save = (callback) => {
            sql.query("INSERT INTO groups SET ?", data, function (err, res) {
                if (err) return callback(err)
                return callback(null, { id: res.insertId, ...data })
            });

        }
    }


    static getAll = (userId, callback) => {
        sql.query("SELECT * FROM groups WHERE user=?", [userId], function (err, res, fields) {
            if (err) return callback(err);
            else return callback(null, res)
        });
    }

    static getById = (id, callback) => {
        const query = "SELECT * FROM groups WHERE id = ? AND user = ? "
        sql.query(query, [id], (err, result) => {
            callback(err, result)
        })
    }

    static updateNameDescById = (id, name, description, callback) => {
        const query = "UPDATE groups SET name = ?, description = ? WHERE id = ?"
        sql.query(query, [name, description, id], (err, result) => {
            callback(err, result)
        })
    }

    // add barnch group:
    static branchesGroupsInsert = (branchID, groupID, callback) => {
        const query = 'INSERT INTO branches_groups (branchID, groupID) VALUES (?, ?)'
        const arrData = [branchID, groupID]
        sql.query(query, arrData, (err, result) => {
            callback(err, result)
        })
    }

    // remove barnch group:
    static removeBranchGroup = (branchID, groupID, callback) => {
        const query = "DELETE FROM branches_groups WHERE `branchID` = ? AND `groupID` = ?"
        const arrData = [branchID, groupID]
        sql.query(query, arrData, (err, result) => {
            return callback(err, result)
        })
    }

    //todo get all group branches

}