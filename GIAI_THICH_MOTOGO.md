# MotoGo — Giải thích Landing Page & Tại sao chọn Rialo

> Tài liệu để anh đọc hiểu và thuyết trình lại cho người khác.
> Cập nhật: 2026-11-10 · Link: https://motogo-insurance.vercel.app

---

## Câu chốt 1 dòng

**MotoGo = bảo hiểm xe máy mà bồi thường trong ~90 giây: chụp ảnh hư hỏng → 4 con AI xử lý → tiền USDC vào ví ngay, không nhân viên, không giấy tờ.**

---

# PHẦN 1 — Nội dung Landing Page (từ trên xuống)

### 1. Hero (khu đầu trang)
- **Tiêu đề lớn**: "Bồi thường trong 90 giây, không phải 4 tuần." → bán điểm mạnh nhất: tốc độ.
- **Nhãn xanh nhấp nháy "Live on Ethereum Sepolia"**: app chạy thật trên mạng thử nghiệm Sepolia (không phải hình vẽ demo).
- **2 nút**: *View plans* (xem gói) · *File a claim* (nộp yêu cầu bồi thường).
- **Thẻ "Verdict" bên phải** = 1 phán quyết mẫu: xe máy, hư đèn + gương trái, độ tin cậy 87%, xử lý 1 phút 24 giây, **42 USDC**, có chữ ký xác thực on-chain. Mục đích: cho người xem thấy "sản phẩm ra cái gì" thay vì nói suông.
- **Hàng tick nhỏ**: Non-custodial (không ai giữ tiền hộ), hợp đồng đã audit, mọi khoản chi có bằng chứng on-chain, thanh toán bằng USDC.

### 2. Dải 4 số thống kê
`~90s` ảnh → phán quyết · `4` AI chạy nối tiếp · `48h` hạn tự hoàn tiền nếu lỗi · `USDC` thanh toán on-chain.

### 3. "A claims engine that never sleeps" — số liệu LIVE
- Con số chạy nhảy: **tổng tiền đã bồi thường, số claim đã xử lý, hợp đồng đang chạy, số rider**. Kèm **feed "Recent settlements"** tự nhảy thêm mỗi vài giây.
- ⚠️ **Khi thuyết trình**: đây là **số mô phỏng (minh hoạ)** cho giống website thật — KHÔNG phải dữ liệu thật trên chain. Trang có ghi "Illustrative" để trung thực.

### 4. 4 "value props"
94.3% claim duyệt tự động · bồi thường trung vị <2 phút · 0 tờ giấy · 24/7. (Số minh hoạ.)

### 5. Coverage — "Bảo hiểm những gì" (6 loại)
1. **Collision** – va chạm, ngã, đâm (hay gặp nhất)
2. **Theft** – mất trộm xe / tháo phụ tùng
3. **Third-party liability** – gây thiệt hại cho người/tài sản khác
4. **Fire & explosion** – cháy, chập điện, nổ
5. **Vandalism** – bị phá hoại khi đỗ (chi 1 phần)
6. **Weather damage** – ngập, bão, thiên tai (chi 1 phần)

### 6. Pipeline 4 AI — "trái tim" sản phẩm
Mỗi con làm 1 việc rồi chuyền tiếp:
1. **Extractor** – đọc ảnh: loại xe, biển số, bộ phận hư, mức độ.
2. **Verifier** – đối chiếu đăng kiểm, metadata ảnh (EXIF), thời tiết → chống gian lận.
3. **Estimator** – định giá sửa theo bảng giá phụ tùng, AI kiểm tra lại.
4. **Judge** – gộp 3 kết quả, áp luật từ chối, **ký phán quyết + đẩy lên chain**. Con này là **code cố định (không phải AI ngẫu nhiên)** vì bước đụng tiền phải chạy lại ra y hệt.

### 7. "File in 3 steps" — nộp claim 3 bước
1. Chụp ảnh hư hỏng (ảnh = toàn bộ hồ sơ).
2. 4 AI xác minh + định giá + ký, trong vài giây.
3. Tiền USDC vào ví ngay khi phán quyết được ký.

### 8. "Same product on two platforms" — bảng so sánh
Giải thích **tại sao code phức tạp**: blockchain hiện tại không tự chạm thế giới thật, phải lắp nhiều lớp phụ trợ. (Chi tiết ở Phần 2.)

### 9. Platform analytics — 3 biểu đồ
Đường tiền bồi thường theo tuần · hình tròn tỉ lệ loại claim · cột claim mỗi tháng. (Số minh hoạ, cho ra dáng trang phân tích của công ty bảo hiểm.)

### 10. Testimonials — lời rider
3 nhận xét (Lagos, São Paulo, Mumbai) — tạo niềm tin, cho thấy dùng toàn cầu. (Nội dung minh hoạ.)

### 11. Trust model — "thành thật về điểm yếu"
Bản Sepolia có **1 chỗ phải tin cậy**: backend giữ `ORACLE_ROLE` để nộp phán quyết. Bị chặn 3 lớp:
- Mọi phán quyết cần chữ ký hợp lệ, contract tự kiểm.
- Chi trả không vượt hạn mức còn lại của hợp đồng.
- Nếu backend chết, Chainlink tự hoàn tiền claim.
→ Lên Rialo lớp này biến mất (thành SCALE program).

