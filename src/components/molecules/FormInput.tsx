import { Form } from "antd";
import type { Rule } from "antd/es/form";
import type { ReactNode } from "react";

type FormInputProps = {
    name: string;
    label: string;
    rules?: Rule[];
    children: ReactNode;
}

export default function FormInput({
    name,
    label,
    rules,
    children,
}: FormInputProps){
    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            
        >
            {children}
        </Form.Item>
    );
}