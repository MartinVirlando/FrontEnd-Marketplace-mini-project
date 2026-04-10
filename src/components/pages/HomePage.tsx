import { useState } from "react";
import { Input, Button, Pagination, Spin } from "antd";
import { useGetProducts } from "../../hooks/useProduct";
import { useCategory } from "../../hooks/useCategory";
import ProductCard from "../molecules/ProductCard";


export default function HomePage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectCategory] = useState<number | undefined>(undefined);

    const { data: products, isLoading: loadingProducts } = useGetProducts({
        search,
        categoryId: selectedCategory,
        page,
        limit: 12,
    });

    const { data: categories } = useCategory();

    return(
        <div className="space-y-6">

            {/* Untuk Search */}
            <Input.Search
                placeholder="Search for product"
                allowClear
                size="large"
                onSearch={(value) => {
                    setSearch(value);
                    setPage(1);
                }}
            />

            {/* Filter Kategori */}
            <div className="flex gap-2 flex-wrap">

                {/* Tombol reset category */}
                <Button
                    type={selectedCategory === undefined ? "primary" : "default"}
                    onClick={() =>{
                        setSelectCategory(undefined);
                        setPage(1);
                    }}
                >
                    All
                </Button>
                
                {categories?.map((cat) => (
                    <Button
                        key={cat.id}
                        type={selectedCategory === cat.id ? "primary" : "default"}
                        onClick={() =>{
                            setSelectCategory(cat.id);
                            setPage(1);
                        }}
                    >
                        {cat.name}
                    </Button>
                ))}
            </div>

            {/* Grid Produk */}
            {loadingProducts ? (
                <div className="flex justify-center py-20">
                    <Spin size="large" />
                </div>
            ): (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products?.map((product)=>(
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.images?.[0]}
                            category={product.category.name}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center pt-4">
                <Pagination
                    current={page}
                    pageSize={12}
                    total={100}
                    onChange={(p) => setPage(p)}
                />
            </div>

        </div>
    );

}