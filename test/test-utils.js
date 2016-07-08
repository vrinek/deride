/*
 Copyright (c) 2014 Andrew Rea
 Copyright (c) 2014 James Allen

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,30
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

require('should');
var _ = require('lodash');
var utils = require('../lib/utils');

describe('utils', function() {
    it('finds object style methods', function() {
        var obj = {
            greet: function() {},
            depart: function() {}
        };
        utils.methods(obj).should.eql(['greet', 'depart']);
    });

    it('finds protoype style methods', function() {
        function Obj() {}
        Obj.prototype.greet = function() {};
        Obj.prototype.depart = function() {};
        utils.methods(new Obj()).should.eql(['greet', 'depart']);
    });

    it('finds methods attached to functions', function() {
        function obj() {}
        obj.greet = function() {};
        obj.depart = function() {};
        utils.methods(obj).should.eql(['greet', 'depart']);
    });

    it('finds es6 class methods', function(){
        var Something = class {
            greet(){
                return 'Hello';
            }
            depart(){

            }
        };

        utils.methods(new Something()).should.eql(['greet', 'depart']);
    });

    describe('converts number to correct times text', function() {
        var testCases = [{
            name: 'once',
            value: 1,
        }, {
            name: 'twice',
            value: 2,
        }, {
            name: '3 times',
            value: 3,
        }, {
            name: '10 times',
            value: 10,
        }];

        _.each(testCases, function(test) {
            it('returns ' + test.name, function() {
                utils.humanise(test.value).should.eql(test.name);
            });
        });
    });

});