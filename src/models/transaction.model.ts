import mongoose, {Schema, Document} from "mongoose";

export interface IPurchaseItem {
    productId: mongoose.Types.ObjectId;
    qty: number;
} 

export interface ITransaction extends Document {
    paymentProof: string;
    status: "pending" | "paid" | "rejected";
    purchaseItems: IPurchaseItem[];
    totalPayment: number;
    customerName: string;
    customerContact: string;
    customerAddress: string;
}

const PurchaseItemSchema: Schema = new Schema({
    productId: {type: mongoose.Types.ObjectId, ref: "Product", required: true},
    qty: {type: Number, required: true, min: 1}
}, {_id: false});

const TransactionSchema: Schema = new Schema({
    paymentProof: {type: String, required: true},
    status: {
        type: String, 
        enum: ["pending", "paid", "rejected"], 
        default: "pending",
        required: true
    },
    purchaseItems: {type: [PurchaseItemSchema], required: true},
    totalPayment: {type: Number, required: true},
    customerName: {type: String, required: true},
    customerContact: {type: String, required: true},
    customerAddress: {type: String, required: true},
}, {timestamps: true});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);