const passport = require('passport');
const {
	Strategy: JwtStrategy,
	ExtractJwt,
} = require('passport-jwt');
const { Account, Role } = require('../models');

const opts = {
	jwtFromRequest:
		ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		console.log('JWT Payload:', jwt_payload);
		try {
			const account = await Account.findByPk(
				jwt_payload.userId,
				{
					include: [
						{
							model: Role,
							attributes: ['roleName'],
						},
					],
				}
			);
			if (account) {
				return done(null, account);
			}
			return done(null, false);
		} catch (error) {
			return done(error, false);
		}
	})
);
