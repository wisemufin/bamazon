// Add all of the necessary NPM Packages to the file
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "9908Rock!",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadID);
  //printInventory();
  purchaseItem();
});

function printInventory() {
  connection.query("SELECT * FROM products", function(err, response) {
    if (err) throw err;
    //console.log(response);
    console.table(response);
  });
}

function purchaseItem() {
  connection.query("SELECT * FROM products", function(err, response) {
    if(err) throw err;
    console.table(response);
      inquirer
        .prompt([
          {
            name: "item_id",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
          },
          {
            name: "stock_quantity",
            type: "input",
            message: "How much would you like to buy?"
          }
        ]).then(function(answer) {

          // itemChoice accesses the row in the database the user would like a product form
          var itemChoice = parseInt(answer.item_id);
          // This stores the amount of the requested product currently in stock
          var currentStockQuantity = response[itemChoice-1].stock_quantity;
          // Shows how much the user would like to purchase
          var requestedPurchaseAmount = answer.stock_quantity;

          var newStockAmount = 0;
          if(currentStockQuantity < requestedPurchaseAmount) {
            console.log("Insufficient Quantity Order Will Not Be Processed");
          } else {
            newStockAmount = parseInt(currentStockQuantity - requestedPurchaseAmount);
            console.log(itemChoice);
            console.log(newStockAmount);
            var query = connection.query("UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newStockAmount
                },
                {
                  item_id: itemChoice
                }
              ],
              function(error) {
                if (error) throw error;
                printInventory();
              }
            );
            console.log(query.sql);
          };
          // console.log(currentStockQuantity);
      });
  });
}
