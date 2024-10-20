import Step2 from "@/components/v2/step2"
import { Flex } from "@radix-ui/themes"
import { useState } from "react"
import Step1 from "@/components/v2/step1"
import Step0 from "@/components/v2/step0"
import Step3 from "@/components/v2/step3"
import Step4 from "@/components/v2/step4"
import Step5 from "@/components/v2/step5"
import Step6 from "@/components/v2/step6"

function LabelStep({step}){
    return(
        <div style={styles.titleStep}>
            <div style={step === 0 ? styles.stepActive : styles.step}>
                <p>Step 0:</p>
                <p>Lấy token</p>
            </div>
            <div style={step === 1 ? styles.stepActive : styles.step}>
                <p>Step 1:</p>
                <p>Chọn Folder data</p>
            </div>
            <div style={step === 2 ? styles.stepActive : styles.step}>
                <p>Step 2:</p>
                <p>Đồng bộ Đơn vị</p>
            </div>
            <div style={step === 3 ? styles.stepActive : styles.step}>
                <p>Step 3:</p>
                <p>Đồng bộ Danh mục văn bản</p>
            </div>
            <div style={step === 4 ? styles.stepActive : styles.step}>
                <p>Step 4:</p>
                <p>Đồng bộ người ký</p>
            </div>
            <div style={step === 5 ? styles.stepActive : styles.step}>
                <p>Step 5:</p>
                <p>Đồng bộ dữ liệu</p>
            </div>
            <div style={step === 6 ? styles.stepActive : styles.step}>
                <p>Step 6:</p>
                <p>Đẩy văn bản lên server</p>
            </div>
        </div>
    )
}


export default function IndexPage(){

    const [folderName,setFolderName] = useState("")
    const [step,setStep] = useState(0)

    return(
        <div style={{padding: 30, width: 1000}}>
            <LabelStep step={step} />
            {step === 0 && <Step0 setStep={setStep} />}
            {step === 1 && <Step1
                folderName={folderName} 
                setFolderName={setFolderName}
                setStep={setStep}
            />}

            {step === 2 && <Step2 folderName={folderName}  setStep={setStep} />}
            {step === 3 && <Step3 folderName={folderName}  setStep={setStep} />}
            {step === 4 && <Step4 folderName={folderName}  setStep={setStep} />}
            {step === 5 && <Step5 setStep={setStep} />}
            {step === 6 && <Step6 folderName={folderName} setStep={setStep} />}
        </div>
    )
}

const styles = {
    titleStep:{
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
        marginBottom: 30,
        paddingBottom: 30,
        borderBottom: '1px solid #eee'
    },
    step:{
        fontWeight: 400
    },
    title:{
        fontWeight: 700,
        marginBottom:10,
        fontSize: 20
    },
    stepActive: {
        fontWeight: 700, color: "#afaf00"
    },
    buttonAction: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '30px 0',
        minWidth: 500
    },
    btn:{
        cursor: 'pointer'
    }
}