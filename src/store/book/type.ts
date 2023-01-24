export type Book = {
  id: string,
  nama: string,
  collation: string
}

export type CreateBookRequest = {
  id: string
  id_jurusan: string,
  id_mapel: string,
  id_kategori: string,
  id_penulis: string,
  id_penerbit: string,
  id_bahasa: string,
  id_gmd: string,
  nama: string,
  isbn: string,
  tahun_terbit: string,
  stok: number,
  notes: string,
  klasifikasi: string,
  edisi: string,
  no_telp: string,
  collation: string,
  cover: string,
  penulis: Array<{
    id: string,
    level: number,
    nama: string
  }>,
  subyek: Array<{
    id: string,
    nama: string,
  }>
}

export type ShowBookResponse = {
  id: string
  id_jurusan: string,
  id_mapel: string,
  id_kategori: string,
  id_penulis: string,
  id_penerbit: string,
  id_bahasa: string,
  id_gmd: string,
  nama: string,
  isbn: string,
  tahun_terbit: string,
  stok: number,
  notes: string,
  klasifikasi: string,
  edisi: string,
  no_telp: string,
  collation: string,
  cover: string,
  penulis: {},
  penulis_tambahan: Array<{
    id: string,
    level: number,
    nama: string
  }>,
  subyek_buku: Array<{
    id: string,
    nama: string,
  }>
}

