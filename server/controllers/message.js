const express = require('express');
const msgModel = require('../models/message');

const getMessages = async (req, res) => {
    const messages = await msgModel.find();
    try {
        res.status(200).json({ msg: messages })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

const getMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await msgModel.findById(id)
        res.status(201).json({ msg: message })
    } catch (error) {

    }
}

const postMessage = async (req, res) => {
    const { message } = req.body;
    const newMessage = new msgModel({ message })
    try {
        await newMessage.save();
        res.status(201).json({ msg: newMessage })
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        await msgModel.findByIdAndDelete(id)
        res.status(200).json({ msg: "removed message successfully" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const deleteMessages = async (req, res) => {
    try {
        await msgModel.deleteMany()
        res.status(200).json({ msg: 'deleted all successfully' })
    } catch (error) {
        res.status(400).json({ msg: error.message })

    }
}


module.exports = {
    getMessages,
    postMessage,
    deleteMessage,
    getMessage,
    deleteMessages
}