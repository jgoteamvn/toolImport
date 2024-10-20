import axios from "axios"
import { useState } from "react"

export default function Step1(){

    const [loading,setLoading] = useState("")
    const [data,setData] = useState([])

    const handleAction = async (api) => {
        setData()
        setLoading(`đang tải ${api}`)
        try {
            const request = await axios.get(`/api/new/${api}`)
            setLoading(`Lấy thành công ${api}`)
            setData(request.data)
        } catch (error) {
            console.log("🚀 ~ handleAgency ~ error:", error)
            setLoading("lỗi")
        }
    }

    const handleWrite = async() => {
        setData()
        setLoading(`đang tải`)
        try {
            await axios.get(`/api/new/writeJson`)
            setLoading(`Lấy thành công`)
        } catch (error) {
            console.log("🚀 ~ handleWrite ~ error:", error)
            setLoading("lỗi")
        }
    }

    return(
        <>
            <div><button onClick={()=>handleAction('getAgency')}>Đồng bộ Agency</button></div>
            <div><button onClick={()=>handleAction('getCategory')}>Đồng bộ category</button></div>
            <div><button onClick={()=>handleAction('getPerson')}>Đồng bộ sign person</button></div>
            <div><button onClick={handleWrite}>Ghi file Jgon</button></div>
            {loading}
            <div>
                {data?.map((item,key) => <p key={key}>{item.name}</p>)}
            </div>
        </>
    )
}