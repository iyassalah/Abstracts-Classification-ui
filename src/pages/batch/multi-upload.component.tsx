import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';


const MultiUpload: React.FC = () => {
    const fileList: File[] = []; // assume this is an array of PDF files to send

    const socket = new WebSocket('ws://localhost:8000/ws'); // replace with your server URL

    // Handle WebSocket connection events
    socket.onopen = () => {
        console.log('WebSocket connection opened');

        // Loop through the fileList and send each file
        for (let i = 0; i < fileList.length; i++) {
            const fileReader = new FileReader();
            const file = fileList[i];

            fileReader.readAsArrayBuffer(file);

            // Handle file reading events
            fileReader.onload = () => {
                const binary = fileReader.result;
                if (!binary)
                    return;
                socket.send(binary);
            };

            fileReader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
        }
    };

    const props: UploadProps = {
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        },
        customRequest(data) {
            socket.send(data.file);
        }
    };

    socket.onmessage = (event) => {
        console.log('Received message from server:', event.data);
    };

    socket.onclose = (event) => {
        console.log('WebSocket connection closed with code:', event.code);
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
    )
};

export default MultiUpload;