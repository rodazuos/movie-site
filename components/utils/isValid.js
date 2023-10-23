const checkRestValue = (rest) => {
    if ((rest == 10) || (rest == 11)) {
        return 0;
    }
    return rest;
}

const cpfIsvalid = (cpf) => {
    var sumValues;
    var rest;
    
    cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf.length != 11) {
        return false;	
    } 

    if (cpf == "00000000000") {
        return false;
    }

    sumValues = 0;
    for (var i = 1; i <= 9; i++) {
        sumValues = sumValues + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    rest = checkRestValue((sumValues * 10) % 11);

    if (rest != parseInt(cpf.substring(9, 10))) {
        return false;
    }
    
    sumValues = 0;
    for (var i = 1; i <= 10; i++) {
        sumValues = sumValues + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    rest = checkRestValue((sumValues * 10) % 11);
    if (rest != parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

module.exports = {
    cpfIsvalid
}