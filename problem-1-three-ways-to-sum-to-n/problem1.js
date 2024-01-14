var sum_to_n_a = function(n) {
    return (n+1) / 2 * n;
    // time complexity is 1 because the time taken is independent of n
};

var sum_to_n_b = function(n) {
    res = 0;
    for (let i=0; i<=n; i++) {
      res += i;
    }
    return res;
    // time complexity is n because time taken is proportional to n
};

var sum_to_n_c = function(n) {
    if (!n) {
      return 0;
    }
    return n + sum_to_n_c(n-1);
    // time complexity is n because time taken is proportional to n
};

let n = 5000;
console.log(sum_to_n_a(n));
console.log(sum_to_n_b(n));
console.log(sum_to_n_c(n));