const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
        },
        body: JSON.stringify(data),
    });


    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status} for ${path}: ${text.slice(0, 200)}`);
    }


    return res.json();
};
