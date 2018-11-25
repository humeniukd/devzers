import React from 'react'


const BarChart = () => (

  <div style={{fontFamily: 'Roboto'}}>
    <h1>Hi, John Doe</h1>
    <div>Your financial patience score is: <span style={{color: 'green'}}>2 (VERY GOOD)</span></div>
    <h2>Summary</h2>
    <div>Your Financial Patience is keeping at the stable pace with current score as 2 (very good)! Seems that your financial
      behaviour tends to save, so we prepared special offers for you, so your money will keep working for you.
    </div>
    <a href={'#'}>Deposit Offer 1</a><br />
    <a href={'#'}>Deposit Offer 2</a><br />
    <a href={'#'}>Deposit Offer 3</a><br />
    <a href={'#'}>Deposit Offer 4</a><br />
    <h2>Details</h2>
    <div>
      Last month's total income: 14000 PLN<br /><br />
      Last month's spendings: 12000 PLN<br /><br />
      Last month' average daily spend-speed: 400 PLN<br /><br />
    </div>
    <img src={'/public/img/fps.jpg'} />
  </div>
)

export default BarChart
