'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageLoading({ product, fill }) {
    const [loading, setLoading] = useState(true);

    return fill ? (
        <Image
            src={product.image}
            fill
            alt={product.title}
            className={`object-cover duration-700 ease-in-out w-full h-[250px] ${
                loading
                    ? 'scale-110 blur-2xl grayscale'
                    : 'scale-100 blur-0 grayscale-0'
            }`}
            onLoadingComplete={() => setLoading(false)}
        />
    ) : (
        <Image
            src={product.image}
            width={400}
            height={400}
            alt={product.title}
            className={`object-cover duration-700 ease-in-out w-full h-[250px] ${
                loading
                    ? 'scale-110 blur-2xl grayscale'
                    : 'scale-100 blur-0 grayscale-0'
            }`}
            onLoadingComplete={() => setLoading(false)}
        />
    );
}