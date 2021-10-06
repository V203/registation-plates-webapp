exports.Routes = Routes;

const Errsucc = require("./errsucc")
const errsucc = Errsucc();

const { application } = require("express");
const servicesFactory = require("./servicesFactory");

 function Routes(servicesFactory){
     

    const home = async (req, res) => {
        
        res.render("index", {            
            out: await servicesFactory.allTowns()                      
        })
        
    }

    const add = async (req, res) => {
        let addReg = errsucc.cleanPar(req.body.nameInput)
        console.log(addReg);
        let theArr = await servicesFactory.allTowns()    
        res.render("index", {
            successOut:await servicesFactory.add(addReg,theArr),
            out: await servicesFactory.allTowns(),
            errorOut:errsucc.errorOut(addReg)            
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