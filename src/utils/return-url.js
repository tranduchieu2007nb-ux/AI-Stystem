
const safeReturnUrl = (url, fallback = '') => {
  if (!url || typeof url !== 'string') {
    return fallback;
  }

  if (!url.startsWith('/')) {
    return fallback;
  }

  return url;
}

module.exports = safeReturnUrl;


//  url: Đường dẫn cần kiểm tra (ví dụ: /profile).
// fallback = '': Giá trị sẽ trả về nếu url không hợp lệ.

// Hàm hoạt động như sau:

// Nếu url không tồn tại hoặc không phải là chuỗi (string) → trả về fallback.
// Nếu url không bắt đầu bằng dấu / → trả về fallback.
// Nếu url hợp lệ → trả về chính url.

//hàm này có nhiệm vụ kiểm tra xem url có an toàn
//  để chuyển hướng (redirect) hay không
