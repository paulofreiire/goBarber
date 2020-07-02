import Notification from "../schemas/Notification";
import User from "../models/User";

class NotificationController {
    async index(req, res) {
        const isProvider = await User.findOne({
            where: {id: req.userId, provider: true}
        });

        if (!isProvider) {
            return res.status(401).json({error: 'Only provider can load notifications'})
        }

        return res.json();
    }
}

export default new NotificationController();
