import { ChangeEvent, FormEvent, useReducer } from "react";
import { PaymentType } from "../../data/DataFunctions";

const NewTransaction = () : JSX.Element =>{

    const reducerFunction = 
    (state: PaymentType, data: {field: string, value:any}) => {
        return {...state, [data.field] : data.value}
    }

    // const [country, setCountry] = useState<String>("");
    // console.log(country);
    const handlesubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("saving " + country);
        console.log("saving object "+ newTransaction);
    }

    const initialNewTransactionState: PaymentType = {
        id : null,
        orderId: "ab56",
        date: new Date().toISOString().slice(0, 10),
        amount: 0,
        country: "USA",
        currency: "USD",
        taxCode: 0,
        taxRate: 0.21,
        type: "SALE",
      };
    

    const [newTransaction, dispatch] = useReducer(reducerFunction, initialNewTransactionState);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({field: e.target.id, value: e.target.value});
    }

    return (<form className="addTransactionsForm" onSubmit={handlesubmit}>
    <h2>New transaction</h2>
    <label htmlFor="orderId">Order Id</label>
    <input type="text" id="orderId" onChange={handleChange} value={newTransaction.orderId}/>
    <br/>
    <label htmlFor="date">Date</label>
    <input type="date" id="date" onChange={handleChange} value={newTransaction.date}/>
    <br/>
    <label htmlFor="country">Country</label>
    <input type="text"  id="country" onChange={handleChange} value={newTransaction.country} />
    <br/>
    <label htmlFor="currency">Currency</label>
    <input type="text"  id="currency" onChange={handleChange} value={newTransaction.currency}/>
    <br/>
    <label htmlFor="amount">Amount</label>
    <input type="text"  id="amount" onChange={handleChange} value={newTransaction.amount}/>
    <br/>
    <label htmlFor="taxCode">Tax Code</label>
    <input type="text"  id="taxCode" onChange={handleChange} value={newTransaction.taxCode}/>
    <br/>
    <label htmlFor="taxRate">Tax Rate</label>
    <input type="text"  id="taxRate" onChange={handleChange} value={newTransaction.taxRate}/>
    <br/>
    <label htmlFor="type">Type</label>
    <input type="text"  id="type" onChange={handleChange} value={newTransaction.type}/>
    <br/>
    <button type="submit">Save</button>
</form>
);
}

export default NewTransaction;