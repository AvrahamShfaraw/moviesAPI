const UserAction = require("../models/UserAction");

const limitActions = (maxActionsPerDay = 10) => async (req, res, next) => {
    try {
        const userId = req.user._id;
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

        let action = await UserAction.findOne({ userId, date: today });

        if (!action) {
            action = await UserAction.create({ userId, date: today, count: 1 });
        } else {
            if (action.count >= maxActionsPerDay) {
                return res.status(429).json({ error: `Daily limit of ${maxActionsPerDay} actions reached` });
            }
            action.count += 1;
            await action.save();
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { limitActions };
