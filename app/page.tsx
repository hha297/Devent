import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import events from '@/lib/constants';
import React from 'react';

const Home = () => {
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
                                        {events.map((event) => (
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
