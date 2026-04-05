export type UserProfileDto = {
    id: number;
    username: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    avatarUrl: string;
    status: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isTwoFactorEnabled: boolean;
}