'use client';

import ScrollCard from './ScrollCard';

export default function ProjectGallery() {
    const projects = [
        {
            title: 'Musashi',
            description: 'The pursuit of mastery through discipline',
            image: 'https://placehold.co/400x600/2B2B2B/E6E2D3?text=Musashi',
        },
        {
            title: 'The Path',
            description: 'Finding stillness in motion',
            image: 'https://placehold.co/400x600/3A3A3A/E6E2D3?text=The+Path',
        },
        {
            title: 'Solitude',
            description: 'Strength forged in isolation',
            image: 'https://placehold.co/400x600/2B2B2B/E6E2D3?text=Solitude',
        },
        {
            title: 'Mountains',
            description: 'Standing firm against adversity',
            image: 'https://placehold.co/400x600/3A3A3A/E6E2D3?text=Mountains',
        },
        {
            title: 'Reflection',
            description: 'The mirror of self-awareness',
            image: 'https://placehold.co/400x600/2B2B2B/E6E2D3?text=Reflection',
        },
        {
            title: 'Clarity',
            description: 'Vision through emptiness',
            image: 'https://placehold.co/400x600/3A3A3A/E6E2D3?text=Clarity',
        },
    ];

    return (
        <section id="works" className="py-20 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-noto font-bold text-sumiInk mb-6">
                        The Scrolls
                    </h2>
                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-1 bg-sumiInk"></div>
                    </div>
                    <p className="text-lg md:text-xl font-garamond text-darkGrey max-w-2xl mx-auto italic">
                        Chronicles of the journey, etched in ink and intention
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <ScrollCard
                            key={index}
                            title={project.title}
                            description={project.description}
                            image={project.image}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
