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
  // console.log("Connected as id " + connection.threadID);
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
          // Shows how much the user would like to purchase
          var requestedPurchaseAmount = answer.stock_quantity;
          // Table ID's
          var tableID = [];
          // var itemPrice = response[itemChoice-1].price * answer.stock_quantity;
          var newStockAmount = 0;

          // COME BACK TO THIS FOR HELP!
          for (var i = 0; i < response.length; i++) {
            // tableID.push(response[i].item_id);
            if (parseInt(response[i].item_id) === itemChoice){
              return anotherFunction(response[i], answer);
            }
          };

          console.log("That number does not exist!")
          purchaseItem();
        });
      });
    }


function anotherFunction(itemObj, answer)  {
  var itemPrice = itemObj.price * answer.stock_quantity;

  if(itemObj.stock_quantity < answer.stock_quantity) {
    console.log("Insufficient Quantity Order Will Not Be Processed");
    connection.end();
  } else {
    newStockAmount = parseInt(itemObj.stock_quantity - answer.stock_quantity);
    var query = connection.query("UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: newStockAmount
        },
        {
          item_id: answer.item_id
        }
      ],
      function(error) {
        if (error) throw error;
        // printInventory();
        purchaseItem();
        console.log(
          `
          Your purchase costs $${itemPrice}
          `
        );
      });
    }
  };
