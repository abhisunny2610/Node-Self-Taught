// first way of modules for export

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

module.exports = { add, subtract }

// another way of writing module and export it 

exports.add1 = (a, b) => a + b
exports.sub = (a, b) => a - b