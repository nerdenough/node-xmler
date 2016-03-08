var xmler = require ('../xmler');

var chai = require('chai');
var expect = chai.expect;

describe('Element', function () {
  describe('#constructor', function () {
    it('should set the element name', function () {
      var element = new xmler.Element('element');
      expect(element.name).to.equal('element');
    });
  });

  describe('#addAttribute', function () {
    it('should add a single attribute to the attributes array', function () {
      var element = new xmler.Element('element');
      element.addAttribute('key', 'value');

      expect(element.attributes[0].key).to.equal('key');
      expect(element.attributes[0].value).to.equal('value');
      expect(element.attributes.length).to.equal(1);
    });

    it('should add lots of attributes to the attributes array', function () {
      var element = new xmler.Element('element');

      for (var i = 0; i < 100; i++) {
        element.addAttribute('key' + i, 'value' + i);
        expect(element.attributes[i].key).to.equal('key' + i);
        expect(element.attributes[i].value).to.equal('value' + i);
      }

      expect(element.attributes.length).to.equal(100);
    });
  });

  describe('#addElement', function () {
    it('should add a single element to the elements array', function () {
      var element = new xmler.Element('element');
      var child = new xmler.Element('child');

      element.addElement(child);

      expect(element.elements[0]).to.equal(child);
      expect(element.elements.length).to.equal(1);
    });

    it('should add lots of elements to the elements array', function () {
      var element = new xmler.Element('element');

      for (var i = 0; i < 100; i++) {
        var child = new xmler.Element('child');
        element.addElement(child);
        expect(element.elements[i]).to.equal(child);
      }

      expect(element.elements.length).to.equal(100);
    });
  });

  describe('#addElements', function () {
    it('should add an array of elements onto an empty elements array', function () {
      var element = new xmler.Element('element');
      var children = [
        new xmler.Element('child1'),
        new xmler.Element('child2'),
        new xmler.Element('child3')
      ];

      element.addElements(children);

      expect(element.elements[0]).to.equal(children[0]);
      expect(element.elements[1]).to.equal(children[1]);
      expect(element.elements[2]).to.equal(children[2]);
      expect(element.elements.length).to.equal(3);
    });

    it('should add an array of elements onto an existing elements array', function () {
      var element = new xmler.Element('element');
      var child1 = new xmler.Element('child1');
      var child2 = new xmler.Element('child2');
      var child3 = new xmler.Element('child3');
      var children = [
        new xmler.Element('child4'),
        new xmler.Element('child5'),
        new xmler.Element('child6')
      ];

      element.addElement(child1);
      element.addElement(child2);
      element.addElement(child3);
      element.addElements(children);

      expect(element.elements[0]).to.equal(child1);
      expect(element.elements[3]).to.equal(children[0]);
      expect(element.elements.length).to.equal(6);
    });
  });

  describe('#getXML', function () {
    it('should convert an empty element to xml', function () {
      var element = new xmler.Element('element');
      expect(element.getXML()).to.equal('<element/>');
    });

    it('should convert an element with attributes to xml', function () {
      var element = new xmler.Element('element');
      element.addAttribute('key', 'value');

      expect(element.getXML()).to.equal('<element key="value"/>');
    });

    it('should convert an element with children to xml', function () {
      var element = new xmler.Element('element');
      element.addElement(new xmler.Element('child'));

      expect(element.getXML()).to.equal('<element><child/></element>');
    });

    it('should convert an element with attributes and children to xml', function () {
      var element = new xmler.Element('element');
      element.addAttribute('key', 'value');
      element.addElement(new xmler.Element('child'));

      expect(element.getXML()).to.equal('<element key="value"><child/></element>');
    });

    it('should convert an element with nested attributes and children to xml', function () {
      var element = new xmler.Element('element');
      var child = new xmler.Element('child');
      var grandchild = new xmler.Element('grandchild');

      grandchild.addAttribute('key', 'value');
      child.addAttribute('key', 'value');
      child.addElement(grandchild);
      element.addAttribute('key', 'value');
      element.addElement(child);

      var answer = '<element key="value">';
      answer += '<child key="value">';
      answer += '<grandchild key="value"/>';
      answer += '</child>';
      answer += '</element>';
      expect(element.getXML()).to.equal(answer);
    });
  });
});
