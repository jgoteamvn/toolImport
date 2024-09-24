import axios from "axios"
import { format } from "date-fns"
import { useState } from "react"

function formatDateInsu(text){
    try {
        return format(formatDate(text),'yyyy-MM-dd')
    } catch (error) {
        const year = text.slice(text.length - 4)
        return `01/01/${year}`
    }
}

export default function DebugPage(){

    const [loading,setLoading] = useState("")
    const [content,setContent] = useState()

    const handleCLick = async () => {
        // setLoading("đang chạy")
        // try {
        //     const request = await axios.post(`/api/getDoc`,{
        //         folderName: "1_149983_263613",
        //         id: 1
        //     })
        //     console.log("🚀 ~ handleCLick ~ request:", request?.data)
        //     setLoading("Thành công")
        //     setContent(request?.data?.content)
        // } catch (error) {
        //     setLoading("lỗi rồi")
        // }

        console.log(formatDateInsu("Năm 2023"))
    }

    return(
        <>
            <button onClick={handleCLick} style={{padding: 20}}>
                click đi chờ gì
            </button>
            <div>
                {loading}
            </div>
            <div><div dangerouslySetInnerHTML={{__html: content}}></div></div>
        </>
    )
}