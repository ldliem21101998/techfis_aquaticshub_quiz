export const signInService = async (payload) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/v1/login`,
        data: {
          username: payload.username,   
          password: payload.password
        }
      });
  
      return response;
    } catch (error) {
      return error;
    }
  };