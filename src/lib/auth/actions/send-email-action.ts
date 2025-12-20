import { resend } from "@/lib/email/resend";

type SendEmailActionProps = {
  to: string,
  subject: string,
  meta: {
    description: string, 
    link: string
  }
}

export const sendEmailAction = async ({to, subject, meta}: SendEmailActionProps) => {
  const { description, link } = meta;
  
  const email = {
    from: 'Auth <noreply@auth.com>',
    to,
    subject,
    html: `
      <p>${description}</p>
      <p><a href="${link}">Click here to verify your email</a></p>
    `
  };

  await resend.emails.send(email);
}