var app = require('../app');
var supertest = require('supertest');
var should = require('should');
var request = supertest(app);//要测试的app

describe('test/app.test.js', function () {
    it('should return 55 when n is 10', function (done) {
        // 之所以这个测试的 function 要接受一个 done 函数，是因为我们的测试内容
        // 涉及了异步调用，而 mocha 是无法感知异步调用完成的。所以我们主动接受它提供
        // 的 done 函数，在测试完毕时，自行调用一下，以示结束。
        // mocha 可以感知到我们的测试函数是否接受 done 参数。js 中，function
        // 对象是有长度的，它的长度由它的参数数量决定
        // (function (a, b, c, d) {}).length === 4
        // 所以 mocha 通过我们测试函数的长度就可以确定我们是否是异步测试。

        request.get('/fib')
        // .query 方法用来传 querystring，.send 方法用来传 body。
        // 它们都可以传 Object 对象进去。
        // 在这里，我们等于访问的是 /fib?n=10
            .query({n: 10})
            .end(function (err, res) {
                // 由于 http 返回的是 String，所以我要传入 '55'。
                res.text.should.equal('55');

                // done(err) 这种用法写起来很鸡肋，是因为偷懒不想测 err 的值
                // 如果勤快点，这里应该写成
                /*
                 should.not.exist(err);
                 res.text.should.equal('55');
                 */
                done(err);
            });
    });

    // 下面我们对于各种边界条件都进行测试，由于它们的代码雷同，
    // 所以我抽象出来了一个 testFib 方法。
    var testFib = function (n, statusCode, expect, done) {
        request.get('/fib')
            .query({n: n})
            .expect(statusCode)
            .end(function (err, res) {
                res.text.should.equal(expect);
                done(err);
            });
    };
    it('should return 0 when n === 0', function (done) {
        testFib(0, 200, '0', done);
    });

    it('should equal 1 when n === 1', function (done) {
        testFib(1, 200, '1', done);
    });

    it('should equal 55 when n === 10', function (done) {
        testFib(10, 200, '55', done);
    });

    it('should throw when n > 10', function (done) {
        testFib(11, 500, 'n should <= 10', done);
    });

    it('should throw when n < 0', function (done) {
        testFib(-1, 500, 'n should >= 0', done);
    });

    it('should throw when n isnt Number', function (done) {
        testFib('good', 500, 'n should be a Number', done);
    });

    // 单独测试一下返回码 500
    it('should status 500 when error', function (done) {
        request.get('/fib')
            .query({n: 100})
            .expect(500)
            .end(function (err, res) {
                done(err);
            });
    });
});
