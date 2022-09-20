/** Global Variable */
var arr = [];
var dsnv = new DSNV();
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
    var tknv = +getEle("tknv").value;
    var name = getEle("name").value;
    var email = getEle("email").value;
    var pass = getEle("password").value;
    var date = getEle("datepicker").value;
    var luongCB = +getEle("luongCB").value;
    var chucvu = getEle("chucvu").value;
    var gioLam = +getEle("gioLam").value;
    var nv = new nhanVien(tknv, name, email, pass, date, luongCB, chucvu, gioLam);
    nv.tinhTongLuong();
    nv.xepLoaiNV();
    return nv;
}

function themNhanVien() {
    var nv = layThongTin();
    if (nv) {
        dsnv.themNV(nv);
        renderTable(dsnv.arr);
        setLocalStorage();
    }
}
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
        // getEle("tknv").disabled = true;
        getEle("name").value = nv.name;
        getEle("email").value = nv.email;
        getEle("password").value = nv.pass;
        getEle("datepicker").value = nv.date;
        getEle("luongCB").value = nv.luongCB;
        getEle("chucvu").value = nv.chucvu;
        getEle("gioLam").value = nv.gioLam;
    }
    getEle("btnCapNhat").addEventListener("click", function () {
        var nv = layThongTin();
        dsnv.suaNV(nv);
        renderTable(dsnv.arr);
        setLocalStorage();
    });
}
function deleteNV(tknv) {
    dsnv.xoaNV(tknv);
    renderTable(dsnv.arr);
    setLocalStorage();
}
// function resetForm() {
//     form.reset();
// }