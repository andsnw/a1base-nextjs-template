import { NextResponse } from 'next/server';
import { EmailService } from '@/lib/services/email-service';

// Initialize email service on the server side where env vars are available
const emailService = new EmailService();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipientEmail, userName } = body;

    if (!recipientEmail || !userName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await emailService.sendWelcomeEmail(recipientEmail, userName);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API] Failed to send welcome email:', error);
    return NextResponse.json(
      { error: 'Failed to send welcome email' },
      { status: 500 }
    );
  }
} 