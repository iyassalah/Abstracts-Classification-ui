import React from 'react';
import './multiupload.scss'
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { LabelledPDF } from '../../types/responses';


const MultiUpload: React.FC = () => {
    const res: LabelledPDF[] = [];

    const props: UploadProps<LabelledPDF> = {
        name: 'file',
        multiple: true,
        onChange({ file }) {
            if (file?.response) {
                res.push(file.response);
                console.log(file.response);
            }
        },
        action: `${import.meta.env.VITE_API_ENDPOINT}/active/proba/pdf`,
    };
    return (
        <div className='multiupload-wrapper'>
            <Dragger {...props} className='dragger'>
                <div className='dragger-children'>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Hints
                    </p>
                </div>
            </Dragger>
        </div>
    )
};

export default MultiUpload;