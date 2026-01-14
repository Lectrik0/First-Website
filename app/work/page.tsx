'use client';

import Navbar from '@/components/Navbar';
import GalaxyMap from '@/components/GalaxyMap';
import BountyPoster from '@/components/BountyPoster';
import { motion } from 'framer-motion';
import { useDataStore } from '@/hooks/useDataStore';
import dynamic from 'next/dynamic';

const TheArchives = dynamic(() => import('@/components/TheArchives'), { ssr: false });
const TheCourier = dynamic(() => import('@/components/TheCourier'), { ssr: false });

export default function WorkPage() {
    const { projects } = useDataStore();

    // Sample bounty posters if no projects
    const displayProjects = projects.length > 0 ? projects : [
        {
            id: '1',
            title: 'Penetration Testing Framework',
            description: 'Automated security assessment toolkit',
            tech: ['Python', 'Bash', 'Metasploit'],
            github: '#',
            live: null,
            bounty: '฿500,000,000',
            status: 'completed' as const,
        },
        {
            id: '2',
            title: 'Vulnerability Scanner',
            description: 'Network security analysis tool',
            tech: ['Go', 'Nmap', 'Docker'],
            github: '#',
            live: '#',
            bounty: '฿300,000,000',
            status: 'active' as const,
        },
        {
            id: '3',
            title: 'CTF Challenge Platform',
            description: 'Capture The Flag training environment',
            tech: ['Node.js', 'React', 'PostgreSQL'],
            github: '#',
            live: '#',
            bounty: '฿150,000,000',
            status: 'active' as const,
        },
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">
                {/* Header */}
                <section className="px-6 lg:px-8 py-12 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h1 className="text-6xl font-playfair font-black mb-4 tracking-tight">THE DOJO</h1>
                        <p className="font-mono text-charcoal dark:text-smoke text-lg max-w-2xl">
                            "The art of digital warfare. Discipline, strategy, and execution."
                        </p>
                        <div className="w-full h-px bg-ink/20 dark:bg-bone/20 mt-8" />
                    </motion.div>
                </section>

                <GalaxyMap />

                {/* Bounty Board Section */}
                <section className="py-24 px-4 md:px-8 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12 text-center"
                        >
                            <h2 className="text-5xl font-playfair font-black text-ink dark:text-bone mb-4">
                                THE BOUNTY BOARD
                            </h2>
                            <p className="font-mono text-charcoal dark:text-smoke text-sm italic">
                                "Wanted: Dead or Alive"
                            </p>
                        </motion.div>

                        {/* Masonry Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayProjects.map((project, index) => (
                                <BountyPoster key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                <TheArchives />
                <TheCourier />
            </main>
        </>
    );
}
