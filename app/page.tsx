import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { IEvent } from '@/database/event.model';
import { cacheLife } from 'next/cache';

import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const Home = async () => {
        'use cache';
        cacheLife('hours');
        const response = await fetch(`${BASE_URL}/api/events`);
        const { events } = await response.json();
        if (!events) {
                notFound();
        }

        return (
                <section>
                        <h1 className="text-center">
                                The Hub For Every Dev <br /> Event You Can&apos;t Miss
                        </h1>
                        <p className="text-center mt-5">
                                Discover, book, and attend events tailored for developers and tech enthusiasts. From
                                workshops and hackathons to conferences and meetups, find the perfect event for your
                                skills and interests.
                        </p>
                        <ExploreBtn />

                        <div className="mt-20 space-y-7">
                                <h3>Featured Events</h3>
                                <ul className="events">
                                        {events &&
                                                events.length > 0 &&
                                                events.map((event: IEvent) => (
                                                        <li key={event.title}>
                                                                <EventCard {...event} />
                                                        </li>
                                                ))}
                                </ul>
                        </div>
                </section>
        );
};

export default Home;
