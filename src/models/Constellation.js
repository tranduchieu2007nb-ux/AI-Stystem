//lưu các thông tin về chòm sao
const mongoose = require('mongoose');

const constellationSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    image: { type: String, required: true, trim: true },
    season: { type: String, required: true, trim: true }, // mùa xuất hiện của chòm sao
    description: { type: String, required: true, trim: true, maxlength: 4000 }, // mô tả chòm sao
    visibleMonths: [{ type: Number, min: 1, max: 12 }],// các tháng trong năm mà chòm sao có thể nhìn thấy
    mainStars: [{ type: String, trim: true }],// các ngôi sao chính trong chòm sao
  },
  { timestamps: true },
);

constellationSchema.index({ name: 'text', description: 'text' });
  
let Constellation =mongoose.models.Constellation ||mongoose.model('Constellation', constellationSchema);

   
module.exports = Constellation;

