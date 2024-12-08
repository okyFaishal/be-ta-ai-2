const moment = require('moment')
const bcrypt = require("./helper/bcrypt.js");
const findKey = require("./helper/findKey.js");
const { v4:uuid_v4 } = require('uuid');
const db = {
  sq: require('./config/connection'),
  akun_member: require('./module/akun_member/model.js'),
  akun_pengurus: require('./module/akun_pengurus/model'),
  add_on: require('./module/add_on/model'),
  fasilitas_umum: require('./module/fasilitas_umum/model'),
  image_type_paket: require('./module/image_type_paket/model'),
  // image_produk: require('./module/image_produk/model'),
  isi_paket: require('./module/isi_paket/model'),
  kategori_pajak: require('./module/kategori_pajak/model'),
  order: require('./module/order/model'),
  promo: require('./module/promo/model'),
  produk: require('./module/produk/model'),
  paket: require('./module/paket/model'),
  pool_order_paket: require('./module/pool_order_paket/model'),
  pool_order_add_on: require('./module/pool_order_add_on/model'),
  pembayaran: require('./module/pembayaran/model'),
  role: require('./module/role/model'),
  showcase: require('./module/showcase/model'),
  space: require('./module/space/model'),
  status_approve_order: require('./module/status_approve_order/model'),
  transport: require('./module/transport/model.js'),
  type_member: require('./module/type_member/model.js'),
  type_paket: require('./module/type_paket/model'),
  // va_pembayaran: require('./module backup/va_pembayaran/model.js'),
  review: require('./module/review/model'),
}
const { QueryTypes, Op, JSON } = require('sequelize')

