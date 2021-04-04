var x;
if (x == 5) {
    console.log('x is 5');
    let y = 6;
}

if (y == 6) {
    console.log('I misunderstood js scopes.');
} else {
    console.log('This won\'t print either because \
    y is undefined, which throws an error.');
}
