function Validation() {
    this.checkEmpty = function (value, divError, mess) {
        if (value === "") {
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = "block";
            return false;
        }
        getEle(divError).innerHTML = "";
        getEle(divError).style.display = "none";
        return true;
    };

    this.doDaiKiTu = function (value, divError, mess, min, max) {
        if (min <= value.length && value.length <= max) {
            getEle(divError).innerHTML = "";
            getEle(divError).style.display = "none";
            return true;
        }
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    };

    this.chuoiKiTu = function (value, divError, mess) {
        var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            getEle(divError).innerHTML = "";
            getEle(divError).style.display = "none";
            return true;
        }
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    };

    this.checkEmail = function (value, divError, mess) {
        var letter = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (value.match(letter)) {
            getEle(divError).innerHTML = "";
            getEle(divError).style.display = "none";
            return true;
        }
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    };

    this.checkPass = function (value, divError, mess) {
        var letter = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{6,10}$/;
        if (value.match(letter)) {
            getEle(divError).innerHTML = "";
            getEle(divError).style.display = "none";
            return true;
        }
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    };
    this.checkluongNV = function (value, divError, mess, min, max) {
        if (min <= value && value <= max) {
            getEle(divError).innerHTML = "";
            getEle(divError).style.display = "none";
            return true;
        }
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    };
    this.checkGioLam = function (value, divError, mess, min, max) {
        if (min <= value && value <= max) {
            getEle(divError).innerHTML = "";
            getEle(divError).style.display = "none";
            return true;
        }
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    };
    this.checkMaNV = function (value,divError,mess,arr) {
        isExist = false;
        for (i = 0; i < arr.length; i++) {
            var sv = arr[i];
            if (nv.maNV === value) {
                isExist = true;
                break;
            }
        }

        if (isExist) {
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = "block";
            return false;
        }
        getEle(divError).innerHTML = "";
        getEle(divError).style.display = "none";
        return true;
    };
}