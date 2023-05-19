import { RedoOutlined } from '@ant-design/icons';
import { Button, Input, Table } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useClasses } from '../../api/classes';
import useTextSearch, { useColumnProps } from "../../hooks/text-search.hook";
import "./class-management.scss";
import { MessageContext } from '../../state/message';

export interface IClass {
  internalName: string;
  displayedName: string;
}

interface IProps {
  token: string;
}

function ClassManagement(props: IProps) {
  const [Error, setError] = useState<string[]>([])
  const search = useTextSearch<IClass>();
  const internalNameProps = useColumnProps(search, 'internalName');
  const { msgAPI } = useContext(MessageContext)

  const { setLoading, updateClasses, classes, setClasses, Loading } = useClasses();

  const handleUpdateDisplayedName = (
    internalName: string,
    displayedName: string,
  ) => {
    if (classes?.[internalName] === displayedName)
      return;
    setLoading(true);
    axios
      .put(`/classes/${encodeURIComponent(internalName)}`, null, {
        params: {
          displayed_name: displayedName,
        },
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then(() => {
        msgAPI.success("Displayed name updated successfully");
        setError(state => state.filter(label => label !== internalName));
      })
      .catch((error) => {
        console.error(error);
        setError(state => [...state, internalName]);
        msgAPI.error("Displayed name update failed");
      })
      .finally(() => {
        setLoading(false);
        setClasses({ [internalName]: displayedName });
      });
  };
  const displayedNameProps = useColumnProps(search, 'displayedName', (node, [text, record]) => (
    <Input
      defaultValue={text}
      onBlur={(e) =>
        handleUpdateDisplayedName(record.internalName, e.target.value)
      }
      onPressEnter={(e) => handleUpdateDisplayedName(record.internalName, e.currentTarget.value)}
      status={Error.includes(record.internalName) ? 'error' : undefined}
    />
  ),);

  const columns = [
    {
      title: "Internal Name",
      dataIndex: "internalName",
      key: "internalName",
      ...internalNameProps,
    },
    {
      title: "Displayed Name",
      dataIndex: "displayedName",
      key: "displayedName",
      ...displayedNameProps,
    },
  ];

  const onUpdate = () => {
    if (!Loading) {
      updateClasses('Could not update classes', 'Updated classes successfully');
    }
  }

  return (
    <div className="class-management">
      <h1>Classes Management</h1>
      <hr />
      <Button
        className='reload-btn'
        type="dashed"
        onClick={onUpdate}
        icon={<RedoOutlined />}
        disabled={Loading}
      >Reload</Button>
      <div className="class-management-body">
        <Table
          dataSource={Object.entries(classes).map((label, i) => ({ internalName: label[0], displayedName: label[1], key: i }))}
          columns={columns}
          loading={Loading}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default ClassManagement;
