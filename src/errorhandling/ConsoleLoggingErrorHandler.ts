import type { IHandleErrors } from "../types.js";

export default class ConsoleLoggingErrorHandler implements IHandleErrors {
    public async handleErrors(error: any): Promise<boolean> {
        console.log(error);
        return false;
    }
}
