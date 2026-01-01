import { Resend } from 'resend';

export async function sendVerificationEmail(email: string, token: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const verifyUrl = `https://barestore.ahmadrka.com/auth/signup/verify?token=${token}`;

  await resend.emails.send({
    from: 'BareStore <no-reply@email.barestore.ahmadrka.com>',
    to: email,
    subject: 'Verify your account',
    html: `
      <h2>Verify your email</h2>
      <p>Click the link below:</p>
      <a href="${verifyUrl}">Verify Account</a>
      <p>This link expires in 1 hour</p>
    `,
  });

  console.log('Sending success', email, token);
}
