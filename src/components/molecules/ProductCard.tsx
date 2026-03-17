import ProductImage from "../atoms/ProductImage";
import PriceTag from "../atoms/PriceTag";
import { Card } from "antd";
import { Navigate, useNavigate } from "react-router-dom";


interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
    category?: string;
    onClick?: () => void;
}

export default function ProductCard({
    id,
    name,
    price,
    imageUrl,
    category,
    onClick,
}: ProductCardProps){
    const navigate = useNavigate();    
    return (
        <Card
            hoverable
            className="overflow-hidden rounded-2xl border-none shadow-sm transition-all hover:shadow-md"
            cover={
                <ProductImage
                    src={imageUrl}
                    alt={name}
                    className="h-48 w-full"
                />
            }
            onClick={() => navigate(`/product/${id}`)}
        >

            <div className="space-y-2">

                {/* Kategori */}
                {category && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {category}
                    </span>
                )}

                {/* Nama */}
                <h3 className="line-clamp-2 h-10 text-sm font-semibold text-gray-800">
                    {name}
                </h3>

                {/* Harga */}
                <div className="pt-1">
                    <PriceTag price={price} size="md" className="text-blue-600" />
                </div>
            </div>
        </Card>
    );
}