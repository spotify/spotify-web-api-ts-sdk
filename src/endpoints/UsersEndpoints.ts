import type { User } from '../types';
import EndpointsBase from './EndpointsBase';

export default class UsersEndpoints extends EndpointsBase {

    public profile(userId: string) {
        return this.getRequest<User>(`users/${userId}`);
    }
}
