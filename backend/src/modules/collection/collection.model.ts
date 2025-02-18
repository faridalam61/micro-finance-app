import { model, Schema } from "mongoose";
import { TCollection } from "./collection.interface";

const collectionSchema = new Schema<TCollection>({
    customerId: {type: Schema.ObjectId, required:true, ref:"Customer"},
    description: {type: String, required: true},
    amount: {type: Number, required: true},
    balanc: {type: Number, required: true}
}, {timestamps: true})


export const Collection = model<TCollection>("collection", collectionSchema)