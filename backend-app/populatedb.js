#! /usr/bin/env node

//execute this by running node populatedb "mongoose-url-with double quotes"

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Credential = require('./models/credential');
  const User = require('./models/user');
  const Group = require('./models/group');
  
  const credentials = [];
  const users = [];
  const groups = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createUsers();
    await createCredentials();
    await createGroups();
    
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }

  async function userCreate(index, userid, name) {
    const user = new User({
      userid: userid,
      name: name,
    });
    await user.save();
    users[index] = user;
    console.log(`Added user:`+user);
  }

  async function credentialCreate(index, email, password, user) {
    const credential = new Credential({
      email: email,
      password: password,
      user: user,
    });
    await credential.save();
    credentials[index] = credential;
    console.log("added credentials"+credential);
  }

  async function groupCreate(index, name, admin, members) {
    const group = new Group({
      name: name,
      admin: admin,
      members: members,
      messages: [],
    });
    await group.save();
    groups[index] = group;
    console.log("added group"+group);
  }

  async function createUsers() {
    console.log("Adding users");
    await Promise.all([
      userCreate(0, "raj_patel123", "Raj Patel"),
      userCreate(1, "priyasharma", "Priya Sharma"),
      userCreate(2, "amitkumar_88", "Amit Kumar"),
      userCreate(3, "sneha_gupta", "Sneha Gupta"),
      userCreate(4, "ashokverma", "Ashok Verma"),
      userCreate(5, "lata_das", "Lata Das"),
      userCreate(6, "naveenreddy1", "Naveen Reddy"),
      userCreate(7, "deepika_singh", "Deepika Singh"),
      userCreate(8, "rahul_shah", "Rahul Shah"),
      userCreate(9, "meera_desai", "Meera Desai"),
      userCreate(10, "anjali_kapoor", "Anjali Kapoor"),
      userCreate(11, "saurabh_mehta", "Saurabh Mehta"),
    ]);
  }

  async function createCredentials() {
    console.log("Adding credentials");
    await Promise.all([
      credentialCreate(0, "rajpatel23@example.com", "StrongPass123!", users[0]),
      credentialCreate(1, "priyasharm@example.com", "SecurePass456!", users[1]),
      credentialCreate(2, "amitkumar8@example.com", "SafePassword789!", users[2]),
      credentialCreate(3, "snehagupta@example.com", "ProtectedPass101!", users[3]),
      credentialCreate(4, "ashok.verma@example.com", "SecretPass777!", users[4]),
      credentialCreate(5, "latadas1234@example.com", "HiddenPass2022!", users[5]),
      credentialCreate(6, "naveenreddy@example.com", "ConfidentialPass55!", users[6]),
      credentialCreate(7, "deepikasingh@example.com", "StrongSecurePass22!", users[7]),
      credentialCreate(8, "rahulshah12@example.com", "VerySafePassword33!", users[8]),
      credentialCreate(9, "meera.desai@example.com", "UltraSecurePass44!", users[9]),
      credentialCreate(10, "anjalikapoor@example.com", "SuperStrongPass55!", users[10]),
      credentialCreate(11, "saurabhmehta@example.com", "TopSecretPass66!", users[11]),
    ]);
  }

  async function createGroups() {
    console.log("Adding groups");
    await Promise.all([
      groupCreate(0, "Bhopal Outing", users[0], [users[0], users[1], users[2], users[3]]),
      groupCreate(1, "Daily Items", users[4], [users[0], users[4], users[5], users[1]]),
      groupCreate(2, "Kashmir Trip", users[8], [users[8], users[9], users[10], users[6]]),
    ]);
  }

 
  
  