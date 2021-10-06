module.exports = function errsucc() {

    function errorOut(par_) {
        var par = cleanPar(par_)

                if (par === "" || par === undefined) {
                return "Please enter a registration number in the text and hit add."
            }
            else if(par.length !== 8){
                return "invalid length of characters please make sure you input 8 characters in the text field eg. CA 123 123."

            }else if(/^[0-9]+$/.test(par.slice(2)) === false){
                return "Please make  sure that the first two characters are alphabets and the rest are digits. eg CY 123 123."

             }
             else if(par.slice(0,2) !== "CA" && par.slice(0,2) !== "CY" && par.slice(0,2) !== "CW"){
                return "Please make sure that you registration number starts with CA ,CW or CY eg 'CA 123 123'. "
            }
        
    }

    function cleanPar(par) {
        try {
            if (par !== undefined && par !== "") {
                par = par.toUpperCase().trim().replace(/ /g, "");
                return par
            }
        } catch (error) {
            console.log(error + " cleanPar function error");
        }
    }
    return {
        errorOut, cleanPar
    }
}

