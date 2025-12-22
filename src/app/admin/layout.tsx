'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Check if admin is logged in
        const isLoggedIn = localStorage.getItem('adminLoggedIn');
        const loginTime = localStorage.getItem('adminLoginTime');

        // Session expires after 24 hours
        const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

        if (!isLoggedIn || !loginTime) {
            router.replace('/secure-admin-x7k9');
            return;
        }

        // Check if session has expired
        const timeSinceLogin = Date.now() - parseInt(loginTime);
        if (timeSinceLogin > SESSION_DURATION) {
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('adminLoginTime');
            router.replace('/secure-admin-x7k9');
            return;
        }

        setIsChecking(false);
    }, [router]);

    if (isChecking) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div className="animate-pulse" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                }} />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            {children}
        </div>
    );
}
