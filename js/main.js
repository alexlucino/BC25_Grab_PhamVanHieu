const GRABX_1 = 8000; //tiền km đầu
const GRABX_2 = 7500; //tiền km 1 - 19
const GRABX_3 = 7000; //tiền km > 19
const GRABX_WAIT = 2000; //tiền chờ

const GRAB_SUV_1 = 9000;
const GRAB_SUV_2 = 8500;
const GRAB_SUV_3 = 8000;
const GRAB_SUV_WAIT = 3000;

const GRAB_BLACK_1 = 10000;
const GRAB_BLACK_2 = 9500;
const GRAB_BLACK_3 = 9000;
const GRAB_BLACK_WAIT = 3500;

var tienCho = 0;
var tienKm_1 = 0;
var tienKm_2 = 0;
var tienKm_3 = 0;
var tongTien = 0;
var giaKm1 = 0;
var giaKm2 = 0;
var giaKm3 = 0;
var giaCho;

function layLoaiXe() {
  var grabX = document.getElementById("grabX");
  var grabSUV = document.getElementById("grabSUV");
  var grabBlack = document.getElementById("grabBlack");
  var loaiXe = "";

  if (grabX.checked) {
    loaiXe = "grabX";
    giaKm1 = GRABX_1;
    giaKm2 = GRABX_2;
    giaKm3 = GRABX_3;
    giaCho = GRABX_WAIT;
  } else if (grabSUV.checked) {
    loaiXe = "grabSUV";
    giaKm1 = GRAB_SUV_1;
    giaKm2 = GRAB_SUV_2;
    giaKm3 = GRAB_SUV_3;
    giaCho = GRAB_SUV_WAIT;
  } else if (grabBlack.checked) {
    loaiXe = "grabBlack";
    giaKm1 = GRAB_BLACK_1;
    giaKm2 = GRAB_BLACK_2;
    giaKm3 = GRAB_BLACK_3;
    giaCho = GRAB_BLACK_WAIT;
  }

  return loaiXe;
}
function tinhKm_1(soKm, giaKm) {
  var kq = soKm * giaKm;
  return kq;
}
function tinhKm_2(soKm, giaKm) {
  var kq = (soKm - 1) * giaKm;
  return kq;
}
function tinhKm_3(soKm, giaKm) {
  var kq = (soKm - 19) * giaKm;
  return kq;
}
function tinhGiaCho(tgCho, giaCho) {
  var kq = 0;
  if (tgCho >= 3) {
    kq = Math.floor(tgCho / 3) * giaCho;
  }
  return kq;
}
function tinhTienChiTiet(soKm, tgCho, giaCho, giaKm_1, giaKm_2, giaKm_3) {
  if (0 <= soKm && soKm <= 1) {
    //Tính tiền chờ
    //Tính tiền km
    //Tính tổng tiền
    tienCho = tinhGiaCho(tgCho, giaCho);
    tienKm_1 = tinhKm_1(soKm, giaKm_1);
    tongTien = tienCho + tienKm_1;
  } else if (1 < soKm && soKm <= 19) {
    tienCho = tinhGiaCho(tgCho, giaCho);
    tienKm_1 = tinhKm_1(1, giaKm_1);
    tienKm_2 = tinhKm_2(soKm, giaKm_2);
    tongTien = tienCho + tienKm_1 + tienKm_2;
  } else if (soKm > 19) {
    tienCho = tinhGiaCho(tgCho, giaCho);
    tienKm_1 = tinhKm_1(1, giaKm_1);
    tienKm_2 = tinhKm_2(19, giaKm_2);
    tienKm_3 = tinhKm_3(soKm, giaKm_3);
    tongTien = tienCho + tienKm_1 + tienKm_2 + tienKm_3;
  } else {
    console.log("Số Km không hợp lệ!");
  }
}

