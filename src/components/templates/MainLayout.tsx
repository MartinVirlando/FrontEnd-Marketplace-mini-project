import { Outlet, useNavigate, Link } from "react-router-dom";
import { Badge, Avatar, Dropdown, Button } from "antd";
import {
    ShoppingCartOutlined,
    BellOutlined,
    UserOutlined,
    MessageOutlined,
    LogoutOutlined,
    ShopOutlined,
    DashboardOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { useGetCart } from "../../hooks/useCart";
import { useGetNotif, useMarkAllAsRead } from "../../hooks/useNotification";
import type { Notification } from "../../types";

export default function MainLayout() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const { data: cartItems } = useGetCart();
    const { data: notifications } = useGetNotif();
    const { mutate: markAllAsRead } = useMarkAllAsRead();

    // Hitung notif yang belum dibaca
    const unreadCount = notifications?.filter((n: Notification) => !n.isRead).length ?? 0;

    // Hitung total item di cart
    const cartCount = cartItems?.length ?? 0;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Dropdown menu user
    const userMenuItems = [
        {
            key: "profile",
            label: "Profile",
            icon: <UserOutlined />,
            onClick: () => navigate("/profile"),
        },
        ...(user?.role === "seller"
            ? [
                  {
                      key: "seller",
                      label: "Produk Saya",
                      icon: <ShopOutlined />,
                      onClick: () => navigate("/seller/products"),
                  },
              ]
            : []),
        ...(user?.role === "admin"
            ? [
                  {
                      key: "admin",
                      label: "Dashboard Admin",
                      icon: <DashboardOutlined />,
                      onClick: () => navigate("/admin/dashboard"),
                  },
              ]
            : []),
        {
            type: "divider" as const,
        },
        {
            key: "logout",
            label: "Logout",
            icon: <LogoutOutlined />,
            danger: true,
            onClick: handleLogout,
        },
    ];

    // Dropdown notifikasi
    const notifMenuItems = [
        {
            key: "header",
            label: (
                <div className="flex justify-between items-center px-2 py-1">
                    <span className="font-bold">Notifikasi</span>
                    {unreadCount > 0 && (
                        <Button
                            type="link"
                            size="small"
                            onClick={() => markAllAsRead()}
                        >
                            Tandai semua dibaca
                        </Button>
                    )}
                </div>
            ),
            disabled: true,
        },
        ...(notifications && notifications.length > 0
            ? notifications.slice(0, 5).map((notif: Notification) => ({
                  key: notif.id,
                  label: (
                      <div className={`px-2 py-1 ${!notif.isRead ? "bg-blue-50" : ""}`}>
                          <p className="text-sm font-semibold">{notif.title}</p>
                          <p className="text-xs text-gray-400">{notif.message}</p>
                      </div>
                  ),
              }))
            : [
                  {
                      key: "empty",
                      label: (
                          <div className="text-center text-gray-400 py-4 text-sm">
                              Tidak ada notifikasi
                          </div>
                      ),
                      disabled: true,
                  },
              ]),
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-blue-600">
                        PasarUrang
                    </Link>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">

                        {/* Chat */}
                        {isAuthenticated && (
                            <Link to="/chat">
                                <MessageOutlined className="text-xl text-gray-600 hover:text-blue-500 transition-colors" />
                            </Link>
                        )}

                        {/* Notifikasi */}
                        {isAuthenticated && (
                            <Dropdown
                                menu={{ items: notifMenuItems }}
                                trigger={["click"]}
                                placement="bottomRight"
                            >
                                <Badge count={unreadCount} size="small">
                                    <BellOutlined className="text-xl text-gray-600 hover:text-blue-500 cursor-pointer transition-colors" />
                                </Badge>
                            </Dropdown>
                        )}

                        {/* Cart - hanya untuk user biasa */}
                        {isAuthenticated && user?.role === "user" && (
                            <Badge count={cartCount} size="small">
                                <ShoppingCartOutlined
                                    className="text-xl text-gray-600 hover:text-blue-500 cursor-pointer transition-colors"
                                    onClick={() => navigate("/cart")}
                                />
                            </Badge>
                        )}

                        {/* User Menu / Login */}
                        {isAuthenticated ? (
                            <Dropdown
                                menu={{ items: userMenuItems }}
                                trigger={["click"]}
                                placement="bottomRight"
                            >
                                <Avatar
                                    icon={<UserOutlined />}
                                    src={user?.avatar}
                                    className="cursor-pointer bg-blue-500"
                                />
                            </Dropdown>
                        ) : (
                            <div className="flex gap-2">
                                <Button onClick={() => navigate("/login")}>Login</Button>
                                <Button type="primary" onClick={() => navigate("/register")}>
                                    Register
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-auto">
                <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
                    © 2025 PasarUrang. All rights reserved.
                </div>
            </footer>
        </div>
    );
}