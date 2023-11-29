import {useEffect, useState} from "react";
import {Spin} from "antd";

function Goods() {
    let [arr,setArr]=useState([])
    let [editOk,setEditOk]=useState(false)
    let [dataCheck,setDataCheck]=useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/goodsArray')
            .then(res=>res.json())
            .then(data => {
                setLoading(false)
                setArr(data)
            }).catch(()=>setLoading(true))
    }, []);

    const addToBag=(obj)=>{
        fetch('http://localhost:5000/add-goodsArray',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(obj)
        })
            .then(res=>res.text())
            .then(data =>setDataCheck(data))
    }

    if (loading) {

        return <Spin />;

    }

    return (
       <div>
           <div className="Goods">
               <ul className='goodsUlClass'>
                   {arr.map((item)=>{
                       return(
                           <li>
                               <p>{item.product_name}</p>
                               <p>{item.product_description}</p>
                               <p>{item.product_price}</p>
                               <button id='goodsBtnId' onClick={()=> {
                                   setEditOk(true)
                                   addToBag(item)
                               }}>Add</button>
                               <br/>--------------------------------------------------
                           </li>


                       )
                   })

                   }
               </ul>
           </div>
           {editOk && <div className='editCheck'>
               <div>
                   <p>{dataCheck}</p>
                   <button onClick={()=> {
                       setEditOk(false)
                   }}>Exit</button>
               </div>
           </div>
           }
       </div>
    );
}

export default Goods;