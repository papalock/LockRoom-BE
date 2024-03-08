import * as SendGrid from '@sendgrid/mail';
export declare const sendEmailUtil: (mail: SendGrid.MailDataRequired) => Promise<[SendGrid.ClientResponse, {}]>;
