import axiosConfig from "./config"
export const getQuizService = async (params = "SOF") => {
    try {
        const response = await axiosConfig({
            method: "GET",
            url: `/v1/user-quiz?section=${params}`
        });

        return response;
    } catch (error) {
        return error;
    }
};