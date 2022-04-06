import React, { useEffect, useState } from "react";
import "./App.css";
function Test() {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [input, setInput] = useState("");
    function show(e) {
        // console.log(input);
        const arr = data.filter((item) =>
            item.customer.toLowerCase().includes(e.target.value.toLowerCase())
        );
        // console.log(arr);
        setData1(arr);
    }
    
    const filter = (ele) => {
        // console.log(ele.target.value);
        const filter = data.filter((el) => el.status === ele.target.value);
        setData1(filter);
        // console.log(filter);
    };
    useEffect(() => {
        fetch(" https://my-json-server.typicode.com/Ved-X/assignment/orders").then(
            (result) => {
                result.json().then((resp) => {
                    const sortedCars1 = resp.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()));
                    // arrSort = arrSort.sort((a, b) => (a.date) - (b.date));
                    console.log(sortedCars1);
                    setData(sortedCars1);
                    setData1(sortedCars1);

                });
            }
        );

    }, []);
    // console.log(data);
    const option = [
        { value: "--filter--", label: null, disabled: true },
        { value: "Delivered", label: "Delivered", disabled: false },
        { value: "Prepared", label: "Prepared", disabled: false },
        { value: "Completed", label: "Completed", disabled: false },
    ];
    return (
        <div className="App">
            <div className="SearchFilter">
                <input type="search" onChange={show} className="search" placeholder="Ask me a name" />
                <select defaultValue="--filter--" onChange={filter} className="select" >
                    {option.map((el) => (
                        <option disabled={el.disabled}>{el.value}</option>
                    ))}
                </select>
            </div>
            <hr />
            <table className="Table" >
                <thead>
                    <tr className="Heading">
                        <td>order_id</td>
                        <td>customer</td>
                        <td>address</td>
                        <td>product_title</td>
                        <td>Date Order</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {data1.map((item, ind) => (
                        <tr key={ind}>
                            <td >{item.order_id}</td>
                            <td>{item.customer}</td>
                            <td>{item.address}</td>
                            <td>{item.product_title}</td>
                            <td>{item.date}</td>
                            <td>{item.status}</td>
                        </tr>

                    ))}
                </tbody>
                {/* <button onClick={dateSort}> sort</button> */}
            </table>
        </div>
    );
}
export default Test;
