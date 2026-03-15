import { useState, useEffect } from 'react';

export interface CompanyLogoOptions {
    size?: number;
    fallbackUrl?: string;
}

export function useCompanyLogo(symbol: string | null | undefined, options?: CompanyLogoOptions) {
    const [logoUrl, setLogoUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const size = options?.size || 64;
    const fallbackUrl = options?.fallbackUrl || `/placeholder-logo.svg`;

    useEffect(() => {
        if (!symbol) {
            setLogoUrl(fallbackUrl);
            setIsLoading(false);
            return;
        }

        // Use our cached API route
        const apiUrl = `/api/logo?symbol=${encodeURIComponent(symbol)}`;

        // Set the logo URL immediately to our API endpoint
        setLogoUrl(apiUrl);
        setIsLoading(false);

        // Prefetch to check if the logo exists
        const controller = new AbortController();
        fetch(apiUrl, { method: 'HEAD', signal: controller.signal })
            .then(response => {
                if (!response.ok) {
                    setError('Logo not found');
                    setLogoUrl(fallbackUrl);
                }
            })
            .catch(err => {
                if (err.name === 'AbortError') return;
                console.error('Error checking logo:', err);
                setError(err.message);
                setLogoUrl(fallbackUrl);
            });
        return () => controller.abort();
    }, [symbol, fallbackUrl]);

    return { logoUrl, isLoading, error };
}

// Utility function to get logo URL without hook
export function getCompanyLogoUrl(symbol: string): string {
    return `/api/logo?symbol=${encodeURIComponent(symbol)}`;
}