import React, { createContext, useEffect, useState } from 'react';

import axios from "axios";



export const cartContext = createContext();

export function CartContextProvider({children}){

    const [cartProducts , setCartProducts] = useState(null);
    const [totalCartPrice , setTotalCartPrice] = useState(0);
    const [numOfCartItems , setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState();



  async function addProductToCart(productId){
       
    try{

            const { data } =await axios.post("https://ecommerce.routemisr.com/api/v1/cart" , {
                "productId" : productId ,
            } , {
                headers : { token : localStorage.getItem("userToken") } 
            })

             
            
                
                getUserCart();
           
            // setNumOfCartItems(data.numOfCartItems);
            // setTotalCartPrice(data.data.totalCartPrice);
           // setCartProducts(data.data.products);

            return data ;

        } catch( error){
            console.log("error" , error);
        }


    }


   async function getUserCart(){

       try {
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
            headers : {
                 token : localStorage.getItem("userToken") 
                }
        } )

        setCartProducts(data.data.products);
        setTotalCartPrice(data.data.totalCartPrice);
        setNumOfCartItems(data.numOfCartItems);
        setCartId(data.cartId);
        

       }  catch (error) {
        console.log("error" , error);
       }

    }

   // console.log("id of cart is : " , cartId);


    async function deleteProductFromCart(productId) {

        try {
            const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
                headers : { token : localStorage.getItem("userToken")}
            })

            setCartProducts(data.data.products);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);


            return data;


        } catch (error) {
            console.log("error" , error)
        }
        
    }


    async function updateCount(productId , count) {
       
        try {
            const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
                "count" : count 
            } , {
                headers : {token : localStorage.getItem("userToken")}
            })

            setCartProducts(data.data.products);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);

            console.log("my data" , data)

            return data;

        } catch (error) {
            console.log("error" , error);
            
        }
    }

    async function clearCartData(){

        try {
          await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" , {
             headers : {
                  token : localStorage.getItem("userToken") 
                 }
         } )
 
         setCartProducts([]);
         setTotalCartPrice(0);
         setNumOfCartItems(0);
 
        }  catch (error) {
         console.log("error" , error);
        }
 
     }


    useEffect (() => {
        getUserCart();
    } , [])

    return <cartContext.Provider value={ { addProductToCart , getUserCart , deleteProductFromCart , updateCount , clearCartData , 
     cartProducts , totalCartPrice , numOfCartItems , cartId  } }>

      {children}

    </cartContext.Provider>
}


// import React, { createContext, useContext } from 'react';
// import axios from 'axios';

// // إنشاء الـ context
// export const cartContext = createContext();

// export function CartContextProvider({ children }) {
  
//   // دالة لإضافة منتج إلى السلة
//   async function addProductToCart(productId) {
//     try {
//       const { data } = await axios.post(
//         'https://ecommerce.routemisr.com/api/v1/cart',
//         {
//           productId: productId,
//         },
//         {
//           headers: { token: localStorage.getItem('token') },
//         }
//       );

//       console.log(data);
//       return data;
//     } catch (error) {
//       console.log('error', error);
//     }
//   }

//   // تمرير الدوال عبر الـ context
//   return (
//     <cartContext.Provider value={{ addProductToCart }}>
//       {children}
//     </cartContext.Provider>
//   );
// }


