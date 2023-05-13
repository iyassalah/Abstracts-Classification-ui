import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import React, { useContext } from 'react';
import { ResultsContext } from '../../state/results';
import { LabelledPDF } from '../../types/responses';
import './multiupload.scss';


const MultiUpload: React.FC = () => {
    const { dispatch, state: { fileList } } = useContext(ResultsContext);

    const props: UploadProps<LabelledPDF> = {
        action: `${import.meta.env.VITE_API_ENDPOINT}/active/proba/pdf`,
        name: 'file',
        multiple: true,
        defaultFileList: fileList,
        onChange({ file }) {
            if (file.response && (file.status === 'success' || file.status === 'done')) {
                dispatch({
                    type: 'ADD_LABELLED_PDF',
                    uid: file.uid,
                    file,
                })
            }
        },
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