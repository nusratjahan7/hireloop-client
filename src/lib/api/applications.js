import { serverFetch } from "../core/server"

export const getApplicationsByApplicant = async (applicantId) => {
    return serverFetch(`/api/application?applicantId=${applicantId}`);
}