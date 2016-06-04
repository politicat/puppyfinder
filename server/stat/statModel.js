import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let StatDataSchema = new Schema({
  puppy: String,
  count: Number
});

export default mongoose.model('Statdata', StatDataSchema);

