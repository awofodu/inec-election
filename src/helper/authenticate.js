const jwt = require('jsonwebtoken')
const { UUIDV4 } = require('sequelize')
const { sequelize, Users} = require('../models')


const authenticate = async (Userdata) => {
    try {
        // fetch user details from users 
        
        const [user, created] = await Users.findOrCreate({
            attributes: ['id', 'email', 'firstName', 'lastName', 'isVerified', 'twoFa_active', 'imageUrl', 'createdAt', 'updatedAt'],
            where: {email: Userdata.email},
            defaults:{
                firstName: Userdata.firstName,
                lastName:  Userdata.lastName,
                email: Userdata.email,
                password: Userdata.password ? Userdata.password : null,
                imageUrl: Userdata.imageUrl ? Userdata.imageUrl : null,
                isVerified: Userdata.isVerified ? Userdata.isVerified : false,
                accessToken: Userdata.accessToken ? Userdata.accessToken : null
            }
        })
        

        if(created){
            return user
        }

        return user

    } catch (error) {
        console.log(error)
    }
}

module.exports = authenticate