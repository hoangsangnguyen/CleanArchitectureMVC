export interface OnRequestListener {
    onSuccess(): void;
    onFailure(errorMessage: string): void;
}

export class ResponseNotify {
    constructor(public success: boolean, public message: string) {
    }
}
