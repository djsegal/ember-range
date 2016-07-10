import { range } from 'dummy/helpers/range';
import { module, test } from 'qunit';

module('Unit | Helper | range');

test('it works with one param without oneBasedNumbering', function(assert) {
  let result = range([3]);
  assert.propEqual(result, [0, 1, 2]);

  result = range([-3]);
  assert.propEqual(result, [0, -1, -2]);
});

test('it works with one param with oneBasedNumbering', function(assert) {
  let result = range([3], {oneBasedNumbering: true});
  assert.propEqual(result, [1, 2, 3]);

  result = range([-3], {oneBasedNumbering: true});
  assert.propEqual(result, [1, 0, -1, -2, -3]);
});

test('it works with two param', function(assert) {
  let result = range([-1, 2]);
  assert.propEqual(result, [-1, 0, 1, 2]);

  result = range([2, -1]);
  assert.propEqual(result, [2, 1, 0, -1]);
});

test('it works with three param without forceEndpoints', function(assert) {
  let result = range([-1, 4, 2]);
  assert.propEqual(result, [-1, 1, 3]);

  result = range([4, -1, 2]);
  assert.propEqual(result, [4, 2, 0]);
});

test('it works with three param with forceEndpoints', function(assert) {
  let result = range([-1, 4, 2], {forceEndpoints: true});
  assert.propEqual(result, [-1, 1, 4]);

  // forceEndpoints ranks higher than nonInclusive
  result = range([-1, 4, 2], {forceEndpoints: true, nonInclusive: true});
  assert.propEqual(result, [-1, 1, 4]);

  result = range([4, -1, 2], {forceEndpoints: true});
  assert.propEqual(result, [4, 2, -1]);
});

test('it works with nonInclusive (one param)', function(assert) {
  let result = range([2], {nonInclusive: true});
  assert.propEqual(result, [0, 1]);

  result = range([2], {nonInclusive: true, oneBasedNumbering: true});
  assert.propEqual(result, [1, 2]);
});

test('it works with nonInclusive (two params)', function(assert) {
  let result = range([2, -2], {nonInclusive: true});
  assert.propEqual(result, [2, 1, 0, -1]);
});

test('it works with nonInclusive (three params)', function(assert) {
  let result = range([4, -1, 2]);
  assert.propEqual(result, [4, 2, 0]);

  result = range([4, -1, 2], {nonInclusive: true});
  assert.propEqual(result, [4, 2, 0]);

  result = range([4, 0, 2]);
  assert.propEqual(result, [4, 2, 0]);

  result = range([4, 0, 2], {nonInclusive: true});
  assert.propEqual(result, [4, 2]);
});
