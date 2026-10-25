// lib/data/news.ts

// export interface NewsArticle {
//   id: string;
//   title: string;
//   summary: string;
//   content: string;
//   image: string;
//   date: string;
//   category: 'Khuyến mãi' | 'Thông báo' | 'Cẩm nang' | 'Tuyển dụng' | 'Tuyến mới';
// }

export const MOCK_NEWS = [  // ================= NHÓM THÔNG BÁO / KHUYẾN MÃI =================
  {
    id: "1",
    title: "THÔNG BÁO MỞ ĐĂNG KÝ CHỖ XE TẾT NGUYÊN ĐÁN 2027",
    summary: "Nhằm phục vụ nhu cầu đi lại của bà con trong dịp Tết, Konoha Bus chính thức mở bán vé Tết từ ngày 01/01/2027 với nhiều ưu đãi hấp dẫn.",
    content: `
[THỜI GIAN MỞ BÁN]
- Bắt đầu từ 08h00 ngày 01/01/2027 đến khi hết vé.
- Áp dụng cho tất cả các tuyến xe khách liên tỉnh của Konoha Bus.
- Quý khách có thể đặt vé trực tiếp trên website, ứng dụng hoặc tại các phòng vé.

[CHÍNH SÁCH GIÁ VÉ TẾT]
- Giá vé được niêm yết công khai, không tăng giá trong suốt dịp Tết.
- Giảm giá 10% cho khách hàng đặt vé sớm trước ngày 15/01/2027.
- Miễn phí đổi trả vé trước 48 giờ so với giờ khởi hành (áp dụng cho vé mua online).

[LƯU Ý QUAN TRỌNG]
- Quý khách vui lòng có mặt tại bến xe trước 30 phút để làm thủ tục lên xe.
- Xuất trình mã vé điện tử (qua SMS/Zalo) hoặc CCCD khi lên xe.
- Trẻ em dưới 6 tuổi miễn phí vé (ngồi chung ghế với người lớn).
- Mọi thắc mắc vui lòng liên hệ hotline 1900 1234 để được hỗ trợ.
    `,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    date: "10/12/2026",
    category: "Thông báo"
  },
  {
    id: "2",
    title: "KONOHA BUS KHAI TRƯƠNG TUYẾN MỚI SÀI GÒN - ĐÀ NẴNG",
    summary: "Từ ngày 15/12/2026, Konoha Bus chính thức đưa vào khai thác tuyến Sài Gòn - Đà Nẵng với dòng xe Limousine 34 phòng cao cấp.",
    content: `
[THÔNG TIN TUYẾN XE]
- Lộ trình: TP.HCM - Đà Nẵng và ngược lại.
- Thời gian di chuyển: Khoảng 18 tiếng (bao gồm thời gian nghỉ ngơi).
- Tần suất: 2 chuyến/ngày (Khởi hành lúc 08:00 và 20:00).
- Loại xe: Limousine 34 phòng cao cấp, trang bị đầy đủ tiện nghi.

[ƯU ĐÃI KHAI TRƯƠNG]
- Giảm 20% giá vé cho tất cả khách hàng đặt vé từ 15/12/2026 đến 15/01/2027.
- Tặng voucher giảm giá 50.000đ cho lần đặt vé tiếp theo.
- Miễn phí nước uống và khăn lạnh trên xe.

[TIỆN ÍCH TRÊN XE]
- Wifi tốc độ cao miễn phí, cổng sạc USB tại mỗi phòng.
- Chăn đắp, gối tựa êm ái, rèm cửa riêng tư.
- Hệ thống giải trí cá nhân (màn hình cảm ứng).
- Nhà vệ sinh trên xe sạch sẽ, tiện lợi.
    `,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800",
    date: "05/12/2026",
    category: "Tuyến mới"
  },
  {
    id: "3",
    title: "ƯU ĐÃI GIẢM 15% KHI THANH TOÁN QUA VÍ ĐIỆN TỬ",
    summary: "Từ nay đến hết 31/12/2026, Quý khách thanh toán trực tuyến qua Momo, ZaloPay, VNPay sẽ được giảm ngay 15% giá vé.",
    content: `
[THỜI GIAN ÁP DỤNG]
- Từ ngày 01/12/2026 đến hết ngày 31/12/2026.
- Áp dụng cho tất cả các tuyến xe và tất cả các ngày trong tuần.

[CÁCH THỨC THAM GIA]
- Bước 1: Truy cập website konohabus.vn hoặc ứng dụng Konoha Bus.
- Bước 2: Chọn tuyến xe, chuyến xe và vị trí ghế yêu thích.
- Bước 3: Nhập thông tin hành khách và chọn phương thức thanh toán là Momo, ZaloPay hoặc VNPay.
- Bước 4: Hoàn tất thanh toán và nhận mã vé qua SMS.

[ĐIỀU KHOẢN CHƯƠNG TRÌNH]
- Mức giảm tối đa: 50.000 VNĐ/vé.
- Không áp dụng đồng thời với các chương trình khuyến mãi khác.
- Mỗi tài khoản được áp dụng tối đa 3 lần trong thời gian diễn ra chương trình.
    `,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    date: "01/12/2026",
    category: "Khuyến mãi"
  },
  {
    id: "4",
    title: "LỊCH NGHỈ LỄ QUỐC KHÁNH 2/9/2026",
    summary: "Konoha Bus thông báo lịch hoạt động của các phòng vé và tổng đài trong dịp lễ Quốc Khánh để Quý khách chủ động sắp xếp.",
    content: `
[LỊCH HOẠT ĐỘNG CỦA PHÒNG VÉ]
- Ngày 02/09/2026: Các phòng vé tại bến xe mở cửa từ 06:00 đến 20:00.
- Ngày 03/09/2026: Hoạt động bình thường trở lại theo lịch thường nhật.

[HOẠT ĐỘNG CỦA TỔNG ĐÀI]
- Tổng đài đặt vé 1900 1234 hoạt động xuyên suốt 24/7 (kể cả ngày lễ).
- Đội ngũ CSKH túc trực để hỗ trợ Quý khách giải đáp thắc mắc và xử lý sự cố.

[LƯU Ý DÀNH CHO KHÁCH HÀNG]
- Do nhu cầu đi lại tăng cao trong dịp lễ, Quý khách nên đặt vé trước ít nhất 3 ngày.
- Có mặt tại bến xe trước 30 phút để tránh ùn tắc và trễ chuyến.
- Tuân thủ quy định của bến xe và nhân viên điều hành.
    `,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800",
    date: "30/08/2026",
    category: "Thông báo"
  },

  // ================= NHÓM TUYỂN DỤNG =================
  {
    id: "5",
    title: "TUYỂN DỤNG TÀI XẾ XE KHÁCH (THU NHẬP 15-20 TRIỆU/THÁNG)",
    summary: "Konoha Bus cần tuyển gấp 10 Tài xế xe khách chạy tuyến cố định. Yêu cầu có bằng E, D, sức khỏe tốt, kinh nghiệm 2 năm...",
    content: `
[MÔ TẢ CÔNG VIỆC]
- Lái xe khách giường nằm/limousine chạy tuyến cố định: Sài Gòn - Đà Lạt, Sài Gòn - Cần Thơ, Sài Gòn - Nha Trang.
- Thực hiện kiểm tra xe trước khi khởi hành (dầu, nước, lốp, phanh...).
- Đảm bảo an toàn tuyệt đối cho hành khách và tài sản trên xe trong suốt hành trình.
- Hỗ trợ hành khách lên xuống xe, sắp xếp hành lý khi cần thiết.
- Tuân thủ nghiêm ngặt luật giao thông đường bộ và quy định của công ty.

[YÊU CẦU ỨNG VIÊN]
- Nam giới, độ tuổi từ 28 - 50, sức khỏe tốt, không mắc các bệnh về mắt, tim mạch.
- Có bằng lái xe hạng E hoặc D (còn thời hạn sử dụng).
- Có kinh nghiệm lái xe khách từ 2 năm trở lên, ưu tiên ứng viên đã chạy các tuyến đường dài.
- Trung thực, cẩn thận, có trách nhiệm cao với công việc và khách hàng.
- Ưu tiên ứng viên có hộ khẩu hoặc đang sinh sống tại TP.HCM.

[QUYỀN LỢI ĐƯỢC HƯỞNG]
- Mức lương: 15.000.000 - 20.000.000 VNĐ/tháng (Lương cứng + Doanh thu + Phụ cấp chuyến).
- Thời gian làm việc: Chạy 2 ngày - Nghỉ 2 ngày (Xoay ca linh hoạt theo lịch điều động).
- Được đóng đầy đủ BHXH, BHYT, BHTN theo quy định của pháp luật.
- Hỗ trợ chỗ ăn, nghỉ tại bến xe trong thời gian chờ chuyến.
- Thưởng lễ, Tết, thưởng chuyên cần, thưởng an toàn lái xe.

[THÔNG TIN LIÊN HỆ]
- Địa điểm làm việc: Bến xe Miền Đông (Q. Bình Thạnh, TP.HCM) và các văn phòng chi nhánh.
- Hồ sơ bao gồm: Đơn xin việc, Sơ yếu lý lịch, Bằng lái xe, CCCD, Giấy khám sức khỏe.
- Liên hệ nộp hồ sơ: Phòng Nhân sự Konoha Bus - Hotline: 0909 123 456 (Gặp Ms. Hương).
    `,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800",
    date: "20/11/2026",
    category: "Tuyển dụng"
  },
  {
    id: "6",
    title: "TUYỂN DỤNG TỔNG ĐÀI VIÊN CSKH (LƯƠNG 8-10 TRIỆU)",
    summary: "Cần tuyển 5 bạn Tổng đài viên làm việc tại văn phòng TP.HCM. Giờ làm việc xoay ca, lương cứng 8 triệu + phụ cấp...",
    content: `
[MÔ TẢ CÔNG VIỆC]
- Tiếp nhận và xử lý các cuộc gọi đến từ khách hàng (đặt vé, tra cứu thông tin, phàn nàn, khiếu nại...).
- Tư vấn, giải đáp thắc mắc của khách hàng về lịch trình, giá vé, các chương trình khuyến mãi.
- Ghi nhận thông tin đặt vé, phối hợp với bộ phận điều hành để sắp xếp xe.
- Xử lý các tình huống phát sinh trong quá trình khách hàng sử dụng dịch vụ.

[YÊU CẦU ỨNG VIÊN]
- Nam/Nữ, độ tuổi 20 - 30, ngoại hình sáng sủa, giọng nói dễ nghe.
- Tốt nghiệp Cao đẳng/Đại học các chuyên ngành liên quan.
- Có kỹ năng giao tiếp tốt, kiên nhẫn, chịu được áp lực công việc.
- Sử dụng thành thạo máy tính, các phần mềm văn phòng cơ bản.

[QUYỀN LỢI ĐƯỢC HƯỞNG]
- Mức lương: 8.000.000 - 10.000.000 VNĐ/tháng (Lương cứng + Phụ cấp ca đêm + Thưởng KPI).
- Thời gian làm việc: Xoay ca linh hoạt (Ca sáng 6h-14h, Ca chiều 14h-22h, Ca đêm 22h-6h).
- Được đóng BHXH, BHYT đầy đủ sau khi hết thời gian thử việc.
- Thưởng lễ, Tết, sinh nhật, du lịch công ty hàng năm.

[THÔNG TIN LIÊN HỆ]
- Địa điểm làm việc: Văn phòng Konoha Bus - 130 Cô Bắc, Quận 1, TP.HCM.
- Liên hệ: Phòng Nhân sự - 0909 123 456 (Gặp Ms. Hương).
- Gửi CV qua email: tuyendung@konohabus.vn.
    `,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    date: "18/11/2026",
    category: "Tuyển dụng"
  },
  {
    id: "7",
    title: "TUYỂN NHÂN VIÊN BÁN VÉ TẠI BẾN XE MIỀN ĐÔNG",
    summary: "Vị trí Nhân viên bán vé (Nam/Nữ). Giờ làm việc: 8 tiếng/ngày, lương 7-9 triệu, thưởng doanh số...",
    content: `
[MÔ TẢ CÔNG VIỆC]
- Bán vé xe cho hành khách tại quầy vé bến xe.
- Hướng dẫn hành khách làm thủ tục lên xe, sắp xếp hành lý.
- Giải đáp các thắc mắc của khách hàng về lịch trình, giá vé.
- Quản lý tiền bán vé và báo cáo doanh thu cuối ngày.
- Vệ sinh khu vực quầy vé và giữ gìn hình ảnh công ty.

[YÊU CẦU ỨNG VIÊN]
- Nam/Nữ, từ 18 - 35 tuổi, tốt nghiệp THPT trở lên.
- Nhanh nhẹn, trung thực, có trách nhiệm trong công việc.
- Kỹ năng giao tiếp cơ bản, thái độ thân thiện với khách hàng.
- Có thể làm việc theo ca (sáng, chiều, tối).

[QUYỀN LỢI ĐƯỢC HƯỞNG]
- Mức lương: 7.000.000 - 9.000.000 VNĐ/tháng + Thưởng doanh số.
- Thời gian làm việc: 8 tiếng/ngày, nghỉ 1 ngày/tuần (xoay ca).
- Được cung cấp đồng phục và thẻ nhân viên.
- Hỗ trợ ăn trưa tại bến xe.
- Cơ hội thăng tiến lên vị trí Giám sát bán vé.

[THÔNG TIN LIÊN HỆ]
- Địa điểm làm việc: Bến xe Miền Đông (Q. Bình Thạnh, TP.HCM).
- Ứng tuyển trực tiếp tại quầy vé số 5, Bến xe Miền Đông.
- Hoặc liên hệ: 0909 123 456 (Phòng Nhân sự).
    `,
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800",
    date: "15/11/2026",
    category: "Tuyển dụng"
  },
  {
    id: "8",
    title: "TUYỂN DỤNG KỸ THUẬT VIÊN BẢO TRÌ XE (LƯƠNG 12-15 TRIỆU)",
    summary: "Konoha Bus cần tuyển Kỹ thuật viên bảo dưỡng xe khách. Làm việc tại xưởng TP.HCM, giờ hành chính...",
    content: `
[MÔ TẢ CÔNG VIỆC]
- Thực hiện bảo dưỡng định kỳ các dòng xe khách (giường nằm, limousine).
- Kiểm tra, chẩn đoán và sửa chữa các sự cố về động cơ, gầm, điện, điều hòa.
- Thay thế phụ tùng, vật tư hư hỏng theo đúng quy trình kỹ thuật.
- Ghi chép nhật ký bảo dưỡng, sửa chữa và báo cáo cho Trưởng bộ phận.
- Đảm bảo an toàn lao động và vệ sinh xưởng.

[YÊU CẦU ỨNG VIÊN]
- Nam giới, từ 22 - 45 tuổi, sức khỏe tốt.
- Tốt nghiệp Trung cấp/Cao đẳng nghề Cơ khí ô tô.
- Có kinh nghiệm 1 năm trở lên ở vị trí tương đương.
- Có kiến thức về hệ thống điện, máy gầm ô tô.
- Ưu tiên ứng viên đã từng làm việc tại các hãng xe khách lớn.

[QUYỀN LỢI ĐƯỢC HƯỞNG]
- Mức lương: 12.000.000 - 15.000.000 VNĐ/tháng (thỏa thuận theo năng lực).
- Thời gian làm việc: Thứ 2 - Thứ 7 (08:00 - 17:00), nghỉ Chủ nhật.
- Được đóng BHXH, BHYT đầy đủ.
- Bao ăn trưa tại xưởng.
- Trang bị đầy đủ dụng cụ và đồ bảo hộ lao động.

[THÔNG TIN LIÊN HỆ]
- Địa điểm làm việc: Xưởng bảo dưỡng Konoha Bus (Q. Thủ Đức, TP.HCM).
- Liên hệ: Anh Tuấn - 0912 345 678 (Trưởng bộ phận Kỹ thuật).
    `,
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&q=80&w=800",
    date: "10/11/2026",
    category: "Tuyển dụng"
  },

  // ================= NHÓM CẨM NANG =================
  {
    id: "9",
    title: "KINH NGHIỆM DU LỊCH ĐÀ LẠT TIẾT KIỆM CHO SINH VIÊN",
    summary: "Đà Lạt mộng mơ nhưng chi phí đi lại khá cao? Konoha Bus mách bạn bí kíp du lịch Đà Lạt tiết kiệm chỉ với 2 triệu đồng.",
    content: `
[THỜI ĐIỂM LÝ TƯỞNG]
- Nên đi vào tháng 3-4 (mùa hoa phượng tím) hoặc tháng 10-11 (mùa dã quỳ).
- Tránh các dịp lễ lớn để không phải chen chúc và giá phòng tăng cao.

[PHƯƠNG TIỆN DI CHUYỂN]
- Đặt vé xe Konoha Bus với giá ưu đãi cho sinh viên (giảm 10% khi xuất trình thẻ SV).
- Chọn chuyến đêm để tiết kiệm 1 đêm khách sạn.

[CHI PHÍ DỰ KIẾN CHO 3 NGÀY 2 ĐÊM]
- Vé xe khứ hồi: 500.000đ.
- Homestay: 300.000đ/đêm x 2 = 600.000đ.
- Ăn uống: 200.000đ/ngày x 3 = 600.000đ.
- Thuê xe máy: 150.000đ/ngày x 2 = 300.000đ.
- Tổng chi phí: Khoảng 2.000.000đ/người.

[NHỮNG ĐỊA ĐIỂM KHÔNG THỂ BỎ LỠ]
- Hồ Xuân Hương, Quảng trường Lâm Viên.
- Chợ đêm Đà Lạt (thưởng thức bánh tráng nướng, sữa đậu nành).
- Đồi chè Cầu Đất, Thác Datanla.
- Crazy House (Biệt thự Hằng Nga).
    `,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800",
    date: "05/11/2026",
    category: "Cẩm nang"
  },
  {
    id: "10",
    title: "HƯỚNG DẪN ĐẶT VÉ ONLINE VÀ NHẬN VÉ ĐIỆN TỬ",
    summary: "Chỉ với vài thao tác đơn giản trên điện thoại, bạn đã có ngay tấm vé xe Konoha Bus mà không cần đến bến xe xếp hàng.",
    content: `
[BƯỚC 1: TRUY CẬP WEBSITE/ỨNG DỤNG]
- Mở trình duyệt và truy cập konohabus.vn hoặc tải app Konoha Bus trên App Store/Google Play.
- Chọn điểm đi, điểm đến, ngày đi và số lượng vé.

[BƯỚC 2: CHỌN CHUYẾN XE VÀ GHẾ]
- Hệ thống sẽ hiển thị danh sách các chuyến xe còn trống.
- Nhấn chọn chuyến xe phù hợp và vị trí ghế bạn muốn ngồi.

[BƯỚC 3: NHẬP THÔNG TIN VÀ THANH TOÁN]
- Điền đầy đủ họ tên, số điện thoại của hành khách.
- Chọn phương thức thanh toán: Ví điện tử (Momo, ZaloPay, VNPay), thẻ ngân hàng hoặc thanh toán tại quầy.

[BƯỚC 4: NHẬN VÉ ĐIỆN TỬ]
- Sau khi thanh toán thành công, bạn sẽ nhận được mã vé qua tin nhắn SMS hoặc Zalo.
- Khi lên xe, chỉ cần đọc mã vé hoặc xuất trình CCCD cho nhân viên soát vé.
    `,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    date: "01/11/2026",
    category: "Cẩm nang"
  },
  {
    id: "11",
    title: "KONOHA BUS CAM KẾT CHẤT LƯỢNG PHỤC VỤ HÀNG ĐẦU",
    summary: "Với đội ngũ tài xế giàu kinh nghiệm và dàn xe đời mới, Konoha Bus tự hào mang đến trải nghiệm an toàn, thoải mái cho mọi hành khách.",
    content: `
[ĐỘI NGŨ NHÂN SỰ CHUYÊN NGHIỆP]
- 100% tài xế có bằng lái hạng E, D và trên 5 năm kinh nghiệm.
- Được khám sức khỏe định kỳ 6 tháng/lần, kiểm tra nồng độ cồn trước mỗi chuyến đi.
- Nhân viên phục vụ trên xe được đào tạo bài bản về kỹ năng giao tiếp và xử lý tình huống.

[DÀN XE HIỆN ĐẠI]
- Đầu tư dàn xe giường nằm và limousine đời mới (sản xuất từ 2022 trở lại đây).
- Trang bị đầy đủ thiết bị an toàn: búa thoát hiểm, bình chữa cháy, camera giám sát hành trình.
- Hệ thống điều hòa, wifi, cổng sạc USB được bảo trì thường xuyên.

[QUY TRÌNH AN TOÀN NGHIÊM NGẶT]
- Kiểm tra xe trước mỗi chuyến đi (dầu, nước, lốp, phanh, đèn).
- Bảo dưỡng định kỳ 3 tháng/lần tại xưởng chính hãng.
- Tuân thủ nghiêm ngặt tốc độ và luật giao thông đường bộ.

[SỰ HÀI LÒNG CỦA KHÁCH HÀNG]
- Hơn 40 triệu lượt khách đã tin tưởng và sử dụng dịch vụ.
- Đạt danh hiệu "Thương hiệu uy tín" do người tiêu dùng bình chọn năm 2025.
    `,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800",
    date: "25/10/2026",
    category: "Thông báo"
  },
  {
    id: "12",
    title: "TOP 5 ĐỊA ĐIỂM DU LỊCH MIỀN TÂY KHÔNG THỂ BỎ LỠ",
    summary: "Miền Tây sông nước với những cánh đồng lúa bát ngát và vườn trái cây trĩu quả đang chờ đón bạn khám phá.",
    content: `
[1. CHỢ NỔI CÁI RĂNG - CẦN THƠ]
- Nét văn hóa đặc trưng của miền Tây sông nước.
- Thời điểm đẹp nhất: Từ 5h - 7h sáng.
- Trải nghiệm: Ngồi xuồng ba lá ăn sáng, uống cà phê trên sông.

[2. CÙ LAO THỚI SƠN - TIỀN GIANG]
- Cách trung tâm TP.HCM khoảng 70km.
- Nổi tiếng với vườn trái cây sum suê, các homestay sinh thái.
- Hoạt động: Đi xe ngựa, chèo xuồng, thưởng thức đờn ca tài tử.

[3. KHU DU LỊCH SINH THÁI GÁO GIỒNG - ĐỒNG THÁP]
- Khu bảo tồn đất ngập nước với hệ sinh thái phong phú.
- Hoạt động: Đi xuồng xuyên rừng tràm, ngắm chim, câu cá.

[4. CỒN SƠN - CẦN THƠ]
- Cù lao nhỏ nằm giữa sông Hậu.
- Nổi tiếng với du lịch cộng đồng, vườn trái cây và các món ăn dân dã.

[5. KHU BẢO TỒN LUNG NGỌC HOÀNG - HẬU GIANG]
- "Lá phổi xanh" của miền Tây.
- Hệ động thực vật đa dạng, không khí trong lành.
    `,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800",
    date: "20/10/2026",
    category: "Cẩm nang"
  }
];