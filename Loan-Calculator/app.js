document.getElementById('loan-form').addEventListener('submit',function(e) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateLoanPayment,2000);
    e.preventDefault();
});


function calculateLoanPayment() {
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = (parseFloat(interest.value) / 100) /12;
    const calculatedPayments = parseFloat(years.value) *12 ;

    console.log("Principal ->" + principal + " calculated interest ->"+calculatedInterest+" calculated Payments ->"+calculatedPayments);

    const x = Math.pow(1+calculatedInterest,calculatedPayments);
    const monthly = (principal *x*calculatedInterest)/(x-1);
    const totalAmount = principal*(1+ (calculatedInterest*calculatedPayments));
    
    console.log("Monthly Payment ->"+monthly+" Total Amount ->"+totalAmount);
    console.log(isFinite(monthly))

    if(isFinite(monthly)) {
        console.log("Monthly Payment ->"+monthly.toFixed(2)+" Total Payment ->"+((monthly*calculatedPayments)*12).toFixed(2))
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value =  ((monthly * calculatedPayments)-principal).toFixed(2);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
    } else {
        showError("Please check your inputs")
    }
}

function showError(error) {
    
    const errorDiv =  document.createElement('div');
    errorDiv.className='alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    card.insertBefore(errorDiv,heading);
    setTimeout(function() {
        document.querySelector('.alert').remove();
    },3000);

    
    
}