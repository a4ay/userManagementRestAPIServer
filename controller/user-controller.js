const fs = require('fs');

const mongoose = require('mongoose');

const User = require('../model/user');

exports.getUsers = (req, res) => {
    User.find({}).then((users) => {
        if (!users) {

            return res.send({
                message: 'no user to fetch'
            })
        }
        return res.send(users);
    }).catch(err => {
        res.send({
            message: err.message
        })
    })

}


exports.getUser = (req, res, next) => {
    const id = req.params.id;
    User.find({ _id: id })
        .then(user => {
            if (user === []) {
                return res.send({
                    message: 'no user to fetch'
                })
            }
            res.send(user[0]);
        }).catch(err => {
            res.send({
                message: 'error'
            })
        })

}


exports.postAddUser = async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    let filePath = "";
    let fileUrl = '/uploads/profile.svg';
    if (req.file) {
        filePath = req.file.path + req.file.originalname;
        fileUrl =  filePath.substring(6);
        try{
            fs.renameSync(req.file.path, filePath);
        }catch(err){
            return res.send({message : err.message});
        }
        
    }

    const user = new User({
        name: name,
        profile: fileUrl,
        email: email,
        phone: phone,
    })
    user.save().then(user => {
        res.status(201).send(user);
    }).catch(err => {
        res.send({
            message: err.message,
        })
    })

}

exports.putEditUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        res.send({
            message: 'error',
        })
    }

    user.name = req.body.name
    user.email = req.body.email
    user.phone = req.body.phone
    let filePath = "";

    if (req.file) {
        filePath = req.file.path + req.file.originalname;
        try {
            const promise =  fs.renameSync(req.file.path, filePath);
        } catch (err) {
            return res.send({
                message: err.message,
            })
        }
        const fileUrl = filePath.substring(6);
        user.profile = fileUrl;
    }
    user.save().then(user => {
        res.status(201).send(user);
    }).catch(err => {
        res.send({
            message: err.message,
        })
    })

}

exports.deleteUser = (req,res)=>{
    const id = req.params.id;
    
    User.deleteOne({_id:id},(err)=>{
        if(err){
            return res.send({
                message : err.message,
            })
        }
        res.send({
            message : 'success',
        })
    })
}

