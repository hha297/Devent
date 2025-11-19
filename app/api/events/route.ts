import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Event } from '@/database';
import { v2 as cloudinary } from 'cloudinary';
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

                const file = formData.get('image') as File;
                if (!file) {
                        return NextResponse.json({ message: 'Image is required' }, { status: 400 });
                }
                const arrayBuffer = await file.arrayBuffer();

                const buffer = Buffer.from(arrayBuffer);

                const uploadResult = await new Promise((resolve, reject) => {
                        cloudinary.uploader
                                .upload_stream(
                                        {
                                                resource_type: 'image',
                                                folder: 'Devent',
                                        },
                                        (error, result) => {
                                                if (error) reject(error);
                                                resolve(result);
                                        },
                                )
                                .end(buffer);
                });

                event.image = (uploadResult as { secure_url: string }).secure_url;

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

export async function GET(req: NextRequest) {
        try {
                await connectDB();
                const events = await Event.find().sort({ createdAt: -1 });
                return NextResponse.json({ events }, { status: 200 });
        } catch (error) {
                console.error(error);
                return NextResponse.json({ message: 'Failed to fetch events' }, { status: 500 });
        }
}
