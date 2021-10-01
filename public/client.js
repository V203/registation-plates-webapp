var errorDiv = document.querySelector(".error_out");

var successDiv = document.querySelector(".confirm_out");

if (errorDiv.innerHTML !== '') {
    errorDiv.style.visibility = "visible"
    
    
    setTimeout(function(){
        errorDiv.style.visibility = "hidden"
    }, 3500)}

    if (successDiv.innerHTML !== '') {
        successDiv.style.visibility = "visible"
        setTimeout(function(){
            successDiv.style.visibility = "hidden"
        }, 3500)}