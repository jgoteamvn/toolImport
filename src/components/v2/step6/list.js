import { Box, Flex, Progress, Table } from "@radix-ui/themes";
import { useState } from "react";
import { delayApi } from "../delay";
import { useEffect } from "react";
import axios from "axios";

function Item({item,index,folderName,action,setAction,stt,end,id,setLoadingData}){

    const [loading,setLoading] = useState("đang chờ")

    const handleAction = async () => {

        console.log({action,end})
        if(action == 0) return

        if(action > end) {
            console.log("im in")
            setLoadingData(false)
            return
        }

        if(action != stt) return

        setLoading("đang chạy")
        try {

            const request = await axios.post(`/api/v2/getDoc`,{
                rootDir: folderName,
                folderName: item,
                id: id
            })

            setLoading(request.data)
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
            <Table.Cell>{item}</Table.Cell>
            <Table.Cell>
                {loading}
            </Table.Cell>
        </Table.Row>
    )
}

function valueProgress(action,end){
    if(action > end) return 100
    return action / end * 1000
}

export default function ListFolder({datas,action,setAction,folderName,setLoadingData,end}){
    return(
        <Flex direction={"column"} gap={"3"} mt={"4"}>
            <Box>
                Dang chay: {action} - Ket thuc {end} - tong so {datas.length}
            </Box>
            <Box maxWidth="1000px">
                <Progress value={valueProgress(action,end)}/>
            </Box>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>STT</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>folder name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {datas?.map((item,key) => <Item 
                        item={item}
                        key={key}
                        index={key}
                        action={action} 
                        setAction={setAction}
                        end={end}
                        stt={key + 1} 
                        folderName={folderName}
                        id={key + 1}
                        setLoadingData={setLoadingData}
                    />)}
                </Table.Body>
            </Table.Root>
        </Flex>
    )
}