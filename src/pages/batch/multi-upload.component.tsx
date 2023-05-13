import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import React, { useContext } from 'react';
import { ResultsContext } from '../../state/results';
import { LabelledPDF } from '../../types/responses';
import './multiupload.scss';


const MultiUpload: React.FC = () => {
    const { dispatch } = useContext(ResultsContext);

    const props: UploadProps<LabelledPDF> = {
        name: 'file',
        multiple: true,
        onChange({ file }) {
            if (file.response && file.status === 'success') {
                dispatch({
                    labelledPDF: file.response,
                    type: 'ADD_LABELLED_PDF',
                    uid: file.uid
                })
            }
        },
        action: `${import.meta.env.VITE_API_ENDPOINT}/active/proba/pdf`,
        onRemove({ uid }) {
            dispatch({
                type: 'REMOVE_LABELLED_PDF',
                uid
            })
        },
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