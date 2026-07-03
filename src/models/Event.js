const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
        slug: {// định danh duy nhất cho sự kiện, thường được sử dụng trong URL
            type: String,
          required: true,
          trim: true,
          lowercase: true,
          unique: true
        },
        name: {// tên sự kiện
            type: String,
            required: true,
            trim: true,
            maxlength: 180
        },
        startDate: {// ngày bắt đầu sự kiện
            type: Date,
            required: true
        },
        endDate: {// ngày kết thúc sự kiện
            type: Date,
            required: true
        },
        description: {// mô tả sự kiện
            type: String,
            required: true,
            trim: true,
            maxlength: 4000
        },
        visibilityArea: {// khu vực hiển thị sự kiện
            type: String,
            required: true,
            trim: true,
            maxlength: 300
        },
        image: {// hình ảnh sự kiện
            type: String,
            trim: true,
            default: ''
        }
  },
  { timestamps: true },
);

EventSchema.index({ name: 'text', description: 'text', visibilityArea: 'text' });// tạo chỉ mục tìm kiếm toàn văn cho các trường name, description và visibilityArea
EventSchema.index({ startDate: 1 });// tạo chỉ mục cho trường startDate để tăng tốc các truy vấn sắp xếp theo ngày bắt đầu

let Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

module.exports = Event;
