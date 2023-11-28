import axios from "axios";
import { createContext, useEffect, useState} from "react";


export const cartContext= createContext()



export function CartContextProvider({children}){
    const [cartProduct, setCartProduct] = useState(null);
const [numOfCartItems, setNumOfCartItems] = useState(0);
const [totalCartPrice, setTotalCartPrice] = useState(0);
const [cartId, setCartId] = useState(null);


// add products....
   async function addProductToCart(productId){
   try{
    const{data}=   await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{"productId":productId},{
        headers :{token : localStorage.getItem('tok')}

    });

    getUserCart();
   
    // setNumOfCartItems(data.numOfCartItems);
    // setTotalCartPrice(data.data.totalCartPrice);
    // setCartProduct(data.data.cartProduct);
    return data;
   }
   catch(e){
    console.log('error' ,e);
   }

    }

    // add product to cart.....
    async function getUserCart(){
       try {
        const{data}= await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:{
                token:localStorage.getItem('tok'),
            }
        });
        setCartProduct(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartId(data.data._id);

        
       } catch (e) {
        console.log('error' , e);

       }

    }


    // remove product form cartContext....
    async function deleteProduct(productId){
        try {
           const{data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
               headers:{
                   token : localStorage.getItem('tok')
               }
           })
           setCartProduct(data.data.products);
           setNumOfCartItems(data.numOfCartItems);
           setTotalCartPrice(data.data.totalCartPrice);

           return {data};
   
   
           
        } catch (error) {
           console.log('error' ,error);
           
        }
       }

    useEffect(function(){
        getUserCart();

    } ,[]);


    // update in product (+1), (-1) ....
    async function getUpdateProduct(productId,count){
    try {
        const{data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            'count':count
        },{
            headers:{
                token:localStorage.getItem('tok')
            }
        })
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProduct(data.data.products);

          return data;
    }
        
    catch (error) {
        console.log('error' , error);
        
    }
}


// clear all data form cart....

async function clearCartData(){
    try {
     const{data}= await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
         headers:{
             token:localStorage.getItem('tok'),
         }
     });
     setCartProduct([]);
     setNumOfCartItems(0);
     setTotalCartPrice(0);
     
    } catch (e) {
     console.log('error' , e);

    }

 }








    return<cartContext.Provider value={{addProductToCart ,
        getUserCart,
        deleteProduct,
        cartProduct ,
        totalCartPrice ,
        numOfCartItems,
        getUpdateProduct,
        clearCartData ,
    cartId,
    setCartProduct,
    setNumOfCartItems,
    setTotalCartPrice

}}>
    {children}
    </cartContext.Provider>
}
