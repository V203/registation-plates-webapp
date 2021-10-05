exports.Routes = Routes;

const Errsucc = require("./errsucc")
const errsucc = Errsucc();



 function Routes(servicesFactory){

    const home = async (req, res) => {
        res.render("index", {
            out: await servicesFactory.allTowns(),
            errorOut: errsucc.errorOut(req.body.nameInput,await servicesFactory.allTowns()),
            successOut: errsucc.successOut(req.body.nameInput, await servicesFactory.allTowns())
        })
        
    }



    const add = async (req, res) => {
        await servicesFactory.add(req.body.nameInput)
        let theArr = await servicesFactory.allTowns()    
        res.render("index", {
            out: await servicesFactory.allTowns(),
            errorOut: errsucc.errorOut(req.body.nameInput, theArr),
            successOut: errsucc.successOut(req.body.nameInput,theArr),
            errorOut:errsucc.errorLength(req.body.nameInput)
    
        })
    }
    const reset = async (req, res) => {
        await servicesFactory.reset()
        res.redirect("/")
    }

    const showAll = async (req,res)=>{
        res.render("index", {
            out: await servicesFactory.allTowns()
        })
    }

    const show = async (req, res) => {
        res.render("index", { out: await servicesFactory.getCAWY(req.body.rgBtn) })    
    }

    return {
        home, add,
        reset, show,
        showAll
    }

}