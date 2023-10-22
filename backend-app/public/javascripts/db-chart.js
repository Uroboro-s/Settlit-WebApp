console.log("JAI SHREE RAM");

function getOwedToYou() {
  const transactionsOwedtoYou_elements = document.querySelectorAll('.db-get-money');
  console.log(transactionsOwedtoYou_elements);
  let totalAmount = 0;

  transactionsOwedtoYou_elements.forEach(element => {
    console.log(element.textContent);
      totalAmount = totalAmount + parseInt(element.textContent);
  });
  console.log(totalAmount);
  return totalAmount;
}

function getOwedbyYou() {
  const transactionsOwedbyYou_elements = document.querySelectorAll('.db-give-money');
  console.log(transactionsOwedbyYou_elements);
  let totalAmount = 0;

  transactionsOwedbyYou_elements.forEach(element => {
    console.log(element.textContent);
      totalAmount = totalAmount + parseInt(element.textContent);
  });
  console.log(totalAmount);
  return totalAmount;
}

const ctx = document.getElementById('myChart');
      
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Red', 'Blue'],
            datasets: [{
              label: ['money '],
              data: [getOwedToYou(), getOwedbyYou()],
              borderWidth: 2
            }]
          },
          options: {
            scales: {
              
            }
          }
        });