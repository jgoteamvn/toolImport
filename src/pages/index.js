import { useState } from "react"

function LabelStep({step}){
    return(
        <div style={styles.titleStep}>
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

function Step1({folderName,setFolderName,setStep}){
    return(
        <div>
            <p style={{marginBottom:10}}>Step1: Nhập tên folder data</p>
            <input
                name="folderName"
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Nhập tên foler"
                style={{
                    minWidth: 300
                }}
            />
            <div style={styles.buttonAction}>
                <buton onClick={() => setStep(2)}>Next Step</buton>
            </div>
        </div>
    )
}

function Step2({folderName,setStep}){

}

export default function IndexPage(){

    const [folderName,setFolderName] = useState("")
    const [step,setStep] = useState(1)

    return(
        <div style={{padding: 30, width: 1000}}>
            <LabelStep step={step} />
            <Step1 
                folderName={folderName} 
                setFolderName={setFolderName}
                setStep={setStep}
            />
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
    stepActive: {
        fontWeight: 700, color: "yellow"
    },
    buttonAction: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '30px 0',
        minWidth: 500
    }
}