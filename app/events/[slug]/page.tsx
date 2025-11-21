import BookEvent from '@/components/BookEvent';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
        return (
                <div className="flex-col-gap-2">
                        <h2>Agenda</h2>
                        <ul>
                                {agendaItems.map((item) => (
                                        <li key={item}>{item}</li>
                                ))}
                        </ul>
                </div>
        );
};

const EventTags = ({ tags }: { tags: string[] }) => {
        return (
                <div className="flex flex-row gap-1.5 flex-wrap">
                        {tags.map((tag) => (
                                <div className="pill" key={tag}>
                                        {tag}
                                </div>
                        ))}
                </div>
        );
};

const EventDetailsItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => {
        return (
                <div className="flex-row-gap-2 items-center">
                        <Image src={icon} alt={alt} width={20} height={20} />
                        <p>{label}</p>
                </div>
        );
};

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
        const { slug } = await params;
        const response = await fetch(`${BASE_URL}/api/events/${slug}`);
        const {
                event: { description, image, overview, mode, location, date, time, agenda, audience, tags, organizer },
        } = await response.json();
        const bookings = 10;
        return (
                <section id="event">
                        <div className="header">
                                <h1>Event Description</h1>
                                <p>{description}</p>
                        </div>
                        <div className="details">
                                {/* Left Side - Event Details */}
                                <div className="content">
                                        <Image
                                                src={image}
                                                alt="Event Banner"
                                                width={500}
                                                height={500}
                                                className="banner"
                                        />
                                        <section className=" flex-col-gap-2">
                                                <h2>Overview</h2>
                                                <p>{overview}</p>
                                        </section>
                                        <section className=" flex-col-gap-2">
                                                <h2>Event Details</h2>
                                                <EventDetailsItem
                                                        icon={'/icons/calendar.svg'}
                                                        alt="Date"
                                                        label={date}
                                                />
                                                <EventDetailsItem icon={'/icons/clock.svg'} alt="Time" label={time} />
                                                <EventDetailsItem
                                                        icon={'/icons/pin.svg'}
                                                        alt="Location"
                                                        label={location}
                                                />
                                                <EventDetailsItem icon={'/icons/mode.svg'} alt="Price" label={mode} />
                                                <EventDetailsItem
                                                        icon={'/icons/audience.svg'}
                                                        alt="Audience"
                                                        label={audience}
                                                />
                                        </section>
                                        <EventAgenda agendaItems={JSON.parse(agenda[0])} />

                                        <section className=" flex-col-gap-2">
                                                <h2>Organizer</h2>
                                                <p>{organizer}</p>
                                        </section>

                                        <EventTags tags={JSON.parse(tags[0])} />
                                </div>
                                {/* Right Side - Event Booking */}
                                <aside className="booking">
                                        <div className="signup-card">
                                                <h2>Book Your Spot</h2>
                                                {bookings > 0 ? (
                                                        <p className="text-sm">
                                                                Join {bookings} people who have already booked their
                                                                spot.
                                                        </p>
                                                ) : (
                                                        <p>Be the first to book your spot.</p>
                                                )}

                                                <BookEvent />
                                        </div>
                                </aside>
                        </div>
                </section>
        );
};

export default EventDetailsPage;
