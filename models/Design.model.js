const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designSchema = new Schema(
	{
		author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		title: { type: String, required: true },
		image: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, min: 0, default: 0 },
		voted_by: [
			{ type: mongoose.Schema.Types.ObjectId, default: [], ref: 'User' }
		],
		totalVotes: { type: Number, default: 0 },
		valuation: { type: Number, default: 0 }
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

export default mongoose.models.Design || mongoose.model('Design', designSchema);