//Action Creators
const newBooking = (pName, amount) => {
  return {
    type: "NEW_BOOKING",
    payload: {
      pName: pName,
      amount: amount,
    },
  };
};

const cancelBooking = (pName, refundAmount) => {
  return {
    type: "CANCEL_BOOKING",
    payload: {
      pName: pName,
      refundAmount: refundAmount,
    },
  };
};

//Reducers
const reservationHistory = (oldReservationList=[], action) => {
    if(action.type === "NEW_BOOKING") {
        return [...oldReservationList, action.payload];
    } else if(action.type === "CANCEL_BOOKING") {
        return oldReservationList.filter(record => {
            return record.pName !== action.payload.pName;
        });
    }
    return oldReservationList;
}

const cancellationHistory = (oldCancellationList=[], action) => {
    if(action.type === "CANCEL_BOOKING") {
        return [...oldCancellationList, action.payload];
    }
    return oldCancellationList;
}

const accounting = (totalMoney=0, action) => {
    if(action.type === "NEW_BOOKING") {
        return totalMoney+action.payload.amount;
    } else if(action.type === "CANCEL_BOOKING") {
        return totalMoney-action.payload.refundAmount;
    }
    return totalMoney;
}

//Redux Store
const {createStore, combineReducers} = Redux;
const railwayCentralStore = combineReducers({
    reservationHistory: reservationHistory,
    cancellationHistory: cancellationHistory,
    accounting: accounting
});
const store = createStore(railwayCentralStore);

//Commands to use the Redux Store
store.dispatch(newBooking("Aarush", 20));
store.dispatch(newBooking("Ravi", 10));
store.dispatch(newBooking("Rekha", 50));
store.dispatch(cancelBooking("Rekha", 30));
console.log(store.getState());
