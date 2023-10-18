console.log("JAI SHREE RAM");

const ctx = document.getElementById('myChart');
      
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Red', 'Blue'],
            datasets: [{
              label: ['money '],
              data: [12, 19],
              borderWidth: 2
            }]
          },
          options: {
            scales: {
              
            }
          }
        });