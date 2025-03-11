import { User } from '../entities/user';

const users: User[] = [
    { userId: '1', totalAverageWeightRatings: '3.4', numberOfRents: '30', recentlyActive: '30' },
    { userId: '2', totalAverageWeightRatings: '3.4', numberOfRents: '31', recentlyActive: '25' }
];

export const getUsers = async (): Promise<User[]> => {
    return users;
};
