import { Table } from "@radix-ui/themes"
import { useEffect } from "react"
import { delayApi } from "../delay"
import { useState } from "react"
import axios from "axios"

function Item({item,index,action,setAction,end}){

    const [loading,setLoading] = useState("đang đồng bộ")

    const handleAction = async () => {
        if(action == 0) return
        if(action != index + 1) return
        if(action > end) return

        setLoading("đang chạy")

        try {
            // tạo agency mới
            await axios.post('/api/v2/createAgency', {name: item?.name})
            setLoading("Thành công")
        } catch (error) {
            console.log("🚀 ~ handleAction ~ error:", error)
            setLoading("lỗi rồi")
        }

        await delayApi(500)
        setAction(action + 1)
    }

    useEffect(()=>{
        handleAction()
    },[action])

    return(
        <Table.Row>
            <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
            <Table.Cell>{item?.name}</Table.Cell>
            <Table.Cell>
                {loading}
            </Table.Cell>
        </Table.Row>
    )
}

export default function AgencyList({agencies,action,setAction}){
    if(agencies.length < 1) return <p>Không có Nơi ban hành nào mới</p>

    return(
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>STT</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Nơi ban hành</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {agencies?.map((item,key) => <Item 
                    key={key} 
                    item={item} 
                    index={key}
                    action={action}
                    setAction={setAction}
                    end={agencies.length}
                />)}
            </Table.Body>
        </Table.Root>
    )
}