const list = (head, tail) => () => ({head, tail});

const head = l => l().head;

const tail = l => l().tail;

const nth = (l, n) => n == 0 ? head(l) : nth(tail(l), n - 1);

const map = (l, f) => foldr(l, (a, i) => list(f(i), a), null);

const filter = (l, f) => foldr(l, (a, i) => f(i) ? list(i, a) : a, null);

const foldl = (l, f, a) => tail(l) == null ? f(a, head(l)) : foldl(tail(l), f, f(a, head(l)));

const foldr = (l, f, a) => tail(l) == null ? f(a, head(l)) : f(foldr(tail(l), f, a), head(l));

const append = (x, y) => from_array([...to_array(x), ...to_array(y)]);

const compare = (x, y) => head(x) == head(y) && ((tail(x) == null && tail(y) == null) || (tail(x) != null && tail(y) != null && compare(tail(x), tail(y))));

const from_array = a => a.reverse().reduce((l, i) => list(i, l), null);

const to_array = l => foldl(l, (a, i) => [...a, i], []);

module.exports = {
    list, head, tail, nth, map, filter, foldl, foldr, append, compare, from_array, to_array
};