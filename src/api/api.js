import axios from "axios";

const BASE_URL =
    "https://my-json-server.typicode.com/ferrypratamaa-00/quicks-app";

const api = axios.create({
    baseURL: BASE_URL,
});

export const getInboxs = async () => {
    try {
        const response = await api.get("/chats");
        return response.data;
    } catch (error) {
        console.error("Error fetching inboxs:", error);
        throw error;
    }
};

export const getInbox = async (id) => {
    try {
        const response = await api.get(`/roomchats/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching inbox:", error);
        throw error;
    }
};

export const getUser = async () => {
    try {
        const response = await api.get("/user");
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export const getTaskCategories = async () => {
    try {
        const response = await api.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching task categories:", error);
        throw error;
    }
};

export const getTasks = async (id) => {
    try {
        const response = await api.get(`/users/${id}/tasks`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const getTasksByCategory = async (id) => {
    try {
        const response = await api.get(`/categories/${id}/tasks`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks by category:", error);
        throw error;
    }
};
