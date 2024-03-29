"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.sendSMS = void 0;
const crypto_1 = require("crypto");
const twilio_1 = require("twilio");
const client = new twilio_1.Twilio('AC1d469411ed7fa7883eb5baa21604d6d5', '97cd323c36963ccccc26ea2b81f5c63a');
const sendSMS = async (phoneNumber) => {
    try {
        const otp = (0, exports.generateOTP)();
        const smsResponse = await client.messages.create({
            from: '+18145644955',
            to: '+923034697337',
            body: `Use this code ${otp}`,
        });
    }
    catch (error) {
        error.statusCode = 400;
        throw error;
    }
};
exports.sendSMS = sendSMS;
const generateOTP = () => {
    return (0, crypto_1.randomInt)(100000, 1000000);
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=otp.utils.js.map