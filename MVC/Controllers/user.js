const express = require('express')
const User = require('../Models/user')

const handleGetAllUsers = async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
}

const handleGetSingleUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "User not Found" })
    return res.json(user)
}

const handleUpdateUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id)
    return res.json({ message: "User successfully updated" })
}

const handleDeleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ message: "User Successfully Deleted" })
}

const handleCreateUser  = async (req, res) => {
    const body = req.body;
    if(!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle){
        return res.status(404).json({message: "All fields are required..."})
    }

    const result = await User.create({
        firstName : body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle
    })

    return res.status(201).json({message : " Newuser successfully created"})
}

module.exports = {
    handleGetAllUsers,
    handleGetSingleUser,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateUser
}