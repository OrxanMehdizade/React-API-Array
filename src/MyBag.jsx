import {useEffect, useState} from "react";
import {Spin} from "antd";
function MyBag() {
    let [arr,setArr]=useState([])
    let [flag,setFlag]=useState(false)
    let [editOk,setEditOk]=useState(false)
    let [dataCheck,setDataCheck]=useState('')
    const [loading, setLoading] = useState(true);

    const getData=()=>{
        fetch('http://localhost:5000/my-bag')
            .then(res=>res.json())
            .then(data => {
                setLoading(false)
                setArr(data)
            }).catch(()=>setLoading(true))
    }

    useEffect(() => {
        getData();
    }, [flag]);

    const deleteFromBag=(id)=>{
        fetch(`http://localhost:5000/delete-MYBAG/${id}`,{
            method:'DELETE',
        })
            .then(res=>res.text())
            .then(data =>setDataCheck(data))
        setFlag(!flag)
        getData();
    }


    if (loading) {

        return <Spin />;

    }

    if(arr.length===0) {

        setLoading(true)
    }

    return (
        <div>
            <div className="MyBag">
                <ul className='mybagUlClass'>
                    {arr.map((item)=>{
                        return(
                            <li>
                                <p>{item.product_name}</p>
                                <p>{item.product_description}</p>
                                <p>{item.product_price}</p>
                                <button id='mybagBtnId' onClick={()=> {
                                    setEditOk(true)
                                    deleteFromBag(item.id)
                                }}>Delete</button>
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

export default MyBag;