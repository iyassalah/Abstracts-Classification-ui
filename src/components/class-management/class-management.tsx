import { RedoOutlined } from '@ant-design/icons';
import { Button, Input, Table } from "antd";
import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import { useEffect, useState } from "react";
import useTextSearch, { useColumnProps } from "../../hooks/text-search.hook";
import { IGetCLasses } from '../../types/responses';
import "./class-management.scss";

interface IClass {
  internalName: string;
  displayedName: string;
}

interface IProps {
  token: string;
}

function ClassManagement(props: IProps) {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState<string[]>([])
  const search = useTextSearch<IClass>();
  const internalNameProps = useColumnProps(search, 'internalName');
  const [msgAPI, messageContext] = useMessage();

  const updateClasses = () => {
    setLoading(true);
    axios.get<IGetCLasses>("/classes")
      .then((response) => {
        setClasses(response.data.classes);
      })
      .catch(err => {
        console.error(err);
        msgAPI.error('Could not retrieve classes');
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    updateClasses();
  }, []);

  const handleUpdateDisplayedName = (
    internalName: string,
    displayedName: string,
  ) => {
    if (classes.some(label => label.displayedName === displayedName && label.internalName === internalName))
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
        setClasses(state => state.map(
          (label) => label.internalName === internalName ? { ...label, displayedName: displayedName } : label)
        );
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

  return (
    <div className="class-management">
      {messageContext}
      <h1>Classes Management</h1>
      <hr />
      <Button
        className='reload-btn'
        type="dashed"
        onClick={loading ? undefined : updateClasses}
        icon={<RedoOutlined />}
      >Reload</Button>
      <div className="class-management-body">
        <Table
          dataSource={classes.map((label, i) => ({ ...label, key: i }))}
          columns={columns}
          loading={loading}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default ClassManagement;
