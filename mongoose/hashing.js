const {SHA256} = require('crypto-js');
const jwt=require('jsonwebtoken');
var data={
	id:10
}
var token=jwt.sign(data,'123abcd');
console.log(token);
var decoded=jwt.verify(token,'123abcd');
console.log(decoded);
// var data={
// 	id:4
// };
// var token={
// 	data,
// 	hash:SHA256(JSON.stringify(data)+'somesecrets').toString()
// }

// token.data.id=5;
// var result=SHA256(JSON.stringify(token.data)+'somesecrets').toString();

// if(result===token.hash)
// {
// 	console.log('Data was not changed');
// }
// else
// {
// 	console.log('Data was changed plz dont trust it');
// }