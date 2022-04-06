export const BUSINESS_ENTITY_STATUSES = [
    {
      title: 'Not Validated',
      value: 'not_validated'
    },
    {
      title: 'Validated',
      value: 'validated'
    },
    {
      title: 'Validation Failed KYC',
      value: 'validation_failed_kyc'
    },
    {
      title: 'Validation Failed OFAC',
      value: 'validation_failed_ofac'
    },
    {
      title: 'Validation Failed Credit',
      value: 'validation_failed_credit'
    },
    {
      title: 'Validation Failed KYC Credit',
      value: 'validation_failed_kyc_credit'
    }
];

const PAYMENT_PLANS = [
    {
      id: 'gdh5h5151515h2t',
      planName: 'Standart',
    },
    {
      id: 'sth31srth5h11trsh',
      planName: 'Low'
    },
    {
      id: '5f515v1515f5',
      planName: 'Max'
    }
];

const businessEntities = [
    {
      city: "Edmonton",
      createdAt: "2022-03-28T13:41:06Z",
      id: "51se5eg15ser153515es3rg",
      merchantId: "",
      name: "Alex Inc",
      planId: "gdh5h5151515h2t",
      state: "US-AK",
      status: "not_validated",
    },
    {
      city: "Camptown",
      createdAt: "2022-03-28T13:41:06Z",
      id: "srt3b881srt618618srt618t",
      merchantId: "",
      name: "Alex Inc 2",
      planId: "gdh5h5151515h2t",
      state: "US-AK",
      status: "validated",
    },
    {
      city: "Chicago",
      createdAt: "2022-03-28T13:41:06Z",
      id: "srth351srth15trh13",
      merchantId: "",
      name: "Mego Inc",
      planId: "5f515v1515f5",
      state: "US-AK",
      status: "validation_failed_ofac",
    },
    {
      city: "California",
      createdAt: "2022-03-28T13:41:06Z",
      id: "srth7htsr1trsh424212strh",
      merchantId: "",
      name: "Nick Inc",
      planId: "5f515v1515f5",
      state: "US-AK",
      status: "validated",
    },
];

const get = document.getElementById('get');
const clear = document.getElementById('clear');
const for_result = document.getElementById('for_result');

get.onclick = () => {

    for (let i = 0; i < businessEntities.length; i++) {
        const finish = document.createElement('div');
        const city = document.createElement('p');
        const name = document.createElement('p');
        const location = document.createElement('p');
        const id = document.createElement('p');
        const status = document.createElement('p');
        const payment = document.createElement('p');
        const searchStatus = BUSINESS_ENTITY_STATUSES.find(item => item.value === businessEntities[i].status).title;
        const searchPayment = PAYMENT_PLANS.find(item => item.id === businessEntities[i].planId).planName;

        finish.id = 'finish';
        city.innerText = 'City: ' + businessEntities[i].city;
        name.innerText = 'Name: ' + businessEntities[i].name;
        location.innerText = 'Location: ' + businessEntities[i].state;
        id.innerText = 'ID: ' + businessEntities[i].id;
        status.innerText = 'Status: ' + searchStatus;
        payment.innerText = 'Payment: ' + searchPayment;

        finish.append(name, location, city, id, status, payment);
        for_result.append(finish);
    }
}

clear.onclick = () => for_result.innerHTML = '';
