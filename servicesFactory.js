

module.exports = function ServicesFactory(pool) {

    async function add(parLocations) {
            
        try {
            parLocations = parLocations.toUpperCase().trim().replace(/ /g,"");
            let parID = parLocations.slice(0, 2)
            // if(parID !== "CA" || parID !== "CY" || parID !== "CW"){
            //     return "Please make your registration number starts with CA , CY or CW"
            // }
            await pool.query('insert into reg_numbers(reg_nums,towns_id) values($1,$2)', [parLocations, parID]);                    
            } 
            catch (error)
             {
                console.log("error of add function ==> " + error);
             }
        }

    async function allTowns(){
        try {
            let results = await pool.query("Select reg_nums from reg_numbers")
            let results_=[]
             
            results.rows.forEach((results)=>{results_.push(results.reg_nums)})
            return  results_
        } catch (error) {
            console.log("The getCA function error "+error)
        }

    }

    async function getCAWY(par){
        try {
            let results = await pool.query("Select reg_nums from reg_numbers where towns_id =$1",[par])
            let results_=[]
             
            results.rows.forEach((results)=>{results_.push(results.reg_nums)})
            return  results_
        } catch (error) {
            console.log("The getCA function error "+error)
        }
    }
    function errorOut(par_){
        let par = par_
        if( par ==="" ){
            return "Please enter A reg Number in the text field eg CA898989"
        
        }
    }
    function successOut(par){
        
         if(par){
                par= par.toUpperCase().trim().replace(/ /g,"")
                return "Registration number "+par+" successfully added to the  database."
         }
        

    }

    //    async function setPlates(par__) {
    //         let par_ = par__.toUpperCase().trim().replace(/ /g,"")
    //         let alphaPar = par_.slice(0,2);
    //         let numPar = par_.slice(2)
    //         let par = alphaPar + numPar
    //         if(/^[0-9]+$/.test(numPar)===false){
    //             return "Please enter the appropriate reg Nr eg CA 121212 ,CY656565 or CW 565656."
    //         }
    //         else if (par.length !== 8) {
    //             return "Invalid length of characters entered in the text field"
    //         } 
    //         if (par.startsWith("CA") || par.startsWith("CW") || par.startsWith("CY")) {
    //             if (!plateAll.includes(par)) {
    //                 plateAll.push(par)
    //             }
    //             else if (plateAll.includes(par)) {
    //                 return "Reg Number already exist in the data base."
    //             }
    //         } else {
    //             return "You have entered an invalid reg number, make sure your reg number starts with CA ,CW or CY. eg CA121212"
    //         };
    //     };
    async function reset() {
        try {
            await pool.query("delete from reg_numbers");
        } catch (error) {
            console.log("Reset button error " + error);
        }
    }

    async  function addProto (parLocations){
        try {
            parLocations = parLocations.toUpperCase().trim().replace(/ /g,"");
            let parID = parLocations.slice(0, 2)
            await pool.query('insert into  reg_numbers(reg_nums,towns_id) values($1,$2) ', [parLocations, parID]);
            
        
            } 
            catch (error)
             {
                console.log("error of add function ==> " + error);
             }

    }

    return {
        allTowns,
        add,
        reset,
        getCAWY,
        addProto,
        errorOut,
        successOut
        
    };
}