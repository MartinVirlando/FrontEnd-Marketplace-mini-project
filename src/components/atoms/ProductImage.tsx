import { Image } from "antd";

interface ProductImageProps {
    src?: string;
    alt?: string;
    className?: string;
}

export default function ProductImage({ src, alt, className}: ProductImageProps){
    const defaultImage = "https://via.placeholder.com/300?text=No+Image";
    return (
        <div className={`overflow-hidden rounded-xl bg-gray-100 ${className}`}>
            <Image
                src={src}
                fallback={defaultImage}
                alt={alt}
                className="object-cover w-full rounded"
            />
        </div>
        
    );
}