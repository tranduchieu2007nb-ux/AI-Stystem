const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema(
  {
        slug: { // định danh duy nhất cho hành tinh, thường được sử dụng trong URL và ảnh
          type: String,
          required: true,
          trim: true, // tự động xóa khoảng trắng đầu và cuối
          lowercase: true, // tự động chuyển đổi thành chữ thường
          unique: true // đảm bảo slug là duy nhất trong cơ sở dữ liệu
        },
        name: {
            type: String,
            required: true, trim: true,
            maxlength: 80
        },
        image: {
            type: String,
            required: true,
            trim: true
        },
        description: {// mô tả hành tinh
            type: String,
            required: true,
            trim: true,
            maxlength: 3000
        },
        diameter: {// đường kính hành tinh
            type: Number,
            required: true,
            min: 0
        },
        mass: {// khoi lượng hành tinh
            type: Number,
            required: true,
            min: 0
        },
        gravity: {// lực hấp dẫn hành tinh
            type: Number,
            required: true,
            min: 0
        },
        atmosphere: {// bầu khí quyển hành tinh
            type: String,
            required: true,
            trim: true
        },
        temperature: {// nhiệt độ hành tinh
            type: Number,
            required: true
        },
        distanceSun: {// khoảng cách từ hành tinh đến Mặt Trời
            type: Number,
            required: true,
            min: 0
        },
        distanceEarth: {// khoảng cách từ hành tinh đến Trái Đất
            type: Number,
            required: true, min: 0
        },
    facts: [{ type: String, trim: true }], // các sự thật về hành tinh
    tags: [{ type: String, trim: true, lowercase: true }], // các thẻ liên quan đến hành tinh
    relatedObjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Planet' }], // các đối tượng liên quan đến hành tinh
    featured: { type: Boolean, default: false },// đánh dấu hành tinh nổi bật
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }, // tự động lưu tgian create và update
);
//Tạo compound index để tăng tốc các truy vấn lọc theo featured và sắp xếp theo displayOrder.
planetSchema.index( // tạo chỉ mục cho các trường featured và displayOrder
    { featured: 1, displayOrder: 1 }
);
planetSchema.index(// tạo chỉ mục tìm kiếm toàn văn cho các trường name, description và tags
    { name: 'text', description: 'text', tags: 'text' }
);

let Planet = mongoose.models.Planet || mongoose.model('Planet', planetSchema);

module.exports = Planet;
 