import { Resend } from "resend";
import { QueryEmail } from "@/components/emails/QueryEmail";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message, subject } = await request.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "Qriosity <support@qriosity.xyz>",
      to: ["myself.vinayak2@gmail.com"],
      subject: `Enquiry: ${subject}`,
      text: `You just got an Enquiry from ${name}`,
      react: QueryEmail({ name: name, email: email, message: message }),
    });

    if (error) {
      console.error(error);
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}
