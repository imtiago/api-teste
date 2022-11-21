/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get('/', async () => {
  return { hello: 'world!!!' }
})
Route.post("/signIn", "UsersController.signIn");
Route.post("/signUp", "UsersController.store");

Route.group(() => {
  Route.get("/dashboard", "DashboardController.info");
  Route.get("/logout", "UsersController.logout");

  Route.group(() => {
    Route.put("/updatePassword", "ProfilesController.updatePassword");
    Route.get("/", "ProfilesController.getMyAccount");
    Route.put("/", "ProfilesController.update");
  }).prefix("/profiles");

  Route.group(() => {
    Route.get("/:id", "UsersController.findById");
    Route.get("/", "UsersController.index");
    Route.delete("/:id", "UsersController.delete");
  }).prefix("/users");

  Route.group(() => {
    Route.post("/", "ProductsController.store");
    Route.get("/", "ProductsController.index");
    Route.get("/getUrlImages", "ProductsController.getUrls");
    Route.get("/update/:id", "ProductsController.update");
    Route.get("/:id", "ProductsController.findById");
    Route.delete("/:id", "ProductsController.delete");
  }).prefix("/products");
  
})

//.middleware("auth");
