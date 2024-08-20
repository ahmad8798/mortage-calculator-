const mortageForm = document.querySelector('#mortgageForm')
const rightCol = document.querySelector('.right-col')
mortageForm.addEventListener('submit',validateForm)
function validateForm(event) {
    event.preventDefault()
    let isValid = true;
  
    const inputGroupText = document.querySelectorAll('.input-group-text');
    const inputGroupElement = document.querySelectorAll('.input-group');
    
    // Get the form values
    const mortgageAmount = document.getElementById("mortgageAmount").value.trim();
    const mortgageTerm = document.getElementById("mortgageTerm").value.trim();
    const interestRate = document.getElementById("interestRate").value.trim();
    const mortgageType = document.querySelector("input[name='mortgageType']:checked");
  
    // Get the error elements
    const mortgageAmountError = document.getElementById("mortgageAmountError");
    const mortgageTermError = document.getElementById("mortgageTermError");
    const interestRateError = document.getElementById("interestRateError");
    const mortgageTypeError = document.getElementById("mortgageTypeError");
  
    // Clear previous error messages
    mortgageAmountError.textContent = "";
    mortgageTermError.textContent = "";
    interestRateError.textContent = "";
    mortgageTypeError.textContent = "";
  
    // Remove error classes if inputs are valid
    inputGroupText.forEach(el => {
        el.classList.remove('bg-danger', 'text-white');
    });
    // Add mb-3 class if input fields are valid
    inputGroupElement.forEach(el => {
        el.classList.add('mb-3');
    });
  
    // Validate Mortgage Amount
    if (mortgageAmount === "") {
        mortgageAmountError.textContent = "This field is required.";
        inputGroupText[0].classList.add('bg-danger', 'text-white');
        inputGroupElement[0].classList.remove('mb-3');
        isValid = false;
    } else if (isNaN(mortgageAmount) || parseFloat(mortgageAmount) <= 0) {
        mortgageAmountError.textContent = "Please enter a valid number.";
        inputGroupText[0].classList.add('bg-danger', 'text-white');
        inputGroupElement[0].classList.remove('mb-3');
        isValid = false;
    }
  
    // Validate Mortgage Term
    if (mortgageTerm === "") {
        mortgageTermError.textContent = "This field is required.";
        inputGroupText[1].classList.add('bg-danger', 'text-white');
        inputGroupElement[1].classList.remove('mb-3');
        isValid = false;
    } else if (isNaN(mortgageTerm) || parseInt(mortgageTerm) <= 0) {
        mortgageTermError.textContent = "Please enter a valid number.";
        inputGroupText[1].classList.add('bg-danger', 'text-white');
        inputGroupElement[1].classList.remove('mb-3');
        isValid = false;
    }
  
    // Validate Interest Rate
    if (interestRate === "") {
        interestRateError.textContent = "This field is required.";
        inputGroupText[2].classList.add('bg-danger', 'text-white');
        inputGroupElement[2].classList.remove('mb-3');
        isValid = false;
    } else if (isNaN(interestRate) || parseFloat(interestRate) <= 0) {
        interestRateError.textContent = "Please enter a valid number.";
        inputGroupText[2].classList.add('bg-danger', 'text-white');
        inputGroupElement[2].classList.remove('mb-3');
        isValid = false;
    }
  
    // Validate Mortgage Type
    if (!mortgageType) {
        mortgageTypeError.textContent = "Please select a mortgage type.";
        isValid = false;
    }
  
    if (isValid) {

        if(mortgageType.value=="Repayment"){
        rightCol.innerHTML = ''

        const principal = parseFloat(mortgageAmount);
        const annualInterestRate = parseFloat(interestRate) / 100;
        const numberOfPayments = parseInt(mortgageTerm) * 12;
        
        // Monthly interest rate
        const monthlyInterestRate = annualInterestRate / 12;
        
        // Monthly repayment calculation (using the formula for an amortizing loan)
        const monthlyRepayment = (principal * monthlyInterestRate) / 
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
            
        // Print the repayment value in the console
        console.log(`Monthly Repayment: $${monthlyRepayment.toFixed(2)}`);
            showResult(monthlyRepayment.toFixed(2),numberOfPayments,mortgageType.value)


        }else if(mortgageType.value=="Interest Only"){
            // Calculate the monthly interest payment
const principal = parseFloat(mortgageAmount);
const annualInterestRate = parseFloat(interestRate) / 100;
const numberOfPayments = parseInt(mortgageTerm) * 12;

// Monthly interest rate
const monthlyInterestRate = annualInterestRate / 12;

// Monthly interest payment calculation
const monthlyInterestPayment = principal * monthlyInterestRate;

// Print the monthly interest payment value in the console
console.log(`Monthly Interest Payment: $${monthlyInterestPayment.toFixed(2)}`);
showResult(monthlyInterestPayment.toFixed(2),numberOfPayments,mortgageType.value)
        }
        
        
    } 
  
    return isValid;
}
  
// Clear form function
function clearForm() {
    rightCol.innerHTML = ''
    document.getElementById("mortgageForm").reset();
    document.getElementById("mortgageAmountError").textContent = "";
    document.getElementById("mortgageTermError").textContent = "";
    document.getElementById("interestRateError").textContent = "";
    document.getElementById("mortgageTypeError").textContent = "";
  
    const inputGroupText = document.querySelectorAll('.input-group-text');
    inputGroupText.forEach(el => {
        el.classList.remove('bg-danger', 'text-white');
    });
    rightCol.innerHTML = `
     <div
            class="d-flex flex-column justify-content-center align-items-center h-100 text-center"
          >
            <div class="d-flex justify-content-center">
              <img
                width="150px"
                height="150px"
                src="./assets/images/illustration-empty.svg"
                alt="Empty illustration"
              />
            </div>
            <h5 class="text-white">Results shown here</h5>
            <p>
              Complete the form and click "Calculate repayments" to see what your monthly
              repayments would be.
            </p>
          </div>
    `

}


function showResult(payment,numerOfPayments,typeOfMortage){

    rightCol.innerHTML = `
         <div class="result">

            <h5 class="text-white">Your results</h5>
            <p>Your results are shown below based on the information you
              provided. to adjust the results,edit the form and click
              "calculate repayments" again
            </p>
              <div class="result-container">
                <p>Your monthly ${typeOfMortage=="Repayment"?"Repayment":"Interest"}</p>
                <h1>$${payment}</h1>
                <hr>
                <p>Total You'll repay over the Term</p>
                <h5>$${(payment*numerOfPayments).toFixed(2)}</h5>
              </div>
          </div>
    `

}