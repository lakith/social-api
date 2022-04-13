const logger = require("../config/logger/logger");
const userService = require('../services/user.service')
const {GeneralError, BadRequest} = require('../utils/errors')
const Constants = require('../constants/constants')
const httpStatus = require('http-status')
import { Request, Response, NextFunction } from 'express';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let userStatus = await userService.findDuplicateUsers(req.body.email)
        if(!userStatus) {
            let user = req.body
            let data = await userService.signUp(user)
            let response = {
                message: Constants.userMessage.SIGNUP_SUCCESS,
                data,
            }
            res.status(httpStatus.CREATED).send(response)
        } else {
            throw new BadRequest('Email Already exsists.')
        }
    } catch (error) {
        next(error)
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = await userService.login(req.body)
        let response = {
            message: Constants.userMessage.LOGIN_SUCCESS,
            data,
        }
        res.status(httpStatus.OK).send(response)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signUp,
    login
}