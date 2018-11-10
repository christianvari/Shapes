function checkName(){

    if(document.myForm.inputName.value.length < 4){
        window.alert("You must provide a name at least 4 character long")
        return false;
    }
    return true;




}