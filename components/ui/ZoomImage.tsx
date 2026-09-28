import Image from "next/image";

export default function ZoomImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  overlay = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: boolean;
}) {
  return (
    <div className={`group/zoom relative overflow-hidden bg-ivory-300 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-1500 ease-luxe group-hover/zoom:scale-110 group-hover:scale-110"
      />
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-espresso-600/80 via-espresso-600/10 to-transparent" />}
    </div>
  );
}
