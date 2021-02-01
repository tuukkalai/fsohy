let i = 0;

const person = {
	"name": "Firstname of the dude",
	"location": "USA"
};

const order = {
	"person": person,
	"order": "Mango milkshake"
};

type Person = typeof person;
type Order = typeof order;

console.log(order.person.name);
