module.exports = function errsucc() {
    function errorOut(par, parArr_) {

        var parArr_ = [];
        
        try {

            if (par === "") {
                
                return "Please enter A reg Number in the text field eg CA898989"

            } else if ((par.slice(0, 2) !== "CA" || par.slice(0, 2) !== "CY" || par.slice(0, 2) === "CW") && par.length !== 8 && /^[0-9]+$/.test(par.slice(2)) === false) {
                return "You have entered an invalid reg number, make sure your reg number starts with CA ,CW or CY. eg CA121212"
            } else if (/^[0-9]+$/.test(par.slice(2)) === false) {
                return "Please enter the appropriate reg Nr eg CA 121212 ,CY656565 or CW 565656."
            }
            else if (parArr_.includes(par) === true) {
                return "The entered reg Nr already exist in the data base"
            }
        } catch (error) {
            console.log("error message ==> " + error);
        }
    }
    function successOut(par_) {
try{
        let par;
        
        (par_ !== undefined) ? par = par_.toUpperCase().trim().replace(/ /g, "") : null;        
        if ((par.slice(0, 2) === "CA" || par.slice(0, 2) === "CY" || par.slice(0, 2) === "CW") && par.length === 8 && /^[0-9]+$/.test(par.slice(2)) === true ) {
            
            return "Registration number " + par + " successfully added to the database"
        }

    }catch(error){
        console.log("success error")

            }

        }

        function errorLength(par) {
            if(par.length !== 8){                
                return "You have entered an invalid length of characters in the text field ,the text field requires 8 charcters eg CA123456"
            }            
        }


    return {
        errorOut, successOut,errorLength

    }

}