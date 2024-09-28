import { Button, Flex, Heading } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";

export default function Step0({setStep}){

    const [loading,setLoading] = useState(false)

    const handleAction = async () => {
        setLoading(true)
        await axios.post('/api/v2/getToken')
        setStep(1)
        setLoading(false)
    }

    return(
        <Flex direction={"column"} gap={"10"}>

            <Flex direction="row" gap="2" justify={"between"} align={"center"} mb={"3"}>
                <Heading as="h5">Step0: Lấy token</Heading>
                <Flex direction={"row"} gap={"2"}>
                    <Button 
                        size={"1"} 
                        color="gray"
                        onClick={handleAction}
                        loading={loading}
                    >
                        Lấy token mới
                    </Button>
                </Flex>
            </Flex>


            <Flex direction="row" gap="2" justify={"between"} align={"center"} mt={"8"}>
                <Button onClick={() => setStep(1)}>Next Step</Button>
            </Flex>
        </Flex>
    )
}