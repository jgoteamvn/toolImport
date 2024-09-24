import axios from "axios"
import { useState } from "react"

export default function Step1(){

    const [loading,setLoading] = useState("")

    const handleAction = async (api) => {
        setLoading(`đang tải ${api}`)
        try {
            const request = await axios.get(`/api/${api}`)
            console.log("🚀 ~ handleAgency ~ request:", request.data)
            setLoading(`Lấy thành công ${api}`)
        } catch (error) {
            console.log("🚀 ~ handleAgency ~ error:", error)
            setLoading("lỗi")
        }
    }

    return(
        <>
            <div><button onClick={()=>handleAction('getAgency')}>Đồng bộ Agency</button></div>
            <div><button onClick={()=>handleAction('getCategory')}>Đồng bộ category</button></div>
            <div><button onClick={()=>handleAction('getPerson')}>Đồng bộ sign person</button></div>

            {loading}
        </>
    )
}