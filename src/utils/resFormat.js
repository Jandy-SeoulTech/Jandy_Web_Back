export default {
    successData: (status, message, data) => ({
        status,
        success: true,
        message,
        data,
    }),
    success: (status, message) => ({
        status,
        success: true,
        message,
    }),
    fail: (status, message) => ({
        status,
        success: false,
        message,
    }),
};
