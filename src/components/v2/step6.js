import { Box, Button, Flex, Heading, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import ListFolder from "./step6/list";

export default function Step6({folderName,setStep,start,end}){
    const [loading,setLoading] = useState(false)

    const [datas,setDatas] = useState()

    const [action,setAction] = useState(0)

    const [enable,setEnable] = useState(false)

    const [loadingData,setLoadingData] = useState(false)

    const handleAction = async () => {
        try {
            const request = await axios.post('/api/v2/getFolder', {folderName: folderName})
            let result = []
            request.data.map((item,key) => {
                if(+start > key + 1) return
                if(+end < key + 1) return
                result.push(item)
            })
            setDatas(result)
            setEnable(true)
          } catch (error) {
            console.log("🚀 ~ handleClick ~ error:", error?.response?.data)
          }
    }

    const handleStart = () => {
        setAction(1)
        setLoadingData(true)
    }

    return(
        <Flex direction={"column"} gap={"10"}>
            <Flex direction="row" gap="2" justify={"between"} align={"center"}>
                <Heading as="h5">Step6: Đẩy văn bản lên server</Heading>
                <Flex direction={"row"} gap={"2"}>
                    <Button
                        size={"2"} 
                        color="gray"
                        onClick={handleAction}
                        loading={loading}
                    >
                        Lấy danh sách văn bản
                    </Button>
                    {enable && 
                        <Button 
                            size={"2"} 
                            onClick={handleStart}
                            disabled={loadingData}
                            loading={loadingData}
                        >
                            Đồng bộ
                        </Button>
                    }
                </Flex>
            </Flex>

            <ListFolder 
                datas={datas} 
                action={action} 
                setAction={setAction} 
                folderName={folderName}
                setLoadingData={setLoadingData}
                end={end}
            />

            <Flex direction="row" gap="2" justify={"between"} align={"center"} mt={"8"}>
                <Button onClick={() => setStep(5)}>Pre Step</Button>
            </Flex>
        </Flex>
    )
}