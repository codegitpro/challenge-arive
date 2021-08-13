import axios from "axios";

const BackendInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export interface Response<T> {
    success: boolean;
    data: T;
    message: string;
}

export const BackendService = {
    getUserList: async (): Promise<Array<User>> => {
        try {
            const response = await BackendInstance.get<Response<Array<User>>>("/users");
            return response.data.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },
    getUser: async (userId: string): Promise<User> => {
        try {
            const response = await BackendInstance.get<Response<User>>(`/users/${userId}`);
            return response.data.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },
    createUser: async (user: Partial<User>): Promise<User> => {
        try {
            const response = await BackendInstance.post<Response<User>>(`/users`, user);
            return response.data.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },
    updateUser: async (user: Partial<User>): Promise<User> => {
        try {
            const response = await BackendInstance.patch<Response<User>>(`/users/${user._id}`, user);
            return response.data.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },
    removeUser: async (userId: string): Promise<User> => {
        try {
            const response = await BackendInstance.delete<Response<User>>(`/users/${userId}`);
            return response.data.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },
    getHobbyList: async (): Promise<Array<Hobby>> => {
        try {
            const response = await BackendInstance.get<Array<Hobby>>("/hobbies");
            return response.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },
    getHobby: async (hobbyId: string): Promise<Hobby> => {
        try {
            const response = await BackendInstance.get<Hobby>(`/hobbies/${hobbyId}`);
            return response.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },
    createHobby: async (userId: string, hobby: Partial<Hobby>): Promise<Hobby> => {
        try {
            const response = await BackendInstance.post<Hobby>(`/hobbies/${userId}`, hobby);
            return response.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },
    updateHobby: async (hobby: Partial<Hobby>): Promise<Hobby> => {
        try {
            const response = await BackendInstance.patch<Hobby>(`/hobbies/${hobby._id}`, hobby);
            return response.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },
    removeHobby: async (hobbyId: string): Promise<Hobby> => {
        try {
            const response = await BackendInstance.delete<Hobby>(`/hobbies/${hobbyId}`);
            return response.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },
};
