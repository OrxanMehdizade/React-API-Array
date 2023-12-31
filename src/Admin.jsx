import {useEffect, useState} from "react";
import {Spin} from "antd";

function Admin() {
    let [arr,setArr]=useState([])
    let [price,setPrice]=useState(null)
    let [showModal,setShowModal]=useState(false)
    let [flag,setFlag]=useState(false)
    let [changeObject,setChangeObject]=useState({})
    const [searchValue, setSearchValue] = useState("");
    let [editOk,setEditOk]=useState(false)
    let [dataCheck,setDataCheck]=useState('')
    const [loading, setLoading] = useState(true);
    const getData=()=>{
        fetch('http://localhost:5000/goodsArray')
            .then(res=>res.json())
            .then(data => {
                setLoading(false)
                setArr(data)
            })
            .catch(()=>setLoading(true))
    }

    const getSearch=()=>{
        fetch(`http://localhost:5000/search-goods/${searchValue}`)
            .then(res => res.json())
            .then(data => setArr(data))
    }

    useEffect(() => {
        getData();
        getSearch()

    }, [flag]);

    const changeOfPrice=()=>{
        let obj={...changeObject,'product_price':parseInt(price)}
        fetch(`http://localhost:5000/change-goodsArray/${changeObject.id}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(obj)
        })
            .then(res=>res.text())
            .then(data =>setDataCheck(data))
    }





    const deleteGoodsArray=(obj)=>{
        fetch(`http://localhost:5000/delete-goodsArray/${obj.id}`,{
            method:'DELETE',
        })
            .then(res=>res.text())
            .then(data =>setDataCheck(data))
        setFlag(!flag)
    }


    if (loading) {

        return <Spin />;

    }

    if(arr.length===0) {

        setLoading(true)
    }
    return (
        <div>
            <div className="Admin">
                <input id='searchInput'
                       type="text"
                       placeholder="Search goods..."
                       value={searchValue}
                       onChange={(e) => {
                           setSearchValue(e.target.value)
                           setFlag(!flag)
                       }}
                />
                <ul className='adminUlClass'>
                    {arr.map((item)=>{
                        return(
                            <li key={item.id}>
                                <p>{item.product_name}</p>
                                <p>{item.product_description}</p>
                                <p>{item.product_price}</p>
                                <button id='adminEditBtn' onClick={()=> {
                                    setChangeObject(item)
                                    setShowModal(true)
                                }}>Edit</button>
                                <button id='adminDelBtn' onClick={()=> {
                                    deleteGoodsArray(item)
                                    setEditOk(true)
                                }}>Delete</button>
                                <br/>--------------------------------------------------
                            </li>


                        )
                    })

                    }
                </ul>
            </div>
            { showModal && <div className='editWindow'>
                <div>
                    <input onChange={(event)=>setPrice(event.target.value)} type='number'/>
                    <button onClick={()=> {
                        setShowModal(false)
                        setFlag(!flag)
                        changeOfPrice()
                        setEditOk(true)
                    }}>Edit</button>
                </div>
            </div>
            }
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

export default Admin;