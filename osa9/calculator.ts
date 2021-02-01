type Operation = 'multiply' | 'add' | 'divide';
type Result = number;

const calculator = (a: number,b: number,op: Operation): Result => {
	switch (op){
		case 'multiply':
			return a*b;
		case 'add':
			return a+b;
		case 'divide':
			if (b !== 0){
				return a/b;
			}
		default:
			throw new Error('Operation is not multiply, add or divide!');
	}
}

try {
	console.log(calculator(5,5,'add'));
} catch (e) {
	console.log('Something went wrong:', e.message);
}

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);
const op: Operation = Operation(process.argv[1]);
console.log(calculator(a,b,op));
