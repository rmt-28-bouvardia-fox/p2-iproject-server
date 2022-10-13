const errorHandler = (error, req, res, next) => {
    let code = 500
    let message = "Internal Server Error"
    if(error.name == 'Arisan Already exists') {
        code = 400
        message = error.name
    } else if (error.name == 'Invalid token'){
        code = 401
        message = error.name
    } else if (error.name == "Insert the correct value /1 Year or /1 Month"){
        code = 401
        message = error.name
    } else if(error.name == "SequelizeForeignKeyConstraintError") {
       if(error.parent.detail == `Key (ArisanId)=(${error.id}) is not present in table "Arisans".`){
        code = 404
        message = "Arisan does not exist, Arisan Not found"
       }
    } else if(error.name === 'Location Needed') {
        code = 400
        message = error.name
    } else if( error.name === "The bill has been paid") {
        code = 400
        message = error.name
    } else if(error.name == "Log Transaction not found") {
        code = 404
        message = error.name
    }
    console.log(error)
    res.status(code).json({ErrMessage : message})
}
module.exports = errorHandler