import { Button, Flex, Heading, TextField } from "@radix-ui/themes";

export default function Step1({folderName,setFolderName,setStep}){
    return(
        <Flex direction={"column"} gap={"10"}>

            <Flex direction="row" gap="2" justify={"between"} align={"center"} mb={"3"}>
                <Heading as="h5">Step1: Nhập tên folder data</Heading>
                <Flex direction={"row"} gap={"2"}>

                </Flex>
            </Flex>

            <TextField.Root
                name="folderName"
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Nhập tên foler"
            />

            <Flex direction="row" gap="2" justify={"between"} align={"center"} mt={"8"}>
                <Button onClick={() => setStep(0)}>Pre Step</Button>
                <Button 
                    onClick={() => setStep(2)}
                    disabled={!folderName}
                >
                    Next Step
                </Button>
            </Flex>
        </Flex>
    )
}