const formeter = new Intl.NumberFormat('en-US', 
{ style: 'currency', 
  currency: 'INR'
  });


const currencyFormeter =(number) =>{
    if(typeof number !== "number"){
        return "invalid Input"
    }
    return formeter.format(number)
}

export default currencyFormeter;