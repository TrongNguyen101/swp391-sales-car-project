# swp391-sales-car-project

## Introduction

Welcome to the Vinfast Sales Car and Accessories website. Our platform offers a wide range of Vinfast vehicles and accessories, providing customers with an exceptional shopping experience. Whether you are looking for the latest models or high-quality accessories to enhance your vehicle, we have everything you need. Explore our website to find the perfect Vinfast products that meet your needs and preferences.

## Tech Stack

The Vinfast Sales Car and Accessories website is built using the following technologies:

- **Frontend**: React.js
- **Backend**: ASP.NET MVC
- **Database**: SQL Server
- **Authentication**: JWT (JSON Web Tokens)
- **Version Control**: Git, GitHub
- **Package Management**: npm (Node Package Manager)

This tech stack ensures a robust, scalable, and high-performance platform for our users.

## Setup and Run Guidelines

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v16 or later) and npm
- **.NET SDK** (v6.0 or later)
- **SQL Server** (local or remote instance)
- **Git**

### Backend Setup

1. Navigate to the backend directory:
    ```bash
   cd back-end/WebAPI

2. Restore NuGet packages:
    ```bash
    dotnet restore

3. Update the database connection string in file appsettings.json:
   ```bash
   "ConnectionStrings": {
         "DefaultConnection": "Data Source=localhost;Initial Catalog=YourDatabaseName;User ID=YourUsername;Password=YourPassword;Encrypt=True;TrustServerCertificate=True;"
   }
   ```


   Replace the placeholders (YourDatabaseName, YourUsername, YourPassword) with your actual SQL Server database name, username, and password.

4. Apply database migrations:
   ```bash
   dotnet ef database update
5. Run the backend server:
   ```bash
   dotnet run --launch-profile https
   ```
   
   The backend server will start at https://localhost:7005 by default.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd front-end

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend application will open in your default browser at http://localhost:3000.