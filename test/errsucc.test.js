const assert = require("assert");
const Errsucc = require("../errsucc");

describe("The Error functions tests.", () => {
    
    it("If reg Number is null or equal to undefined notify the user to enter a reg in the text field", () => {
        let errsucc = Errsucc();
        let expected = "Please enter a registration number in the text and hit add."
        let actual = errsucc.errorOut("");
        assert.equal(expected, actual);
    })

    it("If reg Number length is less than 8 characters return an error stating that the reg entered is less than 8 characters.", () => {
        let errsucc = Errsucc();
        let expected = "invalid length of characters please make sure you input 8 characters in the text field eg. CA 123 123."
        let actual = errsucc.errorOut("CA232");
        assert.equal(expected, actual);

    })

    it("Should notify the user that A registration number enterded doesnt start with 'CA', 'CW' or 'CY'.", () => {
        let errsucc = Errsucc();
        let expected = "Please make sure that you registration number starts with CA ,CW or CY eg 'CA 123 123'. "
        let actual = errsucc.errorOut("CE888888");
        assert.equal(expected, actual);

    })

    it("Should take in a parameter and trim all white spaces.", () => {
        let errsucc = Errsucc();
        let expected = "CA878788";
        let actual = errsucc.cleanPar("CA 8  7 87 88");
        assert.equal(expected, actual);

    });

});