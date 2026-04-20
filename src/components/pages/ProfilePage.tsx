import { useEffect, useState } from "react";
import { Button, Form, Input, Avatar, Spin } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { useGetMe, useUpdateProfile } from "../../hooks/useAuth";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function ProfilePage() {
    const [form] = Form.useForm();
    const { login, user: contextUser } = useAuth();

    const { data: user, isLoading } = useGetMe();
    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const [uploadingAvatar, setUploadingAvatar] = useState(false);


    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                phone: user.phone,
            });
        }
    }, [user, form]);

    const handleSubmit = (values: { name: string; phone?: string }) => {
        updateProfile({ ...values, avatar: user?.avatar }, {
            onSuccess: (updatedUser) => {
                if (contextUser) login(localStorage.getItem("token")!, updatedUser);
            },
        });
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setUploadingAvatar(true);
        try {
            const res = await api.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const avatarPath = res.data.path;
            updateProfile({ name: user?.name!, phone: user?.phone, avatar: avatarPath }, {
                onSuccess: (updatedUser) => {
                    if (contextUser) login(localStorage.getItem("token")!, updatedUser);
                },
            });
        } catch {
            // handle error
        } finally {
            setUploadingAvatar(false);
        }
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
            <div className="relative">
                <Avatar
                    size={80}
                    icon={<UserOutlined />}
                    src={user?.avatar ? `http://localhost:8080/${user.avatar}` : undefined}
                    className="bg-blue-500"
                />
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer hover:bg-gray-50">
                    <CameraOutlined className="text-gray-600" />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                        disabled={uploadingAvatar}
                    />
                </label>
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