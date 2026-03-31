import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, InputNumber, Rate, Form, Input, Divider, Spin, Tag, Avatar } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useGetProductById } from "../../hooks/useProduct";
import { useGetReview, useCreateReview } from "../../hooks/useReview";
import { useCreateCart } from "../../hooks/useCart";
import { useAuth } from "../../context/AuthContext";

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const productId = Number(id);

    // Fetch data produk dan review
    const { data: product, isLoading } = useGetProductById(productId);
    const { data: reviews } = useGetReview(productId);

    // Mutations
    const { mutate: addToCart, isPending: addingToCart } = useCreateCart();
    const { mutate: submitReview, isPending: submittingReview } = useCreateReview();

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        addToCart({ productId, quantity });
    };

    const handleSubmitReview = (values: { rating: number; comment: string }) => {
        submitReview({ productId, data: values });
    };

    // Cek apakah user sudah pernah review produk ini
    const alreadyReviewed = reviews?.some((r) => r.user.id === user?.id);

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Spin size="large" />
            </div>
        );
    }

    if (!product) {
        return <div className="text-center py-20 text-gray-400">Product not found</div>;
    }

    return (
        <div className="space-y-8">

            {/* Bagian Atas: Gambar + Info Produk */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Gambar Produk */}
                <div className="space-y-3">
                    <img
                        src={`http://localhost:8080/${product.images[selectedImage]}`}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-2xl"
                    />
                    {/* Thumbnail gambar lainnya */}
                    {product.images.length > 1 && (
                        <div className="flex gap-2">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:8080/${img}`}
                                    alt={`thumb-${index}`}
                                    className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                                        selectedImage === index ? "border-blue-500" : "border-transparent"
                                    }`}
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Produk */}
                <div className="space-y-4">
                    <div>
                        <Tag color="blue">{product.category}</Tag>
                        <h1 className="text-2xl font-bold text-gray-800 mt-2">{product.name}</h1>
                    </div>

                    <p className="text-3xl font-bold text-blue-600">
                        Rp {product.price.toLocaleString("id-ID")}
                    </p>

                    <p className="text-gray-600">{product.description}</p>

                    <p className="text-sm text-gray-400">Stock: {product.stock}</p>

                    {/* Info Seller */}
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Avatar icon={<UserOutlined />} src={product.seller.avatar} />
                        <div>
                            <p className="text-xs text-gray-400">Sold by</p>
                            <p className="text-sm font-semibold">{product.seller.name}</p>
                        </div>
                    </div>

                    {/* Quantity + Add to Cart */}
                    <div className="flex items-center gap-3">
                        <InputNumber
                            min={1}
                            max={product.stock}
                            value={quantity}
                            onChange={(val) => setQuantity(val ?? 1)}
                        />
                        <Button
                            type="primary"
                            size="large"
                            icon={<ShoppingCartOutlined />}
                            loading={addingToCart}
                            disabled={product.stock === 0}
                            onClick={handleAddToCart}
                            className="flex-1"
                        >
                            {product.stock === 0 ? "Stok Habis" : "Tambah ke Keranjang"}
                        </Button>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Bagian Review */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold">Buyer Review</h2>

                {/* Form Review  */}
                {isAuthenticated && user?.id !== product.sellerId && !alreadyReviewed && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <h3 className="font-semibold mb-3">Write Review</h3>
                        <Form onFinish={handleSubmitReview} layout="vertical">
                            <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
                                <Rate />
                            </Form.Item>
                            <Form.Item name="comment" label="Komentar" rules={[{ required: true }]}>
                                <Input.TextArea rows={3} placeholder="Bagaimana pengalaman kamu?" />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" loading={submittingReview}>
                                Send Review
                            </Button>
                        </Form>
                    </div>
                )}

                {/* List Review */}
                {reviews && reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="p-4 border rounded-xl space-y-1">
                                <div className="flex items-center gap-2">
                                    <Avatar icon={<UserOutlined />} src={review.user.avatar} size="small" />
                                    <span className="font-semibold text-sm">{review.user.name}</span>
                                </div>
                                <Rate disabled value={review.rating} className="text-sm" />
                                <p className="text-gray-600 text-sm">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm">There are no reviews for this product yet</p>
                )}
            </div>

        </div>
    );
}