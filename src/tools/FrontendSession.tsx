// 前台 Session Store
// 使用方法: import { useUserSession } from '@/tools/FrontendSession';
import { createPersistStore } from './storeFactory';

export type FrontendUserRole = 'CUSTOMER';
//frontenduse, frontend customer session definition
export class UserSession{ 
    token: string;
    user_id: string;
    email: string;
    full_name: string;
    role: FrontendUserRole;
    constructor() { 
        this.token='';
        this.user_id='';
        this.email='';
        this.full_name='';
        this.role='CUSTOMER';
    }
}

export const useUserSession = createPersistStore<UserSession>('UserSession', { token: '', user_id: '', email: '', full_name: '', role: 'CUSTOMER' });
