export class ApiError extends Error {
    constructor(
        public message: string,
        public statusCode: number,
        public path?: string,
        public timestamp?: string,
    ) {
        super(message);
        this.name = "ApiError";
    }
}