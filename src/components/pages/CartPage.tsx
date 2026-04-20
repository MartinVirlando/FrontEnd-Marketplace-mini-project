import { useNavigate } from "react-router-dom";
import { Button, InputNumber, Empty, Divider, Checkbox} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useGetCart, useUpdateCart, useDeleteCart, useClearCart } from "../../hooks/useCart";
import { useState } from "react";



export default function CartPage() {
    const navigate = useNavigate();
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    
    const { data: cartItems, isLoading } = useGetCart();
    const { mutate: updateCart} = useUpdateCart();
    const { mutate: deleteCart} = useDeleteCart();
    const { mutate: clearCart} = useClearCart();

    const allIds = cartItems?.map((item) => item.id) ?? [];
    const isAllChecked = allIds.length > 0 && allIds.every((id) => selectedIds.has(id));
    const isIndeterminate = allIds.some((id) => selectedIds.has(id)) && !isAllChecked;
    const selectedItems = cartItems?.filter((item) => selectedIds.has(item.id)) ?? [];

    
    const totalPrice = selectedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const handleCheckAll = () => {
    if (isAllChecked) setSelectedIds(new Set());
    else setSelectedIds(new Set(allIds));
    };

    const handleCheck = (id: number) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const handleCheckout = () => {
        if (selectedItems.length === 0) return;
        navigate("/checkout", { state: { selectedItems } });
    };


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
                <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-sm">
                    <Checkbox checked={isAllChecked} indeterminate={isIndeterminate} onChange={handleCheckAll}>
                        Pilih Semua ({allIds.length} item)
                    </Checkbox>
                </div>
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
                        <Checkbox checked={selectedIds.has(item.id)} onChange={() => handleCheck(item.id)} />
                            
                        {/* Product Image */}
                        <img 
                            src={item.product.images?.[0] ? `http://localhost:8080/${item.product.images[0]}` : "/placeholder.png"}
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
                    <p className="text-gray-400 text-sm">Total ({selectedItems.length} item dipilih)</p>
                    <p className="text-2xl font-bold text-blue-600">
                        Rp {totalPrice.toLocaleString("id-ID")}
                    </p>
                </div>

                <Button type="primary" size="large" disabled={selectedItems.length === 0} onClick={handleCheckout}>
                    Checkout ({selectedItems.length})
                </Button>
            </div>
        </div>
    );
}