const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb')
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(async function(err) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  
  await db.collection('inventory').insertMany([
    { '_id' : 'ac3', 'name' : 'AC3 Phone', 'brand' : 'ACME', 'type' : 'phone', 'price' : 200, 'rating' : 3.8,'warranty_years' : 1, 'available' : true },
    { '_id' : 'ac7', 'name' : 'AC7 Phone', 'brand' : 'ACME', 'type' : 'phone', 'price' : 320, 'rating' : 4,'warranty_years' : 1, 'available' : false },
    { '_id' : ObjectId('507d95d5719dbef170f15bf9'), 'name' : 'AC3 Series Charger', 'type' : [ 'accessory', 'charger' ], 'price' : 19, 'rating' : 2.8,'warranty_years' : 0.25, 'for' : [ 'ac3', 'ac7', 'ac9' ] },
    { '_id' : ObjectId('507d95d5719dbef170f15bfa'), 'name' : 'AC3 Case Green', 'type' : [ 'accessory', 'case' ], 'color' : 'green', 'price' : 12, 'rating' : 1,'warranty_years' : 0 },
    { '_id' : ObjectId('507d95d5719dbef170f15bfb'), 'name' : 'Phone Extended Warranty', 'type' : 'warranty', 'price' : 38, 'rating' : 5,'warranty_years' : 2, 'for' : [ 'ac3', 'ac7', 'ac9', 'qp7', 'qp8', 'qp9' ] },
    { '_id' : ObjectId('507d95d5719dbef170f15bfc'), 'name' : 'AC3 Case Black', 'type' : [ 'accessory', 'case' ], 'color' : 'black', 'price' : 12.5, 'rating' : 2,'warranty_years' : 0.25, 'available' : false, 'for' : 'ac3' },
    { '_id' : ObjectId('507d95d5719dbef170f15bfd'), 'name' : 'AC3 Case Red', 'type' : [ 'accessory', 'case' ], 'color' : 'red', 'price' : 12, 'rating' : 4,'warranty_years' : 0.25, 'available' : true, 'for' : 'ac3' },
    { '_id' : ObjectId('507d95d5719dbef170f15bfe'), 'name' : 'Phone Service Basic Plan', 'type' : 'service', 'monthly_price' : 40,'rating' : 3, 'limits' : { 'voice' : { 'units' : 'minutes', 'n' : 400, 'over_rate' : 0.05 }, 'data' : { 'units' : 'gigabytes', 'n' : 20, 'over_rate' : 1 }, 'sms' : { 'units' : 'texts sent', 'n' : 100, 'over_rate' : 0.001 } }, 'term_years' : 2 },
    { '_id' : ObjectId('507d95d5719dbef170f15bff'), 'name' : 'Phone Service Core Plan', 'type' : 'service', 'monthly_price' : 60, 'rating' : 3, 'limits' : { 'voice' : { 'units' : 'minutes', 'n' : 1000, 'over_rate' : 0.05 }, 'data' : { 'n' : 'unlimited', 'over_rate' : 0 }, 'sms' : { 'n' : 'unlimited', 'over_rate' : 0 } }, 'term_years' : 1 },
    { '_id' : ObjectId('507d95d5719dbef170f15c00'), 'name' : 'Phone Service Family Plan', 'type' : 'service', 'monthly_price' : 90,'rating' : 4, 'limits' : { 'voice' : { 'units' : 'minutes', 'n' : 1200, 'over_rate' : 0.05 }, 'data' : { 'n' : 'unlimited', 'over_rate' : 0 }, 'sms' : { 'n' : 'unlimited', 'over_rate' : 0 } }, 'sales_tax' : true, 'term_years' : 2 },
    { '_id' : ObjectId('507d95d5719dbef170f15c01'), 'name' : 'Cable TV Basic Service Package', 'type' : 'tv', 'monthly_price' : 50, 'rating' : 3.9,'term_years' : 2, 'cancel_penalty' : 25, 'sales_tax' : true, 'additional_tarriffs' : [ { 'kind' : 'federal tarriff', 'amount' : { 'percent_of_service' : 0.06 } }, { 'kind' : 'misc tarriff', 'amount' : 2.25 } ] },
  ])

  var response = await db.collection('inventory').findOne({ name: 'AC3 Phone'})

  console.log(response)

  client.close();
});