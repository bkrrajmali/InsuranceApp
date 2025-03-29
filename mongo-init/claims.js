
db = db.getSiblingDB('claimsdb');
db.claims.insertMany([
  { customerId: 1, status: 'Pending', amount: 1000 },
  { customerId: 2, status: 'Approved', amount: 2500 }
]);
