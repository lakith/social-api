import passportJwt from 'passport-jwt'
import fs from 'fs'
import path from 'path'
import passport from 'passport'
import {findUserById} from '../../services/user.service'

const pathToKey = path.join(__dirname, '../../lib', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8')

/****
 * - At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
 * - For the 'secretOrKey' propertry either you can pass a symetric key, a secret stored in a env or an asymmetric key.
 * - But in here since we are using RSA 256 to issue and verify jwts, we are passing our public key.
 * - And the reason to pass the public rather than the private, because in here we are configuring the verify peace.
 * - With Digital signatures we sign the issuence with private key and verify the identity with the public key.
 * - Thatz why we are passing the public key,
 * - passport is the verification step of this process. 
 * ****/
 const options = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY, 
    algorithms: ['RS256']
};

const strategy = new passportJwt.Strategy(options, async (jwt_payload, done) => {
    try{
        const user = await findUserById(jwt_payload.sub)
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch(error) {
        return done(error, false);
    }
})

export default (passport) => {
    passport.use(strategy)
}