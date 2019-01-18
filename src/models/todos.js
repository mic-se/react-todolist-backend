import uuid from 'uuid';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
    unique: false
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

export default model('todos', schema);
