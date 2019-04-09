import faker from "faker";
var depts = ['Engineering', 'Product', 'Communications', 'Marketing', 'HR', 'Design'];

var getDept = function getDept() {
  return depts[Math.floor(depts.length * Math.random())];
};

var fakeId = function fakeId() {
  return Math.floor(Math.random() * 300000);
};

var getPerson = function getPerson(id, _ref) {
  var depth = _ref.depth,
      department = _ref.department;
  return {
    id: id,
    avatar: faker.image.avatar(),
    // 'https://github.com/fouad.png',
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    title: depth > 0 ? faker.name.jobTitle() : 'CEO',
    department: depth > 0 ? department || getDept() : ''
  };
};

var getChildren = function getChildren(_ref2, genData) {
  var depth = _ref2.depth,
      department = _ref2.department;
  var length = Math.ceil(Math.random() * 6) + (4 - depth);

  if (length < 0) {
    return {
      totalReports: 0,
      children: []
    };
  }

  return {
    totalReports: length,
    children: Array.apply(null, {
      length: length
    }).map(function () {
      return genData({
        depth: depth + 1,
        department: department
      });
    })
  };
};

var fakeData = function fakeData() {
  var count = 0;

  var genData = function genData(_ref3) {
    var _ref3$depth = _ref3.depth,
        depth = _ref3$depth === void 0 ? 0 : _ref3$depth,
        _ref3$department = _ref3.department,
        department = _ref3$department === void 0 ? '' : _ref3$department;
    ++count;
    var id = fakeId();
    var person = getPerson(id, {
      depth: depth,
      department: department
    });

    if (depth > 6 || count >= 20000) {
      return {
        id: id,
        person: person,
        hasChild: false
      };
    }

    var _getChildren = getChildren({
      depth: depth + 1,
      department: department || person.department
    }, genData),
        children = _getChildren.children,
        totalReports = _getChildren.totalReports;

    person.totalReports = totalReports;
    return {
      id: id,
      person: person,
      hasChild: true,
      children: children
    };
  };

  var data = genData({});
  console.log('total nodes', count);
  return data;
};

export default fakeData;