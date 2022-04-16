import { Request, Response, NextFunction } from 'express';
import {findDuplicateUsers, loginUser, signUpUser} from '../services/user.service'
import Constants from '../constants/constants'
import httpStatus from 'http-status'
import {GeneralError, BadRequest} from '../utils/errors'


export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let userStatus = await findDuplicateUsers(req.body.email)
        if(!userStatus) {
            let user = req.body
            let data = await signUpUser(user)
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = await loginUser(req.body)
        let response = {
            message: "Success",
            data,
        }
        res.status(httpStatus.OK).send(response)
    } catch (error) {
        next(error)
    }
}