"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailUtil = void 0;
const SendGrid = require("@sendgrid/mail");
const sendEmailUtil = async (mail) => {
    try {
        const transport = await SendGrid.send(mail);
        console.log(`E-Mail sent to ${mail.to}`);
        return transport;
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendEmailUtil = sendEmailUtil;
//# sourceMappingURL=email.utils.js.map