const assert = require("assert");
const ServicesFactory = require("../servicesFactory");
const pg = require("pg");
const servicesFactory = require("../servicesFactory");
const { doesNotMatch, doesNotReject } = require("assert");
const Errsucc =require("../errsucc");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/regdb_test';
const pool = new Pool({
    connectionString
});
describe('Registrion Numbers SQL queries', function () {
    beforeEach(async function () {
        console.log("*****");
        // clean the tables before each test run
        try {
            // await pool.query("delete  from towns;")
            await pool.query("delete from reg_numbers");
        } catch (error) {
            console.error(error);
        }
        
    });

    

    it("It Should add two number plates and and return the total length equal to 2.", async function () {
        let servicesFactory =  ServicesFactory(pool);        
        
            await servicesFactory.add('CA454545');
            await servicesFactory.add('CY454545');        
           let all = await servicesFactory.allTowns();
           assert.equal(2,all.length );
    });

    it("The function getCAWY parsed with the parameter CA should return all the reg numbers from CAPE TOWN.",async()=>{
    let servicesFactory = ServicesFactory(pool);
      await servicesFactory.add('CA090999');
      await servicesFactory.add('CA878787');
      await servicesFactory.add('CA900090');

      let expected = await servicesFactory.getCAWY("CA");
      let actual =['CA090999','CA878787','CA900090'];
    
      assert.deepEqual(actual,expected);

    });
    it("The function getCAWY parsed with the parameter CY should return all the reg numbers from BELLVILLE.",async ()=>{
        let servicesFactory = ServicesFactory(pool);
        await servicesFactory.add('CA908787');
        await servicesFactory.add('CY787878');
        await servicesFactory.add('CW900090');
        await servicesFactory.add('CA998787');
        await servicesFactory.add('CY707878');
        await servicesFactory.add('CW900091');

        let expected = await  servicesFactory.getCAWY('CY');
        let actual = ["CY787878","CY707878"];

        assert.deepEqual(actual,expected);
    });

    it("The function getCAWY parsed with the parameter CW should return all the reg numbers from WORCESTER.",async ()=>{
        let servicesFactory = ServicesFactory(pool);
        await servicesFactory.add('CA908787');
        await servicesFactory.add('CY787878');
        await servicesFactory.add('CW900090');
        await servicesFactory.add('CA998787');
        await servicesFactory.add('CY707878');
        await servicesFactory.add('CW900091');

        let expected = await  servicesFactory.getCAWY('CW');
        let actual = ["CW900090","CW900091"];

        assert.deepEqual(actual,expected);
    });

    it(`We should add registration numbers in the database and then delete
        everything using the reset function and the length of our table should be 
        equal to 0.`,async ()=>{
        let servicesFactory = ServicesFactory(pool);
        await servicesFactory.add('CA908787');
        await servicesFactory.add('CY787878');
        await servicesFactory.add('CW900090');
        await servicesFactory.add('CA998787');
        await servicesFactory.add('CY707878');
        await servicesFactory.add('CW900091');

        await servicesFactory.reset()
        let expected = await  servicesFactory.allTowns();
        let actual = [];

        assert.equal(actual.length,expected);
    });

    it(`We should be able to return all registration numbers in the database.`,async ()=>{
        let servicesFactory = ServicesFactory(pool);
        await servicesFactory.add('CA908787');
        await servicesFactory.add('CY787878');
        await servicesFactory.add('CW900090');
        await servicesFactory.add('CA998787');
        await servicesFactory.add('CY707878');
        await servicesFactory.add('CW900091');
        
        let expected = await  servicesFactory.allTowns();
        let actual = ['CA908787','CY787878','CW900090','CA998787','CY707878','CW900091'];

        assert.deepEqual(actual,expected);
    });

    after(function () {
        pool.end();
    })
});