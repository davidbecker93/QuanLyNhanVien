function nhanVien(
    _tknv,
    _name,
    _email,
    _pass,
    _date,
    _luongCB,
    _chucvu,
    _gioLam
) {
    this.tknv = _tknv;
    this.name = _name;
    this.email = _email;
    this.pass = _pass;
    this.date = _date;
    this.luongCB = _luongCB;
    this.chucvu = _chucvu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = 0;

    this.tinhTongLuong = function () {
        switch (this.chucvu) {
            case "Sếp":
                this.tongLuong = parseFloat(this.luongCB) * 3;
                break;
            case "Trưởng phòng":
                this.tongLuong = parseFloat(this.luongCB) * 2;
                break;
            default:
                this.tongLuong = parseFloat(this.luongCB);
                break;
        }
    };

    this.xepLoaiNV = function () {
        if (this.gioLam >= 192) {
            this.xepLoai = "Xuất sắc";
        } else if (this.gioLam < 192 && this.gioLam >= 176) {
            this.xepLoai = "Giỏi";
        } else if (this.gioLam < 176 && this.gioLam >= 160) {
            this.xepLoai = "Khá";
        } else {
            this.xepLoai = "Trung Bình";
        }
    };
}