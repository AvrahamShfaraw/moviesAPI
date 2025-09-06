const UserActionLog = require("../models/UserActionLog");

const logUserAction = async (req, res, next) => {
    try {
        if (req.user) { // only log authenticated users
            await UserActionLog.create({
                userId: req.user._id,
                userName: req.user.userName,
                method: req.method,
                route: req.originalUrl,
                ip: req.ip
            });
        }
    } catch (err) {
        console.error("Failed to log action:", err.message);
    }
    next();
};

module.exports = { logUserAction };
