import BaseUrl from "../Api/BaseUrl";

    const UseDeleteData=async(url,parmas)=>{
        const config={
            headers: {
    
                Authorization: `Bearer ${localStorage.getItem("token")}` 
              
              }
        }
        
    const res=await BaseUrl.delete(url,config)
    return res.data;
       
}
