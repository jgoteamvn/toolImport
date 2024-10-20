import { Box, Button, Flex, Heading, Table } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import AgencyList from "./step2/list";
import { checkDistableBtn } from "./func";

export default function Step2({folderName,setStep,start,end}){

    const [loading1,setLoading1] = useState(false)
    const [agencies,setAgencies] = useState()

    const [action,setAction] = useState(0)

    const handleAction = async (api) => {
        setLoading1(true)
        try {
            const request = await axios.post(`/api/v2/getAgency`, {
                folderName: folderName,
                start,end
            })
            setAgencies(request.data)
        } catch (error) {
            console.log("🚀 ~ handleAgency ~ error:", error)
        }

        setLoading1(false)
    }

    return(
        <Flex direction={"column"} gap={"10"}>
            <Flex direction="row" gap="2" justify={"between"} align={"center"}>
                <Heading as="h5">Step2: Đồng bộ Đơn vị</Heading>
                <Flex direction={"row"} gap={"2"}>
                    <Button 
                        size={"1"} 
                        color="gray"
                        onClick={handleAction}
                        loading={loading1}
                    >
                        Kiểm tra đơn vị mới
                    </Button>
                    {agencies && agencies?.length > 0 && 
                        <Button 
                            size={"1"} 
                            onClick={()=>setAction(action + 1)}
                            disabled={action === agencies?.length + 1}
                        >
                            Đồng bộ
                        </Button>}
                </Flex>
            </Flex>
            <Box mt={"8"}>
                {agencies && <AgencyList 
                    agencies={agencies} 
                    action={action} 
                    setAction={setAction} 
                />}
            </Box>
            <Flex direction="row" gap="2" justify={"between"} align={"center"} mt={"8"}>
                <Button onClick={() => setStep(1)}>Pre Step</Button>
                <Button 
                    onClick={() => setStep(3)}
                    // disabled={checkDistableBtn(agencies,action)}
                >
                    Next Step
                </Button>
            </Flex>
        </Flex>
    )
}