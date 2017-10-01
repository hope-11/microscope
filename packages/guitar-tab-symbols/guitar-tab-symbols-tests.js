// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by guitar-bar.js.
import { name as packageName } from "meteor/houpeng:guitar-tab-symbols";

// Write your tests here!
// Here is an example.
Tinytest.add('guitar-tab-symbols - example', function (test) {
  test.equal(packageName, "guitar-tab-symbols");
});
