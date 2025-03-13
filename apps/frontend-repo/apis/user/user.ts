export default interface User {
    userId?: string;
    totalAverageWeightRatings: number;
    numberOfRents: number;
    recentlyActive: number | null; 
}  