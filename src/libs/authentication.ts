import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { JWT_SECRET } from '../config/config';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/UserRepository';

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    }, async (username, password, done) => {
        const userRepository = getCustomRepository(UserRepository);
        try {
            const user = await userRepository.findOne({
                where: { email: username }
            });

            if (!user) {
                done(undefined, false, { message: 'User not found' });
            }

            if (!user.checkIfUnEncryptedPasswordIsValid(password)) {
                done(undefined, false, { message: "Invalid password" });
            }

            return done(false, user);
        } catch (error) {
            done(error);
        }
    }
));

passport.use(new JwtStrategy(opts, async (payload, done) => {
    const userRepository = getCustomRepository(UserRepository);
    try {
        const user = await userRepository.findOne(payload.id);

        if (!user) {
            return done(undefined, false);
        }

        return done(false, user, payload);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const userRepository = getCustomRepository(UserRepository);
    try {
        const user = await userRepository.findOne(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});
