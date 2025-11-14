import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';

const spaceGrotesk = Space_Grotesk({
        variable: '--font-primary',
        subsets: ['latin'],
});

export const metadata: Metadata = {
        title: 'Devent',
        description: 'Devent is a platform for creating and managing events',
};

export default function RootLayout({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {
        return (
                <html lang="en">
                        <body className={`${spaceGrotesk.variable} antialiased min-h-screen`}>
                                <Navbar />
                                <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
                                        <LightRays
                                                raysOrigin="top-center-offset"
                                                raysColor="#5DFECA"
                                                raysSpeed={0.5}
                                                lightSpread={1}
                                                rayLength={1.4}
                                                followMouse={true}
                                                mouseInfluence={0.02}
                                                noiseAmount={0}
                                                distortion={0.01}
                                        />
                                </div>

                                <main>{children}</main>
                        </body>
                </html>
        );
}
