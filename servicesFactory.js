
module.exports = function ServicesFactory(pool) {
    const allTowns = async () => {
        try {
            let results = await pool.query("Select reg_nums from reg_numbers")
            let results_ = []

            results.rows.forEach((results) => { results_.push(results.reg_nums) })
            return results_
        } catch (error) {
            console.log("The getCA function error " + error)
        }

    }


    async function add(parLocations, paramArray) {

        var townsArr = await allTowns()
        try {
            var ourMessage =""
            parLocations = parLocations.toUpperCase().trim().replace(/ /g, "");
            let parID = parLocations.slice(0, 2)
            if ((parID === "CA" || parID === "CY" || parID === "CW") && parLocations.length === 8 && /^[0-9]+$/.test(parLocations.slice(2)) === true && !townsArr.includes(parLocations)) {

                 await pool.query('insert into reg_numbers(reg_nums,towns_id) values($1,$2)', [parLocations, parID])
                   
                    ourMessage =  parLocations + " successfully added to the database."
                
            }
            else if (paramArray.includes(parLocations)== true) {
                console.log(paramArray.includes(parLocations));
                ourMessage =  "Reg no "+parLocations+" already exist in the data base."
            }

            return ourMessage
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

    const reset = async () => {
        try {
            await pool.query("delete from reg_numbers");
        } catch (error) {
            console.log("Reset button error " + error);
        }
    }

    return {
        allTowns,
        add,
        reset,
        getCAWY

    };
}