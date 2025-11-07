import { Resend } from "resend";
import type { Context } from "hono";

export const sendTestMail = async (c: Context, generatedNumber: number) => {
  const resend = new Resend(c.env.RESEND_API_KEY);

  const response = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["andrew270504cska@gmail.com"],
    subject: "hello world",
    html: `
      <p>it works!</p>
      <strong>ZALUPA!!!</strong>
      <br />
      <p>Your generated number is: ${generatedNumber}</p>
      <img src="/images/logo.jpg" alt="logo" />
    `,
  });

  return response;
};
