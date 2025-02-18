import { Types } from "mongoose"

export type TCollection = {
    customerId: Types.ObjectId;
    description: string;
    amount: number;
    balanc: number;
}