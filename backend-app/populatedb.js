#! /usr/bin/env node

//execute this by running node populatedb "mongoose-url-with double quotes"

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Credential = require('./models/credential');
  const User = require('./models/user');
  
  const credentials = [];
  const users = [];
  
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

  async function createUsers() {
    console.log("Adding users");
    await Promise.all([
      userCreate(0, "jaimis18", "Janmeyjai Mishra"),
    ]);
  }

  async function createCredentials() {
    console.log("Adding credentials");
    await Promise.all([
      credentialCreate(0, "some@abc.com", "12345678", users[0]),
    ]);
  }
  
  