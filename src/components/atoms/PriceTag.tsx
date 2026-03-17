interface PriceTagProps{
    price: number;
    className?: string;
    size: "sm" | "md" | "lg";
}

export default function PriceTag({price, className, size = "md"} : PriceTagProps){
    const formattedPrice = new Intl.NumberFormat("id-ID",{
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(price);
    
    const sizeClasses = {
        sm: "text-xs font-medium",
        md: "text-sm font-bold",
        lg: "text-xl font-extrabold",
    };

    return (
        <span
            className={`text-blue-600 ${sizeClasses[size]} ${className}`}>
            {formattedPrice}
        </span>
    )
}