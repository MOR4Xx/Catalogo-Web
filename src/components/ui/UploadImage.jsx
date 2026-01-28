'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';

export default function UploadImage({onUploadImage, imageDefault}) {
    const [image, setImage] = useState(null); // File | string | null

    useEffect(() => {
        if (imageDefault) {
            setImage(imageDefault);
        }
    }, [imageDefault]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage(file);
        onUploadImage(file)
    };


    return (
        <div className="flex flex-col gap-1">
            <label>Enviar Imagem</label>
            <div className="flex flex-row gap-3 w-full h-25">

                <div className="relative flex-1 w-full rounded-2xl border border-dashed border-default-strong flex items-center justify-center bg-neutral-secondary-medium">
                    {image ? (
                        <Image
                            src={
                                image instanceof File
                                    ? URL.createObjectURL(image)
                                    : image
                            }
                            alt="Imagem do produto"
                            fill
                            className="object-cover rounded-2xl"
                        />
                    ) : (
                        <span className="text-sm text-neutral-foreground-muted">Ainda não tem imagem</span>
                    )}
                </div>

                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col flex-2 items-center justify-center w-full rounded-2xl bg-neutral-secondary-medium border border-dashed cursor-pointer hover:bg-neutral-tertiary-medium"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021A4 4 0 1 0 7 17h2.167M12 19v-9m0 0-2 2m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm">
                            <span className="font-semibold">Clique para enviar</span> ou arraste
                        </p>
                        <p className="text-xs">
                            PNG, JPG ou GIF
                        </p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            </div>
        </div>
    );
}
