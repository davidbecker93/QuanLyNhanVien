/** Global Variable */
var arr = [];
var dsnv = new DSNV();
var validation = new Validation();
var currentFormat = new Intl.NumberFormat("VN-vn");
const alertElement = document.querySelector(".alert");
/** Call function */
getLocalStorage();

/** Local storage */
function setLocalStorage() {
    var dataString = JSON.stringify(dsnv.arr);
    localStorage.setItem("DSNV", dataString);
}
function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        dsnv.arr = JSON.parse(dataString);
        renderTable(dsnv.arr);
    }
}

/** Function */
function getEle(id) {
    return document.getElementById(id);
}

function layThongTin(isAdd) {
    var tknv = getEle("tknv").value;
    var name = getEle("name").value;
    var email = getEle("email").value;
    var pass = getEle("password").value;
    var date = getEle("datepicker").value;
    var luongCB = getEle("luongCB").value;
    var chucvu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value;
    isValid = true;
    //check validation
    if (isAdd){
        isValid &= validation.checkEmpty(tknv, "tbTKNV", "(*)Vui lòng nhập vào mã TKNV") && validation.doDaiKiTu(tknv, "tbTKNV", "(*)TKNV phải có từ 4-6 chữ số", 4, 6);
    }
    isValid &= validation.checkEmpty(name, "tbTen", "(*)Vui lòng nhập tên NV") && validation.chuoiKiTu(name, "tbTen", "(*)Vui lòng nhập tên NV là chữ");
    isValid &= validation.checkEmpty(email, "tbEmail", "(*)Vui lòng nhập Email") && validation.checkEmail(email, "tbEmail", "(*)Vui lòng nhập đúng định dạng Email");
    isValid &= validation.checkEmpty(pass, "tbMatKhau", "(*)Vui lòng nhập mật khẩu") && validation.checkPass(pass, "tbMatKhau", "(*)Mật khẩu phải có 6-10 kí tự, có 01 kí tự in hoa, chữ số và ký tự đặc biệt");
    isValid &= validation.checkEmpty(date, "datepicker", "(*)Vui lòng không để trống");
    if (isValid) {
        var nv = new nhanVien(tknv, name, email, pass, date, luongCB, chucvu, gioLam);
        nv.tinhTongLuong();
        nv.xepLoaiNV();
        return nv;
    }
    return null;
}
getEle("btnThem").addEventListener("click", function () {
    resetForm();
    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "inline-block";
})

getEle("btnThemNV").addEventListener("click", function () {
    var nv = layThongTin(true);
    displayAlert("Không thể thêm được nhân viên", "danger");
    if (nv) {
        dsnv.themNV(nv);
        renderTable(dsnv.arr);
        resetForm();
        setLocalStorage();
        displayAlert("Đã thêm thành công", "success");
    }
})

function renderTable(data) {
    content = "";

    data.forEach(function (nv) {
        content += `
        <tr>
        <td>${nv.tknv}</td>
        <td>${nv.name}</td>
        <td>${nv.email}</td>
        <td>${nv.date}</td>
        <td>${nv.chucvu}</td>
        <td>${currentFormat.format(nv.tongLuong)}</td>
        <td>${nv.xepLoai}</td>
        <td>
        <button data-toggle="modal" data-target="#myModal" onclick="editNV('${nv.tknv}')" type="button" class="edit-btn"><i class="fa fa-pencil-square-o"></i></button>
        <button onclick="deleteNV('${nv.tknv}')" type="button" class="delete-btn"><i class="fa fa-trash"></i></button>
        </td>
        </tr>
        `;
    });
    getEle("tableDanhSach").innerHTML = content;
}
function editNV(tknv) {
    var nv = dsnv.getInfo(tknv);
    if (nv) {
        getEle("tknv").value = nv.tknv;
        getEle("tknv").disabled = true;
        getEle("name").value = nv.name;
        getEle("email").value = nv.email;
        getEle("password").value = nv.pass;
        getEle("datepicker").value = nv.date;
        getEle("luongCB").value = nv.luongCB;
        getEle("chucvu").value = nv.chucvu;
        getEle("gioLam").value = nv.gioLam;
        getEle("btnCapNhat").style.display = "inline-block";
        getEle("btnThemNV").style.display = "none";
    }
    getEle("btnCapNhat").addEventListener("click", function () {
        var nv = layThongTin(false);
        dsnv.suaNV(nv);
        renderTable(dsnv.arr);
        displayAlert("Đã cập nhật thành công", "success");
        setLocalStorage();
    });
}
function deleteNV(tknv) {
    dsnv.xoaNV(tknv);
    renderTable(dsnv.arr);
    setLocalStorage();
}
function resetForm() {
    getEle("tknv").disabled = false;
    getEle("tknv").value = "";
    getEle("name").value = "";
    getEle("email").value = "";
    getEle("password").value = "";
    getEle("datepicker").value = "";
    getEle("luongCB").value = "";
    getEle("chucvu").value = "Chọn chức vụ";
    getEle("gioLam").value = "";
    getEle("tbTKNV").style.display = "none";
    getEle("tbTen").style.display = "none";
    getEle("tbEmail").style.display = "none";
    getEle("tbMatKhau").style.display = "none";
    getEle("tbNgay").style.display = "none";
    getEle("tbLuongCB").style.display = "none";
    getEle("tbChucVu").style.display = "none";
    getEle("tbGiolam").style.display = "none";
}
getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNV(keyword);
    renderTable(mangTimKiem);
})

function displayAlert(text, action) {
    alertElement.innerText = text;
    alertElement.classList.add(`alert-${action}`);
    // remove alert
    setTimeout(function () {
        alertElement.innerText = "";
        alertElement.classList.remove(`alert-${action}`);
    }, 1000);
}