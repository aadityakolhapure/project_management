import { InviteUserEmail } from "@/emails/invite-user";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { username, projectName, invitedByUsername, projectId, role } =
      await request.json();

    // Force all emails to be sent to Aaditya Kolhapure only
    const recipientEmail = "aadityakolhapure28@gmail.com";

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Using Resend's default sender
      to: recipientEmail,
      subject: "Invitation to join a project",
      react: InviteUserEmail({
        username,
        projectName,
        invitedByUsername,
        inviteLink: `${request.headers.get("origin")}/invites/${projectId}?role=${role}`,
      }),
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Invitation sent successfully to Aaditya Kolhapure", data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
