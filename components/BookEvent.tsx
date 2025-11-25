'use client';
import { createBooking } from '@/lib/actions/booking.action';
import posthog from 'posthog-js';
import React, { useState } from 'react';

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
        const [email, setEmail] = useState('');
        const [submitted, setSubmitted] = useState(false);
        const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                const { success } = await createBooking({ eventId, slug, email });

                if (success) {
                        setSubmitted(true);

                        posthog.capture('event_booked', { eventId, slug, email });
                } else {
                        console.error('Booking failed');
                        posthog.captureException('Booking failed');
                }
        };

        return (
                <div id="book-event">
                        {submitted ? (
                                <p className="text-sm text-center">
                                        Thank you for signing up. We will send you an email confirmation shortly.
                                </p>
                        ) : (
                                <form onSubmit={handleSubmit}>
                                        <div>
                                                <label htmlFor="email">Email Address</label>
                                                <input
                                                        type="email"
                                                        id="email"
                                                        placeholder="Enter your email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                />
                                        </div>
                                        <button className="button-submit" type="submit">
                                                Submit
                                        </button>
                                </form>
                        )}
                </div>
        );
};

export default BookEvent;
