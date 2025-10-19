# 🔧 NPM Command Fix - PowerShell Issues

## ❌ **Masalah yang Terjadi**

### **1. Command Error:**
```bash
npm start dev  # ❌ SALAH - tidak ada script "start dev"
```

### **2. PowerShell Syntax Error:**
```bash
cd d:\Invtry && npm run dev  # ❌ SALAH - && tidak valid di PowerShell
```

### **3. Package.json Error:**
```bash
npm error code ENOENT
npm error syscall open
npm error path D:\package.json  # ❌ SALAH - path tidak benar
```

## ✅ **Solusi yang Benar**

### **1. Command yang Benar:**
```bash
# ✅ BENAR
npm run dev

# ❌ SALAH
npm start dev
```

### **2. PowerShell Syntax yang Benar:**
```bash
# ✅ BENAR - PowerShell
cd d:\Invtry
npm run dev

# ✅ BENAR - Command Prompt
cd d:\Invtry && npm run dev

# ❌ SALAH - PowerShell
cd d:\Invtry && npm run dev
```

### **3. Path yang Benar:**
```bash
# ✅ BENAR - Pastikan di folder project
cd d:\Invtry
npm run dev

# ❌ SALAH - Di root directory
cd d:\
npm run dev
```

## 🔧 **Cara Menjalankan Aplikasi**

### **Method 1: PowerShell (Recommended)**
```powershell
# Step 1: Navigate ke project folder
cd d:\Invtry

# Step 2: Jalankan development server
npm run dev
```

### **Method 2: Command Prompt**
```cmd
# Step 1: Navigate ke project folder
cd d:\Invtry

# Step 2: Jalankan development server
npm run dev
```

### **Method 3: VS Code Terminal**
```bash
# Buka terminal di VS Code
# Pastikan working directory adalah d:\Invtry
npm run dev
```

## 🚀 **Script yang Tersedia**

### **Check package.json scripts:**
```json
{
  "scripts": {
    "dev": "node ace serve --hmr",
    "build": "node ace build",
    "start": "node server.js",
    "lint": "eslint . --ext=.ts",
    "format": "prettier --write ."
  }
}
```

### **Available Commands:**
- ✅ `npm run dev` - Development server with HMR
- ✅ `npm run build` - Build production
- ✅ `npm start` - Start production server
- ✅ `npm run lint` - Run ESLint
- ✅ `npm run format` - Format code

## 🔧 **Troubleshooting**

### **1. Package.json Not Found:**
```bash
# Pastikan di folder project yang benar
pwd  # Check current directory
ls   # Check if package.json exists
```

### **2. Node Modules Missing:**
```bash
# Install dependencies
npm install
```

### **3. Port Already in Use:**
```bash
# Check port usage
netstat -ano | findstr :3333

# Kill process if needed
taskkill /PID <PID_NUMBER> /F
```

### **4. Permission Issues:**
```bash
# Run as administrator if needed
# Or use different port
npm run dev -- --port 3000
```

## 📝 **PowerShell vs Command Prompt**

### **PowerShell (Windows 10/11):**
```powershell
# Use semicolon for command separation
cd d:\Invtry; npm run dev

# Or use separate commands
cd d:\Invtry
npm run dev
```

### **Command Prompt:**
```cmd
# Use && for command separation
cd d:\Invtry && npm run dev

# Or use separate commands
cd d:\Invtry
npm run dev
```

## 🎯 **Best Practices**

### **1. Always Check Working Directory:**
```bash
# Check current directory
pwd

# List files to confirm package.json exists
ls package.json
```

### **2. Use Correct Command:**
```bash
# ✅ Development
npm run dev

# ✅ Production
npm start

# ❌ Wrong
npm start dev
```

### **3. Check Scripts:**
```bash
# View available scripts
npm run

# Check specific script
cat package.json | grep scripts
```

## ✅ **Hasil Akhir**

- ✅ **Correct npm command**: `npm run dev`
- ✅ **PowerShell syntax**: Use semicolon or separate commands
- ✅ **Proper path**: Ensure in project directory
- ✅ **Development server running**: http://localhost:3333

## 📚 **Quick Reference**

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run dev` | Development server | ✅ Correct |
| `npm start` | Production server | ✅ Correct |
| `npm install` | Install dependencies | ✅ Correct |
| `npm start dev` | ❌ Invalid | ❌ Wrong |
| `cd d:\Invtry && npm run dev` | ❌ PowerShell | ❌ Wrong |

**🎉 Sekarang aplikasi bisa dijalankan dengan command yang benar!**
