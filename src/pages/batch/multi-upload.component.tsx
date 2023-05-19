import { Button, UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useContext } from 'react';
import { MessageContext } from '../../state/message';
import { ResultsContext } from '../../state/results';
import { LabelledPDF } from '../../types/responses';
import './multiupload.scss';
import { UploadOutlined } from '@ant-design/icons';

interface IProps {
    children: JSX.Element;
}

const MultiUpload = ({ children }: IProps) => {
    const { dispatch, state: { fileList } } = useContext(ResultsContext);
    const { msgAPI } = useContext(MessageContext);

    const props: UploadProps<LabelledPDF> = {
        // openFileDialogOnClick: false,
        action: `${import.meta.env.VITE_API_ENDPOINT}/active/proba/pdf`,
        name: 'file',
        multiple: true,
        defaultFileList: fileList,
        accept: '.pdf',
        onChange({ file, fileList }) {
            const { response, name, uid, status, size, percent } = file;
            const err: unknown = file.error;
            switch (status) {
                case undefined:
                    if (err && typeof err === 'object' && 'status' in err && err.status === 400)
                        msgAPI.error("Could not extract abstract from PDF file.");
                    return;
                case 'done':
                case 'success':
                    if (!response)
                        return;
                    dispatch({
                        type: 'SET_LABELLED_PDF',
                        file: { response, name, uid, status, size },
                        busy: fileList.some(file => file.status === 'uploading')
                    })
                    return;
                case 'error':
                    dispatch({ type: 'SET_UPLOAD_FLAG', busy: false })
                    return;
                case 'removed':
                    dispatch({ type: 'SET_UPLOAD_FLAG', busy: fileList.some(file => file.status === 'uploading') });
                    return;
                case 'uploading':
                    if (percent && percent === 100 && response) {
                        const filteredFile = { name, uid, status, size, percent, response };
                        dispatch({ type: 'SET_LABELLED_PDF', busy: true, file: filteredFile });
                        return;
                    }
                    dispatch({ type: 'SET_UPLOAD_FLAG', busy: true });
                    return;
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
                {/* <div className='dragger-children'>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        {fileList.length ? "Please don't leave the page while your files still being uploaded" : ''}
                    </p>
                </div> */}
                {children}
                <p className='hint'>Drag a PDF file into this table to upload it, or click here to open a file picker</p>
                <Button icon={<UploadOutlined />} />
            </Dragger>
        </div>
    )
};

export default MultiUpload;