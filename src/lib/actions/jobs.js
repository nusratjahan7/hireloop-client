"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createJob = async (newJobData) => {
    const res = await fetch(`${baseUrl}/api/jobs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(newJobData)
    })
    const data = await res.json();
    return data;
}