'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import { Save, Eye, ArrowLeft, FileText } from 'lucide-react';

export default function MarkdownEditor() {
    const { isAdmin } = useAdmin();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [tags, setTags] = useState('');

    useEffect(() => {
        if (!isAdmin) {
            router.push('/admin');
        }
    }, [isAdmin, router]);

    const handleSave = () => {
        // In production, save to database
        console.log('Saving:', { title, content, tags });
        alert('Post saved successfully!');
    };

    if (!isAdmin) return null;

    return (
        <div className="min-h-screen bg-void text-bone">
            {/* Header */}
            <div className="border-b border-bone/20 bg-charcoal/30 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/admin/dashboard')}
                            className="p-2 border border-bone/30 hover:bg-bone hover:text-void transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-smoke" />
                            <h1 className="text-xl font-cinzel font-bold">Markdown Editor</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className={`flex items-center gap-2 px-4 py-2 border-2 font-mono text-sm transition-all ${showPreview
                                    ? 'border-bone bg-bone text-void'
                                    : 'border-bone/30 hover:border-bone'
                                }`}
                        >
                            <Eye className="w-4 h-4" />
                            {showPreview ? 'Edit' : 'Preview'}
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-2 bg-bone text-void font-cinzel font-bold uppercase hover:bg-smoke transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Save
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                {!showPreview ? (
                    // Editor Mode
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Title */}
                        <div>
                            <label className="block text-xs font-mono text-smoke uppercase tracking-wider mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 bg-charcoal/50 border-2 border-bone/20 focus:border-bone text-bone font-cinzel text-2xl font-bold outline-none transition-colors"
                                placeholder="Enter post title..."
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-xs font-mono text-smoke uppercase tracking-wider mb-2">
                                Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-4 py-3 bg-charcoal/50 border-2 border-bone/20 focus:border-bone text-bone font-mono text-sm outline-none transition-colors"
                                placeholder="security, pentesting, ctf"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-xs font-mono text-smoke uppercase tracking-wider mb-2">
                                Content (Markdown)
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-[600px] px-4 py-3 bg-charcoal/50 border-2 border-bone/20 focus:border-bone text-bone font-mono text-sm outline-none transition-colors resize-none"
                                placeholder="# Your markdown content here...

## Section Header

Write your content using markdown syntax.

- Bullet point
- Another point

```javascript
const code = 'example';
```"
                            />
                        </div>

                        {/* Helper Text */}
                        <div className="p-4 border border-bone/20 bg-charcoal/30">
                            <p className="text-xs font-mono text-smoke">
                                <span className="text-bone font-bold">Markdown Supported:</span> Headers (# ## ###), Bold (**text**), Italic (*text*), Code (`code`), Links ([text](url)), Lists (- item), Code blocks (```lang)
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    // Preview Mode
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="prose prose-invert max-w-none"
                    >
                        <h1 className="text-5xl font-cinzel font-black text-bone mb-4">
                            {title || 'Untitled Post'}
                        </h1>

                        {tags && (
                            <div className="flex gap-2 mb-8">
                                {tags.split(',').map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs font-mono border border-bone/20 text-smoke"
                                    >
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="bg-charcoal/30 border border-bone/20 p-8">
                            <div className="whitespace-pre-wrap font-playfair text-bone leading-relaxed">
                                {content || 'No content yet. Start writing in edit mode.'}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
