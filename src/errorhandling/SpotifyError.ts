import type { ISpotifyError } from '../types.js';

export default class SpotifyError extends Error implements ISpotifyError {
    status: number;
    statusText: string;
    response: Response;
    message: string;

    constructor(status: number, statusText: string, message: string, response: Response) {
        super(`API failed with status ${status}: ${statusText}`);
        this.status = status;
        this.statusText = statusText;
        this.message = message;
        this.response = response;
    }
}