document.getElementById("btnTinhTien").onclick = function () {
  var soKm = document.getElementById("soKm").value;
  var thoiGianCho = document.getElementById("thoiGianCho").value;

  var loaiXe = layLoaiXe();

  switch (loaiXe) {
    case "grabX":
      //tính tiền
      tinhTienChiTiet(soKm, thoiGianCho, GRABX_WAIT, GRABX_1, GRABX_2, GRABX_3);

      document.getElementById("divThanhTien").style.display = "block";
      break;
    case "grabSUV":
      //tính tiền
      tinhTienChiTiet(
        soKm,
        thoiGianCho,
        GRAB_SUV_WAIT,
        GRAB_SUV_1,
        GRAB_SUV_2,
        GRAB_SUV_3
      );
      document.getElementById("divThanhTien").style.display = "block";
      break;
    case "grabBlack":
      //tính tiền
      tinhTienChiTiet(
        soKm,
        thoiGianCho,
        GRAB_BLACK_WAIT,
        GRAB_BLACK_1,
        GRAB_BLACK_2,
        GRAB_BLACK_3
      );
      document.getElementById("divThanhTien").style.display = "block";
      break;

    default:
      //thông báo chọn loại xe
      alert("Chưa chọn loại xe");

      break;
  }

  document.getElementById("xuatTien").innerHTML = tongTien;
};

document.getElementById("btnInHoaDon").onclick = function () {
  var soKm = document.getElementById("soKm").value;
  var thoiGianCho = document.getElementById("thoiGianCho").value;
  var content = "";
  if (tongTien > 0) {
    // In Hóa Đơn
    if (0 < soKm && soKm <= 1) {
      content += "<tr>";
      content += "<td>KM ĐẦU TIÊN</td>";
      content += "<td>" + soKm + "</td>";
      content += "<td>" + giaKm1 + "</td>";
      content += "<td>" + tienKm_1 + "</td>";
      content += "</tr>";
      content += "<tr>";
      content += "<td>Thời Gian Chờ</td>";
      content += "<td>" + thoiGianCho + "</td>";
      content += "<td>" + giaCho + "</td>";
      content += "<td>" + tienCho + "</td>";
      content += "</tr>";
      content += "<tr>";
      content += "<td></td>";
      content += "<td></td>";
      content += "<td></td>";
      content += "<td>Tổng Tiền: " + tongTien + "</td>";
      content += "</tr>";
    } else if (soKm <= 19) {
      content += "<tr>";
      content += "<td>KM ĐẦU TIÊN</td>";
      content += "<td>1</td>";
      content += "<td>" + giaKm1 + "</td>";
      content += "<td>" + tienKm_1 + "</td>";
      content += "</tr>";
      content += "<tr>";
      content += "<td>Từ 1 đến 19</td>";
      content += "<td>" + (soKm - 1) + "</td>";
      content += "<td>" + giaKm2 + "</td>";
      content += "<td>" + tienKm_2 + "</td>";
      content += "</tr>";
      content += "<tr>";
      content += "<td>Thời Gian Chờ</td>";
      content += "<td>" + thoiGianCho + "</td>";
      content += "<td>" + giaCho + "</td>";
      content += "<td>" + tienCho + "</td>";
      content += "</tr>";
      content += "<tr>";
      content += "<td></td>";
      content += "<td></td>";
      content += "<td></td>";
      content += "<td>Tổng Tiền: " + tongTien + "</td>";
      content += "</tr>";
    } else {
      content += "<tr>";
      content += "<td>KM ĐẦU TIÊN</td>";
      content += "<td>1</td>";
      content += "<td>" + giaKm1 + "</td>";
      content += "<td>" + tienKm_1 + "</td>";
      content += "</tr>";
      content += "<tr>";
      content += "<td>Từ 1 đến 19</td>";
      content += "<td>18</td>";
      content += "<td>" + giaKm2 + "</td>";
      content += "<td>" + tienKm_2 + "</td>";
      content += "</tr>";
      content += "<tr>";
      content += "<td>Từ 19 đến " + soKm + "</td>";
      content += "<td>" + (soKm - 19) + "</td>";
      content += "<td>" + giaKm3 + "</td>";
      content += "<td>" + tienKm_3 + "</td>";
      content += "</tr>";
      content += "<tr>";
      content += "<td>Thời Gian Chờ</td>";
      content += "<td>" + thoiGianCho + "</td>";
      content += "<td>" + giaCho + "</td>";
      content += "<td>" + tienCho + "</td>";
      content += "</tr>";
      content += "<tr>";
      content += "<td></td>";
      content += "<td></td>";
      content += "<td></td>";
      content += "<td>Tổng Tiền: " + tongTien + "</td>";
      content += "</tr>";
    }
  } else {
    alert("Chưa tính tiền");
    // Đóng modal
    // document.getElementById("close").click;
    // setTimeout(function () {
    //   document.getElementById("close").click();
    // }, 0);
  }
  document.getElementById("tbody").innerHTML = content;
};
