import React, { useContext } from 'react';
import './multiupload.scss'
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { LabelledPDF } from '../../types/responses';
import { ResultsContext } from '../../state/results';


const MultiUpload: React.FC = () => {
    const res: LabelledPDF[] = [];
    const { dispatch } = useContext(ResultsContext);

    const props: UploadProps<LabelledPDF> = {
        name: 'file',
        multiple: true,
        onChange({ file: { response } }) {
            if (response) {
                res.push(response);
                console.log(response);
                dispatch({
                    labelledPDF: response,
                    type: 'ADD_LABELLED_PDF',
                })
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