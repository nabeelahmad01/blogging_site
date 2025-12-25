import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { error: 'You are already subscribed!' },
          { status: 400 }
        );
      }
      // Reactivate subscription
      await prisma.subscriber.update({
        where: { email },
        data: { active: true },
      });
      return NextResponse.json({ message: 'Welcome back! Your subscription has been reactivated.' });
    }

    // Create new subscriber
    await prisma.subscriber.create({
      data: { email },
    });

    return NextResponse.json({ message: 'Thank you for subscribing!' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = await prisma.subscriber.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Fetch subscribers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
