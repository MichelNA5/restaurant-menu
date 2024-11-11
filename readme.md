# Project Name

> A restaurant menu application that manages user orders, offers extensive customization options for flexibility, allows users to apply discount coupons to orders, join parties, and add their orders to shared party sessions. Users can also view detailed party information.
## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
- [Testing](#testing)


---

## Getting Started

This Node.js API provides [a quick overview of the API's main functionality]. Follow the guide below to set up and run the API.

### Prerequisites

- **Node.js** version >= 22.0
- **npm** version >= 6.0
- **MySQLDB**

### Installation

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/MichelNA5/restaurant-menu
   npm install 
   ```
NOTE: The project is using the external library "Crypto" for password hashing

### Usage
couponRoutes.js
Routes related to managing and applying coupons.

- Get Coupon ID by Code (GET /api/coupon/id/:code): Retrieves the coupon ID using the coupon code in the URL. Validates the coupon code.
- Get Coupon Discount by Code (GET /api/coupon/discount/:code): Retrieves the discount associated with a coupon code. Validates the coupon code.
- Apply Coupon (POST /api/coupon/apply): Applies a coupon based on request data, which is validated for correct coupon information.

---

favoriteCombinationRoutes.js
Routes related to favorite combinations for users.

- Get Favorite Combinations for a User (GET /api/favorite-combinations/user/:user_id): Retrieves all favorite combinations for a given user.
- Insert Favorite Combination (POST /api/favorite-combinations): Adds a new favorite combination, with validation.
- Delete Favorite Combination by ID (DELETE /api/favorite-combinations/:combination_id): Deletes a specific favorite combination by ID, with validation.
- Add Item to Favorite Combination (POST /api/favorite-combinations/item): Adds an item to a favorite combination, with validation.
- Delete Items from Favorite Combination by Combination ID (DELETE /api/favorite-combinations/items/:combination_id): Deletes all items from a favorite combination by its ID, with validation.
- Get Items in a Favorite Combination (GET /api/favorite-combinations/items/:combination_id): Retrieves items from a favorite combination by combination ID, with validation.

---

menuItemRoutes.js
Routes for managing menu items.

- Get All Menu Items (GET /api/menu-items): Retrieves all menu items.
- Get Menu Item by ID (GET /api/menu-items/:id): Retrieves a menu item by its ID, with validation.
- Create New Menu Item (POST /api/menu-items): Creates a new menu item with validation.
- Update Menu Item by ID (PUT /api/menu-items/:id): Updates an existing menu item by its ID, with validation for both ID and item data.
- Delete Menu Item by ID (DELETE /api/menu-items/:id): Deletes a menu item by ID, with validation.

---

orderRoutes.js
Routes for managing orders and order items.

- Get Order History by Username (GET /api/orders/order-history/:username): Retrieves order history for a given username.
- Insert New Order (POST /api/orders/insert-order): Creates a new order, requiring data for userId, orderDate, and status.
- Insert Order Item (POST /api/orders/insert-order-item): Adds an item to an order, requiring orderId, menuItemId, quantity, and any customizations.
- Delete Order by Order ID (DELETE /api/orders/delete-order/:orderId): Deletes an order by its orderId.
- Get Order Items by Order ID (GET /api/orders/order-items/:orderId): Retrieves items in an order by orderId.

---

partyRoutes.js
Routes for managing party events and related orders.

- Create a Party (POST /api/party/create): Initiates a new party. Validates the party creation data.
- Join a Party (POST /api/party/join): Allows a user to join an existing party. Validates the joining data.
- Get Active Party Code for User (GET /api/party/active): Retrieves the active party code for the user.
- End Active Party for User (PATCH /api/party/end): Ends the user's active party. Validates the request data.
- Get Party Creator Info by Party Code (GET /api/party/creator/:partyCode): Fetches the creator's information for a party identified by partyCode.
- Get Orders by Party Code (GET /api/party/:partyCode/orders): Retrieves orders associated with a specific partyCode.

---

userRoutes.js
Routes related to user management and authentication.

- Get All Users (GET /api/users): Fetches all user records.
- Get User by ID (GET /api/users/:id): Retrieves a user by ID, with validation.
- Create New User (POST /api/users): Registers a new user, with validation on the user data.
- Update User by ID (PUT /api/users/:id): Updates user data by ID, with validation for ID and update fields.
- Delete User by ID (DELETE /api/users/:id): Deletes a user by ID, with validation.
- Fetch User ID by Username (GET /api/users/getid/:username): Retrieves a user's ID based on their username.
- Authenticate User (POST /api/users/authenticate): Authenticates a user based on login credentials.

---

Each route includes request validation where required and covers error handling in index.js to handle both 404 and unhandled error cases.

### Testing

Tests on all endpoints have been developed using postman and are provided in the project base 

