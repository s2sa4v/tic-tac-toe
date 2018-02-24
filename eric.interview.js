let objects = [
  {
    name: 'John Smith',
    dob: '01/01/1980',
    likes: ['volleyball', 'soccer', 'baseball'],
    company: 'abc co',
  },
  { name: 'John Smith', dob: '01/01/1980', likes: ['football'], company: 'xyz co' },
  { name: 'Judy Foster', dob: '01/01/1980', likes: ['baseball'], company: 'widget co' },
];
let filteredObjects = objects.reduce((acc, obj, outerKey) => {
  let exists = false;

  acc.map((object, innerKey) => {
    if (outerKey !== innerKey && object.name === obj.name && object.dob === obj.dob) {
      exists = true;
    }
  });

  if (!exists) {
    acc.push(obj);
  }
  return acc;
}, []);
let filtered = filterObjs(objects);


console.log(filteredObjects);
// console.log(new Set(objects));
console.log(filtered);

function filterObjs(objs) {
  let names = {};

  objs.map((obj, key) => {
    names[`${obj.name}-${obj.dob}`] = key;
  });

  return Object.keys(names).map(key => objects[names[key]]);
}

// [
//   {name: 'John Smith', dob: '01/01/1980', likes: ['volleyball', 'soccer', 'baseball'], company: 'abc co'},
//   {name: 'Judy Foster', dob: '01/01/1980', likes: ['baseball'], company: 'widget co'}
// ]

// n ** n - 1