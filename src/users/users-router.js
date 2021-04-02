const express = require("express");
const path = require("path");
const UsersService = require("./users-service");
const { requireAuth } = require("../middleware/jwt-auth");
const passport = require("passport");
const MagicStrategy = require("passport-magic").Strategy;
const usersRouter = express.Router();
const jsonBodyParser = express.json();

// const strategy = new MagicStrategy(async function (user, done) {
//   const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);
//   const existingUser = await users.findOne({ issuer: user.issuer });
//   if (!existingUser) {
//     /* Create new user if doesn't exist */
//     return signup(user, userMetadata, done);
//   } else {
//     /* Login user if otherwise */
//     return login(user, done);
//   }
// });

// passport.use(strategy);

// const signup = async (user, userMetadata, done) => {
//   let newUser = {
//     issuer: user.issuer,
//     email: userMetadata.email,
//     lastLoginAt: user.claim.iat,
//   };
//   await users.insert(newUser);
//   return done(null, newUser);
// };

// const login = async (user, done) => {
//   /* Replay attack protection (https://go.magic.link/replay-attack) */
//   if (user.claim.iat <= user.lastLoginAt) {
//     return done(null, false, {
//       message: `Replay attack detected for user ${user.issuer}}.`,
//     });
//   }
//   await users.update(
//     { issuer: user.issuer },
//     { $set: { lastLoginAt: user.claim.iat } }
//   );
//   return done(null, user);
// };

// usersRouter.post("/", passport.authenticate("magic"));
// user routes - for validating username/password and storing user data //
usersRouter.post("/", jsonBodyParser, (req, res, next) => {
  const { password, user_name, full_name, email } = req.body;

  for (const field of ["full_name", "user_name", "password", "email"])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing ${field} in request body`,
      });

  const passwordError = UsersService.validatePassword(password);

  if (passwordError) return res.status(400).json({ error: passwordError });

  UsersService.hasUserWithUserName(req.app.get("db"), user_name)
    .then((hasUserWithUserName) => {
      if (hasUserWithUserName)
        return res.status(400).json({ error: `Username already taken` });

      return UsersService.hashPassword(password).then((hashedPassword) => {
        const newUser = {
          user_name,
          password: hashedPassword,
          full_name,
          email,
          date_created: "now()",
        };
        return UsersService.insertUser(req.app.get("db"), newUser).then(
          (user) => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${user.id}`))
              .json(UsersService.serializeUser(user));
          }
        );
      });
    })
    .catch(next);
});

module.exports = usersRouter;
