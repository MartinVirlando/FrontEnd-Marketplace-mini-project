import { useState, useEffect, useRef } from "react";
import { Input, Button, Avatar, Badge, Spin } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { useGetConversation, useGetMessage, useSendMessage, useMarkAsRead } from "../../hooks/useChat";
import { useAuth } from "../../context/AuthContext";
import type { Message } from "../../types";

export default function ChatPage() {
    const { user } = useAuth();
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [inputMessage, setInputMessage] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    const { data: conversations, isLoading: loadingConversations } = useGetConversation();
    const { data: messages, isLoading: loadingMessages } = useGetMessage(selectedUserId ?? 0);
    const { mutate: sendMessage, isPending: sending } = useSendMessage();
    const { mutate: markAsRead } = useMarkAsRead();

    // Auto scroll ke pesan terbaru
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Mark as read saat buka conversation
    useEffect(() => {
        if (selectedUserId) {
            markAsRead(selectedUserId);
        }
    }, [selectedUserId]);

    const handleSend = () => {
        if (!inputMessage.trim() || !selectedUserId) return;

        sendMessage(
            { message: inputMessage, receiverId: selectedUserId },
            { onSuccess: () => setInputMessage("") }
        );
    };

    // Handle enter untuk kirim pesan
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Ambil lawan bicara dari conversation
    const getOtherUser = (msg: Message) => {
        return msg.senderId === user?.id ? msg.receiver : msg.sender;
    };

    return (
        <div className="h-[calc(100vh-120px)] flex border rounded-xl overflow-hidden bg-white shadow-sm">

            {/* Sidebar - List Conversation */}
            <div className="w-72 border-r flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="font-bold text-lg">Message</h2>
                </div>

                {loadingConversations ? (
                    <div className="flex justify-center py-10">
                        <Spin />
                    </div>
                ) : (
                    <div className="overflow-y-auto flex-1">
                        {conversations?.map((conv) => {
                            const otherUser = getOtherUser(conv);
                            const isSelected = selectedUserId === otherUser.id;
                            const isUnread = !conv.isRead && conv.receiverId === user?.id;

                            return (
                                <div
                                    key={conv.id}
                                    className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                                        isSelected ? "bg-blue-50 border-r-2 border-blue-500" : ""
                                    }`}
                                    onClick={() => setSelectedUserId(otherUser.id)}
                                >
                                    <Badge dot={isUnread}>
                                        <Avatar icon={<UserOutlined />} src={otherUser.avatar} />
                                    </Badge>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm truncate ${isUnread ? "font-bold" : "font-semibold"}`}>
                                            {otherUser.name}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate">
                                            {conv.message}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Area Chat */}
            {selectedUserId ? (
                <div className="flex-1 flex flex-col">

                    {/* Header Chat */}
                    <div className="p-4 border-b flex items-center gap-3">
                        <Avatar icon={<UserOutlined />} />
                        <p className="font-semibold">
                            {conversations?.find((c) => getOtherUser(c).id === selectedUserId)
                                ? getOtherUser(
                                    conversations.find((c) => getOtherUser(c).id === selectedUserId)!
                                ).name
                                : ""}
                        </p>
                    </div>

                    {/* List Pesan */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {loadingMessages ? (
                            <div className="flex justify-center py-10">
                                <Spin />
                            </div>
                        ) : (
                            messages?.map((msg) => {
                                const isMe = msg.senderId === user?.id;
                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                                    >
                                        {/* Konteks produk jika ada */}
                                        <div className="space-y-1 max-w-xs">
                                            {msg.product && (
                                                <div className="text-xs bg-gray-100 rounded-lg p-2 flex items-center gap-2">
                                                    <img
                                                        src={`http://localhost:8080/${msg.product.images[0]}`}
                                                        alt={msg.product.name}
                                                        className="w-8 h-8 object-cover rounded"
                                                    />
                                                    <span className="text-gray-500 truncate">
                                                        {msg.product.name}
                                                    </span>
                                                </div>
                                            )}
                                            <div
                                                className={`px-4 py-2 rounded-2xl text-sm ${
                                                    isMe
                                                        ? "bg-blue-500 text-white rounded-tr-none"
                                                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                                                }`}
                                            >
                                                {msg.message}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        {/* Anchor untuk auto scroll */}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input Pesan */}
                    <div className="p-4 border-t flex gap-2">
                        <Input
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ketik pesan..."
                            size="large"
                        />
                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            size="large"
                            loading={sending}
                            onClick={handleSend}
                        />
                    </div>
                </div>
            ) : (
                // Placeholder kalau belum pilih conversation
                <div className="flex-1 flex items-center justify-center text-gray-400">
                    <div className="text-center space-y-2">
                        <p className="text-4xl">💬</p>
                        <p>Select a conversation to start chatting</p>
                    </div>
                </div>
            )}
        </div>
    );
}