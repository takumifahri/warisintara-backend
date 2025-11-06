enum userRole {
    ADMIN = 'admin',
    USER = 'user',
}

interface User {
    id: number;
    uniqueId: string;
    roleId: number;
    email: string;
    nama: string;
    username: string;
    profile_photo?: string;
    isActive: boolean;
    isBanned: boolean;
    password: string;
    createdAt: Date;
    
    updatedAt: Date;
    deletedAt?: Date;
    role: Role;
}

interface Role {
    id: number;
    name: string;
}

interface UserProfile {
    id: string;
    uniqueId: string;
    username: string;
    email: string;
    name: string;
    role: userRole;
    isActive: boolean;
    isBanned: boolean;
    profile_photo?: string;

    createdAt: string;
    updatedAt: string;
}



export type {
    User,
    Role,
    userRole
};