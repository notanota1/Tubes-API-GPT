# 🔐 Sistem Authentication Baru - Single Password

## 📋 **Konsep Sistem**

### **Perubahan Utama:**
- ❌ **Tidak ada registrasi** - hanya admin yang bisa login
- ✅ **Password tunggal** yang sudah di-set sebelumnya
- ✅ **Tetap menggunakan JWT** untuk session management
- ✅ **Lebih sederhana** untuk aplikasi inventaris internal

---

## 🔧 **Cara Kerja Sistem**

### **1. Admin User Default**
```
Email: admin@inventaris.com
Password: admin123 (default)
```

### **2. Flow Authentication:**
```
1. User buka halaman login
2. Masukkan password admin
3. System cek password di database
4. Jika benar → generate JWT token
5. Redirect ke dashboard dengan token
6. Semua request selanjutnya menggunakan JWT
```

### **3. Security Features:**
- ✅ **Password hashing** dengan bcrypt
- ✅ **JWT token** untuk session management
- ✅ **Protected routes** membutuhkan authentication
- ✅ **Token expiration** untuk keamanan

---

## 🚀 **Setup & Installation**

### **1. Jalankan Seeder (Sudah Otomatis)**
```bash
node ace db:seed --files=database/seeders/admin_seeder.ts
```

### **2. Akses Aplikasi**
```bash
npm run dev
# Buka: http://localhost:3333
```

### **3. Login**
- **URL**: http://localhost:3333/login
- **Password**: `admin123`

---

## 🔄 **User Journey Baru**

### **Sebelum (Dengan Registrasi):**
```
1. Homepage → Register → Form registrasi → Submit → Login
2. Homepage → Login → Form login → Submit → Dashboard
```

### **Sekarang (Single Password):**
```
1. Homepage → Admin Login → Masukkan password → Submit → Dashboard
```

---

## 🛠️ **Technical Implementation**

### **1. Seeder (database/seeders/admin_seeder.ts)**
```typescript
// Membuat admin user default
await User.create({
  fullName: 'Administrator',
  email: 'admin@inventaris.com',
  password: await hash.make('admin123')
})
```

### **2. AuthController (app/controllers/Http/AuthController.ts)**
```typescript
// Login hanya dengan password
async login({ request, response }: HttpContext) {
  const { password } = request.only(['password'])
  
  // Cari admin user
  const adminUser = await User.findBy('email', 'admin@inventaris.com')
  
  // Verifikasi password
  const isPasswordValid = await hash.verify(adminUser.password, password)
  
  // Generate JWT token
  const token = await User.accessTokens.create(adminUser)
  
  return response.ok({ token: token.value!.release() })
}
```

### **3. Login Form (inertia/pages/login.tsx)**
```typescript
// Form hanya password
const { data, setData, post } = useForm({
  password: ''
})

// Submit ke /api/auth/login
post('/api/auth/login')
```

---

## 🔒 **Security Considerations**

### **1. Password Management**
- ✅ **Default password**: `admin123`
- ✅ **Hashed dengan bcrypt**
- ✅ **Dapat diubah** melalui database langsung

### **2. JWT Token**
- ✅ **Secure token** untuk session
- ✅ **Auto logout** saat token expired
- ✅ **Protected routes** membutuhkan valid token

### **3. Admin Access**
- ✅ **Single admin** untuk keamanan
- ✅ **No registration** untuk mencegah akses tidak sah
- ✅ **Password-based** authentication

---

## 📝 **Cara Mengubah Password Admin**

### **Method 1: Database Direct**
```sql
-- Login ke MySQL
mysql -u username -p

-- Update password (ganti 'newpassword' dengan password baru)
UPDATE users 
SET password = '$2b$10$hash_dari_password_baru' 
WHERE email = 'admin@inventaris.com';
```

### **Method 2: Seeder Update**
```typescript
// Edit database/seeders/admin_seeder.ts
password: await hash.make('password_baru_anda')
```

### **Method 3: Command Line**
```bash
# Buat seeder baru untuk update password
node ace make:seeder UpdatePasswordSeeder
```

---

## 🎯 **Keuntungan Sistem Baru**

### **1. Simplicity**
- ✅ **Lebih sederhana** - tidak perlu registrasi
- ✅ **Single password** - mudah diingat
- ✅ **Quick access** - langsung login

### **2. Security**
- ✅ **Controlled access** - hanya admin yang bisa akses
- ✅ **No unauthorized registration** - mencegah akses tidak sah
- ✅ **Password hashing** - keamanan password

### **3. Maintenance**
- ✅ **Easy management** - satu user admin
- ✅ **Simple deployment** - tidak perlu setup user baru
- ✅ **Clear access control** - jelas siapa yang bisa akses

---

## 🔧 **Daemon Commands**

### **Jalankan Seeder:**
```bash
node ace db:seed --files=database/seeders/admin_seeder.ts
```

### **Reset Database:**
```bash
node ace migration:reset
node ace db:seed --files=database/seeders/admin_seeder.ts
```

### **Generate New App Key:**
```bash
node ace generate:key
```

---

## 📞 **Troubleshooting**

### **Admin User Tidak Ditemukan:**
```bash
# Jalankan seeder
node ace db:seed --files=database/seeders/admin_seeder.ts
```

### **Password Salah:**
- Pastikan menggunakan password: `admin123`
- Cek di database apakah user admin sudah dibuat

### **Token Error:**
```bash
# Clear cache dan restart
npm run dev
```

---

**🎉 Sistem authentication baru sudah siap digunakan! Lebih sederhana, aman, dan mudah dikelola.**
