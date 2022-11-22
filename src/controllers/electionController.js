const { sequelize, polling_unit, announced_pu_results, lga, party, Skill} = require('../models')
const CustomError = require('../errors')
const bcrypt = require('bcrypt')
const path = require('path');
const fs = require('fs');
const axios = require('axios')
const ip = require('ip')


const getIndividualPolUnitResult = async (req, res) => {

    const pu = await polling_unit.findOne({
        where: {polling_unit_number: req.params.pu_number}
    })

    if(pu === null){
        throw new CustomError.BadRequestError("Something Went Wrong")
    }

    
    /* Getting the party abbreviation of the polling unit. */
    const result = await announced_pu_results.findAll({
        where: {polling_unit_uniqueid: pu.uniqueid},
        include: { all: true, nested: true }
    })

    res.status(200).send(result)
}

const getAllLGA = async (req, res) => {
    try{
        const localGoverments = await lga.findAll({
            attributes: ['uniqueid', 'lga_id', 'lga_name']
        })

        res.status(200).send(localGoverments)
    }catch(error){
        throw new CustomError.BadRequestError("Something Went Wrong")
    }
}

const getAllPollingUnits = async (req, res) => {
    try{
        const pollingUnits = await polling_unit.findAll()

        res.status(200).send(pollingUnits)
    }catch(error){
        // throw new CustomError.BadRequestError("Something Went Wrong")
        console.log(error)
    }
}

const getAllParties = async (req, res) => {
    try{
        const parties = await party.findAll()

        res.status(200).send(parties)
    }catch(error){
        throw new CustomError.BadRequestError("Something Went Wrong")
    }
}


const getLGAPolUnitRes = async (req, res) => {
    // const data = req.body

    try{
        const localGoverment = await lga.findOne({
            where: {lga_id: req.params.lga_id}
        })

        const pu = await polling_unit.findAndCountAll({
            where: {lga_id: localGoverment.lga_id}
        })

        res.status(200).send(pu)
    }catch(error){
        throw new CustomError.BadRequestError("Something Went Wrong")
    }

}

const addResult = async (req, res) => {
    const data = req.body
    data.ip_address = ip.address()

    try{
        const addResult = await announced_pu_results.create(data)
        res.status(200).send({message: 'Registration successful', addResult})
    }catch(error){
        res.send(error)
    }
}

module.exports = { 
    getIndividualPolUnitResult, 
    getAllLGA,
    getAllParties,
    getAllPollingUnits,
    getLGAPolUnitRes,
    addResult
}
