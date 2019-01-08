'use strict';

//list of bars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4



//--------------------------
var events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
   'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price':1 ,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 5,
  'time': 6,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price':1 ,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

//get the index of the coresponding barId
events[0].price=2;
function getIndexBar(bars,event ){
  var result =-1;
  for(var i=0;i<bars.length;i++){
    if(event.barId===bars[i].id) {
      return i;
    } 
  }
  
}

//takes the reduction coefficient in function of the number of people
function decreasePricePerPerson(event){
  var result=1;
  if(event.persons>60){
    result=0.5;
  }else if(event.persons>20){
    result=0.7;
  }else if(event.persons>10){
    result=0.9;
  }
  return result;
}

//all price calculs are here (step 1 & 2)
function updatePrice(){
  
	for (var i=0;i<events.length;i++){
    var indexBar = getIndexBar(bars,events[i]);
    var decreasePersonPriceCoeff=decreasePricePerPerson(events[i]);
    events[i].price=events[i].time*bars[indexBar].pricePerHour+events[i].persons*bars[indexBar].pricePerPerson*decreasePersonPriceCoeff;
		}
}

//all commissions updates are here (step 3)
function updateCommision(){
  for(var i=0;i<events.length;i++){
    var commission=0.3*events[i].price;
    events[i].commission.insurance=commission/2;
    events[i].commission.treasury=events[i].persons;
    events[i].commission.privateaser=commission-events[i].commission.insurance-events[i].commission.treasury;
  }
}

//if the booker subscribes to the deductible option
function deductiblePrice(){
  for(var i=0;i<events.length;i++)
  {
    
    if(events[i].options.deductibleReduction){
      events[i].price +=events[i].persons;
    }
  }
}


updatePrice();
deductiblePrice();
updateCommision();

console.log(bars);
console.log(events);
console.log(actors);