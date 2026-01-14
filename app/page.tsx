import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ThePath from '@/components/ThePath';
import Contact from '@/components/Contact';
import AdminFloatingButton from '@/components/AdminFloatingButton';

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <ThePath />
                <Contact />
            </main>
            <AdminFloatingButton />
        </>
    );
}
