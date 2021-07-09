const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema(
	{
		userPurchasing: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		userSelling: [
			{ type: mongoose.Schema.Types.ObjectId, default: [], ref: 'User' }
		],
		numberOfItems: { type: Number, min: 0, default: 0 },
		totalPrice: { type: Number, min: 0, default: 0 },
    item_detail: { type: Object },
		item_id: [
			{ type: mongoose.Schema.Types.ObjectId, default: [], ref: 'Design' }
		],
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				ret.id = doc._id;
				delete ret._id;
				delete ret.__v;
				return ret;
			}
		}
	}
);

export default mongoose.models.Purchase || mongoose.model('Design', purchaseSchema);
