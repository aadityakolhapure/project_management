import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, projectName, invitedByUsername, projectId, role, email } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // Use App Password, NOT your real password!
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email || "aadityakolhapure28@gmail.com", // Default recipient
      subject: "Invitation to Join a Project",
      text: `Hi ${username},\n\n${invitedByUsername} has invited you to join the project "${projectName}".\n\nAccept the invitation here: ${request.headers.get("origin")}/invites/${projectId}?role=${role}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