### 12. Security & trust — 4 điểm
Hợp đồng đã audit · tiền non-custodial (contract giữ, không phải ví công ty) · mỗi khoản chi có chữ ký số chain kiểm được · tự hoàn tiền nếu hệ thống treo. → **"Không cần tin lời chúng tôi, tự kiểm trên chain được."**

### 13. FAQ — 6 câu
Bồi thường nhanh cỡ nào · ai giữ tiền · chống claim giả sao · bảo hiểm những gì · nước nào dùng được (toàn cầu, dùng USDC) · có phải bảo hiểm được cấp phép không (→ **là demo testnet, chưa phải sản phẩm cấp phép**).

### 14. CTA cuối
Mua gói bằng USDC thử nghiệm (free ở faucet.circle.com), nộp ảnh, cả luồng chạy dưới 2 phút.

### 15. Footer
Logo + mô tả, link Dashboard/Plans/File claim/Review, link hợp đồng Etherscan, faucet USDC, về Rialo. Dòng cuối: **"Testnet demo, not a real insurance product."**

---

# PHẦN 2 — Tại sao dự án hợp với Rialo hơn Sepolia

Vì **đúng 4 thứ app bảo hiểm này cần, blockchain thường (Sepolia) không tự làm được — còn Rialo làm native.**

## App này cần gì (bản chất)
1. **Chạm thế giới thật**: đọc ảnh bằng AI, tra đăng kiểm, lấy thời tiết, lưu bằng chứng IPFS.
2. **Hành động theo thời gian**: hết 48h mà chưa xử → tự hoàn tiền.
3. **Điều phối liên tục**: 4 agent chạy nối tiếp, phản ứng khi có claim mới.
4. **Chuyển tiền on-chain** theo phán quyết đã ký.

Smart contract thuần (EVM/Sepolia) **không gọi được ra ngoài, không tự hẹn giờ, không tự chạy** — chỉ thức dậy khi có người gửi transaction. Nên phải lắp đồ phụ trợ.

## Trên Sepolia phải "vá" bằng middleware

| Nhu cầu | Sepolia bắt phải có | Giá phải trả |
|---|---|---|
| Gọi AI/DMV/thời tiết | Chainlink Functions + subscription + mạng DON | phức tạp, tốn phí, chậm |
| Hẹn giờ 48h | Chainlink Automation + nạp LINK định kỳ | phải nuôi số dư LINK, hỏng là kẹt |
| Chạy 4 agent 24/7 | server Node.js riêng luôn bật | tốn hạ tầng, có điểm chết |
| Nộp phán quyết | backend giữ **ORACLE_ROLE** | **tập trung — phải TIN backend** |

→ Kết quả: **~2000 dòng, 5 service, và 1 điểm phải tin cậy (backend)**.

## Trên Rialo thì native — mất luôn lớp vá đó
- **Webcall ngay trong contract**: 1 dòng gọi API thật, không cần Chainlink Functions.
- **Timer trong contract**: hẹn 48h tự chạy, không cần Automation + LINK.
- **Reactive execution**: contract tự phản ứng theo sự kiện/thời gian, không cần server Node.js luôn bật.
- **SCALE program (trustless)**: logic oracle chạy minh bạch trên chain, **không ai phải giữ `ORACLE_ROLE`** → bỏ điểm tập trung.

→ Cùng sản phẩm còn **~500 dòng, 1 service, 0 thành phần phải tin cậy**.

## Vì sao đây là ví dụ "đắt" cho Rialo
Luồng claim **vừa event-driven (claim mới), vừa time-driven (deadline 48h), vừa cần dữ liệu thật (ảnh/thời tiết), vừa đụng tiền** — gom đủ 4 điểm yếu kinh điển của blockchain cũ vào 1 app nhỏ. Mỗi thứ Sepolia phải thêm 1 lớp trung gian (tốn tiền + điểm chết + phải-tin). Rialo xoá sạch bằng tính năng gốc.

**Chốt**: Không phải Rialo "nhanh hơn" chung chung — mà **đúng những chỗ app này buộc phải đi vòng, Rialo đi thẳng**: ít code hơn ~4 lần, bỏ Chainlink + server + LINK, và quan trọng nhất là **bỏ được thành phần phải tin cậy** → tiến gần "bảo hiểm không cần tin ai" thật sự.

---

# Khi thuyết trình nhớ 3 điều
1. **Điểm bán**: 4 tuần → 90 giây, tự động hoàn toàn, tiền vào ví ngay.
2. **Trung thực**: số liệu live + analytics + testimonials là **minh hoạ**; app là **demo testnet**, chưa phải bảo hiểm được cấp phép.
3. **Lý do kỹ thuật**: mọi lớp phức tạp tồn tại vì blockchain giờ chưa chạm thế giới thật được — **Rialo dọn sạch lớp đó**.
