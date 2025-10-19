# Troubleshooting Guide

## ✅ **Masalah yang Sudah Diperbaiki**

### **Error: Cannot find module 'auth_controller.js'**

**Penyebab:**
- Nama controller tidak konsisten (menggunakan snake_case)
- Ada duplikasi controller di folder yang berbeda
- Path controller tidak sesuai dengan konvensi AdonisJS v6

**Solusi yang Diterapkan:**
1. ✅ **Hapus controller lama**: Menghapus controller duplikat di root folder
2. ✅ **Gunakan controller di folder Http**: Hanya menggunakan controller di `app/controllers/Http/`
3. ✅ **Perbaiki nama controller**: Menggunakan PascalCase (AuthController, bukan auth_controller)
4. ✅ **Update routes.ts**: Menggunakan nama controller yang benar

### **Struktur Controller yang Benar:**
```
app/controllers/Http/
├── AuthController.ts
├── CategoriesController.ts
├── ProductsController.ts
├── TransactionsController.ts
└── SuppliersController.ts
```

### **Routes yang Benar:**
```typescript
router.post('/register', '#controllers/http/AuthController.register')
router.post('/login', '#controllers/http/AuthController.login')
```

---

## 🔧 **Cara Mengatasi Masalah Umum**

### **1. Controller Not Found Error**
```bash
# Pastikan nama controller menggunakan PascalCase
# Salah: auth_controller
# Benar: AuthController
```

### **2. Module Resolution Error**
```bash
# Pastikan struktur folder benar
app/controllers/Http/AuthController.ts
# Bukan: app/controllers/auth_controller.ts
```

### **3. JWT Token Error**
```bash
# Pastikan User model memiliki accessTokens
# Tambahkan di User model jika belum ada
```

### **4. Database Connection Error**
```bash
# Pastikan database sudah di-setup
node ace migration:run
```

---

## 🚀 **Langkah-langkah Debugging**

### **1. Cek Struktur File**
```bash
# Pastikan file controller ada
ls app/controllers/Http/
```

### **2. Cek Routes**
```bash
# Pastikan routes menggunakan nama yang benar
grep -r "auth_controller" start/routes.ts
# Harus kosong (tidak ada hasil)
```

### **3. Cek Model User**
```bash
# Pastikan User model lengkap
cat app/models/user.ts
```

### **4. Test Aplikasi**
```bash
# Jalankan development server
npm run dev

# Cek di browser
# http://localhost:3333
```

---

## 📝 **Checklist Troubleshooting**

### **Sebelum Menjalankan Aplikasi:**
- [ ] ✅ Controller ada di folder `app/controllers/Http/`
- [ ] ✅ Nama controller menggunakan PascalCase
- [ ] ✅ Routes menggunakan nama controller yang benar
- [ ] ✅ User model sudah lengkap
- [ ] ✅ Database migration sudah dijalankan
- [ ] ✅ App key sudah di-generate

### **Setelah Menjalankan Aplikasi:**
- [ ] ✅ Server berjalan tanpa error
- [ ] ✅ Halaman home bisa diakses
- [ ] ✅ Form register berfungsi
- [ ] ✅ Form login berfungsi
- [ ] ✅ Dashboard bisa diakses setelah login

---

## 🆘 **Jika Masih Ada Error**

### **1. Clear Cache**
```bash
rm -rf node_modules/.cache
npm run dev
```

### **2. Rebuild Application**
```bash
npm run build
npm run dev
```

### **3. Check Logs**
```bash
# Lihat log error di terminal
# Biasanya error akan muncul saat menjalankan npm run dev
```

### **4. Verify Dependencies**
```bash
npm install
# Pastikan semua dependency terinstall dengan benar
```

---

## 📞 **Support**

Jika masih mengalami masalah:
1. **Cek error message** di terminal
2. **Pastikan struktur file** sesuai dengan yang ada
3. **Restart development server**
4. **Clear browser cache**

**🎉 Setelah perbaikan ini, aplikasi seharusnya berjalan dengan normal!**
