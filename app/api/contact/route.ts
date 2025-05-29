import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Debug environment variables (remove after testing)
console.log("Environment Check:", {
  hasApiKey: !!process.env.SENDGRID_API_KEY,
  apiKeyLength: process.env.SENDGRID_API_KEY?.length,
  verifiedSender: process.env.VERIFIED_SENDER,
  contactEmail: process.env.CONTACT_EMAIL,
});

// Initialize SendGrid with API key
if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is not set in environment variables");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.VERIFIED_SENDER || !process.env.CONTACT_EMAIL) {
      console.error("Missing required environment variables:", {
        hasVerifiedSender: !!process.env.VERIFIED_SENDER,
        hasContactEmail: !!process.env.CONTACT_EMAIL,
      });
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create email content
    const msg = {
      to: process.env.CONTACT_EMAIL,
      from: process.env.VERIFIED_SENDER,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email
    try {
      await sgMail.send(msg);
    } catch (sendError: any) {
      console.error("SendGrid API Error:", {
        statusCode: sendError.code,
        message: sendError.message,
        response: sendError.response?.body,
        errors: sendError.response?.body?.errors,
        fullError: JSON.stringify(sendError, null, 2),
      });

      // Handle specific SendGrid errors
      if (sendError.code === 403) {
        const errorMessage =
          sendError.response?.body?.errors?.[0]?.message || "Unknown error";
        console.error("SendGrid 403 Error Details:", errorMessage);
        return NextResponse.json(
          { error: `Email service configuration error: ${errorMessage}` },
          { status: 500 }
        );
      }

      throw sendError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
