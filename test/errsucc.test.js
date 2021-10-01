const assert = require("assert");
const Errsucc = require("../errsucc")

describe("Error functions tests",()=>{
it("It shoud display a success message when a valid reg num is entered.",  ()=>{
    let errsucc = Errsucc()
    let expected =  errsucc.successOut("CA434343",[])
    assert.equal("Registration number CA434343 successfully added to the database",expected );

})

it("If reg doesnt contain any digits return an error", ()=>{
    let errsucc = Errsucc();    
    let expected = "You have entered an invalid reg number, make sure your reg number starts with CA ,CW or CY. eg CA121212"
    let actual = errsucc.errorOut("CAIIII")
    assert.equal(expected,actual)

})

it("If reg length is less than 8 return an error", ()=>{
    let errsucc = Errsucc();    
    let expected = 'You have entered an invalid reg number, make sure your reg number starts with CA ,CW or CY. eg CA121212'  
    let actual = errsucc.errorOut("C")
    assert.equal(expected,actual)

})

it("If text is null should notyfy the user", ()=>{
    let errsucc = Errsucc();  
    let expected = "Please enter A reg Number in the text field eg CA898989"  
    let actual = errsucc.errorOut("")
    assert.equal(expected,actual)

})

})