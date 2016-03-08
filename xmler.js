// XMLer is a simple package that allows the creation of XML elements within
// JavaScript. It allows the addition of attributes as well as nested child
// elements.
//
// Author: Brendan Goodenough <brendan@goodenough.nz>
// GitHub: https://github.com/nerdenough/node-xmler
// License: MIT

// Creates the element with a specified name and initialises the arrays for
// attributes and child elements.
var Element = function (name, body) {
  this.name = name;
  this.body = body;
  this.attributes = [];
  this.elements = [];
};

// Adds an attribute onto the attributes array. These attributes are added as a
// key/value pair.
Element.prototype.addAttribute = function (key, value) {
  this.attributes.push({
    key: key,
    value: value
  });
};

// Adds a single child element to the elements array.
Element.prototype.addElement = function (element) {
  this.elements.push(element);
};

// Adds an array of child elements to the elements array.
Element.prototype.addElements = function (elements) {
  this.elements = this.elements.concat(elements);
};

// Builds an XML string for the element by iterating over all the attributes
// and child elements.
Element.prototype.getXML = function () {
  var xml = '<' + this.name;

  this.attributes.forEach(function (attribute) {
    xml += ' ' + attribute.key + '="' + attribute.value + '"';
  });

  xml += this.elements.length || this.body ? '>' : '/>';
  xml += this.body ? this.body : '';

  this.elements.forEach(function (element) {
    xml += element.getXML();
  });

  xml += this.elements.length || this.body ? '</' + this.name + '>' : '';

  return xml;
};

module.exports = {
  Element: Element
};
