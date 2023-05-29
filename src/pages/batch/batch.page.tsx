import { DeleteOutlined } from '@ant-design/icons';
import { Button, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBlock from "../../hooks/block.hook";
import useTextSearch, { useColumnProps } from "../../hooks/text-search.hook";
import { ResultsContext, UploadedPDF } from "../../state/results";
import "./batch.scss";
import MultiUpload from "./multi-upload.component";


const UploadStatus = ({ status, percent }: UploadedPDF) => {
  if (status === 'done' || status === 'success')
    return <span style={{ color: 'green' }}>Uploaded</span>;
  if (percent === 100 && status === 'uploading')
    return <span style={{ color: 'blue' }}>Processing</span>;
  if (status === 'uploading')
    return <span style={{ color: 'blue' }}>Uploading{percent ? `${percent}%` : ''}</span>;
  if (status === 'error')
    return <span style={{ color: 'red' }}>Error</span>
  return <span></span>;
}

const Batch = () => {
  const { state: { busy, fileList }, dispatch } = useContext(ResultsContext);
  const [filters, setFilters] = useState<Record<"status" | "name", FilterValue | null>>({ status: [], name: [] });
  useBlock(busy, 'Your files are still uploading, sure you want to leave?');
  const navigate = useNavigate();
  const textSearch = useTextSearch<UploadedPDF>();
  const nameProps = useColumnProps(textSearch, 'name');
  const statuses = ['done', 'error', 'success', 'uploading'] as const;

  const columns: ColumnsType<UploadedPDF> = [
    {
      title: 'File Name',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
      ...nameProps,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      sorter: (a, b) => (a?.size ?? -Infinity) - (b?.size ?? -Infinity),
      render: (text, record) => {
        const size = record?.size === undefined ? 'Unknown' : `${(record.size / 1024).toFixed(2)}KB`;
        return <span>{size}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filterMode: 'tree',
      filterSearch: true,
      filters: statuses.map(status => ({ text: status, value: status })),
      filteredValue: filters.status,
      onFilter: (value, { status }) => status === value,
      render: (text, file) => (
        <>
          <UploadStatus {...file} />
          <Button
            size='small'
            danger
            className='delete-btn'
            icon={<DeleteOutlined />}
            onClick={() => dispatch({
              type: 'REMOVE_LABELLED_PDF',
              uid: file.uid
            })}
          />
        </>
      ),
    },
  ];
  const disableBtn = busy || fileList.length === 0;
  const handleChange: TableProps<UploadedPDF>['onChange'] = (pagination, filters) => {
    setFilters(filters);
  };

  return (
    <div className="container">
      <div className="multi-upload-container">
        <div className="multi-upload">
          <MultiUpload>
            <div className="file-list-container" onClick={e => e.stopPropagation()}>
              <h2 className="text">Uploaded Files</h2>
              <Table
                className={fileList.length > 0 ? 'full-list' : ''}
                onChange={handleChange}
                columns={columns}
                dataSource={fileList.map((file, i) => ({ ...file, key: i }))}
                pagination={{ pageSize: 7 }}
              />
            </div>
          </MultiUpload>
          <div className="buttons">
            <Button className="results-btn" type="primary" size="large" disabled={disableBtn} onClick={() => navigate('/results')}>
              See Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Batch;
