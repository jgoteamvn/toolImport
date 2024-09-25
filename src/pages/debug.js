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