const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');
const jwt=require('jsonwebtoken');
const {app}=require('./server');
const {app1}=require('./todos');

const obj1=new ObjectID();
const obj2=new ObjectID();
const sam=[{
_id:obj1,
text:'This is the first object',
email:'kumar.jain2376@gmail.com',
password:'sambhav',
tokens:[{
access:'auth',
token:jwt.sign({
_id:obj1,
access:'auth'
},'abc123@').toString()
	}]
},
{
	_id:obj2,
	text:'This is the second object',
	email:'samjain843@gmail.com',
	password:'sambhav1'
}];

// beforeEach((done)=>
// {
// 	app1.remove({}).then(()=>
// 	{
// 		var obj1=new app1(sam[0]).save();
// 		console.log(obj1);
// 		var obj2=new app1(sam[1]).save();
// 		console.log(obj2);
// 		return Promise.all([obj1,obj2]);
// 	}).then(()=>
// 	done());
// });

describe('GET /users/me',()=>{
	beforeEach((done)=>
{
	app1.remove({}).then(()=>
	{
		var obj1=new app1(sam[0]).save();
		console.log(obj1);
		var obj2=new app1(sam[1]).save();
		console.log(obj2);
		return Promise.all([obj1,obj2]);
	}).then(()=>
	done());
});
	
	it('should get authenticated',(done)=>
	{
	
	request(app).get('/todos1/me')
	.set('x-auth',sam[0].tokens[0].token)
	.expect(200)
	.expect((res)=>
	{
		expect(res.body._id).toBe(sam[0]._id.toHexString());
		expect(res.body.email).toBe(sam[0].email);

	})

	.end(done);	
	});

	it('should not get authenticated',(done)=>
	{
		request(app).get('/todos1/me')
		.expect(401).expect((res)=>
		{
			expect(res.body).toEqual({});
		}).end(done);
	})
});


describe('POST /users/me',()=>
{
	it('should get signed up',(done)=>
	{})
})