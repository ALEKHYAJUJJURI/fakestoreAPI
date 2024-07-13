import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Ecommerce(){
    const [category,setCategory] = useState([])
    const [products,setProducts] = useState([])
   
    function getCategories(){
        axios.get('https://fakestoreapi.com/products/categories')
        .then(response=>{
            response.data.unshift('all')
            setCategory(response.data)
    })
    }
    function displayProducts(url){
    
        
        axios.get(url)
        .then(res=>
            setProducts(res.data)
        )
    }
    function categoryChangeFun(e){
        if(e.target.value==="all"){
            displayProducts('https://fakestoreapi.com/products')
        }
        else{
            displayProducts(`https://fakestoreapi.com/products/category/${e.target.value}`)
        }
    }
    function navButtonsClick(categoryName){
        if(categoryName === "all"){
            displayProducts('https://fakestoreapi.com/products')
        }
        else{
            displayProducts(`https://fakestoreapi.com/products/category/${categoryName}`)
        }

    }
    useEffect(()=>{
        getCategories()
        
        displayProducts('https://fakestoreapi.com/products')
    },[])

    return(
        <div className='d-flex flex-column'>
            <header className="bg-secondary p-3 text-white d-flex justify-content-between align-items-center">
                <div>
                    <h2>FakeStore</h2>
                </div>
                <div>
                    <span className='px-2 mx-2 btn btn-light' onClick={()=>navButtonsClick('all')} >Home</span>
                    <span className='px-2 mx-2 btn btn-light' onClick={()=>navButtonsClick('electronics')}>Electronics</span>
                    <span className='px-2 mx-2 btn btn-light' onClick={()=>navButtonsClick(`men's clothing`)}>Men's Fashion</span>
                    <span className='px-2 mx-2 btn btn-light' onClick={()=>navButtonsClick('jewelery')}>Jewellery</span>
                    <span className='px-2 mx-2 btn btn-light' onClick={()=>navButtonsClick(`women's clothing`)}>Women's Fashion</span>
                </div>
                <div>
                    <span><span className='bi bi-cart4 bg-warning p-2 rounded position-relative'>
                        <span className='bg-danger text-white rounded rounded-circle position-absolute px-1'>0</span>
                        </span>
                    </span>
                </div>
            </header>
            <main className='row m-3'>
                <div className='col-2'>
                    <label className='fs-5'>Select Category</label>
                <select className='rounded rounded-3 form-select' onChange={categoryChangeFun}>
                    {
                        category.map(cate=>
                            <option key={cate} value={cate} >{cate.toUpperCase()}</option>
                        )
                    }
                </select>
                </div>
                <div className='col-10 d-flex flex-wrap overflow-auto' style={{'height':'500px'}}>
                    {
                        products.map(item=>
                            <div className='card d-flex mx-2' key={item.id} style={{'width':'350px'}}>
                                
                                <img src={item.image} className='m-3' width={'120px'}/>
                                <div className='card-body' >
                                    <h5 className='py-2'>{item.title}</h5>
                                    <span className='bg-success text-white p-1 rounded'><span>{item.rating.rate} </span>
                                    <span className='bi bi-star-fill'></span></span>
                                    <span className='px-1'>({item.rating.count})</span>
                                    <div className='my-2 d-flex'>
                                        <div className='fs-5'>Price: </div> <div className='h4 mx-2'> {item.price.toLocaleString('en-us',{style:'currency',currency:'USD'})}</div>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <button className='btn btn-warning'>Add Cart</button>
                                    <button className='btn btn-info mx-1'>Buy Now</button>
                                </div>
                                    

                            </div>
                        )
                    }
                </div>
            </main>
        </div>
    )
}