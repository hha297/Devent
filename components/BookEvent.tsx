'use client';
import React, { useState } from 'react';

const BookEvent = () => {
        const [email, setEmail] = useState('');
        const [submitted, setSubmitted] = useState(false);
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                setSubmitted(true);
                console.log(email);
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
