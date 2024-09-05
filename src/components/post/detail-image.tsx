"use client";

import Image from "next/image";
import { useState } from "react";

export default function DetailImage({ src, alt }: { src: string; alt: string }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative w-4/5 aspect-square max-h-96 mx-auto rounded-xl">
      {!isImageLoaded && <div className="w-full h-full skeleton absolute z-20 "></div>}
      <Image
        className="object-contain"
        priority
        fill
        src={`${src}/public`}
        alt={alt}
        onLoad={(e) => {
          setIsImageLoaded(true);
        }}
      />
    </div>
  );
}
