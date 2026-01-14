import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ThePath from '@/components/ThePath';
import TheArchives from '@/components/TheArchives';
import TheDojo from '@/components/TheDojo';
import Contact from '@/components/Contact';

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <ThePath />
                <TheArchives />
                <TheDojo />
                <Contact />
            </main>
        </>
    );
}
