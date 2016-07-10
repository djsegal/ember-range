import Ember from 'ember';

export function range(params, hash) {
  var start, end, increment, oneBasedNumbering;

  switch( params.length ) {
    case 1:
      oneBasedNumbering = ( hash && hash['oneBasedNumbering'] );
      start = oneBasedNumbering ? 1 : 0;
      end = oneBasedNumbering ? params[0] : params[0] - Math.sign(params[0]);
      increment = 1;
      break;
    case 2:
      start = params[0];
      end = params[1];
      increment = 1;
      break;
    case 3:
      start = params[0];
      end = params[1];
      increment = params[2];
      break;
    default:
      throw 'Invalid number of arguments for range helper.';
  }

  if ( hash && hash['oneBasedNumbering'] ) {
    start
  }

  if ( start > end && increment > 0 ) { increment = -increment; }

  var currentRange = [];
  for( var i = start; Math.abs(end - i) > Math.abs(end - (i + increment)); i += increment ) {
    currentRange.push(i);
  }

  var forceEndpoints = hash && hash['forceEndpoints'],
      lastValue = forceEndpoints ? end : currentRange[currentRange.length-1] + increment;

  var nonInclusive = hash && hash['nonInclusive'];
  nonInclusive = nonInclusive && ( params.length !== 1 );
  if ( nonInclusive && !forceEndpoints && lastValue === end ) { return currentRange; }

  currentRange.push(lastValue);
  return currentRange;
}

export default Ember.Helper.helper(range);
