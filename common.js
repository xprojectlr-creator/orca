// Helper bersama untuk index.html dan harga.html (tanpa library)
var NOMOR_WA = "6285155070692";
var KATEGORI = ['Matic', 'Sport', 'Bebek'];
var PESAN_UMUM = "Halo Dion Prayoga, saya mau tanya-tanya motor Honda di Daya Motor Cibiru.";

function $(id) { return document.getElementById(id); }

function dataMotor() { return window.DATA_MOTOR || {}; }

function formatRupiah(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

function formatSingkat(n) {
  n = Number(n);
  if (n >= 1000000) return 'Rp ' + (n / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' jt';
  return 'Rp ' + Math.round(n / 1000) + ' rb';
}

function kategori(nama) {
  const n = nama.toUpperCase();
  if (/REVO|SUPRA|SUPERCUB|CT 125|DAX|MONKEY/.test(n)) return 'Bebek';
  if (/VERZA|SONIC|CB ?150|CBR|CRF/.test(n)) return 'Sport';
  return 'Matic';
}

function modelPerKategori(kat) {
  const data = dataMotor();
  return Object.keys(data)
    .filter(function(k) { return kategori(k) === kat && data[k] && data[k].harga && data[k].tabel; })
    .sort(function(a, b) { return data[a].harga - data[b].harga; });
}

// Semua link WhatsApp berupa <a href="https://wa.me/..."> biasa; JS hanya menambahkan teks pesan
function waUrl(pesan) {
  return "https://wa.me/" + NOMOR_WA + (pesan ? "?text=" + encodeURIComponent(pesan) : "");
}

function initKontak() {
  document.querySelectorAll('[data-wa]').forEach(function(a) { a.href = waUrl(PESAN_UMUM); });
}

function el(tag, cls, teks) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (teks) e.textContent = teks;
  return e;
}
