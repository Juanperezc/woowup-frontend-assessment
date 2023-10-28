import axios from "axios";

class MailService {
  static async sendMailFailOver(
    title: string,
    text: string,
    emailAddresses: string[],
    recaptcha: string
  ) {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/send-mail-failover`, {
        title: title,
        text: text,
        emailAddresses: emailAddresses,
        "g-recaptcha-response": recaptcha,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default MailService;
