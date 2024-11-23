Function.prototype.myCall = function myCall(context, ...args){
    context.fn = this;
    context.fn(...args);
}
function printName(city, country){
    console.log( `${this.firstName} ${this.lastName}, ${city} - ${country}` );
}

const myName = {
    firstName: 'Ankit',
    lastName: 'Saxena'
};


printName.myCall(myName, "Palia", "India");

