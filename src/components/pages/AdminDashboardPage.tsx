import { Tabs, Card, Table, Button, Tag, Modal, Spin, Statistic } from "antd";
import { UserOutlined, ShoppingOutlined, CheckOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetDashboard, useGetPendingProduct, useApproveProduct, useApproveAllProducts, useRejectProduct, useGetUser, useDeleteUser } from "../../hooks/useAdmin";
import type { Product, User } from "../../types";


export default function AdminDashboardPage() {
    const { data: stats, isLoading: loadingStats } = useGetDashboard();
    const { data: pendingProducts, isLoading: loadingPending } = useGetPendingProduct();
    const { data: users, isLoading: loadingUsers } = useGetUser();

    const { mutate: approveAllProducts } = useApproveAllProducts();
    const { mutate: approveProduct } = useApproveProduct();
    const { mutate: rejectProduct } = useRejectProduct();
    const { mutate: deleteUser } = useDeleteUser();

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: "Hapus User",
            content: "Apakah kamu yakin ingin menghapus user ini?",
            okText: "Hapus",
            okType: "danger",
            cancelText: "Batal",
            onOk: () => deleteUser(id),
        });
    };

    const handleReject = (id: number) => {
        Modal.confirm({
            title: "Tolak Produk",
            content: "Apakah kamu yakin ingin menolak produk ini?",
            okText: "Tolak",
            okType: "danger",
            cancelText: "Batal",
            onOk: () => rejectProduct(id),
        });
    };

    // Kolom tabel pending products
    const productColumns = [
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
                    <div>
                        <p className="font-semibold">{name}</p>
                        <p className="text-xs text-gray-400">{record.seller.name}</p>
                    </div>
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
        title: "Kategori", 
        dataIndex: "category", 
        key: "category",
        render: (category: any) => category?.name || "-"
    },
        {
            title: "Aksi",
            key: "action",
            render: (_: any, record: Product) => (
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        onClick={() => approveProduct(record.id)}
                    >
                        Approve
                    </Button>
                    <Button
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => handleReject(record.id)}
                    >
                        Reject
                    </Button>
                </div>
            ),
        },
    ];

    // Kolom tabel users
    const userColumns = [
        {
            title: "Nama",
            dataIndex: "name",
            key: "name",
            render: (name: string, record: User) => (
                <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs text-gray-400">{record.email}</p>
                </div>
            ),
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role: string) => (
                <Tag color={role === "admin" ? "red" : role === "seller" ? "blue" : "green"}>
                    {role.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "No. HP",
            dataIndex: "phone",
            key: "phone",
            render: (phone: string) => phone || "-",
        },
        {
            title: "Aksi",
            key: "action",
            render: (_: any, record: User) => (
            
                record.role !== "admin" && (
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    />
                )
            ),
        },
    ];

    if (loadingStats) {
        return (
            <div className="flex justify-center py-20">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card>
                    <Statistic
                        title="Total Transaksi"
                        value={stats?.totalTransactions ?? 0}
                        prefix={<ShoppingOutlined />}
                    />
                </Card>
                <Card>
                    <Statistic
                        title="Total User"
                        value={stats?.totalUsers ?? 0}
                        prefix={<UserOutlined />}
                    />
                </Card>
                <Card>
                    <Statistic
                        title="Total Produk"
                        value={stats?.totalProducts ?? 0}
                        prefix={<ShoppingOutlined />}
                    />
                </Card>
            </div>

            {/* Tabs */}
            <Tabs
                
                defaultActiveKey="pending"
                items={[
                    {
                        key: "pending",
                        label: `Produk Pending (${pendingProducts?.length ?? 0})`,
                        children: (
                            <div>
                                <div className="flex justify-end mb-3">
                                    <Button
                                        type="primary"
                                        icon={<CheckOutlined />}
                                        disabled={!pendingProducts?.length}
                                        onClick={() => Modal.confirm({
                                            title: "Setujui Semua Produk",
                                            content: `Setujui ${pendingProducts?.length} produk sekaligus?`,
                                            okText: "Setujui Semua",
                                            onOk: () => approveAllProducts(),
                                        })}
                                    >
                                        Approve All
                                    </Button>
                                </div>
                            
                                <Table
                                    dataSource={pendingProducts}
                                    columns={productColumns}
                                    rowKey="id"
                                    loading={loadingPending}
                                    pagination={{ pageSize: 10 }}
                                />

                            </div>

                            
                        ),
                    },
                    {
                        key: "users",
                        label: `Manajemen User (${users?.length ?? 0})`,
                        children: (
                            <Table
                                dataSource={users}
                                columns={userColumns}
                                rowKey="id"
                                loading={loadingUsers}
                                pagination={{ pageSize: 10 }}
                            />
                        ),
                    },
                ]}
            />
        </div>
    );
}