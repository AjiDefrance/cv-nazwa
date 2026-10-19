/* Generator PDF CV — murni JavaScript, tanpa library eksternal.
   Menghasilkan PDF valid yang bisa diunduh langsung dari browser. */
(function () {
  "use strict";

  var NAVY = [0.055, 0.106, 0.173];
  var GOLD = [0.788, 0.635, 0.294];
  var DARK = [0.17, 0.17, 0.17];
  var GREY = [0.38, 0.4, 0.44];
  var WHITE = [1, 1, 1];

  function esc(s) {
    return String(s)
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/[\u2022]/g, "*")
      .replace(/[^\x20-\x7E]/g, "")
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");
  }

  function build() {
    var W = 595.28, H = 841.89;
    var pages = [], ops = [], y = 0;

    function text(x, yTop, str, font, size, color) {
      ops.push(
        "BT /" + font + " " + size + " Tf " + color.join(" ") + " rg " +
        x.toFixed(2) + " " + yTop.toFixed(2) + " Td (" + esc(str) + ") Tj ET"
      );
    }

    function rect(x, yTop, w, h, color) {
      ops.push(color.join(" ") + " rg " + x + " " + yTop + " " + w + " " + h + " re f");
    }

    // Perkiraan lebar teks Helvetica rata-rata 0.52 * ukuran huruf
    function wrap(str, size, maxWidth) {
      var words = String(str).split(" "), lines = [], cur = "";
      for (var i = 0; i < words.length; i++) {
        var test = cur ? cur + " " + words[i] : words[i];
        if (test.length * size * 0.52 > maxWidth && cur) {
          lines.push(cur);
          cur = words[i];
        } else {
          cur = test;
        }
      }
      if (cur) lines.push(cur);
      return lines;
    }

    function newPage(first) {
      ops = [];
      pages.push(ops);
      if (first) {
        rect(0, H - 132, W, 132, NAVY);
        rect(0, H - 136, W, 4, GOLD);
        y = H - 176;
      } else {
        rect(0, H - 60, W, 60, NAVY);
        rect(0, H - 64, W, 4, GOLD);
        text(40, H - 40, "CV - Nazwa Anisa Salahudin", "F2", 11, WHITE);
        y = H - 100;
      }
    }

    function need(h) {
      if (y - h < 70) newPage(false);
    }

    function section(label) {
      need(58);
      y -= 10;
      text(40, y, label.toUpperCase(), "F2", 9, GOLD);
      y -= 8;
      ops.push(GOLD.join(" ") + " RG 1.2 w 40 " + y.toFixed(2) + " m 200 " + y.toFixed(2) + " l S");
      y -= 24;
    }

    function kv(label, value) {
      var lines = wrap(value, 10.5, 400);
      need(lines.length * 15 + 6);
      text(40, y, label, "F2", 10.5, NAVY);
      for (var i = 0; i < lines.length; i++) {
        text(190, y, lines[i], "F1", 10.5, DARK);
        y -= 15;
      }
      y -= 4;
    }

    function item(title, meta, desc) {
      var lines = wrap(desc, 10.5, 400);
      need(lines.length * 15 + 40);
      rect(40, y - 4, 4, 4, GOLD);
      text(54, y, title, "F2", 11.5, NAVY);
      y -= 15;
      if (meta) {
        text(54, y, meta, "F3", 9.5, GOLD);
        y -= 15;
      }
      for (var i = 0; i < lines.length; i++) {
        text(54, y, lines[i], "F1", 10.5, GREY);
        y -= 14.5;
      }
      y -= 14;
    }

    // ---------- Halaman 1: header ----------
    newPage(true);
    text(40, H - 62, "CURRICULUM VITAE", "F2", 10, GOLD);
    text(40, H - 98, "Nazwa Anisa Salahudin", "F2", 26, WHITE);
    text(40, H - 118, "Siswa SMKN Sukaresik - Jaringan Komputer", "F1", 12, [0.77, 0.8, 0.86]);

    section("Biodata");
    kv("Nama Lengkap", "Nazwa Anisa Salahudin");
    kv("Tempat, Tanggal Lahir", "Jakarta, 06 Januari 2009");
    kv("Alamat", "KP Pasantren, Kecamatan Sukaresik, Kabupaten Tasikmalaya");
    kv("Pendidikan Terakhir", "SMKN Sukaresik (Sedang Berjalan)");
    kv("Minat", "Jaringan komputer dan administrasi sistem");

    section("Pendidikan");
    item("SMKN Sukaresik", "Sedang Berjalan",
      "Sekolah Menengah Kejuruan - memperdalam bidang teknologi informasi dan jaringan komputer melalui praktik langsung di laboratorium.");
    item("SMPN Sukaresik", "Selesai",
      "Sekolah Menengah Pertama Negeri - menyelesaikan pendidikan tingkat menengah dengan pembelajaran dasar sains dan teknologi.");
    item("SDN 2 Sukaratu", "Selesai",
      "Sekolah Dasar Negeri - menempuh pendidikan dasar dan membangun fondasi akademik.");

    section("Pengalaman & Proyek");
    item("Mengkonfigurasi MikroTik", "Proyek Jaringan",
      "Melakukan konfigurasi dasar router MikroTik meliputi pengaturan IP address, DHCP server, NAT, dan firewall rule untuk kebutuhan jaringan lokal.");
    item("Membuat Topologi Jaringan", "Perencanaan Jaringan",
      "Merancang dan menyusun topologi jaringan secara sistematis, mulai dari penentuan posisi perangkat, pengalamatan IP, hingga alur koneksi antar host.");
    item("Kemampuan Microsoft Excel", "Dokumentasi",
      "Menggunakan Microsoft Excel untuk mendokumentasikan data jaringan, seperti inventarisasi perangkat, daftar alamat IP, dan rekap konfigurasi secara rapi.");

    section("Keahlian");
    var skills = ["Konfigurasi MikroTik", "Perancangan Topologi", "Microsoft Excel",
      "Pengelolaan Data Jaringan", "Dasar TCP/IP"];
    var row = "";
    for (var i = 0; i < skills.length; i++) {
      var add = row ? row + "   |   " + skills[i] : skills[i];
      if (add.length * 10 * 0.52 > 420) {
        need(20);
        text(40, y, row, "F1", 10, DARK);
        y -= 17;
        row = skills[i];
      } else {
        row = add;
      }
    }
    if (row) { need(20); text(40, y, row, "F1", 10, DARK); y -= 17; }

    // ---------- Susun objek PDF ----------
    var contents = pages.map(function (o) { return o.join("\n"); });
    var n = contents.length;
    var objCount = 5 + 2 * n;
    var kids = [];
    for (var p = 0; p < n; p++) kids.push((6 + p * 2) + " 0 R");

    var out = "%PDF-1.4\n";
    var offsets = [];

    function push(id, body) {
      offsets[id] = out.length;
      out += id + " 0 obj\n" + body + "\nendobj\n";
    }

    push(1, "<< /Type /Catalog /Pages 2 0 R >>");
    push(2, "<< /Type /Pages /Kids [" + kids.join(" ") + "] /Count " + n + " >>");
    push(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    push(4, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    push(5, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>");

    for (var k = 0; k < n; k++) {
      var pid = 6 + k * 2, cid = pid + 1;
      push(pid, "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + W + " " + H + "] " +
        "/Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents " + cid + " 0 R >>");
      push(cid, "<< /Length " + contents[k].length + " >>\nstream\n" + contents[k] + "\nendstream");
    }

    var xrefPos = out.length;
    out += "xref\n0 " + (objCount + 1) + "\n0000000000 65535 f \n";
    for (var q = 1; q <= objCount; q++) {
      out += ("0000000000" + offsets[q]).slice(-10) + " 00000 n \n";
    }
    out += "trailer\n<< /Size " + (objCount + 1) + " /Root 1 0 R >>\nstartxref\n" + xrefPos + "\n%%EOF";

    // Semua karakter dijamin ASCII sehingga panjang string = panjang byte
    var bytes = new Uint8Array(out.length);
    for (var b = 0; b < out.length; b++) bytes[b] = out.charCodeAt(b) & 0xff;
    return bytes;
  }

  function download() {
    var bytes = build();
    var blob = new Blob([bytes], { type: "application/pdf" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "CV-Nazwa-Anisa-Salahudin.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function print() {
    window.print();
  }

  window.CvPdf = { download: download, print: print };

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".js-download").forEach(function (el) {
      el.addEventListener("click", download);
    });
    document.querySelectorAll(".js-print").forEach(function (el) {
      el.addEventListener("click", print);
    });
  });
})();
