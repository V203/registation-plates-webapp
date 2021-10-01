
module.exports = function ServicesFactory(pool) {
    
    async function allTowns() {
        try {
            let results = await pool.query("Select reg_nums from reg_numbers")
            let results_ = []
    
            results.rows.forEach((results) => { results_.push(results.reg_nums) })
            return results_
        } catch (error) {
            console.log("The getCA function error " + error)
        }
    
    }
    async function add(parLocations) {

        var townsArr = await allTowns()
        try {

            parLocations = parLocations.toUpperCase().trim().replace(/ /g, "");
            let parID = parLocations.slice(0, 2)
            if ((parID === "CA" || parID === "CY" || parID === "CW") && parLocations.length === 8 && /^[0-9]+$/.test(parLocations.slice(2)) === true && !townsArr.includes(parLocations)) {
                
                await pool.query('insert into reg_numbers(reg_nums,towns_id) values($1,$2)', [parLocations, parID])
            } 
            else {

                return "Please enter the appropriate reg Nr eg CA 121212 ,CY656565 or CW 565656."
            }

        }
        catch (error) {
            console.log("error of add function ==> " + error);
        }
    }


    async function getCAWY(par) {
        try {
            let results = await pool.query("Select reg_nums from reg_numbers where towns_id =$1", [par])
            let results_ = []

            results.rows.forEach((results) => { results_.push(results.reg_nums) })
            return results_
        } catch (error) {
            console.log("The getCA function error " + error)
        }
    }
    
    async function reset() {
        try {
            await pool.query("delete from reg_numbers");
        } catch (error) {
            console.log("Reset button error " + error);
        }
    }

    async function addProto(parLocations) {
        try {
            parLocations = parLocations.toUpperCase().trim().replace(/ /g, "");
            let parID = parLocations.slice(0, 2)
            await pool.query('insert into  reg_numbers(reg_nums,towns_id) values($1,$2) ', [parLocations, parID]);


        }
        catch (error) {
            console.log("error of add function ==> " + error);
        }

    }

    return {
        allTowns,
        add,
        reset,
        getCAWY,
        addProto
    };
}