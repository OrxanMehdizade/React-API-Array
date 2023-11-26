import {useEffect, useState} from "react";

function Admin() {
    let [arr,setArr]=useState([])
    let [price,setPrice]=useState(null)// inputan gələn dəyəri bu state yazırıq
    let [showModal,setShowModal]=useState(false)//editWindow pencərəsini açıb bağlamaq üçün yazdıqımız state
    let [flag,setFlag]=useState(false)
    let [changeObject,setChangeObject]=useState({})//edite clickledimiz zaman obyektin bura yaziriq
    const [searchValue, setSearchValue] = useState("");
    const getData=()=>{
        fetch('http://localhost:5000/goodsArray')
            .then(res=>res.json())
            .then(data => setArr(data))
    }

    const getSearch=()=>{
        fetch(`http://localhost:5000/search-goods/${searchValue}`)
            .then(res => res.json())
            .then(data => setArr(data))
    }

    useEffect(() => {
        getData();
        getSearch()

    }, [searchValue,flag]);

    const changeOfPrice=()=>{
        let obj={...changeObject,'product_price':parseInt(price)}
        fetch(`http://localhost:5000/change-goodsArray/${changeObject.id}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(obj)
        })
            .then(res=>res.json())
            .then(data =>console.log(data))
    }





    const deleteGoodsArray=(obj)=>{
        fetch(`http://localhost:5000/delete-goodsArray/${obj.id}`,{
            method:'DELETE',
        })
            .then(res=>res.text())
            .then(data =>console.log(data))
        setFlag(!flag)
    }


    if(arr.length===0){
        return <p className='download'>Download</p>
    }

    return (
        <div className="Admin">
            <input id='searchInput'
                type="text"
                placeholder="Search goods..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
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
                            <button id='adminDelBtn' onClick={()=>deleteGoodsArray(item)}>Delete</button>
                            <br/>--------------------------------------------------
                        </li>


                    )
                })

                }
            </ul>
            { showModal && <div className='editWindow'>
                    <div>
                        <input onChange={(event)=>setPrice(event.target.value)} type='number'/>
                        <button onClick={()=> {
                            setShowModal(false)
                            setFlag(!flag)
                            changeOfPrice()
                        }}>Edit</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Admin;