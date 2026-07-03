
// quản lý tin tức
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
        slug: { // định danh duy nhất cho tin tức, thường được sử dụng trong URL
          type: String,
          required: true,
          trim: true,
          lowercase: true, 
          unique: true
        },
        title: { // tiêu đề tin tức
            type: String,
            required: true,
            trim: true,
            maxlength: 220
        },
        content: { // nội dung tin tức
            type: String,
            required: true,
            trim: true,
            maxlength: 30000
        },
        summary: { // tóm tắt tin tức
            type: String,
            required: true,
            trim: true,
            maxlength: 600
        },
        image: { // hình ảnh tin tức
            type: String,
            trim: true,
            default: ''
        },
        publishDate: { // ngày xuất bản , nếu ko truyền db sẽ tự lấy ngày đăng hiện tại
            type: Date,
            required: true,
            default: Date.now
        },
  },
  { timestamps: true }, // tự động lưu tgian create và update
);

newsSchema.index({ title: 'text', summary: 'text', content: 'text' });// tạo chỉ mục tìm kiếm toàn văn cho các trường title, summary và content
newsSchema.index({ publishDate: -1 });// tạo chỉ mục cho trường publishDate để tăng tốc các truy vấn sắp xếp theo ngày xuất bản


let News = mongoose.models.News || mongoose.model('News', newsSchema);
module.exports = News;
