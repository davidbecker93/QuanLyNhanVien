function Validation() {
    this.checkEmpty = function (value, divError, mess) {
        if (value === "") {
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = "block";
            return false
        }
        getEle(divError).innerHTML = "";
        getEle(divError).style.display = "none";
        return true;
    };
}