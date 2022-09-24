function DSNV() {
    this.arr = [];

    this.themNV = function (nv) {
        this.arr.push(nv)
    };

    this.viTriNV = function (tknv) {
        var index = -1;
        this.arr.forEach(function (nv, i) {
            if (nv.tknv === tknv) {
                index = i;
            }
        });
        return index;
    };

    this.getInfo = function (tknv) {
        var index = this.viTriNV(tknv);
        if (index !== -1) {
            return this.arr[index];
        }
        return null;
    };

    this.xoaNV = function (tknv) {
        var index = this.viTriNV(tknv);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    this.suaNV = function (nv) {
        var index = this.viTriNV(nv.tknv);
        if (index !== -1) {
            this.arr[index] = nv;
        }
    };

    this.timKiemNV = function (keyword) {
        var mangTimkKiem = [];
        this.arr.forEach(function (nv) {
            var loaiNV = nv.xepLoai.toLowerCase();
            var txtSearch = keyword.toLowerCase();
            if (loaiNV.indexOf(txtSearch) !== -1) {
                mangTimkKiem.push(nv);
            }
        })
        return mangTimkKiem;
    };
}