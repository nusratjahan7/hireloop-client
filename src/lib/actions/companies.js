"use server"

import { serverMutation } from "../core/server"

export const createCompany = async (newCompanyData) => {
    return serverMutation('/api/companies', newCompanyData);
}


// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createCompany = async (newCompanyData) => {
//     const res = await fetch(`${baseUrl}/api/companies`, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//         },
//         body: JSON.stringify(newCompanyData),
//     })
//     const data = await res.json();
//     return data;
// };