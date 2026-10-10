// 后台 Session Store
// 使用方法: import { useAdminSession } from '@/tools/BackendSession';
import { createPersistStore } from './storeFactory';

export type BackendAdminRole = 'ADMIN';
//backenduse, backend administrator session definition
export class AdminSession{ 
    token: string;
    user_id: string;
    email: string;
    full_name: string;
    role: BackendAdminRole;
    constructor() { 
        this.token='';
        this.user_id='';
        this.email='';
        this.full_name='';
        this.role='ADMIN';
    }
}

export const useAdminSession = createPersistStore<AdminSession>('AdminSession', { token: '', user_id: '', email: '', full_name: '', role: 'ADMIN' });
