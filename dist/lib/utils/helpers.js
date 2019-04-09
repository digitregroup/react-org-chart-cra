export function getTextForTitle(datum) {
  if (!datum.person || !datum.person.totalReports) {
    return '';
  }

  var totalReports = datum.person.totalReports;
  var pluralEnding = totalReports > 1 ? 's' : '';
  return "".concat(totalReports, " report").concat(pluralEnding);
}
var departmentAbbrMap = {
  Marketing: 'mktg',
  Operations: 'ops',
  Growth: 'gwth',
  Branding: 'brand',
  Assurance: 'fin',
  Data: 'data',
  Design: 'design',
  Communications: 'comms',
  Product: 'prod',
  People: 'people',
  Sales: 'sales'
};
export function getTextForDepartment(datum) {
  if (!datum.person.department) {
    return '';
  }

  var department = datum.person.department;

  if (departmentAbbrMap[department]) {
    return departmentAbbrMap[department].toUpperCase();
  }

  return datum.person.department.substring(0, 3).toUpperCase();
}
export function getCursorForNode(datum) {
  return datum.children || datum._children || datum.hasChild ? 'pointer' : 'default';
}