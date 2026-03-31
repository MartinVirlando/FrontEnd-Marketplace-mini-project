import { useEffect } from "react";
import { Button, Form, Input, Avatar, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useGetMe, useUpdateProfile } from "../../hooks/useAuth";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
    const [form] = Form.useForm();
    const { login, user: contextUser } = useAuth();

    const { data: user, isLoading } = useGetMe();
    const { mutate: updateProfile, isPending } = useUpdateProfile();


    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                phone: user.phone,
            });
        }
    }, [user, form]);

    const handleSubmit = (values: { name: string; phone?: string }) => {
        updateProfile(values, {
            onSuccess: (updatedUser) => {
                
                if (contextUser) {
                    login(localStorage.getItem("token")!, updatedUser);
                }
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

    return (
        <div className="max-w-lg mx-auto space-y-6">
            <h1 className="text-2xl font-bold">My Profile</h1>

            {/* Avatar */}
            <div className="flex flex-col items-center gap-3 py-6 bg-white rounded-xl shadow-sm">
                <Avatar
                    size={80}
                    icon={<UserOutlined />}
                    src={user?.avatar}
                    className="bg-blue-500"
                />
                <div className="text-center">
                    <p className="font-bold text-lg">{user?.name}</p>
                    <p className="text-gray-400 text-sm">{user?.email}</p>
                    <p className="text-xs mt-1 px-2 py-0.5 bg-blue-50 text-blue-500 rounded-full inline-block capitalize">
                        {user?.role}
                    </p>
                </div>
            </div>

            {/* Form Edit Profile */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-semibold mb-4">Edit Profile</h2>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        label="Nama"
                        rules={[{ required: true, message: "Nama tidak boleh kosong" }]}
                    >
                        <Input placeholder="Nama lengkap" />
                    </Form.Item>

                    <Form.Item name="phone" label="Nomor HP">
                        <Input placeholder="08xxxxxxxxxx" />
                    </Form.Item>

            
                    <Form.Item label="Email">
                        <Input value={user?.email} disabled />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={isPending} block>
                        Save
                    </Button>
                </Form>
            </div>
        </div>
    );
}