async function start(){
  try {
    const data = {}
    const result = {}
    console.log('======= seed =======')

    // // ============================================== VA pembayaran ==============================================
    // if (true) {
    //   console.log('va_pembayaran')
    //   data.va_pembayaran = []
    //   for (let i = 0; i < 100; i++) {
    //     data.va_pembayaran.push(
    //       {
    //         id_va_pembayaran: `${moment().format('YYMMDDHHmmss')}${Math.floor(1000 + Math.random() * 90000000)}`,
    //         status_va_pembayaran: 1,
    //         nominal_va_pembayaran: 0,
    //         id_pembayaran: null,
    //       }
    //     )
    //   }
    //   result.va_pembayaran = await db.va_pembayaran.bulkCreate(data.va_pembayaran)
    // }

    // ============================================== fasilitas umum ==============================================
    if (true) {
      console.log('fasilitas_umum')
      data.fasilitas_umum = []
      data.fasilitas_umum = data.fasilitas_umum.concat([
        {
          id_fasilitas_umum: uuid_v4(),
          nama_fasilitas_umum: `Parkir Motor`,
          keterangan_fasilitas_umum: `Parkir motor di sekeliling dan basement gedung dirancang untuk memudahkan akses bagi para pengunjung yang datang menggunakan sepeda motor. Dengan area parkir yang luas dan tertata rapi, pengendara dapat dengan mudah menemukan tempat parkir yang aman dan dekat dengan pintu masuk gedung. Sistem parkir ini juga dilengkapi dengan pengawasan keamanan untuk memastikan keselamatan kendaraan selama acara berlangsung.`,
          icon_fasilitas_umum: `icon parkir motor.png`,
        },
        {
          id_fasilitas_umum: uuid_v4(),
          nama_fasilitas_umum: `Parkir Mobil`,
          keterangan_fasilitas_umum: `Parkir mobil di sekeliling dan basement gedung disediakan untuk memberikan kenyamanan bagi para pengunjung yang datang dengan kendaraan pribadi. Area parkir ini dirancang dengan kapasitas yang memadai dan tata letak yang efisien, memungkinkan pengendara untuk dengan mudah menemukan tempat parkir yang dekat dengan akses masuk gedung. Selain itu, area parkir ini dilengkapi dengan pengawasan keamanan dan fasilitas penunjang untuk memastikan keselamatan dan kenyamanan kendaraan selama acara berlangsung.`,
          icon_fasilitas_umum: `icon parkir mobil.png`,
        },
        {
          id_fasilitas_umum: uuid_v4(),
          nama_fasilitas_umum: `Toilet Umum`,
          keterangan_fasilitas_umum: `Fasilitas toilet dirancang untuk memberikan kenyamanan maksimal bagi para pengunjung. Toilet ini dilengkapi dengan perlengkapan modern, kebersihan yang terjaga, dan akses yang mudah dari berbagai area dalam gedung. Selain itu, terdapat fasilitas khusus untuk penyandang disabilitas, memastikan semua pengunjung dapat menggunakan toilet dengan nyaman dan aman.`,
          icon_fasilitas_umum: `icon toilet umum.png`,
        },
        {
          id_fasilitas_umum: uuid_v4(),
          nama_fasilitas_umum: `Wifi`,
          keterangan_fasilitas_umum: `Fasilitas WiFi disediakan untuk memastikan pengunjung tetap terhubung dengan internet selama berada di lokasi. WiFi ini memiliki kecepatan tinggi dan jangkauan luas, memungkinkan akses yang mudah dan cepat di seluruh area gedung. Dengan konektivitas yang andal, pengunjung dapat menjalankan berbagai aktivitas online seperti bekerja, bersosial media, atau streaming dengan lancar.`,
          icon_fasilitas_umum: `icon wifi.png`,
        },
        {
          id_fasilitas_umum: uuid_v4(),
          nama_fasilitas_umum: `Foodcourt `,
          keterangan_fasilitas_umum: `Fasilitas foodcourt di gedung serbaguna menawarkan berbagai pilihan kuliner yang memudahkan pengunjung untuk menikmati makanan dan minuman tanpa harus meninggalkan area. Foodcourt ini dilengkapi dengan beragam gerai yang menyajikan menu lokal dan internasional, serta area duduk yang nyaman dan bersih. Dengan suasana yang menyenangkan dan pelayanan yang cepat, pengunjung dapat menikmati waktu makan mereka dengan nyaman selama acara berlangsung.`,
          icon_fasilitas_umum: `icon foodcourt.png`,
        },
        {
          id_fasilitas_umum: uuid_v4(),
          nama_fasilitas_umum: `Mushola`,
          keterangan_fasilitas_umum: `Fasilitas mushola didalam gedung serbaguna disediakan untuk memenuhi kebutuhan ibadah pengunjung yang beragama Islam. Mushola ini dilengkapi dengan perlengkapan ibadah yang lengkap, seperti sajadah dan tempat wudhu yang bersih dan nyaman. Terletak di area yang mudah diakses, mushola ini memastikan pengunjung dapat menjalankan ibadah dengan tenang dan khusyuk selama berada di gedung.`,
          icon_fasilitas_umum: `icon mushola.png`,
        },
        {
          id_fasilitas_umum: uuid_v4(),
          nama_fasilitas_umum: `Lift`,
          keterangan_fasilitas_umum: `Fasilitas lift dirancang untuk memudahkan akses antar lantai bagi semua pengunjung, termasuk mereka yang memiliki mobilitas terbatas. Lift ini dilengkapi dengan teknologi modern dan fitur keamanan, memastikan perjalanan yang aman dan nyaman. Dengan kapasitas yang memadai dan penempatan strategis, lift membantu mengurangi waktu tunggu dan memfasilitasi pergerakan yang efisien di seluruh gedung.`,
          icon_fasilitas_umum: `icon lift.png`,
        },
        {
          id_fasilitas_umum: uuid_v4(),
          nama_fasilitas_umum: `Eskalator`,
          keterangan_fasilitas_umum: `Fasilitas eskalator didalam gedung serbaguna dirancang untuk memudahkan pergerakan pengunjung antar lantai dengan nyaman dan efisien. Eskalator ini ditempatkan strategis di titik utama, memastikan akses yang mudah dan cepat ke area dalam gedung. Dengan teknologi modern dan perawatan rutin, eskalator ini beroperasi dengan lancar, memberikan pengalaman yang aman dan nyaman bagi semua pengunjung.`,
          icon_fasilitas_umum: `icon eskalator.png`,
        },
      ])
      result.fasilitas_umum = await db.fasilitas_umum.bulkCreate(data.fasilitas_umum)
    }

    // ============================================== space ==============================================
    if (true) {
      console.log('space')
      data.space = []
      data.space = data.space.concat([
        {
          id_space: uuid_v4(),
          nama_space: `26.000 m<sup>2</sup> <br> Total area`,
          prioritas_space: `1`,
          icon_space: `building.png`,
        },
        {
          id_space: uuid_v4(),
          nama_space: `6.000 m<sup>2</sup> <br> Outdoor area`,
          prioritas_space: `2`,
          icon_space: `park.png`,
        },
        {
          id_space: uuid_v4(),
          nama_space: `2.000 m<sup>2</sup> <br> Ruang Seminar`,
          prioritas_space: `3`,
          icon_space: `conference.png`,
        },
        {
          id_space: uuid_v4(),
          nama_space: `5.000 m<sup>2</sup> <br> GOR area`,
          prioritas_space: `4`,
          icon_space: `stadium.png`,
        },
        {
          id_space: uuid_v4(),
          nama_space: `200 orang <br> Kapasitas Tribun`,
          prioritas_space: `5`,
          icon_space: `grandstand.png`,
        },
        {
          id_space: uuid_v4(),
          nama_space: `30 Ruang <br> Meeting`,
          prioritas_space: `6`,
          icon_space: `conference-room.png`,
        },
        {
          id_space: uuid_v4(),
          nama_space: `1.000 lot <br> Parkir Motor`,
          prioritas_space: `7`,
          icon_space: `motor-scooter.png`,
        },
        {
          id_space: uuid_v4(),
          nama_space: `500 lot <br> Parkir Mobil`,
          prioritas_space: `8`,
          icon_space: `car.png`,
        },
      ])
      result.space = await db.space.bulkCreate(data.space)
    }

    // ============================================== transport ==============================================
    if (true) {
      console.log('transport')
      data.transport = []
      data.transport = data.transport.concat([
        {
          id_transport: uuid_v4(),
          nama_transport: `BRT`,
          jarak_transport: 0.1,
          link_transport: `https://maps.app.goo.gl/AJRczXBgCgDR2p978`,
          icon_transport: `bus.png`,
        },
        {
          id_transport: uuid_v4(),
          nama_transport: `TOL`,
          jarak_transport: 0.5,
          link_transport: ``,
          icon_transport: `road.png`,
        },
        {
          id_transport: uuid_v4(),
          nama_transport: `BUS`,
          jarak_transport: 3,
          link_transport: `https://maps.app.goo.gl/V3QBSHf9LWui2K6x5`,
          icon_transport: `bus.png`,
        },
        {
          id_transport: uuid_v4(),
          nama_transport: `Kereta`,
          jarak_transport: 12,
          link_transport: `https://maps.app.goo.gl/pzaPKXEwd6cpNSV28`,
          icon_transport: `train.png`,
        },
        {
          id_transport: uuid_v4(),
          nama_transport: `Kapal`,
          jarak_transport: 14,
          link_transport: `https://maps.app.goo.gl/DBN9qY5iLgsEj5pVA`,
          icon_transport: `ship.png`,
        },
        {
          id_transport: uuid_v4(),
          nama_transport: `Pesawat`,
          jarak_transport: 16,
          link_transport: `https://maps.app.goo.gl/o8ndM5YTwBs2Cz5y7`,
          icon_transport: `plane.png`,
        },
      ])
      result.transport = await db.transport.bulkCreate(data.transport)
    }

    // ============================================== kategori pajak ==============================================
    if (true) {
      console.log('kategori_pajak')
      data.kategori_pajak = []
      let kategori_pajak = [
        {
          nama: 'Perorangan',
          items: [
            {
              nama: 'PKP',
              items: [
                {
                  nama: 'Bisa potong PPH',
                  bayar_pph: 0,
                  bayar_ppn: 1,
                  bayar_pbjt: 0,
                },
                {
                  nama: 'Tidak bisa potong PPH',
                  bayar_pph: 1,
                  bayar_ppn: 1,
                  bayar_pbjt: 0,
                },
              ]
            },{
              nama: 'Non PKP',
              bayar_pph: 1,
              bayar_ppn: 1,
              bayar_pbjt: 0,
            },
          ]
        },
        {
          nama: 'Badan',
          items: [
            {
              nama: 'BUMN',
              items: [
                {
                  nama: 'WAPU (wajib pungut)',
                  bayar_pph: 0,
                  bayar_ppn: 0,
                  bayar_pbjt: 0,
                },
                {
                  nama: 'Bukan WAPU (wajib pungut)',
                  bayar_pph: 0,
                  bayar_ppn: 1,
                  bayar_pbjt: 0,
                },
              ]
            },{
              nama: 'Non BUMN',
              items: [
                {
                  nama: 'Bisa potong PPH',
                  bayar_pph: 0,
                  bayar_ppn: 1,
                  bayar_pbjt: 0,
                },
                {
                  nama: 'Tidak bisa potong PPH',
                  bayar_pph: 1,
                  bayar_ppn: 1,
                  bayar_pbjt: 0,
                },
              ]
            }
          ]
        },
        {
          nama: 'Instansi Pemerintah',
          items: [
            {
              nama: 'Bendaharawan',
              bayar_pph: 0,
              bayar_ppn: 0,
              bayar_pbjt: 0,
            },{
              nama: 'Bukan bendaharawan',
              bayar_pph: 0,
              bayar_ppn: 1,
              bayar_pbjt: 0,
            },
          ]
        },
        {
          nama: 'Penambahan Pajak Daerah (PBJT)',
          bayar_pph: 0,
          bayar_ppn: 0,
          bayar_pbjt: 1,
        },
      ]
      async function prosesKategoriPajak(data, id_head){
        let res = []
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          let id_kategori_pajak = uuid_v4()
          res.push({
            id_kategori_pajak,
            nama_kategori_pajak: item.nama, 
            is_head: item.items ? 1 : 0, 
            id_head: id_head || undefined, 
            bayar_pph: item.bayar_pph || 0, 
            bayar_ppn: item.bayar_ppn || 0,
            bayar_pbjt: item.bayar_pbjt || 0,
          })
          if(item.items) res = res.concat(await prosesKategoriPajak(item.items, id_kategori_pajak))
        }
        return res
      }
      data.kategori_pajak = await prosesKategoriPajak(kategori_pajak)
      result.kategori_pajak = await db.kategori_pajak.bulkCreate(data.kategori_pajak)
    }

    // ============================================== role ==============================================
    if (true) {
      console.log('role')
      data.role = []
      data.role = data.role.concat([
        {
          id_role: uuid_v4(),
          nama_role: `Admin`,
          kode_role: `adm`,
        },
        {
          id_role: uuid_v4(),
          nama_role: `Operator Muladi Dome`,
          kode_role: `oprmd`,
        },
        {
          id_role: uuid_v4(),
          nama_role: `Operator Keuangan`,
          kode_role: `oprk`,
        },
        {
          id_role: uuid_v4(),
          nama_role: `Supervisor`,
          kode_role: `spv`,
        },
      ])
      result.role = await db.role.bulkCreate(data.role)
    }

    // ============================================== type member ==============================================
    if (true) {
      console.log('type_member')
      data.type_member = []
      data.type_member = data.type_member.concat([
        {
          id_type_member: uuid_v4(),
          nama_type_member: 'Undip',
          kategori_type_member: 'udp',
          publish_type_member: false,
        },
        {
          id_type_member: uuid_v4(),
          nama_type_member: 'Dosen',
          kategori_type_member: 'udp',
          publish_type_member: true,
        },
        {
          id_type_member: uuid_v4(),
          nama_type_member: 'Mahasiswa',
          kategori_type_member: 'udp',
          publish_type_member: true,
        },
        {
          id_type_member: uuid_v4(),
          nama_type_member: 'Tendik',
          kategori_type_member: 'udp',
          publish_type_member: true,
        },
        {
          id_type_member: uuid_v4(),
          nama_type_member: 'Umum',
          kategori_type_member: 'um',
          publish_type_member: true,
        },
      ])
      result.type_member = await db.type_member.bulkCreate(data.type_member)
    }

    // ============================================== akun pengurus ==============================================
    if (true) {
      console.log('akun_pengurus')
      data.akun_pengurus = []
      for (let r = 0; r < result.role.length; r++) {
        const role = result.role[r];
        data.akun_pengurus = data.akun_pengurus.concat([
          {
            id_akun_pengurus: uuid_v4(),
            nama_pengurus: role.nama_role,
            nip_pengurus: '72012937412' + r,
            no_telepon_pengurus: '08972918273912' + r,
            email_pengurus: (role.nama_role + '@gmail.com').toLowerCase(),
            password_pengurus: bcrypt.hashPassword(role.nama_role),
            image_profile_pengurus: `animal-${acak('angka', 38)}.png`,
            id_role: role.id_role,
          },
        ])
      }
      result.akun_pengurus = await db.akun_pengurus.bulkCreate(data.akun_pengurus)
    }

    // ============================================== akun member ==============================================    
    if (true) {
      console.log('akun_member')
      data.akun_member = [
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Undip',
          keterangan_member: 'Universitas Diponegoro (Undip) adalah universitas negeri yang terletak di Semarang, Jawa Tengah, Indonesia, didirikan pada tahun 1957. Undip dikenal dengan berbagai program studi unggulan dan berfokus pada penelitian serta pengabdian kepada masyarakat. Dengan visi menjadi universitas riset kelas dunia, Undip terus berinovasi dalam bidang pendidikan, teknologi, dan layanan masyarakat.',
          email_member: 'undip@gmail.com',
          no_telepon_member: '089182730173',
          image_profile_member: 'logo undip.png',
          password_member: bcrypt.hashPassword(`undip`),
          verify_email: true, 
          id_type_member: result.type_member[0].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Pemerintah Kota Semarang',
          keterangan_member: 'Pemerintah Kota Semarang bertanggung jawab atas pengelolaan administrasi dan pelayanan publik di ibu kota Provinsi Jawa Tengah, Indonesia. Dengan visi mewujudkan Semarang sebagai kota metropolitan yang unggul dalam pelayanan, infrastruktur, dan kesejahteraan masyarakat, pemerintah kota terus melakukan berbagai inovasi dan pembangunan. Upaya ini mencakup peningkatan transportasi, kebersihan, dan kesehatan, serta pengembangan sektor pariwisata dan ekonomi kreatif.',
          email_member: 'pemkotsemarang@gmail.com',
          no_telepon_member: '089112330173',
          image_profile_member: 'logo pemkot semarang.png',
          password_member: bcrypt.hashPassword(`pemkotsemarang`),
          verify_email: false,
          id_type_member: result.type_member[4].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Andi Jaya Kusuma',
          keterangan_member: 'Seorang pegawai swasta dari perusahaan Google',
          email_member: 'andijayakusuma@undip.ac.id',
          no_telepon_member: '089827391829',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('andijayakusuma'),
          verify_email: true,
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Budi Santoso',
          keterangan_member: 'Seorang insinyur perangkat lunak di Microsoft',
          email_member: 'budisantoso@microsoft.com',
          no_telepon_member: '081234567890',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('budisantoso'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Citra Dewi',
          keterangan_member: 'Seorang manajer pemasaran di Facebook',
          email_member: 'citradewi@facebook.com',
          no_telepon_member: '082345678901',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('citradewi'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Dedi Rahmat',
          keterangan_member: 'Seorang desainer grafis di Apple',
          email_member: 'dedirahmat@apple.com',
          no_telepon_member: '083456789012',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('dedirahmat'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Eka Saputra',
          keterangan_member: 'Seorang analis data di Amazon',
          email_member: 'ekasaputra@amazon.com',
          no_telepon_member: '084567890123',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('ekasaputra'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Fajar Hidayat',
          keterangan_member: 'Seorang pengembang web di Netflix',
          email_member: 'fajarhidayat@netflix.com',
          no_telepon_member: '085678901234',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('fajarhidayat'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Gita Pramesti',
          keterangan_member: 'Seorang analis keuangan di Tesla',
          email_member: 'gitapramesti@tesla.com',
          no_telepon_member: '086789012345',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('gitapramesti'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Hadi Saputra',
          keterangan_member: 'Seorang manajer proyek di IBM',
          email_member: 'hadisaputra@ibm.com',
          no_telepon_member: '087890123456',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('hadisaputra'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Indah Permata',
          keterangan_member: 'Seorang spesialis keamanan siber di Cisco',
          email_member: 'indahpermata@cisco.com',
          no_telepon_member: '088901234567',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('indahpermata'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Joko Susilo',
          keterangan_member: 'Seorang insinyur jaringan di Huawei',
          email_member: 'jokosusilo@huawei.com',
          no_telepon_member: '089012345678',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('jokosusilo'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Kiki Amalia',
          keterangan_member: 'Seorang manajer produk di Sony',
          email_member: 'kikiamalia@sony.com',
          no_telepon_member: '080123456789',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('kikiamalia'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Lila Anggraini',
          keterangan_member: 'Seorang spesialis sumber daya manusia di Intel',
          email_member: 'lilaanggraini@intel.com',
          no_telepon_member: '081234567891',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('lilaanggraini'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Mika Nugraha',
          keterangan_member: 'Seorang insinyur perangkat keras di AMD',
          email_member: 'mikanugraha@amd.com',
          no_telepon_member: '082345678902',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('mikanugraha'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Nina Saraswati',
          keterangan_member: 'Seorang pengembang aplikasi di Oracle',
          email_member: 'ninasaraswati@oracle.com',
          no_telepon_member: '083456789013',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('ninasaraswati'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Oki Prasetyo',
          keterangan_member: 'Seorang arsitek perangkat lunak di SAP',
          email_member: 'okiprasetyo@sap.com',
          no_telepon_member: '084567890124',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('okiprasetyo'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Putri Maharani',
          keterangan_member: 'Seorang analis keamanan siber di Kaspersky',
          email_member: 'putrimaharani@kaspersky.com',
          no_telepon_member: '085678901235',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('putrimaharani'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Qori Ramadhani',
          keterangan_member: 'Seorang spesialis pemasaran digital di Adobe',
          email_member: 'qoriramadhani@adobe.com',
          no_telepon_member: '086789012346',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('qoriramadhani'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Rama Wijaya',
          keterangan_member: 'Seorang pengembang perangkat lunak di Red Hat',
          email_member: 'ramawijaya@redhat.com',
          no_telepon_member: '087890123457',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('ramawijaya'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Siti Aminah',
          keterangan_member: 'Seorang insinyur perangkat lunak di Google',
          email_member: 'sitiaminah@google.com',
          no_telepon_member: '088901234568',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('sitiaminah'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        },
        {
          id_akun_member: uuid_v4(),
          nama_member: 'Taufik Hidayat',
          keterangan_member: 'Seorang analis bisnis di Microsoft',
          email_member: 'taufikhidayat@microsoft.com',
          no_telepon_member: '089012345679',
          image_profile_member: `animal-${acak('angka', 38)}.png`,
          password_member: bcrypt.hashPassword('taufikhidayat'),
          verify_email: acak('item', true, false),
          id_type_member: result.type_member[2].id_type_member,
        }
      ]
      result.akun_member = await db.akun_member.bulkCreate(data.akun_member)
    }

    // ============================================== status approve order ==============================================
    if (true) {
      console.log('status approve order')
      data.status_approve_order = []
      data.status_approve_order = data.status_approve_order.concat([
        {
          id_status_approve_order: uuid_v4(),
          status_approve_order: 1,
          nama_status_approve_order: `Di setujui Operator Keuangan`,
          id_role: result.role[2].id_role,
        },
        {
          id_status_approve_order: uuid_v4(),
          status_approve_order: 2,
          nama_status_approve_order: `Di setujui Supervisor`,
          id_role: result.role[3].id_role,
        },
      ])
      result.status_approve_order = await db.status_approve_order.bulkCreate(data.status_approve_order)
    }

    // ============================================== promo ==============================================
    if (true) {
      console.log('promo')
      data.promo = []
      data.promo = data.promo.concat([
        {
          id_promo: uuid_v4(),
          nama_promo: `Perayaan hari kemerdekaan Indonesia ke 79`,
          type_promo: `nml`,
          jumlah_promo: 790000,
          keterangan_promo: `Promo Perayaan Hari Kemerdekaan Indonesia ke-79 untuk pemesanan Muladi Dome Undip menawarkan potongan harga khusus bagi penyelenggara acara yang memesan gedung selama periode promosi. Diskon ini berlaku untuk berbagai jenis acara, seperti seminar, konser, dan pertemuan, memberikan kesempatan bagi penyelenggara untuk menghemat biaya sewa. Selain itu, fasilitas tambahan seperti sound system dan dekorasi juga dapat diperoleh dengan harga khusus selama masa promosi ini.`,
          publish_promo: true,
        },
        {
          id_promo: uuid_v4(),
          nama_promo: `Perayaan hari kemerdekaan Indonesia ke 78`,
          type_promo: `prsn`,
          jumlah_promo: 78,
          keterangan_promo: `Promo Perayaan Hari Kemerdekaan Indonesia ke-78 untuk pemesanan Muladi Dome Undip menawarkan diskon khusus dan paket hemat bagi pihak yang menyewa gedung selama periode perayaan. Selama promosi ini, penyewa dapat menikmati harga sewa yang lebih murah serta mendapatkan fasilitas tambahan seperti layanan catering dan dekorasi dengan potongan harga. Promo ini dirancang untuk mendukung perayaan kemerdekaan dengan memberikan nilai lebih kepada penyelenggara acara yang merayakan di Muladi Dome.`,
          publish_promo: false,
        },
        {
          id_promo: uuid_v4(),
          nama_promo: `Pembukaan Muladi Dome Undip`,
          type_promo: `prsn`,
          jumlah_promo: 50,
          keterangan_promo: `Promo Pembukaan Muladi Dome Undip menawarkan diskon menarik dan paket spesial untuk pemesanan gedung baru ini selama periode perkenalan. Selama promosi, penyewa dapat menikmati tarif sewa yang lebih rendah serta fasilitas tambahan seperti layanan audio-visual dan dekorasi dengan harga khusus. Promo ini bertujuan untuk memperkenalkan Muladi Dome sebagai lokasi acara unggulan dan memberikan kesempatan bagi penyelenggara acara untuk merasakan fasilitas baru dengan keuntungan ekstra.`,
          publish_promo: true,
        },
        {
          id_promo: uuid_v4(),
          nama_promo: `Anniversary Undip`,
          type_promo: `nml`,
          jumlah_promo: 1000000,
          keterangan_promo: `Promo Anniversary Undip untuk pemesanan Muladi Dome menawarkan penawaran istimewa sebagai bagian dari perayaan ulang tahun universitas. Selama periode promosi, penyewa dapat menikmati diskon besar dan paket khusus yang mencakup fasilitas tambahan seperti catering dan dekorasi dengan harga lebih terjangkau. Promo ini bertujuan untuk merayakan pencapaian Undip dan memberikan nilai lebih kepada penyelenggara acara yang memilih Muladi Dome sebagai lokasi mereka.`,
          publish_promo: true,
        },
      ])
      result.promo = await db.promo.bulkCreate(data.promo)
    }
    
    // ============================================== showcase ==============================================
    if (true) {
      console.log('showcase')
      data.showcase = []
      data.showcase = data.showcase.concat([
        {
          id_showcase: uuid_v4(),
          nama_showcase: 'Muladi Dome',
          keterangan_showcase: 'Muladi Dome di Universitas Diponegoro merupakan fasilitas olahraga dan serbaguna yang modern, dirancang untuk mendukung berbagai kegiatan akademik, olahraga, serta acara besar lainnya. Dengan kapasitas yang memadai dan desain yang representatif, Muladi Dome menjadi pusat aktivitas yang penting bagi sivitas akademika dan masyarakat sekitar.',
          image_showcase: `muladi dome.jpg`,
          link_showcase: 'Muladi Dome adalah sebuah fasilitas olahraga yang terletak di Universitas Diponegoro (Undip) Semarang. Dome ini sering digunakan untuk berbagai acara, seperti pertandingan olahraga, seminar, dan kegiatan mahasiswa lainnya. Dengan kapasitas yang cukup besar, Muladi Dome menjadi salah satu ikon penting di kampus Undip. Fasilitas ini juga dilengkapi dengan berbagai sarana pendukung, seperti ruang ganti dan area parkir yang luas.',
          prioritas: 1,
          publish_showcase: true,
          id_promo: result.promo[2].id_promo,
        },
        {
          id_showcase: uuid_v4(),
          nama_showcase: 'HUT Indonesia ke-79',
          keterangan_showcase: 'Peringatan HUT RI ke-79 merupakan momen penting bagi seluruh rakyat Indonesia untuk mengenang perjuangan para pahlawan dalam merebut kemerdekaan. Pada peringatan ini, biasanya diadakan upacara bendera di berbagai instansi dan sekolah sebagai simbol penghormatan terhadap negara. Selain itu, berbagai kegiatan lomba tradisional seperti balap karung dan panjat pinang juga meramaikan suasana, menciptakan kegembiraan di tengah masyarakat. Semangat persatuan dan kesatuan bangsa selalu menjadi pesan utama dalam setiap perayaan HUT RI.',
          image_showcase: `hut ri 2.jpg`,
          link_showcase: '',
          prioritas: 2,
          publish_showcase: true,
          id_promo: null,
        },
        {
          id_showcase: uuid_v4(),
          nama_showcase: 'Hari Guru',
          keterangan_showcase: 'Hari Guru adalah perayaan tahunan yang diperingati untuk menghormati jasa para guru dalam mendidik dan membimbing generasi muda. Pada hari ini, siswa dan masyarakat biasanya memberikan apresiasi melalui berbagai kegiatan, seperti upacara, pemberian hadiah, dan ucapan terima kasih. Hari Guru juga menjadi momentum untuk refleksi terhadap pentingnya peran guru dalam membentuk karakter dan masa depan bangsa. Perayaan ini mengingatkan kita akan nilai penting pendidikan dan dedikasi para guru dalam mencerdaskan kehidupan bangsa.',
          image_showcase: `hari guru.jpg`,
          link_showcase: '',
          prioritas: 2,
          publish_showcase: false,
          id_promo: null,
        },
        {
          id_showcase: uuid_v4(),
          nama_showcase: 'Idul Fitri',
          keterangan_showcase: 'Idul Fitri adalah hari raya umat Islam yang menandai akhir bulan Ramadan, bulan puasa yang penuh dengan ibadah dan refleksi spiritual. Perayaan ini dimulai dengan pelaksanaan salat Idul Fitri di pagi hari, diikuti dengan saling mengunjungi keluarga dan sahabat, serta berbagi makanan dan hadiah. Tradisi ini juga mencakup pemberian zakat fitrah sebagai bentuk kepedulian terhadap mereka yang kurang mampu. Idul Fitri merupakan waktu yang penuh kegembiraan dan rasa syukur atas pencapaian dalam beribadah selama Ramadan.',
          image_showcase: `idul fitri.jpg`,
          link_showcase: '',
          prioritas: 2,
          publish_showcase: true,
          id_promo: null,
        },
        {
          id_showcase: uuid_v4(),
          nama_showcase: 'Hari Pahlawan',
          keterangan_showcase: 'Hari Pahlawan diperingati setiap 10 November untuk menghormati jasa para pahlawan yang telah berjuang dan berkorban demi kemerdekaan Indonesia. Tanggal ini memperingati peristiwa Pertempuran Surabaya pada tahun 1945, yang menjadi simbol perlawanan heroik terhadap penjajah. Pada hari ini, berbagai upacara dan acara penghormatan diadakan di seluruh Indonesia untuk mengenang dan menghargai kontribusi para pahlawan. Hari Pahlawan juga mengajak masyarakat untuk terus memupuk semangat perjuangan dan nasionalisme dalam kehidupan sehari-hari.',
          image_showcase: `hari pahlawan.jpg`,
          link_showcase: '',
          prioritas: 2,
          publish_showcase: true,
          id_promo: null,
        },
      ])
      result.showcase = await db.showcase.bulkCreate(data.showcase)
    }

    // ============================================== produk ==============================================
    if (true) {
      console.log('produk')
      data.produk = []
      for (let i = 1; i <= 6; i++) {
        data.produk.push({
          id_produk: uuid_v4(),
          nama_produk: 'Ruang Seminar ' + i,
          lantai_produk: '1',
          panjang_produk: 16,
          lebar_produk: 8,
          rating_produk: 0,
          publish_produk: true,
        })
      }
      for (let i = 1; i <= 8; i++) {
        data.produk.push({
          id_produk: uuid_v4(),
          nama_produk: 'Tenant Kecil ' + i,
          lantai_produk: '1',
          panjang_produk: 8,
          lebar_produk: 8,
          rating_produk: 0,
          publish_produk: true,
        })
      }
      for (let i = 1; i <= 4; i++) {
        data.produk.push({
          id_produk: uuid_v4(),
          nama_produk: 'Tenant Besar ' + i,
          lantai_produk: '1',
          panjang_produk: 16,
          lebar_produk: 8,
          rating_produk: 0,
          publish_produk: true,
        })
      }
      for (let i = 1; i <= 10; i++) {
        data.produk.push({
          id_produk: uuid_v4(),
          nama_produk: 'CO Working ' + (i.toString().padStart(2, '0')),
          lantai_produk: '1',
          panjang_produk: 8,
          lebar_produk: 4.5,
          rating_produk: 0,
          publish_produk: true,
        })
      }
      for (let i = 1; i <= 3; i++) {
        data.produk.push({
          id_produk: uuid_v4(),
          nama_produk: 'Ballroom ' + i,
          lantai_produk: '2',
          panjang_produk: 50.5,
          lebar_produk: 24,
          rating_produk: 0,
          publish_produk: true,
        })
      }
      for (let i = 1; i <= 3; i++) {
        data.produk.push({
          id_produk: uuid_v4(),
          nama_produk: 'Gor ' + i,
          lantai_produk: '3',
          panjang_produk: 50.5,
          lebar_produk: 32,
          rating_produk: 0,
          publish_produk: true,
        })
      }
      for (let i = 1; i <= 3; i++) {
        data.produk.push({
          id_produk: uuid_v4(),
          nama_produk: 'Tribun ' + i,
          lantai_produk: '3',
          panjang_produk: 24,
          lebar_produk: 16,
          rating_produk: 0,
          publish_produk: true,
        })
      }
      result.produk = await db.produk.bulkCreate(data.produk)
    }

    // ============================================== image produk ==============================================
    if (false) {
      console.log('image_produk')
      data.image_produk = []
      for (let i = 0; i < result.produk.length; i++) {
        const p = result.produk[i];
        data.image_produk.push({
          id_image_produk: uuid_v4(),
          nama_image_produk: `Denah ${p.nama_produk}`,
          image_produk: `denah ${(p.nama_produk).toLocaleLowerCase()}.png`,
          id_produk: p.id_produk,
        })
        data.image_produk.push({
          id_image_produk: uuid_v4(),
          nama_image_produk: `Bagian depan ${p.nama_produk}`,
          image_produk: `bagian depan ${(p.nama_produk).toLocaleLowerCase()}.png`,
          id_produk: p.id_produk,
        })
        data.image_produk.push({
          id_image_produk: uuid_v4(),
          nama_image_produk: `Bagian belakang ${p.nama_produk}`,
          image_produk: `bagian belakang ${(p.nama_produk).toLocaleLowerCase()}.png`,
          id_produk: p.id_produk,
        })
      }
      result.image_produk = await db.image_produk.bulkCreate(data.image_produk)
    }

    // ============================================== type paket ==============================================
    if (true) {
      console.log('type_paket')
      data.type_paket = []
      data.type_paket = data.type_paket.concat([
        {
          id_type_paket: uuid_v4(),
          nama_type_paket: 'Seminar',
          prioritas_type_paket: 1,
          keterangan_type_paket: 'Ruang seminar di Muladi Dome Undip dirancang untuk mendukung berbagai jenis acara akademik dan profesional dengan fasilitas yang modern dan nyaman. Dilengkapi dengan sistem audio-visual canggih, kursi ergonomis, dan akses internet cepat, ruang ini memastikan pengalaman yang produktif dan menyenangkan bagi semua peserta. Selain itu, tata letak yang fleksibel memungkinkan penyesuaian sesuai kebutuhan acara, menjadikannya pilihan ideal untuk seminar, workshop, dan presentasi.',
          icon_type_paket: 'icon seminar room.png',
        },
        {
          id_type_paket: uuid_v4(),
          nama_type_paket: 'Tenant',
          prioritas_type_paket: 5,
          keterangan_type_paket: 'Ruang tenant di Muladi Dome Undip disediakan untuk mendukung berbagai usaha dan layanan, memberikan kesempatan bagi bisnis untuk beroperasi dalam lingkungan yang strategis dan dinamis. Ruangan ini dilengkapi dengan fasilitas modern, termasuk akses internet cepat dan sistem keamanan yang handal, memastikan operasional yang efisien dan aman. Dengan desain fleksibel dan lokasi yang mudah diakses, ruang tenant ini ideal untuk beragam jenis bisnis, mulai dari retail hingga jasa profesional.',
          icon_type_paket: 'icon tenant.png',
        },
        {
          id_type_paket: uuid_v4(),
          nama_type_paket: 'Meeting Room',
          prioritas_type_paket: 3,
          keterangan_type_paket: 'Meeting room di Muladi Dome Undip dirancang untuk menyediakan lingkungan yang profesional dan nyaman bagi pertemuan bisnis dan diskusi kelompok. Dilengkapi dengan teknologi presentasi terkini, akses internet cepat, dan peralatan konferensi, ruangan ini memastikan setiap pertemuan berjalan lancar dan efisien. Dengan desain yang modern dan suasana yang tenang, meeting room ini ideal untuk rapat, brainstorming, dan kolaborasi antar tim.',
          icon_type_paket: 'icon meeting room.png',
        },
        {
          id_type_paket: uuid_v4(),
          nama_type_paket: 'Ballroom',
          prioritas_type_paket: 2,
          keterangan_type_paket: 'Ballroom di Muladi Dome Undip merupakan ruang serbaguna yang elegan dan luas, ideal untuk menyelenggarakan berbagai acara besar seperti pernikahan, gala, dan konferensi. Dilengkapi dengan sistem pencahayaan dan audio-visual canggih, ballroom ini menawarkan suasana yang mewah dan nyaman untuk setiap acara. Dengan kapasitas yang besar dan tata letak yang fleksibel, ruang ini dapat disesuaikan sesuai kebutuhan, menjadikannya pilihan utama untuk acara-acara prestisius. (Direkomendasikan untuk memesan ballroom 1 atau 3, untuk meminimalisir suara pada acara yang sedang berlangsung diballroom bocor)',
          icon_type_paket: 'icon ballroom.png',
        },
        {
          id_type_paket: uuid_v4(),
          nama_type_paket: 'Gor',
          prioritas_type_paket: 4,
          keterangan_type_paket: 'Ruang GOR (Gelanggang Olahraga) di Muladi Dome Undip adalah fasilitas olahraga yang luas dan serbaguna, dirancang untuk mendukung berbagai aktivitas dan event olahraga. Dilengkapi dengan peralatan modern dan lantai yang aman, ruang ini ideal untuk kegiatan seperti basket, futsal, dan bulu tangkis. Selain itu, GOR ini juga dilengkapi dengan tribun penonton yang nyaman, memastikan pengalaman menonton yang menyenangkan bagi para penonton.',
          icon_type_paket: 'icon gor.png',
        },
        {
          id_type_paket: uuid_v4(),
          nama_type_paket: 'Hall',
          prioritas_type_paket: 6,
          keterangan_type_paket: 'Muladi Dome Undip menawarkan fleksibilitas yang luar biasa bagi penyewa. Dengan adanya opsi penyesuaian ukuran hall, Anda dapat merancang acara sesuai kebutuhan, mulai dari pertemuan skala kecil hingga konferensi besar. Baik itu rapat bisnis yang intim atau pesta meriah, Muladi Dome siap mengakomodasi.',
          icon_type_paket: 'box.png',
        },
      ])
      result.type_paket = await db.type_paket.bulkCreate(data.type_paket)
    }

    // ============================================== image type paket ==============================================
    if (true) {
      console.log('image_type_paket')
      data.image_type_paket = []
      for (let i = 0; i < result.type_paket.length; i++) {
        const tp = result.type_paket[i];
        data.image_type_paket.push({
          id_image_type_paket: uuid_v4(),
          nama_image_type_paket: `Contoh ${tp.nama_type_paket} 1`,
          image_type_paket: `contoh ${(tp.nama_type_paket).toLocaleLowerCase()} 1.jpg`,
          id_type_paket: tp.id_type_paket,
        })
        data.image_type_paket.push({
          id_image_type_paket: uuid_v4(),
          nama_image_type_paket: `Contoh ${tp.nama_type_paket} 2`,
          image_type_paket: `contoh ${(tp.nama_type_paket).toLocaleLowerCase()} 2.jpg`,
          id_type_paket: tp.id_type_paket,
        })
        data.image_type_paket.push({
          id_image_type_paket: uuid_v4(),
          nama_image_type_paket: `Contoh ${tp.nama_type_paket} 3`,
          image_type_paket: `contoh ${(tp.nama_type_paket).toLocaleLowerCase()} 3.jpg`,
          id_type_paket: tp.id_type_paket,
        })
      }
      result.image_type_paket = await db.image_type_paket.bulkCreate(data.image_type_paket)    
    }

    // ============================================== paket ==============================================
    if (true) {
      console.log('paket')
      data.paket = []
      for (let i = 1; i <= 6; i++) {
        data.paket.push({
          id_paket: uuid_v4(),
          nama_paket: 'Seminar A ' + i,
          gambar_layout_paket: `denah seminar a ${i}.jpg`,
          keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          harga_setengah_hari_umum_paket: 600000,
          harga_harian_umum_paket: 1000000,
          harga_bulanan_umum_paket: 25000000,
          harga_tahunan_umum_paket: 300000000,
          harga_setengah_hari_akademi_paket: 400000,
          harga_harian_akademi_paket: 750000,
          harga_bulanan_akademi_paket: 15000000,
          harga_tahunan_akademi_paket: 170000000,
          id_type_paket: result.type_paket[0].id_type_paket,
        })
      }
      for (let i = 1; i <= 2; i++) {
        data.paket.push({
          id_paket: uuid_v4(),
          nama_paket: 'Seminar B ' + i,
          gambar_layout_paket: `denah seminar B ${i}.jpg`,
          keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          harga_setengah_hari_umum_paket: 1000000,
          harga_harian_umum_paket: 1800000,
          harga_bulanan_umum_paket: 48000000,
          harga_tahunan_umum_paket: 500000000,
          harga_setengah_hari_akademi_paket: 800000,
          harga_harian_akademi_paket: 1500000,
          harga_bulanan_akademi_paket: 30000000,
          harga_tahunan_akademi_paket: 320000000,
          id_type_paket: result.type_paket[0].id_type_paket,
        })
      }
      for (let i = 1; i <= 9; i++) {
        data.paket.push({
          id_paket: uuid_v4(),
          nama_paket: 'Tenant A ' + i,
          gambar_layout_paket: `denah tenant a ${i}.jpg`,
          keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          harga_setengah_hari_umum_paket: 400000,
          harga_harian_umum_paket: 700000,
          harga_bulanan_umum_paket: 20000000,
          harga_tahunan_umum_paket: 220000000,
          harga_setengah_hari_akademi_paket: 200000,
          harga_harian_akademi_paket: 400000,
          harga_bulanan_akademi_paket: 10000000,
          harga_tahunan_akademi_paket: 100000000,
          id_type_paket: result.type_paket[1].id_type_paket,
        })
      }
      for (let i = 1; i <= 4; i++) {
        data.paket.push({
          id_paket: uuid_v4(),
          nama_paket: 'Tenant AA ' + i,
          gambar_layout_paket: `denah tenant aa ${i}.jpg`,
          keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          harga_setengah_hari_umum_paket: 7000000,
          harga_harian_umum_paket: 1200000,
          harga_bulanan_umum_paket: 30000000,
          harga_tahunan_umum_paket: 280000000,
          harga_setengah_hari_akademi_paket: 450000,
          harga_harian_akademi_paket: 750000,
          harga_bulanan_akademi_paket: 19000000,
          harga_tahunan_akademi_paket: 210000000,
          id_type_paket: result.type_paket[1].id_type_paket,
        })
      }
      for (let i = 1; i <= 10; i++) {
        data.paket.push({
          id_paket: uuid_v4(),
          nama_paket: 'Meeting room A ' + (i.toString().padStart(2, '0')),
          gambar_layout_paket: `denah meeting room a ${i}.jpg`,
          keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          harga_setengah_hari_umum_paket: 400000,
          harga_harian_umum_paket: 700000,
          harga_bulanan_umum_paket: 20000000,
          harga_tahunan_umum_paket: 220000000,
          harga_setengah_hari_akademi_paket: 200000,
          harga_harian_akademi_paket: 400000,
          harga_bulanan_akademi_paket: 10000000,
          harga_tahunan_akademi_paket: 100000000,
          id_type_paket: result.type_paket[2].id_type_paket,
        })
      }
      for (let i = 1; i <= 4; i++) {
        data.paket.push({
          id_paket: uuid_v4(),
          nama_paket: 'Meeting room B ' + i,
          gambar_layout_paket: `denah meeting room B ${i}.jpg`,
          keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          harga_setengah_hari_umum_paket: 7000000,
          harga_harian_umum_paket: 1200000,
          harga_bulanan_umum_paket: 30000000,
          harga_tahunan_umum_paket: 280000000,
          harga_setengah_hari_akademi_paket: 450000,
          harga_harian_akademi_paket: 750000,
          harga_bulanan_akademi_paket: 19000000,
          harga_tahunan_akademi_paket: 210000000,
          id_type_paket: result.type_paket[2].id_type_paket,
        })
      }
      for (let i = 1; i <= 3; i++) {
        data.paket.push({
          id_paket: uuid_v4(),
          nama_paket: 'Ballroom A ' + i,
          gambar_layout_paket: `denah ballroom a ${i}.jpg`,
          keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          harga_setengah_hari_umum_paket: 1200000,
          harga_harian_umum_paket: 2000000,
          harga_bulanan_umum_paket: 50000000,
          harga_tahunan_umum_paket: 520000000,
          harga_setengah_hari_akademi_paket: 500000,
          harga_harian_akademi_paket: 900000,
          harga_bulanan_akademi_paket: 22000000,
          harga_tahunan_akademi_paket: 2400000000,
          id_type_paket: result.type_paket[3].id_type_paket,
        })
      }
      for (let i = 1; i <= 2; i++) {
        data.paket.push({
          id_paket: uuid_v4(),
          nama_paket: 'Ballroom B ' + i,
          gambar_layout_paket: `denah ballroom b ${i}.jpg`,
          keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          harga_setengah_hari_umum_paket: 1200000,
          harga_harian_umum_paket: 2000000,
          harga_bulanan_umum_paket: 50000000,
          harga_tahunan_umum_paket: 520000000,
          harga_setengah_hari_akademi_paket: 500000,
          harga_harian_akademi_paket: 900000,
          harga_bulanan_akademi_paket: 22000000,
          harga_tahunan_akademi_paket: 2400000000,
          id_type_paket: result.type_paket[3].id_type_paket,
        })
      }
      data.paket.push({
        id_paket: uuid_v4(),
        nama_paket: 'Full Ballroom',
        gambar_layout_paket: `denah full ballroom.jpg`,
        keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        harga_setengah_hari_umum_paket: 3000000,
        harga_harian_umum_paket: 5000000,
        harga_bulanan_umum_paket: 120000000,
        harga_tahunan_umum_paket: 1500000000,
        harga_setengah_hari_akademi_paket: 2000000,
        harga_harian_akademi_paket: 3500000,
        harga_bulanan_akademi_paket: 80000000,
        harga_tahunan_akademi_paket: 1100000000,
        id_type_paket: result.type_paket[3].id_type_paket,
      })
      for (let i = 1; i <= 3; i++) {
        data.paket.push({
          id_paket: uuid_v4(),
          nama_paket: 'Gor tanpa tribun A ' + i,
          gambar_layout_paket: `denah gor tanpa tribun a ${i}.jpg`,
          keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          harga_setengah_hari_umum_paket: 3000000,
          harga_harian_umum_paket: 5000000,
          harga_bulanan_umum_paket: 120000000,
          harga_tahunan_umum_paket: 1500000000,
          harga_setengah_hari_akademi_paket: 2000000,
          harga_harian_akademi_paket: 3500000,
          harga_bulanan_akademi_paket: 80000000,
          harga_tahunan_akademi_paket: 1100000000,
          id_type_paket: result.type_paket[4].id_type_paket,
        })
      }
      for (let i = 1; i <= 2; i++) {
        data.paket.push({
          id_paket: uuid_v4(),
          nama_paket: 'Gor tanpa tribun B ' + i,
          gambar_layout_paket: `denah gor tanpa tribun b ${i}.jpg`,
          keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          harga_setengah_hari_umum_paket: 3000000,
          harga_harian_umum_paket: 5000000,
          harga_bulanan_umum_paket: 120000000,
          harga_tahunan_umum_paket: 1500000000,
          harga_setengah_hari_akademi_paket: 2000000,
          harga_harian_akademi_paket: 3500000,
          harga_bulanan_akademi_paket: 80000000,
          harga_tahunan_akademi_paket: 1100000000,
          id_type_paket: result.type_paket[4].id_type_paket,
        })
      }
      data.paket.push({
        id_paket: uuid_v4(),
        nama_paket: 'Full Gor tanpa tribun',
        gambar_layout_paket: `denah full gor tanpa tribun.jpg`,
        keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        harga_setengah_hari_umum_paket: 3000000,
        harga_harian_umum_paket: 5000000,
        harga_bulanan_umum_paket: 120000000,
        harga_tahunan_umum_paket: 1500000000,
        harga_setengah_hari_akademi_paket: 2000000,
        harga_harian_akademi_paket: 3500000,
        harga_bulanan_akademi_paket: 80000000,
        harga_tahunan_akademi_paket: 1100000000,
        id_type_paket: result.type_paket[4].id_type_paket,
      })
      for (let i = 1; i <= 3; i++) {
        data.paket.push({
          id_paket: uuid_v4(),
          nama_paket: 'Gor dengan Tribun A ' + i,
          gambar_layout_paket: `denah gor dengan tribun a ${i}.jpg`,
          keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          harga_setengah_hari_umum_paket: 3000000,
          harga_harian_umum_paket: 5000000,
          harga_bulanan_umum_paket: 120000000,
          harga_tahunan_umum_paket: 1500000000,
          harga_setengah_hari_akademi_paket: 2000000,
          harga_harian_akademi_paket: 3500000,
          harga_bulanan_akademi_paket: 80000000,
          harga_tahunan_akademi_paket: 1100000000,
          id_type_paket: result.type_paket[4].id_type_paket,
        })
      }
      for (let i = 1; i <= 2; i++) {
        data.paket.push({
          id_paket: uuid_v4(),
          nama_paket: 'Gor dengan Tribun B ' + i,
          gambar_layout_paket: `denah gor dengan tribun b ${i}.jpg`,
          keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          harga_setengah_hari_umum_paket: 3000000,
          harga_harian_umum_paket: 5000000,
          harga_bulanan_umum_paket: 120000000,
          harga_tahunan_umum_paket: 1500000000,
          harga_setengah_hari_akademi_paket: 2000000,
          harga_harian_akademi_paket: 3500000,
          harga_bulanan_akademi_paket: 80000000,
          harga_tahunan_akademi_paket: 1100000000,
          id_type_paket: result.type_paket[4].id_type_paket,
        })
      }
      data.paket.push({
        id_paket: uuid_v4(),
        nama_paket: 'Full Gor dengan Tribun',
        gambar_layout_paket: `denah full gor dengan tribun.jpg`,
        keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        harga_setengah_hari_umum_paket: 3000000,
        harga_harian_umum_paket: 5000000,
        harga_bulanan_umum_paket: 120000000,
        harga_tahunan_umum_paket: 1500000000,
        harga_setengah_hari_akademi_paket: 2000000,
        harga_harian_akademi_paket: 3500000,
        harga_bulanan_akademi_paket: 80000000,
        harga_tahunan_akademi_paket: 1100000000,
        id_type_paket: result.type_paket[4].id_type_paket,
      })
      data.paket.push({
        id_paket: uuid_v4(),
        nama_paket: 'Hall custom area',
        gambar_layout_paket: `denah tenant aa 1.jpg`,
        keterangan_paket: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        custom_harga_paket: true,
        harga_setengah_hari_umum_paket: 0,
        harga_harian_umum_paket: 0,
        harga_bulanan_umum_paket: 0,
        harga_tahunan_umum_paket: 0,
        harga_setengah_hari_akademi_paket: 0,
        harga_harian_akademi_paket: 0,
        harga_bulanan_akademi_paket: 0,
        harga_tahunan_akademi_paket: 0,
        id_type_paket: result.type_paket[5].id_type_paket,
      })
      result.paket = await db.paket.bulkCreate(data.paket) 
    }
    
    // paket
    // 06 | 01 - 06 seminar a
    // 02 | 07 - 08 seminar b
    // 09 | 09 - 17 tenant a
    // 04 | 18 - 21 tenant aa
    // 10 | 22 - 31 meeting a
    // 04 | 32 - 35 meeting b
    // 03 | 36 - 38 baalroom a
    // 02 | 39 - 40 baalroom b
    // 01 | ---- 41 full baalroom
    // 03 | 42 - 44 gor tanpa tribun a
    // 02 | 45 - 46 gor tanpa tribun b
    // 01 | ---- 47 full gor tanpa tribun
    // 03 | 48 - 50 gor dengan tribun a
    // 02 | 51 - 52 gor dengan tribun b
    // 01 | ---- 53 full gor dengan tribun a

    // produk
    // 06 | 01 - 06 seminar
    // 08 | 07 - 14 tenant kecil
    // 04 | 15 - 18 tenant besar
    // 10 | 19 - 28 Co working
    // 03 | 29 - 31 ballroom
    // 03 | 32 - 34 gor
    // 03 | 35 - 37 tribun

    // ============================================== isi paket ==============================================    
    if (true) {
      console.log('isi_paket')
      data.isi_paket = []
      // seminar a
      for (let pa = 1; pa < 6 + 1; pa++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[pa - 1].id_paket,
          id_produk: result.produk[pa - 1].id_produk,
        })
      }
      // seminar b
      for (let pr = 2; pr < 2 + 2; pr++) { //produk
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[7 - 1].id_paket,
          id_produk: result.produk[pr - 1].id_produk,
        })
      }
      for (let pr = 4; pr < 2 + 4; pr++) { //produk
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[8 - 1].id_paket,
          id_produk: result.produk[pr - 1].id_produk,
        })
      }
      // tenant a
      for (let pa = 0; pa < 9; pa++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[pa + 9 - 1].id_paket,
          id_produk: result.produk[pa + 7 - 1].id_produk,
        })
      }
      // tenant aa
      for (let pa = 0; pa < 4; pa++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[pa + 18 - 1].id_paket,
          id_produk: result.produk[pa + 15 - 1].id_produk,
        })
      }
      // meeting a
      for (let pa = 0; pa < 10; pa++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[pa + 22 - 1].id_paket,
          id_produk: result.produk[pa + 19 - 1].id_produk,
        })
      }
      // meeting b
      for (let pr = 0; pr < 2; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[32 - 1].id_paket,
          id_produk: result.produk[pr + 19 - 1].id_produk,
        })
      }
      for (let pr = 0; pr < 2; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[33 - 1].id_paket,
          id_produk: result.produk[pr + 21 - 1].id_produk,
        })
      }
      for (let pr = 0; pr < 2; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[34 - 1].id_paket,
          id_produk: result.produk[pr + 25 - 1].id_produk,
        })
      }
      for (let pr = 0; pr < 2; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[35 - 1].id_paket,
          id_produk: result.produk[pr + 27 - 1].id_produk,
        })
      }
      // ballroom a
      for (let pa = 0; pa < 3; pa++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[pa + 36 - 1].id_paket,
          id_produk: result.produk[pa + 29 - 1].id_produk,
        })
      }
      // ballroom b
      for (let pr = 0; pr < 2; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[39 - 1].id_paket,
          id_produk: result.produk[pr + 29 - 1].id_produk,
        })
      }
      for (let pr = 0; pr < 2; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[40 - 1].id_paket,
          id_produk: result.produk[pr + 30 - 1].id_produk,
        })
      }
      // full ballroom
      for (let pr = 0; pr < 3; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[41 - 1].id_paket,
          id_produk: result.produk[pr + 29 - 1].id_produk,
        })
      }
      // gor tanpa tribun a
      for (let pa = 0; pa < 3; pa++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[pa + 42 - 1].id_paket,
          id_produk: result.produk[pa + 32 - 1].id_produk,
        })
      }
      // gor tanpa tribun b
      for (let pr = 0; pr < 2; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[45 - 1].id_paket,
          id_produk: result.produk[pr + 32 - 1].id_produk,
        })
      }
      for (let pr = 0; pr < 2; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[46 - 1].id_paket,
          id_produk: result.produk[pr + 33 - 1].id_produk,
        })
      }
      // full gor tanpa tribun
      for (let pr = 0; pr < 3; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[47 - 1].id_paket,
          id_produk: result.produk[pr + 32 - 1].id_produk,
        })
      }
      // gor dengan tribun a
      for (let pa = 0; pa < 3; pa++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[pa + 48 - 1].id_paket,
          id_produk: result.produk[pa + 32 - 1].id_produk,
        })
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[pa + 48 - 1].id_paket,
          id_produk: result.produk[pa + 35 - 1].id_produk,
        })
      }
      // gor dengan tribun b
      for (let pr = 0; pr < 2; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[51 - 1].id_paket,
          id_produk: result.produk[pr + 32 - 1].id_produk,
        })
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[51 - 1].id_paket,
          id_produk: result.produk[pr + 35 - 1].id_produk,
        })
      }
      for (let pr = 0; pr < 2; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[46 - 1].id_paket,
          id_produk: result.produk[pr + 33 - 1].id_produk,
        })
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[46 - 1].id_paket,
          id_produk: result.produk[pr + 36 - 1].id_produk,
        })
      }
      // full gor dengan tribun
      for (let pr = 0; pr < 3; pr++) { //paket
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[53 - 1].id_paket,
          id_produk: result.produk[pr + 32 - 1].id_produk,
        })
        data.isi_paket.push({
          id_isi_paket: uuid_v4(),
          id_paket: result.paket[53 - 1].id_paket,
          id_produk: result.produk[pr + 35 - 1].id_produk,
        })
      }
      result.isi_paket = await db.isi_paket.bulkCreate(data.isi_paket) 
    }

    // ============================================== add_on ==============================================
    if (true) {
      console.log('add_on')
      data.add_on = []
      data.add_on.push({
        id_add_on: uuid_v4(),
        nama_add_on: 'Speaker besar',
        jumlah_add_on: 15,
        icon_add_on: `icon speaker besar.png`,
        keterangan_add_on: 'Muladi Dome semakin meriah dengan sound system dari kami! Nikmati kualitas suara profesional dengan speaker besar berdaya tinggi. Cocok untuk berbagai acara, dari konser hingga seminar.',
        harga_setengah_hari_umum_add_on: 600000,
        harga_harian_umum_add_on: 1000000,
        harga_bulanan_umum_add_on: 25000000,
        harga_tahunan_umum_add_on: 300000000,
        harga_setengah_hari_akademi_add_on: 400000,
        harga_harian_akademi_add_on: 750000,
        harga_bulanan_akademi_add_on: 15000000,
        harga_tahunan_akademi_add_on: 170000000,
      })
      data.add_on.push({
        id_add_on: uuid_v4(),
        nama_add_on: 'Speaker Kecil',
        jumlah_add_on: 50,
        icon_add_on: `icon speaker kecil.png`,
        keterangan_add_on: 'Suara Jernih dalam Ukuran Mini. Speaker kecil kami memberikan kualitas suara yang tak kalah dengan speaker berukuran besar. Cocok untuk memastikan setiap peserta dapat mendengar dengan jelas.',
        harga_setengah_hari_umum_add_on: 600000,
        harga_harian_umum_add_on: 1000000,
        harga_bulanan_umum_add_on: 25000000,
        harga_tahunan_umum_add_on: 300000000,
        harga_setengah_hari_akademi_add_on: 400000,
        harga_harian_akademi_add_on: 750000,
        harga_bulanan_akademi_add_on: 15000000,
        harga_tahunan_akademi_add_on: 170000000,
      })
      data.add_on.push({
        id_add_on: uuid_v4(),
        nama_add_on: 'Proyektor',
        jumlah_add_on: 20,
        icon_add_on: `icon proyektor.png`,
        keterangan_add_on: 'Visual yang Memukau untuk Setiap Acara. Nikmati kualitas gambar yang luar biasa dengan proyektor kami. Sempurna untuk menampilkan presentasi, video, atau gambar dengan detail yang menakjubkan.',
        harga_setengah_hari_umum_add_on: 600000,
        harga_harian_umum_add_on: 1000000,
        harga_bulanan_umum_add_on: 25000000,
        harga_tahunan_umum_add_on: 300000000,
        harga_setengah_hari_akademi_add_on: 400000,
        harga_harian_akademi_add_on: 750000,
        harga_bulanan_akademi_add_on: 15000000,
        harga_tahunan_akademi_add_on: 170000000,
      })
      data.add_on.push({
        id_add_on: uuid_v4(),
        nama_add_on: 'TV',
        jumlah_add_on: 10,
        icon_add_on: `icon tv.png`,
        keterangan_add_on: 'Nikmati Visual yang Memukau dengan TV Kami. Sempurna untuk menampilkan presentasi, video, atau gambar dengan detail yang menakjubkan. Kualitas gambar yang tinggi akan membuat acara Anda lebih menarik.',
        harga_setengah_hari_umum_add_on: 600000,
        harga_harian_umum_add_on: 1000000,
        harga_bulanan_umum_add_on: 25000000,
        harga_tahunan_umum_add_on: 300000000,
        harga_setengah_hari_akademi_add_on: 400000,
        harga_harian_akademi_add_on: 750000,
        harga_bulanan_akademi_add_on: 15000000,
        harga_tahunan_akademi_add_on: 170000000,
      })
      data.add_on.push({
        id_add_on: uuid_v4(),
        nama_add_on: 'AC Portabel',
        jumlah_add_on: 10,
        icon_add_on: `icon ac portable.png`,
        keterangan_add_on: 'AC Portabel: Solusi Pendinginan yang Praktis untuk Semua Acara. Baik untuk rapat bisnis, konser musik, atau acara pernikahan, AC portabel kami memberikan kenyamanan suhu yang optimal. Mudah dipindahkan dan sangat efisien.',
        harga_setengah_hari_umum_add_on: 600000,
        harga_harian_umum_add_on: 1000000,
        harga_bulanan_umum_add_on: 25000000,
        harga_tahunan_umum_add_on: 300000000,
        harga_setengah_hari_akademi_add_on: 400000,
        harga_harian_akademi_add_on: 750000,
        harga_bulanan_akademi_add_on: 15000000,
        harga_tahunan_akademi_add_on: 170000000,
      })
      data.add_on.push({
        id_add_on: uuid_v4(),
        nama_add_on: 'Kipas Blower',
        jumlah_add_on: 20,
        icon_add_on: `icon kipas blower.png`,
        keterangan_add_on: 'Alternatif Pendinginan yang Hemat Biaya. Dibandingkan dengan AC, kipas blower lebih hemat energi dan mudah digunakan. Cocok untuk acara dengan durasi singkat atau ruangan yang tidak terlalu besar.',
        harga_setengah_hari_umum_add_on: 600000,
        harga_harian_umum_add_on: 1000000,
        harga_bulanan_umum_add_on: 25000000,
        harga_tahunan_umum_add_on: 300000000,
        harga_setengah_hari_akademi_add_on: 400000,
        harga_harian_akademi_add_on: 750000,
        harga_bulanan_akademi_add_on: 15000000,
        harga_tahunan_akademi_add_on: 170000000,
      })
      data.add_on.push({
        id_add_on: uuid_v4(),
        nama_add_on: 'Kursi',
        jumlah_add_on: 200,
        icon_add_on: `icon kursi.png`,
        keterangan_add_on: 'Kursi Berkualitas untuk Setiap Acara Anda di Muladi Dome. Nikmati kenyamanan maksimal dengan kursi berkualitas kami yang dirancang untuk berbagai jenis acara, mulai dari konferensi bisnis hingga konser musik. Kursi kami mudah diatur dan dapat disesuaikan dengan kebutuhan Anda.',
        harga_setengah_hari_umum_add_on: 600000,
        harga_harian_umum_add_on: 1000000,
        harga_bulanan_umum_add_on: 25000000,
        harga_tahunan_umum_add_on: 300000000,
        harga_setengah_hari_akademi_add_on: 400000,
        harga_harian_akademi_add_on: 750000,
        harga_bulanan_akademi_add_on: 15000000,
        harga_tahunan_akademi_add_on: 170000000,
      })
      data.add_on.push({
        id_add_on: uuid_v4(),
        nama_add_on: 'Meja',
        jumlah_add_on: 100,
        icon_add_on: `icon meja.png`,
        keterangan_add_on: 'Meja Multifungsi untuk Semua Kebutuhan Acara Anda. Baik untuk rapat bisnis, konser musik, atau pameran produk, meja kami dapat disesuaikan dengan berbagai tata letak dan kebutuhan. Desainnya yang modern dan kokoh menjamin tampilan yang profesional.',
        harga_setengah_hari_umum_add_on: 600000,
        harga_harian_umum_add_on: 1000000,
        harga_bulanan_umum_add_on: 25000000,
        harga_tahunan_umum_add_on: 300000000,
        harga_setengah_hari_akademi_add_on: 400000,
        harga_harian_akademi_add_on: 750000,
        harga_bulanan_akademi_add_on: 15000000,
        harga_tahunan_akademi_add_on: 170000000,
      })
      result.add_on = await db.add_on.bulkCreate(data.add_on) 
    }

    // ============================================== order ==============================================
    if (true) {
      console.log('order')
      result.order = []
      result.pool_order_paket = []
      result.pool_order_add_on = []
      result.review = []
      result.pembayaran = []
      data.order = []
      data.pool_order_paket = []
      data.pool_order_add_on = []
      data.review = []
      data.pembayaran = []
      const type_lama_sewa = [
        // {kode: 'setengah_hari', durasi: 6, harga: 'harga_setengah_hari_umum_paket', moment: 'hours'},
        {kode: 'harian', durasi: 1, harga: 'harga_harian', moment: 'days'},
        // {kode: 'bulanan', durasi: 1, harga: 'harga_bulanan_umum_paket', moment: 'months'},
        // {kode: 'tahunan', durasi: 1, harga: 'harga_tahunan_umum_paket', moment: 'years'},
      ]
      const paket = {}
      paket.seminar = result.paket.splice(0, 8)
      paket.tenant = result.paket.splice(0, 13)
      paket.meeting = result.paket.splice(0, 14)
      paket.baalroom = result.paket.splice(0, 6)
      paket.gor = result.paket.splice(0, 12)
      // paket.tenant.splice(21)
      // paket.tenant.splice(-12)
      // console.log('paket.seminar', paket.seminar)
      // console.log('result.paket.length', result.paket.length)
      // console.log('paket.seminar.length', paket.seminar.length)
      // console.log('paket.tenant.length', paket.tenant.length)
      // console.log('paket.meeting.length', paket.meeting.length)
      // console.log('paket.baalroom.length', paket.baalroom.length)
      // console.log('paket.gor.length', paket.gor.length)
      
      // seminar
      const seminar = [
        {
          nama: 'Transformasi Digital dalam Pendidikan Tinggi: Tantangan dan Peluang',
          keterangan: 'Seminar ini membahas tentang bagaimana teknologi digital mengubah lanskap pendidikan tinggi, mulai dari metode pembelajaran hingga manajemen perguruan tinggi.',
          gambar: 'order transformasi digital.jpg',
          komentar: 'Mengadakan seminar ini di Gedung Muladi Dome memberikan suasana yang profesional dan kondusif untuk diskusi mendalam. Fasilitas yang lengkap dan modern mendukung presentasi dan interaksi peserta dengan baik.',
        },
        {
          nama: 'Strategi Pemasaran Digital untuk UMKM di Era Pandemi',
          keterangan: 'Seminar ini memberikan panduan praktis bagi pelaku UMKM untuk memanfaatkan platform digital dalam memasarkan produk atau jasa mereka.',
          gambar: 'order Go-Digital-Strategi-Memperkuat-UMKM.png',
          komentar: 'Gedung Muladi Dome sangat cocok untuk menyelenggarakan seminar ini karena lokasinya yang strategis dan fasilitasnya yang lengkap. Ruangan yang luas dapat menampung banyak peserta dengan nyaman.',
        },
        {
          nama: 'Leadership di Era Disrupsi: Membangun Tim yang Adaptif',
          keterangan: 'Seminar ini membahas tentang pentingnya kepemimpinan yang efektif dalam menghadapi perubahan yang cepat di dunia bisnis.',
          gambar: 'order mindful-leadership-1.jpg',
          komentar: 'Dengan suasana yang nyaman dan fasilitas audio-visual yang canggih, Gedung Muladi Dome memberikan pengalaman seminar yang optimal. Peserta dapat fokus dan terlibat secara aktif dalam diskusi.',
        },
        {
          nama: 'Pencegahan dan Pengobatan Penyakit Kronis: Diabetes Melitus',
          keterangan: 'Seminar ini memberikan informasi tentang cara mencegah dan mengelola penyakit diabetes melitus.',
          gambar: 'order pencegahan diabetes melitus.png',
          komentar: 'Ruang seminar yang modern dan fasilitas pendukung yang lengkap di Gedung Muladi Dome memastikan acara berlangsung dengan lancar. Lokasinya yang mudah diakses juga memudahkan peserta untuk hadir.',
        },
        {
          nama: 'Kecerdasan Buatan: Dampak terhadap Masa Depan Kemanusiaan',
          keterangan: 'Seminar ini membahas tentang perkembangan teknologi kecerdasan buatan dan implikasinya bagi kehidupan manusia.',
          gambar: 'order Perbedaan-Artificial-Intelligence-Machine-Learning-dan-Deep-Learning-Serta-Contohnya-e1620834941942.jpg',
          komentar: 'Gedung Muladi Dome menyediakan ruang yang ideal untuk seminar ini, dengan fasilitas teknologi yang memadai untuk mendukung presentasi yang interaktif dan informatif. Peserta dapat menikmati suasana yang nyaman dan profesional.',
        },
        {
          nama: 'Cybersecurity: Melindungi Data Pribadi di Era Digital',
          keterangan: 'Seminar ini memberikan pengetahuan tentang cara melindungi diri dari ancaman siber dan menjaga keamanan data pribadi.',
          gambar: 'order cyber security.jpg',
          komentar: 'Gedung Muladi Dome adalah tempat yang tepat untuk seminar ini, karena memiliki fasilitas keamanan dan teknologi yang canggih. Lokasinya yang strategis juga memudahkan akses bagi peserta.',
        },
        {
          nama: 'Pelestarian Budaya Lokal melalui Seni Pertunjukan',
          keterangan: 'Seminar ini membahas tentang upaya-upaya pelestarian budaya lokal melalui berbagai bentuk seni pertunjukan.',
          gambar: 'order kebudayaan.jpg',
          komentar: 'Dengan ruang yang luas dan fasilitas yang lengkap, Gedung Muladi Dome mendukung acara ini dengan baik. Peserta dapat menikmati pertunjukan seni dengan nyaman dan terlibat dalam diskusi yang bermakna.',
        },
        {
          nama: 'Parenting di Era Digital: Membimbing Anak di Dunia Online',
          keterangan: 'Seminar ini ditujukan bagi orang tua untuk membahas tentang cara membimbing anak dalam menggunakan teknologi digital.',
          gambar: 'order parenting_4.0.jpg',
          komentar: 'Fasilitas yang nyaman dan lokasi yang strategis membuat Gedung Muladi Dome menjadi pilihan ideal untuk seminar ini. Orang tua dapat berdiskusi dan belajar dalam suasana yang kondusif.',
        },
        {
          nama: 'Kewirausahaan Sosial: Membangun Bisnis yang Berdampak Positif',
          keterangan: 'Seminar ini membahas tentang konsep kewirausahaan sosial dan memberikan inspirasi bagi mereka yang ingin memulai bisnis yang berdampak positif bagi masyarakat.',
          gambar: 'order Wirausahawan.jpg',
          komentar: 'Gedung Muladi Dome menyediakan ruang yang inspiratif dan nyaman untuk seminar ini. Peserta dapat bertukar ide dan mendapatkan wawasan baru dalam lingkungan yang mendukung.',
        },
      ];      
      for (let a = 0; a < 150; a++) {
        console.log('order ' + (a + 1))
        for (let i = 0; i < seminar.length; i++) {
          const i_seminar = acak('angka', paket.seminar.length) - 1 // acak paket seminar
          const i_meeting = acak('angka', paket.meeting.length) - 1 // acak paket meeting
          const with_meeting = acak('item', true, false, false) // acak dengan paket meeting atau tidak  
          const a_akun_member = acak('array', result.akun_member) // acak akun member / pemesan
          const a_type_lama_sewa = acak('array', type_lama_sewa) // acak type lama sewa / durasi
          const a_durasi = a_type_lama_sewa.kode == 'setengah_hari' ? 1 : acak('angka', 5) // acak jumlah durasi sewa
          let a_mulai = moment()
          let a_selesai = moment()
          // const waktu = paket.seminar[i_seminar].selesai ? moment(paket.seminar[i_seminar].selesai) : moment().subtract(1, 'months').format('YYYY-MM-DD')
          let waktu =  moment().subtract(10, 'years').format('YYYY-MM-DD') // waktu mulai pemesanan
          // let waktu =  moment().add(0, 'months').format('YYYY-MM-DD') // waktu mulai pemesanan
          // !!! waktu mulai dan selesai di simpan pada variabel paket
          if(paket.meeting[i_meeting].selesai && paket.seminar[i_seminar].selesai){ // jika ada waktu meeting dan seminar
            if(moment(paket.meeting[i_meeting].selesai) > moment(paket.seminar[i_seminar].selesai)){ // jika meeting lebih lama dari seminar 
              waktu = moment(paket.meeting[i_meeting].selesai) // ambil waktu meeting
            }else{
              waktu = moment(paket.seminar[i_seminar].selesai) // ambil waktu seminar
            }
          }else if(paket.meeting[i_meeting].selesai){ // jika hanya ada waktu meeting
            waktu = moment(paket.meeting[i_meeting].selesai) // ambil waktu meeting
          }else if(paket.seminar[i_seminar].selesai){ // jika hanya ada waktu seminar
            waktu = moment(paket.seminar[i_seminar].selesai) // ambil waktu seminar
          }
          let ulangi = true
          do {
            if(a_type_lama_sewa.kode == 'setengah_hari'){ // jika type durasi setengah hari
              if(moment(waktu) < moment(moment(waktu).format('YYYY-MM-DD')).add(15, 'hours')){
                a_mulai = moment(moment(waktu).add(1, 'days').format('YYYY-MM-DD')).add(8 + 7, 'hours')
                a_selesai = moment(moment(waktu).add(1, 'days').format('YYYY-MM-DD')).add(14 + 7, 'hours')
              }else{
                a_mulai = moment(moment(waktu).format('YYYY-MM-DD')).add(16 + 7, 'hours')
                a_selesai = moment(moment(waktu).format('YYYY-MM-DD')).add(22 + 7, 'hours')
              }
            }else{ // jika type durasi hari, bulan, / tahun
              a_mulai = moment(waktu).add(acak('item', 0, 1, 2, 3), a_type_lama_sewa.moment).format('YYYY-MM-DD')
              a_selesai = moment(a_mulai).add(a_type_lama_sewa.kode == 'setengah_hari' ? 6 : a_durasi, a_type_lama_sewa.moment).format('YYYY-MM-DD')
            }
            const dataPaket = [paket.seminar[i_seminar].id_paket]
            if(with_meeting) dataPaket.push(paket.meeting[i_meeting].id_paket)
            // get produk
            let listProduk = await db.sq.query(`
              select p2.id_produk
              from paket p 
              inner join isi_paket ip on ip.id_paket = p.id_paket and ip.deleted_at is null
              inner join produk p2 on p2.id_produk = ip.id_produk and p2.deleted_at is null
              where p.deleted_at is null and p.id_paket IN (:dataPaket)
            `,{ replacements: { dataPaket }, type: QueryTypes.SELECT })
            // get order
            const dataProduk = listProduk.map(x => x.id_produk)
            let listOrder = await db.sq.query(`
              select *
              from \`order\` o
              inner join pool_order_paket pop on pop.id_order = o.id_order and pop.deleted_at is null 
              inner join isi_paket ip on ip.id_paket = pop.id_paket and ip.deleted_at is null
              inner join produk p on p.id_produk = ip.id_produk and p.deleted_at is null
              where ip.id_produk IN (:dataProduk) and o.tanggal_mulai <= :tanggal_selesai and o.tanggal_selesai >= :tanggal_mulai
              ORDER by o.tanggal_selesai desc
            `,{ replacements: { dataProduk, tanggal_mulai: new Date(a_mulai), tanggal_selesai: new Date(a_selesai) }, type: QueryTypes.SELECT })
            if(listOrder.length) {
              ulangi = true
              waktu = listOrder[0].tanggal_selesai
            }else{
              ulangi = false
            }
          } while (ulangi);
          paket.seminar[i_seminar].selesai = a_selesai
          paket.meeting[i_meeting].selesai = a_selesai
          let kegiatan_akademi = acak('item', true, false, false)
          let nominal_add_on = 0
          let list_add_on_order = []
          let jumlah_acak_add_on = acak('item', 1, 2, 3, 4, 5, 5, 6)
          // console.log(a_type_lama_sewa.harga + (kegiatan_akademi ? '_akademi' : '_umum') + '_paket')
          for (let u = 0; u < jumlah_acak_add_on; u++) {
            const a_add_on = acak('array', result.add_on)
            a_add_on.jumlah_add_on = acak('item', 1, 2, 2, 3, 3, 4, 5, 6)
            list_add_on_order.push(a_add_on)
            nominal_add_on += (a_add_on[a_type_lama_sewa.harga + (kegiatan_akademi ? '_akademi' : '_umum') + '_add_on'] * a_add_on.jumlah_add_on)
          } 
          let nominal_sewa = paket.seminar[i_seminar][a_type_lama_sewa.harga + (kegiatan_akademi ? '_akademi' : '_umum') + '_paket'] * a_durasi + (with_meeting ? paket.meeting[i_meeting][a_type_lama_sewa.harga + (kegiatan_akademi ? '_akademi' : '_umum') + '_paket'] : 0)
          // console.log('nominal_sewa', nominal_sewa)
          const a_pajak = acak('array', result.kategori_pajak)
          let bayar_ppn = a_pajak.bayar_ppn
          let bayar_pph = a_pajak.bayar_pph
          let bayar_pbjt = a_pajak.bayar_pbjt
          let nominal_ppn = 100 / 121 * (nominal_sewa + nominal_add_on) * 0.11
          let nominal_pph = 100 / 121 * (nominal_sewa + nominal_add_on) * 0.10
          let nominal_pbjt = (nominal_sewa + nominal_add_on) * 0.10 
          // jika bayar pbjt, dpp = sewa + add on
          // jika tidak bayar bpjt, dpp = sewa + add on - ppn - pph
          let nominal_dpp = bayar_pbjt ? nominal_sewa + nominal_add_on : nominal_sewa + nominal_add_on - nominal_ppn - nominal_pph
          let nominal_harus_bayar = nominal_dpp + (bayar_ppn ? nominal_ppn : 0) + (bayar_pph ? nominal_pph : 0) + (bayar_pbjt ? nominal_pbjt : 0)
          let lama_overtime = acak('item', 0, 0, 0, 0, 1, 2, 3, 4, 5)
          const dataOrder = {
            id_order: uuid_v4(),
            nama_order: seminar[i].nama,
            keterangan_order: seminar[i].keterangan,
            image_order: seminar[i].gambar,
            penanggung_jawab: acak('item', "Adi Nugroho", "Siti Aisah", "Budi Santoso", "Wati Sulastri", "Chandra Wijaya", "Dwi Ratna Sari", "Eko Prasetyo", "Fatimah Zahra", "Galih Wicaksono", "Haniyah Nurfitri", "Indra Kusuma", "Joko Susilo", "Kartika Dewi", "Lestari Wardhani", "Mamat Rahmat", "Neni Herawati", "Oka Mahendra", "Putri Ayu", "Qori Akbar", "Rina Agustin", "Sari Wulandari", "Taufik Hidayat", "Umi Kulsum", "Vina Febriana", "Wawan Setiawan", "Xaverius Budiman", "Yeni Purwanti", "Zainal Abidin", "Aisyah Rahmah", "Bagus Prasetyo", "Citra Kirana", "Dimas Prasetyo", "Eka Saputri", "Fajar Nugraha", "Gita Savitri", "Hanafi Rahman", "Irfan Bachdim", "Jessica Mila", "Kartika Putri", "Lala Karmela", "Manda Aulia", "Nia Ramadhani", "Oki Setiana Dewi", "Putri Marino", "Raffi Ahmad", "Shandy Aulia", "Tasya Kamila", "Ussy Sulistiawaty", "Vega Darwanti", "Wulan Guritno"),
            publish_order: acak('item', true, false),
            nominal_harus_bayar,
            nominal_dpp,
            nominal_sewa,
            nominal_add_on,
            nominal_promo: 0,
            persen_ppn: 11,
            persen_pph: 10,
            persen_pbjt: 10,
            nominal_ppn,
            nominal_pph,
            nominal_pbjt,
            bayar_ppn,
            bayar_pph,
            bayar_pbjt,
            nominal_overtime: lama_overtime * 50000,
            lama_overtime,
            tanggal_mulai: a_mulai,
            tanggal_selesai: a_selesai,
            type_lama_sewa: a_type_lama_sewa.kode,
            durasi: a_durasi,
            kegiatan_akademi,
            pembayaran_lunas: false,
            batal_order: acak('item', true, false, false, false),
            backup_order: {},
            id_promo: null,
            id_akun_member: a_akun_member.id_akun_member,
            id_status_approve_order: acak('array', result.status_approve_order).id_status_approve_order,
            id_kategori_pajak: a_pajak.id_kategori_pajak,
            limit_waktu_approval: moment(a_mulai).subtract(10, 'days'),
            limit_waktu_pembayaran_awal: moment(a_mulai).subtract(9, 'days'),
          }
          // buat pool order paket seminar
          const dataPoolOrderPaket = [{
            id_pool_order_paket: uuid_v4(),
            id_order: dataOrder.id_order,
            id_paket: paket.seminar[i_seminar].id_paket,
          }]
          // buat pool order paket meeting tambahan
          if(with_meeting){
            dataPoolOrderPaket.push({
              id_pool_order_paket: uuid_v4(),
              id_order: dataOrder.id_order,
              id_paket: paket.meeting[i_meeting].id_paket,
            })
          }
          // buat add on
          const dataAddOnOrder = []
          for (let u = 0; u < list_add_on_order.length; u++) {
            const add_on = list_add_on_order[u];
            dataAddOnOrder.push({
              id_pool_order_add_on: uuid_v4(),
              jumlah_add_on: add_on.jumlah_add_on,
              id_add_on: add_on.id_add_on,
              id_order: dataOrder.id_order,
            })            
          }
          // buat review
          const dataReview = []
          if(acak('item', true, true, false)){
            let id_paket = findKey(dataPoolOrderPaket, dataOrder.id_order, 'id_order', 'id_paket')
            let id_produk = findKey(result.isi_paket, id_paket, 'id_paket', 'id_produk')
            dataReview.push({
              id_review: uuid_v4(),
              rating_review: acak('item', 4, 5, 5, 4, 5, 5, 4, 3, 5, 5),
              komentar: seminar[i].komentar,
              id_order: dataOrder.id_order,
              id_paket,
              id_produk,
            })
          }
          // pembayaran
          const dataPembayaran = []
          const rekening_pembayaran_manual = [ 
            { "type": "manual", "value": "bni" , "text": "BNI", "no_rekening": "29480284029"},
            { "type": "manual", "value": "bri" , "text": "BRI", "no_rekening": "84029384023"},
            { "type": "manual", "value": "mdri" , "text": "Mandiri", "no_rekening": "3203920993"},
          ]
          const rekening_pembayaran_otomatis = [ 
            { "type": "otomatis", "value": "bni_va" , "text": "BNI"},
            { "type": "otomatis", "value": "bri_va" , "text": "BRI"},
            { "type": "otomatis", "value": "mdri_va" , "text": "Mandiri"}
          ]
          if(acak('item', true, true, false)){
            const lns = dataOrder.nominal_harus_bayar
            const nominal_trm1 = Math.floor(dataOrder.nominal_harus_bayar * 0.25)
            const nominal_dpp_trm1 = Math.floor(dataOrder.nominal_dpp * 0.25)
            const nominal_ppn_trm1 = Math.floor(dataOrder.nominal_ppn * 0.25)
            const nominal_pph_trm1 = Math.floor(dataOrder.nominal_pph * 0.25)
            const nominal_pbjt_trm1 = Math.floor(dataOrder.nominal_pbjt * 0.25)
            if(acak('item', true, true, false)){
              // Termin 1
              dataPembayaran.push({
                id_pembayaran: uuid_v4(),
                no_invoice: `${moment().format('YYMMDDHHmmss')}${Math.floor(1000 + Math.random() * 9000)}`,
                type_pembayaran: 'trm1', 
                cek_manual_pembayaran: true,
                rekening_pembayaran: acak('array', rekening_pembayaran_manual).value,
                status_pembayaran: true,
                nominal_pembayaran: nominal_trm1,
                nominal_dpp_pembayaran: nominal_dpp_trm1,
                nominal_ppn_pembayaran: nominal_ppn_trm1,
                nominal_pph_pembayaran: nominal_pph_trm1,
                nominal_pbjt_pembayaran: nominal_pbjt_trm1,
                bukti_pembayaran: `animal-${acak('angka', 38)}.png`,
                kode_payment_gateway: null,
                id_order: dataOrder.id_order,
                createdAt: dataOrder.tanggal_mulai,
                updatedAt: dataOrder.tanggal_selesai,
              })
              // Termin 2
              if(acak('item', true, true, false)){
                const nominal_trm2 = dataOrder.nominal_harus_bayar - nominal_trm1
                const nominal_dpp_trm2 = dataOrder.nominal_dpp - nominal_dpp_trm1
                const nominal_ppn_trm2 = dataOrder.nominal_ppn - nominal_ppn_trm1
                const nominal_pph_trm2 = dataOrder.nominal_pph - nominal_pph_trm1
                const nominal_pbjt_trm2 = dataOrder.nominal_pbjt - nominal_pbjt_trm1
                dataPembayaran.push({
                  id_pembayaran: uuid_v4(),
                  no_invoice: `${moment().format('YYMMDDHHmmss')}${Math.floor(1000 + Math.random() * 9000)}`,
                  type_pembayaran: 'trm2', 
                  cek_manual_pembayaran: false,
                  rekening_pembayaran: acak('array', rekening_pembayaran_otomatis).value,
                  status_pembayaran: true,
                  nominal_pembayaran: nominal_trm2,
                  nominal_dpp_pembayaran: nominal_dpp_trm2,
                  nominal_ppn_pembayaran: nominal_ppn_trm2,
                  nominal_pph_pembayaran: nominal_pph_trm2,
                  nominal_pbj_pembayaran: nominal_pbjt_trm2,
                  bukti_pembayaran: `animal-${acak('angka', 38)}.png`,
                  kode_payment_gateway: parseInt(lns) + '572236742' + parseInt(lns),
                  id_order: dataOrder.id_order,
                  createdAt: dataOrder.tanggal_mulai,
                  updatedAt: dataOrder.tanggal_selesai,
                })
                dataOrder.pembayaran_lunas = true
              }
            }else{
              dataPembayaran.push({
                id_pembayaran: uuid_v4(),
                type_pembayaran: 'lns', 
                cek_manual_pembayaran: false,
                rekening_pembayaran: acak('array', rekening_pembayaran_otomatis).value,
                status_pembayaran: true,
                nominal_pembayaran: lns,
                bukti_pembayaran: `animal-${acak('angka', 38)}.png`,
                kode_payment_gateway: parseInt(lns) + '9747938' + parseInt(lns),
                id_order: dataOrder.id_order,
                createdAt: dataOrder.tanggal_mulai,
                updatedAt: dataOrder.tanggal_selesai,
              })
              dataOrder.pembayaran_lunas = true
            }
          }else{
            // belum dibayar
            dataOrder.keterangan_order = null
            dataOrder.image_order = null
            dataOrder.publish_order = false
          }
          result.order.push(await db.order.bulkCreate([dataOrder]))
          result.pool_order_paket.push(await db.pool_order_paket.bulkCreate(dataPoolOrderPaket))
          result.pool_order_add_on.push(await db.pool_order_add_on.bulkCreate(dataAddOnOrder))
          result.review.push(await db.review.bulkCreate(dataReview))
          result.pembayaran.push(await db.pembayaran.bulkCreate(dataPembayaran))

          data.order = data.order.concat([dataOrder])
          data.pool_order_paket = data.pool_order_paket.concat(dataPoolOrderPaket)
          data.pool_order_add_on = data.pool_order_add_on.concat(dataPoolOrderPaket)
          data.review = data.review.concat(dataReview)
          data.pembayaran = data.pembayaran.concat(dataPembayaran)
        }
      }
    }
  } catch (error) {
    console.log("========================== ERROR ==========================")
    console.log(error)
  }
}

function acak(){
  let data = Array.from(new Set(arguments))
  if(arguments[0] == 'angka'){
    // acak('angka', 15)
    // mengacak angka dari 1 - 15
    data = []
    for (let i = 1; i <= arguments[1]; i++) {
      data.push(i)
    }
  }else if(arguments[0] == 'item'){ 
    // acak('item', 'kopi', 'susu', 'jahe')
    data.splice(0, 1)
  }else if(arguments[0] == 'array'){
    // acak('array', [4, 10, 39, 89])
    data = arguments[1]
  }
  let result
  do {
    let angka
    if((angka = Math.floor(Math.random() * 11)) < data.length) result = angka
  } while (result == undefined);
  return data[result]
}

module.exports = {start}