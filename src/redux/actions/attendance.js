import axios from  'axios'

export const markAttendance=(details)=>async(dispatch)=>{
    try{
        let fd=new FormData();   
        for(var it in details)
          fd.append(it,details[it])
          for(var i=0;i<details.images.length;i++)
            fd.append(`image${i}`,details.images[i])
        const {data}= await axios.post('/attendance/addAttendance',(fd))
        console.log(data)
        return null
      }catch (error) {
          const errorStr=error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          return errorStr
        }
}
export const seeAttendance=(details)=>async(dispatch)=>{
  try{
      const {data}= await axios.get('/class/addClass',{params:details})
      console.log(data)
      return {...data,success:true}
    }catch (error) {
        const errorStr=error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        return {err:errorStr,success:false}
      }
}