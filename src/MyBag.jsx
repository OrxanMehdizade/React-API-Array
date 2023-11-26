import {useEffect, useState} from "react";

function MyBag() {
    let [arr,setArr]=useState([])
    let [flag,setFlag]=useState(false)

    const getData=()=>{
        fetch('http://localhost:5000/my-bag')
            .then(res=>res.json())
            .then(data => setArr(data))
    }

    useEffect(() => {
        getData();
    }, [flag]);

    const deleteFromBag=(id)=>{
        fetch(`http://localhost:5000/delete-MYBAG/${id}`,{
            method:'DELETE',
        })
            .then(res=>res.text())
            .then(data =>console.log(data))
        setFlag(!flag)
        getData();
    }
    return (
        <div className="MyBag">
            <ul className='mybagUlClass'>
                {arr.map((item)=>{
                    return(
                        <li>
                            <p>{item.product_name}</p>
                            <p>{item.product_description}</p>
                            <p>{item.product_price}</p>
                            <button id='mybagBtnId' onClick={()=>deleteFromBag(item.id)}>Delete</button>
                            <br/>--------------------------------------------------
                        </li>


                    )
                })

                }
            </ul>
        </div>
    );
}

export default MyBag;