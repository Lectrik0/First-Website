'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Shield } from 'lucide-react';

export default function AdminFloatingButton() {
    const { isAdmin } = useAdmin();
    const router = useRouter();

    if (!isAdmin) return null;

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/admin/dashboard')}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blood border-2 border-bone flex items-center justify-center shadow-lg hover:bg-blood/90 transition-all group"
            title="Admin Dashboard"
        >
            <Shield className="w-6 h-6 text-bone" />
            <span className="absolute right-full mr-3 px-3 py-1 bg-charcoal border border-bone/30 text-bone text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                SENSEI MODE
            </span>
        </motion.button>
    );
}
