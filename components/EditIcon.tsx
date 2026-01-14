'use client';

import { motion } from 'framer-motion';
import { Edit } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

interface EditIconProps {
    onClick: () => void;
}

export default function EditIcon({ onClick }: EditIconProps) {
    const { isAdmin } = useAdmin();

    if (!isAdmin) return null;

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className="absolute top-2 right-2 p-2 bg-blood/80 text-bone border border-bone/30 hover:bg-blood transition-all z-50"
            title="Edit (Admin)"
        >
            <Edit className="w-4 h-4" />
        </motion.button>
    );
}
