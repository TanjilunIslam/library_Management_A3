export const errorHandling = (error: any) => {
    if (error?.name === 'ValidationError') {
        return {
            message: 'Validation failed',
            success: false,
            error
        };
    }

    return {
        message: error.message || 'Something went wrong',
        success: false,
        error
    };
};
