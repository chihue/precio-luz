export interface ResponseAPI {
    ok: boolean;
    message?: string;
    code?: ErrorCode;
    element?: any;
    elemets?: any[];
}

export type ErrorCode = keyof typeof ErrorCodes;

export const ErrorCodes = {
    //U - User input code
    U001: {
        code: 'U001',
        message: 'No day has been entered'
    },

    //I - Internal code
    I001: {
        code: 'I001',
        message: 'Error in parse REE request'
    },

    //E - External code
    E001: {
        code: 'E001',
        message: 'Error in the request to REE'
    },

} as const;