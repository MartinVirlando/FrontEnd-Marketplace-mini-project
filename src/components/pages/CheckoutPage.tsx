import { Form, Input, Button, Divider, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetCart, useClearCart } from "../../hooks/useCart";
import { useCreateOrder } from "../../hooks/useOrder";
import type { OrderRequest } from "../../types";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const { data: cartItems, isLoading } = useGetCart();
    const { mutate: createOrder, isPending } = useCreateOrder();
    const { mutate: clearCart } = useClearCart();

    // Total harga
    const totalPrice = cartItems?.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0) ?? 0;

    const handleSubmit = (values: {
        shippingAddress: string;
        city: string;
        province: string;
        postalCode: string;
    }) => {
        if (!cartItems || cartItems.length === 0) return;

        const orderData: OrderRequest = {
            items: cartItems,
            shippingAddress: values.shippingAddress,
            city: values.city,
            province: values.province,
            postalCode: values.postalCode,
        };

        createOrder(orderData, {
            onSuccess: (data) => {
                clearCart(); 
                navigate(`/payment/${data.orderId}`); 
            },
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Spin size="large" />
            </div>
        );
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="text-center py-20 text-gray-400">
                Your cart is empty
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Form Alamat */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="font-semibold mb-4">Shipping Address</h2>
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item
                            name="shippingAddress"
                            label="Alamat Lengkap"
                            rules={[{ required: true, message: "Alamat tidak boleh kosong" }]}
                        >
                            <Input.TextArea rows={3} placeholder="Jl. Contoh No. 123" />
                        </Form.Item>

                        <Form.Item
                            name="city"
                            label="Kota"
                            rules={[{ required: true, message: "Kota tidak boleh kosong" }]}
                        >
                            <Input placeholder="Jakarta" />
                        </Form.Item>

                        <Form.Item
                            name="province"
                            label="Provinsi"
                            rules={[{ required: true, message: "Provinsi tidak boleh kosong" }]}
                        >
                            <Input placeholder="DKI Jakarta" />
                        </Form.Item>

                        <Form.Item
                            name="postalCode"
                            label="Kode Pos"
                            rules={[{ required: true, message: "Kode pos tidak boleh kosong" }]}
                        >
                            <Input placeholder="12345" />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isPending}
                            block
                            size="large"
                        >
                            Place an Order
                        </Button>
                    </Form>
                </div>

                {/* Ringkasan Order */}
                <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
                    <h2 className="font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-3">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                    {item.product.name} x{item.quantity}
                                </span>
                                <span className="font-semibold">
                                    Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Divider />

                    <div className="flex justify-between">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-blue-600">
                            Rp {totalPrice.toLocaleString("id-ID")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}