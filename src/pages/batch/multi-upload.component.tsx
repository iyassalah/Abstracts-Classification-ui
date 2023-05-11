import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';


const MultiUpload: React.FC = () => {
    const fileList: (string | Blob | RcFile)[] = [];

    const uploadBatch = () => {
        const form = new FormData();
        fileList.filter(Boolean).forEach(file => form.append(`files`, file));
        axios.post('/active/proba/pdfs', form, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    const props: UploadProps = {
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        },
        customRequest(data) {
            if (fileList.length === 0)
                setTimeout(uploadBatch, 1000);
            fileList.push(data.file);
        }
    };
    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
    )
};

export default MultiUpload;