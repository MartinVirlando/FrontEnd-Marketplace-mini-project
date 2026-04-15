import { useNavigate } from "react-router-dom";
import { Button, Empty, Tag, Spin } from "antd";
import { useGetOrders } from "../../hooks/useOrder";


const statusColor: Record<string, string> = {
    pending: "orange",
    paid: "blue",
    shipped: "cyan",
    cancelled: "red",
};


const statusLabel: Record<string, string> = {
    pending: "Menunggu Pembayaran",
    paid: "Sudah Dibayar",
    shipped: "Dikirim",
    cancelled: "Dibatalkan",
};

export default function OrderPage() {
    const navigate = useNavigate();
    const { data: orders, isLoading } = useGetOrders();

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Spin size="large" />
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Empty description="Belum ada pesanan" />
                <Button type="primary" onClick={() => navigate("/")}>
                    Start Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold">My Order</h1>

            {orders.map((order) => (
                <div
                    key={order.id}
                    className="bg-white rounded-xl shadow-sm p-4 space-y-3"
                >
                    {/* Header Order */}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs text-gray-400">Order ID</p>
                            <p className="font-semibold">#{order.id}</p>
                        </div>
                        <Tag color={statusColor[order.status]}>
                            {statusLabel[order.status]}
                        </Tag>
                    </div>

                    {/* List Item di Order ini */}
                    <div className="space-y-2">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                                <img
                                    src={item.product.images?.[0] ? `http://localhost:8080/${item.product.images[0]}` : "/placeholder.png"}
                                    alt={item.product.name}
                                    className="w-14 h-14 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">{item.product.name}</p>
                                    <p className="text-xs text-gray-400">
                                        {item.quantity} x Rp {item.product.price.toLocaleString("id-ID")}
                                    </p>
                                </div>
                                <p className="text-sm font-bold text-blue-600">
                                    Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Alamat Pengiriman */}
                    <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded-lg">
                        <p className="font-semibold text-gray-600 mb-1">Shipping Address:</p>
                        <p>{order.shippingAddress}, {order.city}, {order.province} {order.postalCode}</p>
                    </div>

                 
                    <div className="flex justify-between items-center pt-2 border-t">
                        <div>
                            <p className="text-xs text-gray-400">Total</p>
                            <p className="font-bold text-blue-600">
                                Rp {order.totalPrice.toLocaleString("id-ID")}
                            </p>
                        </div>

                        {/* Tombol bayar  */}
                        {order.status === "pending" && (
                            <Button
                                type="primary"
                                onClick={() => navigate(`/payment/${order.id}`)}
                            >
                                Pay Now
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}