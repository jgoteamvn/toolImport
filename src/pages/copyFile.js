import { Box, Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";

export default function CopyFilePage(){

    const [loading,setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {folderName: ""},
        onSubmit: async (values) => {
            setLoading(true)
            try {
                await axios.post('/api/v2/copyFile', {
                    folderName: values.folderName
                })
            } catch (error) {
                console.log("🚀 ~ onSubmit: ~ error:", error)
            }
            setLoading(false)
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <TextField.Root
                name="folderName"
                id="folderName"
                value={formik.values.folderName}
                onChange={formik.handleChange}
                required
            />
            <Button type="submit" onClick={formik.handleSubmit} loading={loading}>Copy File</Button>
        </form>
    )
}