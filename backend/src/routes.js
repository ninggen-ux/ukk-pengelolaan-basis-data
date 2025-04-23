const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  database: "postgres",
  port: 5432,
  user: "postgres",
  password: "Andika22@#$%",
});

const routes = [
  {
    method: "POST",
    path: "/pelanggan",
    handler: async (request, h) => {
      try {
        const { namaPelanggan, alamat, nomorTelepon } = request.payload;

        await pool.query(
          "INSERT INTO pelanggan (nama_pelanggan, alamat, nomor_telepon) VALUES ($1, $2, $3)",
          [namaPelanggan, alamat, nomorTelepon]
        );

        return h
          .response({
            status: "success",
            message: "Berhasil menambahkan Pelanggan",
          })
          .code(201);
      } catch (err) {
        return h.response({
          status: "fail",
          message: err.message,
        });
      }
    },
  },

  {
    method: "POST",
    path: "/produk",
    handler: async (request, h) => {
      try {
        const { namaProduk, harga, stok } = request.payload;

        await pool.query(
          "INSERT INTO produk (nama_produk, harga, stok) VALUES ($1, $2, $3)",
          [namaProduk, harga, stok]
        );

        return h
          .response({
            status: "success",
            message: "Berhasil menambahkan Produk",
          })
          .code(201);
      } catch (err) {
        return h.response({
          status: "fail",
          message: err.message,
        });
      }
    },
  },

  {
    method: "POST",
    path: "/penjualan",
    handler: async (request, h) => {
      try {
        const { pelangganId, data } = request.payload;
        const tanggalPenjualan = new Date().toISOString();
        const totalHarga = data.reduce((acc, item) => {
          return acc + item.subTotal;
        }, 0);

        const addPenjualan = await pool.query(
          `INSERT INTO penjualan (pelanggan_id, tanggal_penjualan, total_harga) VALUES ($1, $2, $3) RETURNING *;`,
          [pelangganId, tanggalPenjualan, totalHarga]
        );

        await Promise.all(
          data.map(async (item) => {
            await pool.query(
              "INSERT INTO detail_penjualan (jumlah_produk, penjualan_id, produk_id, sub_total) VALUES ($1, $2, $3, $4)",
              [
                item.jumlahProduk,
                addPenjualan.rows[0].penjualan_id,
                item.produkId,
                item.subTotal,
              ]
            );
          })
        );

        return h
          .response({
            status: "success",
            message: "Berhasil menambahkan Penjualan",
          })
          .code(201);
      } catch (err) {
        return h.response({
          status: "fail",
          message: err.message,
        });
      }
    },
  },

  {
    method: "GET",
    path: "/pelanggan",
    handler: async (request, h) => {
      try {
        const pelangganData = await pool.query("SELECT * FROM pelanggan");

        const pelangganDataMap = pelangganData.rows.map((item) => {
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
            message: "Berhasil mengambil data",
            data: pelangganDataMap,
          })
          .code(200);
      } catch (err) {
        return h.response({
          status: "fail",
          message: err.message,
        });
      }
    },
  },

  {
    method: "GET",
    path: "/produk",
    handler: async (request, h) => {
      try {
        const produkData = await pool.query("SELECT * FROM produk");

        const produkDataMap = produkData.rows.map((item) => {
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
            message: "Berhasil mengambil data",
            data: produkDataMap,
          })
          .code(200);
      } catch (err) {
        return h.response({
          status: "fail",
          message: err.message,
        });
      }
    },
  },

  {
    method: "GET",
    path: "/penjualan",
    handler: async (request, h) => {
      try {
        const penjualanData = await pool.query(
          `SELECT penjualan_id, tanggal_penjualan, total_harga, nama_pelanggan
            FROM penjualan
            INNER JOIN pelanggan ON penjualan.pelanggan_id = pelanggan.pelanggan_id;`
        );

        const penjualanDataMap = await Promise.all(
          penjualanData.rows.map(async (item) => {
            const detailPenjualan = await pool.query(
              `SELECT detail_id, penjualan_id, nama_produk, jumlah_produk, sub_total
                FROM detail_penjualan
                INNER JOIN produk ON produk.produk_id = detail_penjualan.produk_id
                WHERE penjualan_id = $1;`,
              [item.penjualan_id]
            );

            const detailPenjualanMap = detailPenjualan.rows.map((item) => {
              return {
                id: item.detail_id,
                jumlahProduk: item.jumlah_produk,
                produk: item.nama_produk,
                subTotal: item.sub_total,
              };
            });

            return {
              id: item.penjualan_id,
              pelanggan: item.nama_pelanggan,
              tanggalPenjualan: item.tanggal_penjualan,
              totalHarga: item.total_harga,
              detailPenjualan: detailPenjualanMap,
            };
          })
        );

        return h.response({
          status: "success",
          message: "Berhasil mengambil data",
          data: penjualanDataMap,
        });
      } catch (err) {
        return h.response({
          status: "fail",
          message: err.message,
        });
      }
    },
  },

  {
    method: "DELETE",
    path: "/pelanggan",
    handler: async (request, h) => {
      try {
        const { id } = request.payload;

        await pool.query("DELETE FROM pelanggan WHERE pelanggan_id = $1", [id]);

        return h.response({
          status: "success",
          message: "Berhasil menghapus Pelanggan",
        });
      } catch (err) {
        return h.response({
          status: "fail",
          message: err.message,
        });
      }
    },
  },

  {
    method: "DELETE",
    path: "/produk",
    handler: async (request, h) => {
      try {
        const { id } = request.payload;

        await pool.query("DELETE FROM produk WHERE produk_id = $1", [id]);

        return h.response({
          status: "success",
          message: "Berhasil menghapus Pelanggan",
        });
      } catch (err) {
        return h.response({
          status: "fail",
          message: err.message,
        });
      }
    },
  },

  {
    method: "DELETE",
    path: "/penjualan",
    handler: async (request, h) => {
      try {
        const { penjualanId, penjualanItemId } = request.payload;

        await Promise.all(
          penjualanItemId.map(async (item) => {
            await pool.query(
              "DELETE FROM detail_penjualan WHERE detail_id = $1",
              [item]
            );
          })
        );

        await pool.query("DELETE FROM penjualan WHERE penjualan_id = $1;", [
          penjualanId,
        ]);

        return h.response({
          status: "success",
          message: "Berhasil menghapus Penjualan",
        });
      } catch (err) {
        return h.response({
          status: "fail",
          message: err.message,
        });
      }
    },
  },

  {
    method: "PUT",
    path: "/pelanggan",
    handler: async (request, h) => {
      try {
        const { id, namaPelangganBaru, alamatBaru, nomorTeleponBaru } =
          request.payload;

        await pool.query(
          "UPDATE pelanggan SET nama_pelanggan = $1, alamat = $2, nomor_telepon = $3 WHERE pelanggan_id = $4",
          [namaPelangganBaru, alamatBaru, nomorTeleponBaru, id]
        );

        return h.response({
          status: "success",
          message: "Berhasil mengupdate Pelanggan",
        });
      } catch (err) {
        return h.response({
          status: "fail",
          message: err.message,
        });
      }
    },
  },

  {
    method: "PUT",
    path: "/produk",
    handler: async (request, h) => {
      try {
        const { id, namaProdukBaru, hargaBaru, stokBaru } = request.payload;

        await pool.query(
          "UPDATE produk SET nama_produk = $1, harga = $2, stok = $3 WHERE produk_id = $4",
          [namaProdukBaru, hargaBaru, stokBaru, id]
        );

        return h.response({
          status: "success",
          message: "Berhasil mengupdate Produk",
        });
      } catch (err) {
        return h.response({
          status: "fail",
          message: err.message,
        });
      }
    },
  },

  {
    method: "PUT",
    path: "/penjualan",
    handler: async (request, h) => {
      try {
        const { id, namaPelangganBaru, tanggalBaru, totalBaru } =
          request.payload;

        const pelangganBaruId = await pool.query(
          "SELECT * FROM pelanggan WHERE nama_pelanggan ILIKE '%' || $1 || '%'",
          [namaPelangganBaru]
        );

        await pool.query(
          `UPDATE penjualan 
          SET tanggal_penjualan = $1, total_harga = $2, pelanggan_id = $3
          WHERE penjualan_id = $4;`,
          [tanggalBaru, totalBaru, pelangganBaruId.rows[0].pelanggan_id, id]
        );

        return h.response({
          status: "success",
          message: "Berhasil mengupdate Penjualan",
        });
      } catch (err) {
        return h.response({
          status: "fail",
          message: err.message,
        });
      }
    },
  },
];

module.exports = routes;
