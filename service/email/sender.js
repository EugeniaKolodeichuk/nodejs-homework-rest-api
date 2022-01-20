import sendgrid from "@sendgrid/mail";

class SenderSendgrid {
  async send(message) {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    return await sendgrid.send({
      ...message,
      from: process.env.SENDER_SENDGRID,
    });
  }
}

export { SenderSendgrid };
