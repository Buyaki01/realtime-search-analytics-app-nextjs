import { Schema, model, models } from 'mongoose'

const SearchRecordSchema = new Schema({
  searchQuery: { type: String, required: true },
  userIp: { type: String, required: true },
}, {
  timestamps: true,
}
)

const SearchRecord = models?.SearchRecord || model('SearchRecord', SearchRecordSchema)

export default SearchRecord
