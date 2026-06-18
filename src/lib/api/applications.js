import { protectedFetch } from "../core/server";

export const getApplicationsByApplicant = async (applicantId) => {
    return protectedFetch(`/api/application?applicantId=${applicantId}`);
}