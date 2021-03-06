'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// const getMessage = function (val) {
//   console.log(val);
// };

// movements.forEach((movement, i, arr)=> {
//   console.log(movement, i, arr);
//   // e > 0 ? getMessage(`Deposit of ${e}`) : getMessage(`You Withdrew ${Math.abs(e)}`);
// });

// Challenge 1 ////////////////////////////////////////////////////
// Julia [3, 5, 2, 12, 7]
// Kate [4, 1, 15, 8, 3]
// Julia [9, 16, 6, 8, 3]
// Kate [10, 5, 6, 1, 4]

// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// const checkDogs = (arr1, arr2) => {
//   const dogsJuliaCopy = [...arr1].slice(1, 3);
//   const combined = dogsJuliaCopy.concat(arr2);
  
//   combined.forEach((c, i) => {
//     console.log(c >= 3 ? `Dog ${i + 1} is an Adult, and is ${c} years old` : `Dog ${i + 1} is still a puppy`)
//   });
// };


// checkDogs(dogsJulia, dogsKate);

//////////////////////////////////////////////////////////////////

const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';
  
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; 

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);

  });
};

// displayMovements(account1.movements);

const user = 'Steven Thomas Williams';
const createUsernames = accs => accs.forEach(acc => acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join(''));

createUsernames(accounts);
// console.log(accounts);

const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);

const deposits = movements.filter(mov => mov > 0);

// console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);

// console.log(withdrawals);

const balance = movements.reduce((acc, curr) => acc + curr, 0);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); 
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate/100).filter((int, i, arr) => int >= 1).reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

// calcDisplaySummary(account1.movements);

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if(currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    //Clear input
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    
    updateUI(currentAccount);
  }
});


btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);


  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && currentAccount.balance >= amount && receiverAcc && receiverAcc?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }


});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  
  if(currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +(inputClosePin.value)) {
      const index = accounts.findIndex(acc => acc.username === currentAccount.username);
      accounts.splice(index, 1);

      containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, sorted = !sorted);
});

const updateUI = function(acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// labelBalance.addEventListener('click', function() {
//   [...document.querySelectorAll('.movements__row')].forEach(function(row, i) {
//     if(!(i % 2)) {
//       row.style.backgroundColor = 'orangeRed';
//     }
//     if(!(i % 3)) {
//       row.style.backgroundColor = 'blue';
//     }
//    });
// });


// Max value

const getMaxValue = movements => movements.reduce((acc, mov) => acc > mov ? acc : mov);

// console.log(getMaxValue(account1.movements));

const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

//////////////////////////////////////////////////////////////
// Challenge 2

// const testData1 = [5, 2, 4, 1, 15, 8, 3];
// const testData2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function(ages) {
//   const calcHumanAge = ages.map((dogAge) => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4);

//   const excludeLess18Yrs = calcHumanAge.filter(hAge => hAge >= 18);

//   return excludeLess18Yrs.reduce((acc, age) => acc + age, 0) / excludeLess18Yrs.length;

  
// };

// const result = calcAverageHumanAge(testData1);
// console.log(result);

/////////////////////////////////////////////////////////////

// Code Challenge 3

// const calcAverageHumanAge = ages => ages.map(age => age <= 2 ? 2 * age : 16 + age * 4).filter(hAge => hAge >= 18).reduce((acc, age, i, arr) => acc + age / arr.length, 0);


// console.log(calcAverageHumanAge(testData1));
//////////////////////////////////////////////////////////////

const rand = Array.from({ length: 100}, () => Math.trunc(Math.random() * 6) + 1);

console.log(rand);