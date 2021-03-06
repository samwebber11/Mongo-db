const expect=require('expect');
const required=require('supertest');
const {ObjectId}=require('mongodb')
const {app1}=require('./todos');
const {app}=require('./server');

const sam=[{
	_id:new ObjectId(),
	text:'Sambhav',
	email:'kumar.jain2376@gmail.com'
},{
	_id:new ObjectId(),
	text:'SamJain',
	email:'samjain15291@gmail.com'
}];
beforeEach((done)=>{
app1.remove({}).then(()=>
	{
		return app1.insertMany(sam);
	}).then(()=>done());
});
describe('POST /todos',()=>
{
	it('should create a new node',(done)=>
	{
		var text="hey this sambhav";

		required(app).
		post('/todos')
		.send({text})
		.expect((res)=>
		{
			expect(res.body.text).toBe(text);
		}
		).end((err,res)=>
		{
			if(err)
			{
				return done(err);
			}
			app1.find().then((todos)=>
			{
				expect(todos.length).toBe(3);
				expect(todos[0].text2).toBe(text2);
				done();
			}).catch((e)=>done(e));
		});
	});

	it('should not pass',(done)=>
	{
		required(app).post('/todos').send().
		expect(400).end((err,res)=>
		{
			if(err)
			{
				return done(err);
			}
			app1.find().then((todos)=>
			{
				expect(todos.length).toBe(2);
				done();
			}).catch((e)=>
			done(e));
		});
	});
});
describe('GET/ todos',()=>
	{
		it('it should be done',(done)=>
{
required(app).get('/todos').expect(200).expect((res)=>
{
	expect(res.body.todos.length).toBe(2);
}).end(done);
});
	});
describe('GET/todos/:id',()=>
{
	it('it should be cleared',(done)=>
	{
		required(app).
		get(`/todos/${sam[0]._id.toHexString()}`).
		expect(200).
		expect((res)=>
		{
			expect(res.body.todos.text).toBe(sam[0].text);
		}).end(done);
	});
});
