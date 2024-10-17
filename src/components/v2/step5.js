import { Button, Flex, Heading } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";

export default function Step5({setStep}){
    const [loading,setLoading] = useState(false)

    const handleAction = async () => {
        setLoading(true)
        try {
            await axios.get(`/api/v2/writeJson`)
            setStep(6)
        } catch (error) {
            console.log("🚀 ~ handleWrite ~ error:", error)
        }
        setLoading(false)
    }

    return(
        <Flex direction={"column"} gap={"10"}>
            <Flex direction="row" gap="2" justify={"between"} align={"center"}>
                <Heading as="h5">Step5: Đồng bộ Dữ liệu online</Heading>
                <Flex direction={"row"} gap={"2"}>
                    <Button
                        size={"1"} 
                        color="gray"
                        onClick={handleAction}
                        loading={loading}
                    >
                        Đồng bộ
                    </Button>
                </Flex>
            </Flex>

            <Flex direction="row" gap="2" justify={"between"} align={"center"} mt={"8"}>
                <Button onClick={() => setStep(4)}>Pre Step</Button>
                <Button 
                    // disabled={true}
                    onClick={() => setStep(6)}
                >
                    Next Step
                </Button>
            </Flex>
        </Flex>
    )
}