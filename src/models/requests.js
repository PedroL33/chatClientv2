import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RequestSchema = new Schema({

})

export const Request = mongoose.model("Request", RequestSchema);