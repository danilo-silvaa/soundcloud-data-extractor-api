export const OK = (data: any) => ({
    statusCode: 200,
    payload: data
})

export const BadRequest = (error: Error) => ({
    statusCode: 400,
    payload: error.message
})

export const BadRequestWithZod = (error: any) => ({
    statusCode: 400,
    payload: error.flatten().fieldErrors
})

export const InternalServerError = (error: Error) => ({
    statusCode: 500,
    payload: error.message
})