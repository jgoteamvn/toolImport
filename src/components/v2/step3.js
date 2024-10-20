import { Box, Button, Flex, Heading, Table } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import ListCategory from "./step3/list";
import { checkDistableBtn } from "./func";

export default function Step3({folderName,setStep,start,end}){

    const [loading,setLoading] = useState(false)
    const [categories,setCategories] = useState()

    const [action,setAction] = useState(0)

    const handleAction = async () => {
        setLoading(true)
        try {
            const request = await axios.post(`/api/v2/getCategory`, {
                folderName,start,end
            })
            setCategories(request.data)
        } catch (error) {
            console.log("🚀 ~ handleAgency ~ error:", error)
        }

        setLoading(false)
    }

    return(
        <Flex direction={"column"} gap={"10"}>
            <Flex direction="row" gap="2" justify={"between"} align={"center"}>
                <Heading as="h5">Step3: Đồng bộ danh mục tài liệu</Heading>
                <Flex direction={"row"} gap={"2"}>
                    <Button 
                        size={"1"} 
                        color="gray"
                        onClick={handleAction}
                        loading={loading}
                    >
                        Kiểm tra danh mục tài liệu mới
                    </Button>

                    {categories && categories?.length > 0 && 
                        <Button 
                            size={"1"} 
                            onClick={()=>setAction(action + 1)}
                            // disabled={action === categories?.length + 1}
                        >
                            Đồng bộ
                        </Button>}
                </Flex>
            </Flex>

            <Box mt={"8"}>
                {categories && <ListCategory 
                        categories={categories}
                        action={action} 
                        setAction={setAction} 
                    />
                }
            </Box>

            <Flex direction="row" gap="2" justify={"between"} align={"center"} mt={"8"}>
                <Button onClick={() => setStep(2)}>Pre Step</Button>
                <Button 
                    onClick={() => setStep(4)}
                    // disabled={checkDistableBtn(categories,action)}
                >
                    Next Step
                </Button>
            </Flex>
        </Flex>
    )
}