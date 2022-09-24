/** Global Variable */
var arr = [];
var dsnv = new DSNV();
var validation = new Validation();
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

function layThongTin() {
    var tknv = getEle("tknv").value;
    var name = getEle("name").value;
    var email = getEle("email").value;
    var pass = getEle("password").value;
    var date = getEle("datepicker").value;
    var luongCB = getEle("luongCB").value;
    var chucvu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value;
    isValid = true;
    isValid &= validation.checkEmpty(tknv, "tbTKNV", "(*)Vui lòng nhập đúng mã NV");
    isValid &= validation.checkEmpty(name, "tbTen", "(*)Vui lòng nhập tên NV");
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
    var nv = layThongTin();
    if (nv) {
        dsnv.themNV(nv);
        renderTable(dsnv.arr);
        resetForm();
        setLocalStorage();
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
        <td>${nv.tongLuong}</td>
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
        var nv = layThongTin();
        dsnv.suaNV(nv);
        renderTable(dsnv.arr);
        //        resetForm();
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
}
getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNV(keyword);
    renderTable(mangTimKiem);
})