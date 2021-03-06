/* globals describe, it */
import Utils from '../utils/utils';
import chai from 'chai';
import MD5 from 'md5';

let assert = chai.assert;

import Line from '../../src/basic/lines';

let lineCCSS =
  ` // Lines
  #layer {
    line-color: #F00;
    line-width: 15px;

    [height > 10] {
      line-width: 20px;
      line-opacity: 0.6;
    }

    [height > 15] {
      line-width: 30px;
      line-opacity: 0.3;
    }

  }
`;

describe('Line', () => {
  const c3ss = Utils.getShader(lineCCSS);
  const id = MD5(lineCCSS);

  describe('.getDraw()', () => {
    let line = Line.getDraw(c3ss, id)['lines_' + id];


    it('should have color', () => {
      assert.property(line, 'color');
    });

    describe('.color: ', () => {
      it('should be rgba(255, 0, 0, 1)', () => {
        assert.equal(Utils.eval(line.color)({}, 10), 'rgba(255, 0, 0, 1)');
      });

      it('should be rgba(255, 0, 0, 0.6) with height > 10', () => {
        assert.equal(Utils.eval(line.color)({
          height: 11
        }, 10), 'rgba(255, 0, 0, 0.6)');
      });

      it('should be rgba(255, 0, 0, 0.3) with height > 15', () => {
        assert.equal(Utils.eval(line.color)({
          height: 16
        }, 10), 'rgba(255, 0, 0, 0.3)');
      });
    });

    it('should not have size', () => {
      assert.notProperty(line, 'size');
    });

    it('should have width', () => {
      assert.property(line, 'width');
    });

    describe('.width: ', () => {
      it('should be 75000', () => {
        assert.equal(Utils.eval(line.width)({}, 10), '75000');
      });

      it('should be 100000 with height > 10', () => {
        assert.equal(Utils.eval(line.width)({
          height: 11
        }, 10), '100000');
      });

      it('should be 30 with height > 15', () => {
        assert.equal(Utils.eval(line.width)({
          height: 16
        }, 10), '150000');
      });
    });

  });

  describe('.getStyle()', () => {
    let line = Line.getStyle(c3ss, id);
    it('should have lines_id property', () => {
      assert.property(line, 'lines_' + id);
    });

    describe('.lines_blend', () => {
      let lines_blend = line['lines_' + id];
      it('should have base property', () => {
        assert.property(lines_blend, 'base');
      });

      it('shoul have blend property', () => {
        assert.property(lines_blend, 'blend');
      });

      it('should have base property equal to lines', () => {
        assert.equal(lines_blend.base, 'lines');
      });

      it('should have blend property equal to overlay', () => {
        assert.equal(lines_blend.blend, 'overlay');
      });
    });
  });
});
