export default class NoOpErrorHandler implements IHandleErrors {
    public async handleErrors(error: any): Promise<boolean> {
        return false;
    }
}

