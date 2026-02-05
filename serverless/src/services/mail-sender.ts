import { Resend } from "resend";
import type { Context } from "hono";

<<<<<<< HEAD
export const sendOtpMail = async (
  c: Context,
  payload: {
    otp: number;
    email: string;
    name: string;
  },
=======
export const sendTestMail = async (
  c: Context,
  generatedNumber: number,
  mail: string,
>>>>>>> 28bc6647b64e095069a79508175e5be856fc97ef
) => {
  const resend = new Resend(c.env.RESEND_API_KEY);

  const response = await resend.emails.send({
    from: "Kris Customs <auth@support.kris-customs.com>",
<<<<<<< HEAD
    to: [payload.email],
=======
    to: [mail],
>>>>>>> 28bc6647b64e095069a79508175e5be856fc97ef
    subject: "Kris Customs Verification",
    html: `
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000; padding: 20px; border-radius: 30px; overflow: hidden;">
        <tr>
          <td align="center">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000; color: #ffffff; font-family: sans-serif;">
              <tr>
                <td align="center" style="padding: 40px 20px 10px 20px;">
<<<<<<< HEAD
                  <p style="font-size: 18px; margin: 0;">Welcome to Kris Customs, ${payload.name}!</p>
=======
                  <p style="font-size: 18px; margin: 0;">Welcome to Kris Customs!</p>
>>>>>>> 28bc6647b64e095069a79508175e5be856fc97ef
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 10px 20px;">
                  <p style="font-size: 16px; margin: 0;">Your generated number is:</p>
<<<<<<< HEAD
                  <p style="font-weight: bold; font-size: 32px; margin: 10px 0; color: #ffffff;">${payload.otp}</p>
=======
                  <p style="font-weight: bold; font-size: 32px; margin: 10px 0; color: #ffffff;">${generatedNumber}</p>
>>>>>>> 28bc6647b64e095069a79508175e5be856fc97ef
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 10px 20px 40px 20px;">
                  <img
                    src="https://pub-01dea3c9e53e4c39bb820613a9ba55e5.r2.dev/logo.jpg"
                    width="200"
                    style="display: block; width: 200px; max-width: 100%; height: auto; border-radius: 10px;"
                    alt="logo"
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `,
  });

  return response;
};
