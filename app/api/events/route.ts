import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Event } from '@/database';

export async function POST(req: NextRequest) {
        try {
                await connectDB();
                const formData = await req.formData();
                let event;

                try {
                        event = Object.fromEntries(formData.entries());
                } catch (error) {
                        console.error(error);
                        return NextResponse.json({ message: 'Invalid form data' }, { status: 400 });
                }

                const createdEvent = await Event.create(event);
                return NextResponse.json(
                        { message: 'Event created successfully', event: createdEvent },
                        { status: 201 },
                );
        } catch (error) {
                console.error(error);
                return NextResponse.json(
                        {
                                message: 'Event creation failed',
                                error: error instanceof Error ? error.message : 'Unknown',
                        },
                        { status: 500 },
                );
        }
}
