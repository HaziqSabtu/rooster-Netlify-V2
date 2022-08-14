import { getToken } from "./token";

const { accessToken, refreshToken } = getToken();

export const createUserConfig = (data) => {
    return {
        method: "post",
        url: "/api/users",
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
    };
};

export const getUserConfig = () => {
    return {
        method: "get",
        url: "/api/users",
        headers: {
            "x-refresh": refreshToken,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    };
};

export const updateUserConfig = (data) => {
    return {
        method: "put",
        url: "/api/users/update",
        headers: {
            "x-refresh": refreshToken,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
    };
};
