import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status} for ${path}: ${text.slice(0, 200)}`);
    }

    return res.json();
};

export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'content-type': 'application/json',
            ... await authHeader()
        },
        body: JSON.stringify(data),
    });


    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status} for ${path}: ${text.slice(0, 200)}`);
    }


    return res.json();
};
