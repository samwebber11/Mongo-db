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

console.log(obj1);
console.log(obj2);

// before((done)=>
// {
// 	console.log('I m starting up');
// 	app1.remove({}).then(()=>
// 	{
// 		var obj1 = new app1();
// 		console.log(obj1);
// 		var obj2 = new app1();
// 		console.log(obj2);
// 		return Promise.all([obj1,obj2]);
// 	}).then(()=>
// 	done());
// });
beforeEach(function()
{
	console.log('i m starting up');
	// return app1.remove({}).then(function()
	// {
	// 	console.log('so fucked up');
	// 	return app1.save([sam[0],sam[1]]);
	// });
	
});
// describe('GET /todos1/me',()=>{
	
	
// 	it('should get authenticated',(done)=>
// 	{
// 	request(app).get('/todos1/me')
// 	.set('x-auth',sam[0].tokens[0].token)
// 	.expect(200)
// 	.expect((res)=>
// 	{
// 		expect(res.body._id).toBe(sam[0]._id.toHexString());
// 		expect(res.body.email).toBe(sam[0].email);

// 	});	
// 	});

// 	it('should not get authenticated',(done)=>
// 	{
// 		request(app).get('/todos1/me')
// 		.expect(401).expect((res)=>
// 		{
// 			expect(res.body).toEqual({});
// 		}).end(done);
// 	})
// });


describe('POST /todos1/login',()=>
{
	it('should get login up',(done)=>
	{
		request(app)
		.post('/todos1/login')
		.send({
			email:sam[0].email,
			password:sam[0].password	
		}).
		expect(200)
		.expect((res)=>
		{
			expect(res.headers['x-auth']).toExist();	
		})
		.end((err,res)=>
		{
			if(err)
			{
				return done(err);
			}
			todos.findById(sam[0]._id).then((user)=>
			{
				expect(user.tokens[0]).toInclude({
					access:'auth',
					token: res.headers['x-auth']
				});
				done();
			}).catch((e)=>done(e));
		});
	});
});