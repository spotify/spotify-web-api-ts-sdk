import type { User } from '../types.js';
import EndpointsBase from './EndpointsBase.js';

export default class UsersEndpoints extends EndpointsBase {

    public profile(userId: string) {
        return this.getRequest<User>(`users/${userId}`);
    }
}
