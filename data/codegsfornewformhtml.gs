/** ===== KONFIGURASI ===== */
const SPREADSHEET_ID = '17GDaSRDjcP617eAfubFbhxTz6e4MG8JX_anAPpdYbZQ'; 
const SHEET_NAME = 'Data Investasi';
const SIGNATURE_FOLDER_ID = '1ZmDw3MkR_l-6dQKDOvlgUdBTcpu0_qvp'; 

/**
 * Fungsi utama untuk Web App
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Jika sheet belum ada, buat sheet baru dengan header
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      const headers = [
        'Timestamp', 'Nama Lengkap', 'Alamat', 'Nama Perusahaan', 'Alamat Perusahaan', 'Email', 
        'No HP / Whatsapp', 'Sektor', 'Sektor Lainnya', 'Lokasi', 'Jenis Usaha', 
        'Luasan', 'Nilai Investasi', 'Tanda Tangan URL'
      ];
      sheet.appendRow(headers);
    }
    
    // Menyimpan tanda tangan ke Google Drive
    let signatureUrl = '';
    if (data.tanda_tangan_base64) {
      const base64Data = data.tanda_tangan_base64.split(',')[1];
      const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), 'image/jpeg', 'TandaTangan-' + new Date().getTime() + '.jpg');
      const folder = DriveApp.getFolderById(SIGNATURE_FOLDER_ID);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      signatureUrl = file.getUrl();
    }
    
    // Mengolah sektor menjadi string
    const sektor = Array.isArray(data.sektor) ? data.sektor.join(', ') : data.sektor;

    // Menambahkan baris data baru ke sheet
    sheet.appendRow([
      new Date(),
      data.nama || '',
      data.alamat || '',
      data.nama_perusahaan || '',
      data.alamat_perusahaan || '',
      data.email || '',
      data.kontak || '',
      sektor || '',
      data.sektor_lainnya || '',
      data.lokasi || '',
      data.jenis_usaha || '',
      data.luasan || '',
      data.nilai_investasi || '',
      signatureUrl || ''
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, message: 'Data berhasil disimpan' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log(err);
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * CORS (opsional kalau di-host luar)
 */
function doGet(e) {
  return ContentService.createTextOutput("Formulir aktif.").setMimeType(ContentService.MimeType.TEXT);
}