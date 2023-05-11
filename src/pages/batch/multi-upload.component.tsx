import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';
import Dragger from 'antd/es/upload/Dragger';


const MultiUpload: React.FC = () => {
    const fileList: (string | Blob | RcFile)[] = [];

    const uploadBatch = () => {
        const form = new FormData();
        fileList.filter(Boolean).forEach(file => form.append(`files`, file));
        axios.post('/active/proba/pdfs', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }

    const props: UploadProps = {
        name: 'files',
        multiple: true,
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        },
        customRequest(data) {
            fileList.push(data.file);
            setTimeout(uploadBatch, 1000);
        },
    };
    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
            </p>
        </Dragger>
    )
};

export default MultiUpload;