import { useNavigate } from "react-router-dom";
import { Button, InputNumber, Empty, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useGetCart, useUpdateCart, useDeleteCart, useClearCart } from "../../hooks/useCart";


export default function CartPage() {
    const navigate = useNavigate();
    
    const { data: cartItems, isLoading } = useGetCart();
    const { mutate: updateCart} = useUpdateCart();
    const { mutate: deleteCart} = useDeleteCart();
    const { mutate: clearCart} = useClearCart();

    
    const totalPrice = cartItems?.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    
    }, 0)?? 0;

    if (isLoading) {
        return (
            <div className="text-center py-20">
                Loading....
            </div>
        )
    }

    if(!cartItems || cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Empty description="Your cart is empty" />
                <Button type="primary" onClick={() => navigate("/")}>
                    Start Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    Shopping Cart
                </h1>
                <Button danger onClick={() =>clearCart()}>
                    Clear Cart
                </Button>
            </div>

            {/* List Cart Items */}
            <div className="space-y-3">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
                    >
                        {/* Product Image */}
                        <img 
                            src={'http://localhost:8080/${item.product.images[0]}'} 
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg" 
                        />

                        {/* Product Info */}
                        <div className="flex-1 space-y-1">
                            <p className="font-semibold text-gray-800">{item.product.name}</p>
                            <p className="text-sm text-gray-400">
                                Rp {item.product.price.toLocaleString("id-ID")}
                            </p>
                        </div>

                        {/* Quantity Control */}
                        <InputNumber
                            min={1}
                            max={item.product.stock}
                            value={item.quantity}
                            onChange={(val) => 
                                updateCart({ id: item.id, quantity:val ?? 1})
                            }
                        />

                        {/* Subtotal */}
                        <p className="w-28 text-right font-semibold text-gray-700">
                            Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                        </p>

                        {/* Delete */}
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => deleteCart(item.id)}  
                        />
                    </div>
                ))}
            </div>

            <Divider />

            {/* Total Price */}
            <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                <div>
                    <p className="text-gray-400 text-sm">Total</p>
                    <p className="text-2xl font-bold text-blue-600">
                        Rp {totalPrice.toLocaleString("id-ID")}
                    </p>
                </div>

                <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate("/checkout")}
                >
                    CheckOut
                </Button>
            </div>
        </div>
    );
}