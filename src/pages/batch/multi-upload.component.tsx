import { InboxOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import React, { useContext } from 'react';
import { ResultsContext } from '../../state/results';
import { LabelledPDF } from '../../types/responses';
import './multiupload.scss';
import useMessage from 'antd/es/message/useMessage';


const MultiUpload: React.FC = () => {
    const { dispatch, state: { fileList } } = useContext(ResultsContext);
    const [msgAPI, messageContext] = useMessage();

    const props: UploadProps<LabelledPDF> = {
        action: `${import.meta.env.VITE_API_ENDPOINT}/active/proba/pdf`,
        name: 'file',
        multiple: true,
        defaultFileList: fileList,
        onChange({ file, fileList }) {
            const { response, name, uid, status, size } = file;
            if (status === 'uploading') {
                dispatch({ type: 'SET_UPLOAD_FLAG', busy: true });
                return;
            }
            if (status === 'removed') {
                dispatch({ type: 'SET_UPLOAD_FLAG', busy: fileList.some(file => file.status === 'uploading') });
                return;
            }
            if (response !== undefined && (status === 'success' || status === 'done')) {
                dispatch({
                    type: 'ADD_LABELLED_PDF',
                    file: { response, name, uid, status, size },
                    busy: fileList.some(file => file.status === 'uploading')
                })
                return;
            }
            if (status === 'error')
                dispatch({ type: 'SET_UPLOAD_FLAG', busy: false })
            else
                return;
            const err: unknown = file.error;
            if (err && typeof err === 'object' && 'status' in err && err.status === 400)
                msgAPI.error("Could not extract abstract from PDF file.");
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
            {messageContext}
            <Dragger {...props} className='dragger'>
                <div className='dragger-children'>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        {fileList.length ? "Please don't leave the page while your files still being uploaded" : ''}
                    </p>
                </div>
            </Dragger>
        </div>
    )
};

export default MultiUpload;