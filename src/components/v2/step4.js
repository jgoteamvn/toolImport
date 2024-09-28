import { Box, Button, Flex, Heading, Table } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import AgencyList from "./step2/list";
import { checkDistableBtn } from "./func";
import SignPersonList from "./step4/list";

export default function Step4({folderName,setStep}){

    const [loading,setLoading] = useState(false)
    const [signPerson,setSignPerson] = useState()

    const [action,setAction] = useState(0)

    const handleAction = async (api) => {
        setLoading(true)
        try {
            const request = await axios.post(`/api/v2/getSignPerson`, {folderName: folderName})
            setSignPerson(request.data)
        } catch (error) {
            console.log("🚀 ~ getSignPerson ~ error:", error)
        }

        setLoading(false)
    }

    return(
        <Flex direction={"column"} gap={"10"}>
            <Flex direction="row" gap="2" justify={"between"} align={"center"}>
                <Heading as="h5">Step4: Đồng bộ Người ký</Heading>
                <Flex direction={"row"} gap={"2"}>
                    <Button 
                        size={"1"} 
                        color="gray"
                        onClick={handleAction}
                        loading={loading}
                    >
                        Kiểm tra người ký mới
                    </Button>
                    {signPerson && signPerson?.length > 0 && 
                        <Button 
                            size={"1"} 
                            onClick={()=>setAction(action + 1)}
                            disabled={action === signPerson?.length + 1}
                        >
                            Đồng bộ
                        </Button>}
                </Flex>
            </Flex>
            <Box mt={"8"}>
                {signPerson && <SignPersonList 
                    signPerson={signPerson} 
                    action={action} 
                    setAction={setAction} 
                />}
            </Box>
            <Flex direction="row" gap="2" justify={"between"} align={"center"} mt={"8"}>
                <Button onClick={() => setStep(3)}>Pre Step</Button>
                <Button 
                    onClick={() => setStep(5)}
                    disabled={checkDistableBtn(signPerson,action)}
                >
                    Next Step
                </Button>
            </Flex>
        </Flex>
    )
}