const expect=require('expect');
const required=require('supertest');

const {app1}=require('./todos');
const {app}=require('./server');

beforeEach((done)=>{
app1.remove({}).then(()=>done());
});
describe('POST /todos',()=>
{
	it('should create a new node',(done)=>
	{
		var text2="hey this sambhav";

		required(app).
		post('/todos')
		.send({text2})
		.expect((res)=>
		{
			expect(res.body.text2).toBe(text2);
		}
		).end((err,res)=>
		{
			if(err)
			{
				return done(err);
			}
			app1.find().then((todos)=>
			{
				expect(todos.length).toBe(1);
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
				expect(todos.length).toBe(0);
				done();
			}).catch((e)=>
			done(e));
		});
	});
});