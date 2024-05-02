import { ChangeEvent, useEffect, useState } from 'react';
import { PaymentType, getCountries, getPaymentsForCountry } from '../../data/DataFunctions';
import PaymentTableRow from './PaymentTableRow';
import './transactions.css';
import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';

const Transactions = () => {
    
    const [uniqueCountries, setuniqueCountries] = useState<string[]>([]);
    const [payments, setPayments] = useState<PaymentType[]>([]); 
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCountry , setSelectedCountry] = useState<string>(searchParams.get("country")||"");

    

    //get list of companies on first render
    useEffect(() => {

        const countiresPromise: Promise<AxiosResponse<string[]>> = getCountries();
        countiresPromise
            .then(result =>{
                result.status === 200 ? setuniqueCountries(result.data.sort()):console.log("something went wrong" + result.status); 
            }).catch(error => {
                console.log("something happened" + error);
        })
        
    }, []);

    //get payments for the selected country

    
    useEffect( () => {
        //get the payments for the selected country
   if (selectedCountry !== "") {
       const paymentsPromise : Promise<AxiosResponse<PaymentType[]>> = 
           getPaymentsForCountry(selectedCountry);
       paymentsPromise
           .then ( result => {
               if (result.status === 200) {
                   setPayments(result.data)
               }
               else {
                   console.log("something went wrong")
               }
           })
       //don't forget to do .catch
       }
   }, [selectedCountry])
     
    // const countires : string [] = payments.map((payment) => payment.country);
    // const uniqueCountries : string[] = 
    //     countries.filter((country, index) => countries.indexOf(country) === index);
    // const uniqueCountries : string[] = Array.from(new Set(countires));
    const countryOptions : JSX.Element[] = 
    uniqueCountries
        .map(c => <option key={c} value={c}>{c}</option>);

    const changeCountry = (e : ChangeEvent<HTMLSelectElement>) => {
        const option = e.target.value;
        setSelectedCountry(option);
        setSearchParams({country: option});
    }

    const countrySelector : JSX.Element = 
    <select id="countrySelector" onChange={changeCountry} value={selectedCountry}>
        <option value="" disabled={true}>--select--</option>
        {countryOptions}
    </select>;

    return (<>
        <div className="transactionsCountrySelector">
            {uniqueCountries.length > 0 && <div>Select country: {countrySelector}</div> }
            {uniqueCountries.length === 0 && <p>Please Wait.. </p>}
        </div>
      <table className="transactionsTable">
          <thead>
                <tr><th>Id</th><th>Date</th><th>Country</th><th>Currency</th><th>Amount</th><th>orderId</th></tr>
          </thead>
          <tbody>
            {/* <ul> */}
            {payments
            .filter( payment => payment.country === selectedCountry)
            .map((payments) =><PaymentTableRow key={payments.id} {...payments}/>)}
            {/* </ul> */}
          </tbody>
      </table>
      </>
    );
}

export default Transactions