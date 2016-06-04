import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  index: String,
  subject: String,
  title: String,
  content: String,
  name: String,
  options: []
}, {
  collection: 'questions'
});

export default mongoose.model('Question', QuestionSchema);
