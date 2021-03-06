class Group {
  constructor() {
    this.values = [];
  }

  add(value) {
    if (!this.has(value))
      this.values.push(value);
  }

  delete(value) {
    this.values = this.values.filter( v => v !== value );
  }

  has(value) {
    return this.values.includes(value);
  }

  static from(array) {
    let group = new Group;
    for (let value of array) {
      group.add(value);
    }
    
    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.position = 0;
    this.group = group;
  }

  next() {
    if (this.position == this.group.values.length) return {done: true};

    let value = this.group.values[this.position];
    this.position++;

    return {value, done: false};
  }
}

let group = Group.from([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (let value of group) {
  console.log(value);
}