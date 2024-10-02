import axios from "axios";
import { useState , useEffect, useContext } from "react"; 
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { cartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { Helmet } from "react-helmet";




function Products() {


  const {addProductToCart} = useContext(cartContext);


  const [loading , setLoading] = useState(false);
  
  


  async function addProduct(id){

    setLoading(true)

    const res =  await addProductToCart(id);

    //console.log(res)

    if(res.status === "success"){
     //console.log(res.message);
     toast.success(res.message)


    }else{
      toast.error("Error Happend")
    }

    setLoading(false);

   }


     // handle opacity onClick
  
    // حالة لتتبع العنصر الذي تم النقر عليه
    const [clickedItem, setClickedItem] = useState(null);
  
    // دالة لتغيير الشفافية عند الضغط على عنصر
    const handleItemClick = (index) => {
      setClickedItem(index); // تحديث العنصر الذي تم النقر عليه
    }

  

  




  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const {data , isError , isFetching , isLoading , refetch } = useQuery("allProducts" , getAllProducts  /* , {
    refetchOnMount : true ,  
    refetchInterval : 2000 ,  // 2 seconds
    cacheTime: 24 * 60 * 60 * 1000 , // 1 day with milliseconds
    enabled : false , 
  }  */   ) ; 
  console.log (data?.data.data , isLoading);

  





  // const [allProducts , setAllProducts] = useState([]);

  // async function getAllProducts(){
  //   const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  //   console.log(data.data);
  //   setAllProducts(data.data);

  // }

  // useEffect(() => {
  //   getAllProducts();
  // } , [])

  if(isLoading === true){
    return <div className=" vh-100 d-flex justify-content-center align-items-center" >
    <ColorRing
    visible={true}
    height="100"
    width="100"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
    </div>
  }



  return <> 

<Helmet>
    <title>Products</title>
  </Helmet>

  <div className="container mt-5" >


    <HomeSlider />

    <CategorySlider />

   {/* <button onClick={refetch} className="btn btn-success w-100 mb-5">Get All Products..</button> */}

    <div className="row g-4 ">


     {data?.data.data.map((product , idx ) => {
    return <> <div key={ idx } className="element my-card col-lg-2 col-md-4 col-sm-12 gx-4"  >
          <div className="product">

          <Link to={`/products/${product.id}`} >
          <img className="w-100" src={product.imageCover} alt="Product" />
          <h6 className="main-color mt-2">{product.category.name}</h6>
          <h6 className="text-dark">{product.title.split(" ").slice(0 , 2 ).join(" ")}</h6>
          <div className="d-flex justify-content-between align-items-center">
          <p className="text-dark">{product.price} EGP</p>
          <p className="text-dark"> <span> <i className="fa-solid fa-star main-color "> </i> </span> {product.ratingsAverage} </p>
          </div>
          
           </Link>

        <button  onClick={()=> {
          handleItemClick(product);
          addProduct(product.id);
        } }  /* style={{
          transition: 'opacity 0.3s ease',
          opacity: clickedItem === product ? 0.5 : 1 // تغيير الشفافية بناءً على العنصر الذي تم النقر عليه
           // إضافة تأثير الانتقال لجعل التغيير سلسًا
        }} */ className="btn btn-success mt-1 mb-1 w-100 p-1 bg-color">
          {loading === true && clickedItem === product ?  <div className="d-flex justify-content-center align-items-center">
              <Bars
  height="30"
  width="30"
  color="#fff"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
            </div> : "+ Add To Cart" }
   </button>


        </div>


      </div>  

 </>
      
     })}

      

    </div>
  </div>

 
     



  {/* {allProducts.length === 0 ? <div className="vh-100 d-flex justify-content-center align-items-center" >
  <ColorRing
  visible={true}
  height="100"
  width="100"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
  </div> :  <div className="container mt-5" >
    <div className="row g-4 ">


     {allProducts.map((product ) => {
    return <>

  <div className="my-card col-lg-2 col-md-4 col-sm-12 gx-4" key={product.id} >
          <div className="product">
          <img className="w-100" src={product.imageCover} alt="Product" /> 
          <h6 className="main-color mt-2">{product.category.name}</h6>
          <h5>{product.title.split(" ").slice(0 , 2 ).join(" ")}</h5>
          <div className="d-flex justify-content-between align-items-center">
          <p>{product.price} EGP</p>
          <p> <span> <i className="fa-solid fa-star main-color "> </i> </span> {product.ratingsAverage} </p>
          </div>
          
        </div>
      </div>  

 </>
      
     })}

      

    </div>
  </div> } */}

 

  
  </>
}

export default Products;
