# API Endpoints Documentation

## Base URL
All API endpoints are prefixed with `/api`

## Categories (Kategoris)

### GET `/api/kategoris`
- **Description**: Get all categories with pagination
- **Query Parameters**: 
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
- **Response**: Paginated list of categories with their products

### POST `/api/kategoris`
- **Description**: Create a new category
- **Body**: 
  ```json
  {
    "nama": "string (required)"
  }
  ```

### GET `/api/kategoris/:id`
- **Description**: Get a specific category with its products
- **Response**: Category with products relationship

### PUT `/api/kategoris/:id`
- **Description**: Update a category
- **Body**: 
  ```json
  {
    "nama": "string"
  }
  ```

### DELETE `/api/kategoris/:id`
- **Description**: Delete a category (only if no products exist)
- **Response**: Success message or error if category has products

### GET `/api/kategoris/:id/stats`
- **Description**: Get category statistics
- **Response**: Category with stats (total products, total stock, average price)

### GET `/api/kategoris/search`
- **Description**: Search categories by name
- **Query Parameters**: 
  - `search`: Search term
  - `page`, `limit`: Pagination

## Products (Produks)

### GET `/api/produks`
- **Description**: Get all products with pagination and category relationships
- **Query Parameters**: 
  - `page`, `limit`: Pagination
- **Response**: Paginated list of products with categories

### POST `/api/produks`
- **Description**: Create a new product
- **Body**: 
  ```json
  {
    "nama": "string (required)",
    "merk": "string",
    "stok": "number",
    "harga": "number (required)",
    "kategori_id": "number (required)"
  }
  ```

### GET `/api/produks/:id`
- **Description**: Get a specific product with category relationship

### PUT `/api/produks/:id`
- **Description**: Update a product
- **Body**: Same as POST

### DELETE `/api/produks/:id`
- **Description**: Delete a product

### GET `/api/produks/kategori/:kategoriId`
- **Description**: Get all products in a specific category

### GET `/api/produks/search`
- **Description**: Search products by name or brand
- **Query Parameters**: 
  - `search`: Search term
  - `page`, `limit`: Pagination

## Transactions

### GET `/api/transactions`
- **Description**: Get all transactions with pagination and product relationships
- **Query Parameters**: 
  - `page`, `limit`: Pagination
  - `type`: Filter by 'masuk' or 'keluar'

### POST `/api/transactions`
- **Description**: Create a new transaction (automatically updates product stock)
- **Body**: 
  ```json
  {
    "produk_id": "number (required)",
    "tipe": "string (required, 'masuk' or 'keluar')",
    "jumlah": "number (required)",
    "catatan": "string (optional)"
  }
  ```

### GET `/api/transactions/:id`
- **Description**: Get a specific transaction with product relationship

### PUT `/api/transactions/:id`
- **Description**: Update a transaction (automatically adjusts stock)

### DELETE `/api/transactions/:id`
- **Description**: Delete a transaction (automatically reverts stock changes)

### GET `/api/transactions/produk/:produkId`
- **Description**: Get all transactions for a specific product

### GET `/api/transactions/stats`
- **Description**: Get transaction statistics
- **Query Parameters**: 
  - `dateFrom`, `dateTo`: Date range filtering
- **Response**: Statistics including total transactions, masuk/keluar counts, etc.

### GET `/api/transactions/search`
- **Description**: Search transactions by product name or notes

## Suppliers (Supliers)

### GET `/api/supliers`
- **Description**: Get all suppliers with pagination

### POST `/api/supliers`
- **Description**: Create a new supplier
- **Body**: 
  ```json
  {
    "nama": "string (required)",
    "alamat": "string",
    "telepon": "string",
    "email": "string"
  }
  ```

### GET `/api/supliers/:id`
- **Description**: Get a specific supplier

### PUT `/api/supliers/:id`
- **Description**: Update a supplier
- **Body**: Same as POST

### DELETE `/api/supliers/:id`
- **Description**: Delete a supplier

### GET `/api/supliers/search`
- **Description**: Search suppliers by name, address, phone, or email

## Relationships

### Category ↔ Product
- One Category has many Products
- One Product belongs to one Category

### Product ↔ Transaction
- One Product has many Transactions
- One Transaction belongs to one Product

## Features

1. **Automatic Stock Management**: Transactions automatically update product stock
2. **Relationship Loading**: All endpoints load related data when appropriate
3. **Validation**: Required field validation on all create/update operations
4. **Search Functionality**: Search endpoints for all main entities
5. **Statistics**: Special endpoints for getting aggregated data
6. **Pagination**: All list endpoints support pagination
7. **Error Handling**: Proper error messages for validation and business logic
