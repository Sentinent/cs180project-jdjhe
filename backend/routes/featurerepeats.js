const router = require('express').Router();
const { performance } = require('perf_hooks');
const { searchAll } = require('./search');
const { calculate } = require('./feature1.js');
const violationTotals = require('./feature1.js').final;
let RecalculateFeatureRepeats = 1;
let initialCalculate = 1;

function findMaxIndex(arr)
{
  var max = arr[0].Percentage;
  var index = 0;
  for (var i = 0; i < arr.length; i++)
  {
    if (arr[i].Percentage > max)
    {
      max = arr[i].Percentage;
      index = i;
    }
  }
  return index;
}

// Node class to represent a tree value for a BST
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// BST class
class BinarySearchTree {
  constructor() {
    // root of a binary search tree
    this.root = null;
  }

  // helper method which creates a new node to
  // be inserted and calls insertNode
  insert(data) {
    // Creating a node and initialising
    // with data
    var newNode = new Node(data);

    // root is null then node will
    // be added to the tree and made root.
    if (this.root === null) this.root = newNode;
    else {
      // find the correct position in the
      // tree and add the node
      this.insertNode(this.root, newNode);
    }
  }

  // Method to insert a node in a tree
  // it moves over the tree to find the location
  // to insert a node with a given data
  insertNode(node, newNode) {
    // if the data is less than the node
    // data move left of the tree
    if (newNode.data < node.data) {
      // if left is null insert node here
      if (node.left === null) node.left = newNode;
      else {
        // if left is not null recur until
        // null is found
        this.insertNode(node.left, newNode);
      }
    }

    // if the data is more than the node
    // data move right of the tree
    else {
      // if right is null insert node here
      if (node.right === null) node.right = newNode;
      else {
        // if right is not null recur until
        // null is found
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Method to return the node with the given data or null if not found
  search(node, data) {
    // if trees is empty return null
    if (node === null) return null;
    // if data is less than node's data
    // move left
    else if (data < node.data) return this.search(node.left, data);
    // if data is less than node's data
    // move left
    else if (data > node.data) return this.search(node.right, data);
    // if data is equal to the node data
    // return node
    else return node;
  }

  // Return the root node
  getRootNode() {
    return this.root;
  }
}

let final = [];
let bstList = [];
let repeatOffenders20 = [];
var lastIndex;

// Function to calculate the Repeated offenders
function repeatOffenders(DATASET) {

  var startTime = performance.now();
  // need to recalculate
  calculate(DATASET);

  // An array to represent the repeated violations
  let repeats = new Array(100);
  if (Object.seal) {
    repeats.fill(0);
  }
  Object.seal(repeats);

  // final is the list of violation codes, their respective occurences and their respective percent of the total
  final = [];
  bstList = [];
  lastIndex = DATASET.length - 1;

  // Cycle through all violations
  for (var c = 1; c < 99; c++) {
    //console.log(c);
    var BST = new BinarySearchTree();
    /*
    Cycle through the data looking for the given violation
    code, then if we find the code in the BST then increment (by 2 if that position in the repeats list is 0)
    that codes position in the repeats list by 1, representing
    the amount of times that particular violation code is repreated by the
    same people
    */
    for (var i = 0; i < DATASET.length; i++) {
      var code = Number(DATASET[i]['Violation Code']);
      var person = DATASET[i]['Plate ID'];

      if (code != c) {
        continue;
      } else {
        if (BST.search(BST.getRootNode(), person) != null) {
          if (repeats[c] == 0) {
            repeats[c] += 2;
          } else {
            repeats[c] += 1;
          }
        } else {
          BST.insert(person);
        }
      }
    }
    bstList.push(BST);
    if (i == DATASET.length - 1)
    {
      lastIndex = DATASET.length - 1;
    }
  }

  /*
    Calculate the percentage of violations that have been repeated based on
    the total the amount of times the violations have occured
    */
  for (var i = 1; i < repeats.length; i++) {
    var percent = parseFloat(
      ((repeats[i] / violationTotals[i - 1]['Occurences']) * 100).toFixed(3)
    );
    //totalp += percent;
    // A line to represent the values needed to be returned and stored in the final result
    var line = {
      ViolationCode: i,
      Occurences: repeats[i],
      Percentage: percent,
    };

    final.push(line);
  }

  let final_temp = final.slice();
  repeatOffenders20 = [];
  var index;
  for (var i = 0; i < 20; i++)
  {
    index = findMaxIndex(final_temp);
    repeatOffenders20.push(final_temp[index]);
    final_temp.splice(index, 1);
  }

  var endTime = performance.now();
  console.log('Total calculation time: ' + (endTime - startTime))
}


function updateRepeats(DATASET)
{
  // If data was inserted in the dataset
  if (lastIndex < DATASET.length - 1)
  {
    // start time
    var startTime = performance.now();

    calculate(DATASET);
    // Traverse through all new data
    for (var i = lastIndex + 1; i < DATASET.length; i++)
    {
      var code = Number(DATASET[i]['Violation Code']);
      //console.log(code);
      var person = DATASET[i]['Plate ID'];

      // Search through the BST list for the designated code's BST
      var BST = bstList[code - 1];
      if(BST.search(BST.getRootNode(), person) != null)
      {
        //console.log(code - 1);
        //console.log("Final[code - 1].Violation Code: " + final[code - 1].ViolationCode);
        final[code - 1].Occurences += 1;
      }
    }

    // Re-adjust all the percentages
    for (var i = 0; i < final.length; i++) {
      var percent = parseFloat(
        ((final[i].Occurences / violationTotals[i]['Occurences']) * 100).toFixed(3)
      );
      final[i].Percentage = percent;
    } 

    // Recalculate the top 20 repeated offenders
    let final_temp = final.slice();
    repeatOffenders20 = [];
    var index;
    for (var i = 0; i < 20; i++)
    {
      index = findMaxIndex(final_temp);
      repeatOffenders20.push(final_temp[index]);
      final_temp.splice(index, 1);
    }

    // Update the last index
    lastIndex = DATASET.length - 1;
    
    var endTime = performance.now();
    console.log('Update calculation time: ' + (endTime - startTime))
  }
}

router.route('/data/repeatcount').get((req, res) => {
  const terms = (req.query.terms || '').split(',');
  const DATASET = searchAll(terms);

  //console.log(RecalculateFeatureRepeats);
  if (initialCalculate != 1)
  {
    //console.log("Hello!");
    updateRepeats(DATASET);
    RecalculateFeatureRepeats = 0;
  }
  if (initialCalculate == 1)
  {
    //console.log("Here!");
    repeatOffenders(DATASET);
    initialCalculate = 0;
    console.log(initialCalculate);
  }
  res.send(repeatOffenders20);
});

module.exports = { router, RecalculateFeatureRepeats };
