import EventDetails from '@/components/EventDetails';
import { Suspense } from 'react';

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
        const slug = params.then((params) => params.slug);
        return (
                <main>
                        <Suspense fallback={<div>Loading...</div>}>
                                <EventDetails params={slug} />
                        </Suspense>
                </main>
        );
};

export default EventDetailsPage;
