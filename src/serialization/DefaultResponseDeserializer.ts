import type { IResponseDeserializer } from "../types.js";

export default class DefaultResponseDeserializer implements IResponseDeserializer {
    public async deserialize<TReturnType>(response: Response): Promise<TReturnType> {
        const text = await response.text();

        if (text.length > 0) {
            const json = JSON.parse(text);
            return json as TReturnType;
        }

        return null as TReturnType;
    }
}
