// src/app/api/logo/[symbol]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // Use edge runtime for better performance

export async function GET(
    request: NextRequest,
    { params }: { params: { symbol: string } }
) {
    const symbol = params.symbol.toUpperCase();
    const logoDevToken = process.env.LOGODEV_API_KEY || process.env.NEXT_PUBLIC_LOGODEV; // Use server-side token if available

    if (!logoDevToken) {
        return new NextResponse('Logo API token not configured', { status: 500 });
    }

    if (!symbol) {
        return new NextResponse('Symbol is required', { status: 400 });
    }

    try {
        const logoUrl = `https://img.logo.dev/ticker/${symbol}?token=${logoDevToken}&retina=true`;

        // Fetch the logo from logo.dev
        const response = await fetch(logoUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch logo: ${response.statusText}`);
        }

        // Get the image data
        const imageBuffer = await response.arrayBuffer();

        // Get the content type from the response
        const contentType = response.headers.get('content-type') || 'image/png';

        // Return the image with appropriate headers
        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
            },
        });
    } catch (error) {
        console.error('Error fetching logo:', error);
        return new NextResponse('Failed to fetch logo', { status: 500 });
    }
}