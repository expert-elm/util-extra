

function compare<T>(a: T[], b: T[]) {
	var cols = a.length;
	var rows = b.length;

	var prefix = findCommonPrefix(a, b)
	var suffix = prefix < cols && prefix < rows
		? findCommonSuffix(a, b)
		: 0

	var remove = suffix + prefix - 1
	cols -= remove
	rows -= remove
	var matrix = createMatrix(cols, rows)

	for (var j = cols - 1; j >= 0; --j) {
		for (var i = rows - 1; i >= 0; --i) {
			matrix[i][j] = backtrack(matrix, a, b, prefix, j, i)
		}
	}

	return {
		prefix: prefix,
		matrix: matrix,
		suffix: suffix
	}
}

function findCommonPrefix<T>(a: Array<T>, b: Array<T>): number {
	var i = 0
	var l = Math.min(a.length, b.length)
	while(i < l && a[i] === b[i]) ++i
	return i
}

function findCommonSuffix<T>(a: Array<T>, b: Array<T>): number {
	var la = a.length - 1
	var lb = b.length - 1
	var l = Math.min(la, lb)
	var i = 0
	while(i < l && a[la - i] === b[lb - i]) ++i
	return i
}

enum MatrixType {
  REMOVE = -1,
  RIGHT = -1,

  DOWN = 1,
  ADD = 1,

  EQUAL = 0,
  SKIP = 0
}

function createMatrix (cols: number, rows: number): { value: number, type: MatrixType }[][] {
	const m: { value: number, type: MatrixType }[][] = []

	for (let i = 0; i< cols; ++i) {
    m[rows] = []
		m[rows][i] = { value: cols - i, type: MatrixType.RIGHT }
	}

	for (let i = 0; i< rows; ++i) {
		m[i] = [];
		m[i][cols] = { value: rows - i, type: MatrixType.DOWN }
	}

	m[rows][cols] = { value: 0, type: MatrixType.SKIP }

	return m
}

function backtrack<T>(matrix: { value: number, type: MatrixType }[][], a: T[], b: T[], start: number, j: number, i: number): { value: number, type: MatrixType } {
	if (a[j + start] === b[i + start]) return { value: matrix[i + 1][j + 1].value, type: MatrixType.SKIP }
  else if (matrix[i][j + 1].value < matrix[i + 1][j].value) return { value: matrix[i][j + 1].value + 1, type: MatrixType.RIGHT }
	else return { value: matrix[i + 1][j].value + 1, type: MatrixType.DOWN }
}

function reduce(f: Function, r: any, lcs: any) {
	var i, j, k, op;

	var m = lcs.matrix;

	// Reduce shared prefix
	var l = lcs.prefix;
	for(i = 0;i < l; ++i) {
		r = f(r, MatrixType.SKIP, i, i);
	}

	// Reduce longest change span
	k = i;
	l = m.length
	i = 0
	j = 0
	while(i < l) {
		op = m[i][j].type
		r = f(r, op, i+k, j+k)

		switch(op) {
			case MatrixType.SKIP:  ++i; ++j; break
			case MatrixType.RIGHT: ++j; break
			case MatrixType.DOWN:  ++i; break
		}
	}

	// Reduce shared suffix
	i += k
	j += k
	l = lcs.suffix
	for(k = 0;k < l; ++k) {
		r = f(r, MatrixType.SKIP, i+k, j+k)
	}

	return r
}
