app.filter('groupby', function() {
  return function(input, param) {
    console.log(param);
    if (!input || !input.length) return;

    var output = [],
        previousVal,
        currentVal,
        isDivider;

    for (var i = 0, ii = input.length; i < ii && (item = input[i]); i++) {
        currentVal = item[param];
        item.isDivider = !previousVal || currentVal != previousVal;
        output.push(item);
        previousVal = currentVal;
    }

    return output;
  };
});
