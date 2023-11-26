import {useEffect, useState} from "react";

function Goods() {
    let [arr,setArr]=useState([])
    useEffect(() => {
        fetch('http://localhost:5000/goodsArray')
            .then(res=>res.json())
            .then(data => setArr(data))
    }, []);

    const addToBag=(obj)=>{
        fetch('http://localhost:5000/add-goodsArray',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(obj)
        })
            .then(res=>res.json())
            .then(data =>console.log(data))
    }

    if(arr.length===0){
        return <p className='download'>Download</p>
    }

    return (
        <div className="Goods">
            <ul className='goodsUlClass'>
                {arr.map((item)=>{
                    return(
                        <li>
                            <p>{item.product_name}</p>
                            <p>{item.product_description}</p>
                            <p>{item.product_price}</p>
                            <button id='goodsBtnId' onClick={()=>addToBag(item)}>Add</button>
                            <br/>--------------------------------------------------
                        </li>


                    )
                })

                }
            </ul>
        </div>
    );
}

export default Goods;