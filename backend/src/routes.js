const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Andika22@#$%",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

const routes = [
  {
    method: "GET",
    path: "/penjualan",
    handler: async (request, h) => {
      const data = await pool.query("SELECT * FROM penjualan");

      const dataMap = await Promise.all(
        data.rows.map(async (item) => {
          const detailPenjualanData = await pool.query(
            "SELECT * FROM detail_penjualan WHERE penjualan_id = $1",
            [item.penjualan_id]
          );

          const detailPenjualanDataMap = await Promise.all(
            detailPenjualanData.rows.map(async (item) => {
              const produk = await pool.query(
                "SELECT * FROM produk WHERE produk_id = $1",
                [item.produk_id]
              );

              return {
                id: produk.rows[0].produk_id,
                produk: produk.rows[0].nama_produk,
                jumlahProduk: item.jumlah_produk,
                subTotal: item.sub_total,
              };
            })
          );

          const pelangganData = await pool.query(
            "SELECT * FROM pelanggan WHERE pelanggan_id = $1",
            [item.pelanggan_id]
          );

          const pelangganName = pelangganData.rows.map((item) => {
            return item.nama_pelanggan;
          });

          return {
            id: item.penjualan_id,
            tanggalPenjualan: item.tanggal_penjualan,
            totalHarga: item.total_harga,
            pelanggan: pelangganName[0],
            detailPenjualan: detailPenjualanDataMap,
          };
        })
      );

      return h
        .response({
          status: "success",
          message: "Berhasil Mengambil Data",
          data: dataMap,
        })
        .code(200);
    },
  },
  {
    method: "GET",
    path: "/pelanggan",
    handler: async (request, h) => {
      const data = await pool.query("SELECT * FROM pelanggan");

      const dataMap = data.rows.map((item) => {
        return {
          id: item.pelanggan_id,
          namaPelanggan: item.nama_pelanggan,
          alamat: item.alamat,
          nomorTelepon: item.nomor_telepon,
        };
      });

      return h
        .response({
          status: "success",
          message: "Berhasil Mengambil Data",
          data: dataMap,
        })
        .code(200);
    },
  },
  {
    method: "GET",
    path: "/produk",
    handler: async (request, h) => {
      const data = await pool.query("SELECT * FROM produk");

      const dataMap = data.rows.map((item) => {
        return {
          id: item.produk_id,
          namaProduk: item.nama_produk,
          harga: item.harga,
          stok: item.stok,
        };
      });

      return h
        .response({
          status: "success",
          message: "Berhasil Mengambil Data",
          data: dataMap,
        })
        .code(200);
    },
  },
];

module.exports = routes;
