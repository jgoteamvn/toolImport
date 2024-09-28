import { Button, Flex, Heading } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import ListFolder from "./step6/list";

export default function Step6({folderName,setStep}){
    const [loading,setLoading] = useState(false)

    const [datas,setDatas] = useState()

    const [action,setAction] = useState(0)

    const [enable,setEnable] = useState(false)

    const [loadingData,setLoadingData] = useState(false)

    const handleAction = async () => {
        try {
            const request = await axios.post('/api/v2/getFolder', {folderName: folderName})
            setDatas(request.data)
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
                        size={"1"} 
                        color="gray"
                        onClick={handleAction}
                        loading={loading}
                    >
                        Lấy danh sách văn bản
                    </Button>
                    {enable && 
                        <Button 
                            size={"1"} 
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
            />

            <Flex direction="row" gap="2" justify={"between"} align={"center"} mt={"8"}>
                <Button onClick={() => setStep(5)}>Pre Step</Button>
            </Flex>
        </Flex>
    )
}