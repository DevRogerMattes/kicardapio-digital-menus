
# KiCardapio MySQL Setup

## Database Configuration

To connect to your MySQL database on Hostinger, you need to set the following environment variables:

```
VITE_MYSQL_HOST=your-mysql-host.hostinger.com
VITE_MYSQL_USER=your-db-username
VITE_MYSQL_PASSWORD=your-db-password
VITE_MYSQL_DATABASE=your-database-name
VITE_MYSQL_PORT=3306
```

## Initial Setup

1. Create a new database on your Hostinger MySQL panel
2. Import the schema from `src/db/schema.sql` into your database using phpMyAdmin or another MySQL client
3. Set the environment variables in your hosting environment or during local development

## Development Setup

During development, you can create a `.env` file in the root directory of the project with the above environment variables.

## Production Setup

In production, make sure to set the environment variables in your hosting environment.

## Database Schema

The database schema consists of the following tables:

- `restaurants`: Information about each restaurant
- `users`: User accounts
- `restaurants_users`: Junction table linking users to restaurants
- `categories`: Product categories 
- `products`: Menu items
- `optionals`: Option groups for products
- `optional_items`: Individual options in option groups
- `table_qr_codes`: QR codes for tables

For full schema details, see `src/db/schema.sql`.
