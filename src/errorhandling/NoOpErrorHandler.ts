import type { IHandleErrors } from "../types.js";

export default class NoOpErrorHandler implements IHandleErrors {
    public async handleErrors(_: any): Promise<boolean> {
        return false;
    }
}
