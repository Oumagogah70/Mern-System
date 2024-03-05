import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.model.js";
import dotenv, { config } from 'dotenv';
dotenv.config()

const opts = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_SECRET,
};

export default passport.use(
    new JwtStrategy(opts, async(jwtPayload,done)=>{
        try {
            const user = await User.findById(jwtPayload.id);
            if(user){
                return done(null, user);
            }else{
                return done(null,false)
            }
        } catch (err) {
            return done(err,false);
            
        }
    })
)