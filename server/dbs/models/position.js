import mongoose from 'mongoose'

const Schema = mongoose.Schema
const PositionSchema = new Schema({
  id: {
    type: String,
    require: true
  },
  province: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  }
})

export default mongoose.model('Position', PositionSchema)
