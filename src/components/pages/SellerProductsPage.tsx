import { useState } from "react";
import { Button, Table, Tag, Modal, Form, Input, InputNumber, Select, Upload, Space, Spin } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useGetProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "../../hooks/useProduct";
import { useCategory } from "../../hooks/useCategory";
import { useAuth } from "../../context/AuthContext";
import type { Product } from "../../types";

export default function SellerProductsPage() {
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [form] = Form.useForm();

    const { data: products, isLoading } = useGetProducts();
    const { data: categories } = useCategory();
    const { mutate: createProduct, isPending: creating } = useCreateProduct();
    const { mutate: updateProduct, isPending: updating } = useUpdateProduct();
    const { mutate: deleteProduct } = useDeleteProduct();

    // Filter produk
    const myProducts = products?.filter((p) => p.sellerId === user?.id);

    const handleOpenCreate = () => {
        setEditingProduct(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleOpenEdit = (product: Product) => {
        setEditingProduct(product);
        form.setFieldsValue({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (values: any) => {
        if (editingProduct) {
            updateProduct(
                { id: editingProduct.id, data: values },
                { onSuccess: () => setIsModalOpen(false) }
            );
        } else {
            createProduct(
                { ...values, images: [] },
                { onSuccess: () => setIsModalOpen(false) }
            );
        }
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: "Hapus Produk",
            content: "Apakah kamu yakin ingin menghapus produk ini?",
            okText: "Hapus",
            okType: "danger",
            cancelText: "Batal",
            onOk: () => deleteProduct(id),
        });
    };

    const statusColor: Record<string, string> = {
        pending: "orange",
        approved: "green",
        rejected: "red",
        hide: "gray",
        ready: "blue",
        sold: "purple",
    };

    const columns = [
        {
            title: "Produk",
            dataIndex: "name",
            key: "name",
            render: (name: string, record: Product) => (
                <div className="flex items-center gap-3">
                    <img
                        src={`http://localhost:8080/${record.images[0]}`}
                        alt={name}
                        className="w-12 h-12 object-cover rounded-lg"
                    />
                    <span className="font-semibold">{name}</span>
                </div>
            ),
        },
        {
            title: "Harga",
            dataIndex: "price",
            key: "price",
            render: (price: number) => `Rp ${price.toLocaleString("id-ID")}`,
        },
        {
            title: "Stok",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={statusColor[status]}>{status.toUpperCase()}</Tag>
            ),
        },
        {
            title: "Aksi",
            key: "action",
            render: (_: any, record: Product) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleOpenEdit(record)}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Product</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
                    Add Product
                </Button>
            </div>

            <Table
                dataSource={myProducts}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />

            {/* Modal Create / Edit Produk */}
            <Modal
                title={editingProduct ? "Edit Produk" : "Tambah Produk"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="name" label="Nama Produk" rules={[{ required: true }]}>
                        <Input placeholder="Nama produk" />
                    </Form.Item>

                    <Form.Item name="description" label="Deskripsi" rules={[{ required: true }]}>
                        <Input.TextArea rows={3} placeholder="Deskripsi produk" />
                    </Form.Item>

                    <Form.Item name="price" label="Harga" rules={[{ required: true }]}>
                        <InputNumber
                            className="w-full"
                            min={0}
                            formatter={(val) => `Rp ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            placeholder="Harga produk"
                        />
                    </Form.Item>

                    <Form.Item name="stock" label="Stok" rules={[{ required: true }]}>
                        <InputNumber className="w-full" min={0} placeholder="Jumlah stok" />
                    </Form.Item>

                    <Form.Item name="categoryId" label="Kategori" rules={[{ required: true }]}>
                        <Select placeholder="Pilih kategori">
                            {categories?.map((cat) => (
                                <Select.Option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={creating || updating}
                        >
                            {editingProduct ? "Simpan Perubahan" : "Tambah Produk"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}