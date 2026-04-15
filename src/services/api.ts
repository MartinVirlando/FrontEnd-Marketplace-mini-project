import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";


const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.data) {
            config.data = toSnake(config.data);
        }
        
        if (config.params) {
            config.params = toSnake(config.params);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        if (response.data?.data !== undefined) {
            response.data = toCamel(response.data.data);
        } else {
            response.data = toCamel(response.data);
        }
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)

// Helper convert snake_case ke camelCase
const toCamel = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(toCamel);
    if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce((acc, key) => {
            const camelKey = key.replace(/_([a-z])/g, (_, l) => l.toUpperCase());
            acc[camelKey] = toCamel(obj[key]);
            return acc;
        }, {} as any);
    }
    return obj;
};

const toSnake = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(toSnake);
    if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce((acc, key) => {
            const snakeKey = key.replace(/([A-Z])/g, (l) => `_${l.toLowerCase()}`);
            acc[snakeKey] = toSnake(obj[key]);
            return acc;
        }, {} as any);
    }
    return obj;
};

export default api;