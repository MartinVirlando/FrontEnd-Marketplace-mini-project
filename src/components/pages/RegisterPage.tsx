import RegisterForm from "../organisms/RegisterForm";
import { useRegister } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function Register() {
    const navigate = useNavigate();
    const { mutate, isPending } = useRegister();

    const handleSumbit = (values: {email: string; password: string; name: string; phone?: string; role: "user" | "seller"}) => {
        mutate(values, {
            onSuccess: () => {
                message.success("Register success");
                navigate("/login");
            },
            onError: () => {
                message.error("Register failed");
            },
        });
    };
    return (
        <RegisterForm onSubmit={handleSumbit} isLoading={isPending} />
    )

}