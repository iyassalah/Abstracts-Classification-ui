import { useEffect, useState } from "react";
import { Input, message, Table } from "antd";
import axios from "axios";
import { IGetCLasses } from '../../types/responses';
import "./class-management.scss";
import useTextSearch from "../../hooks/text-search.hook";
import { useColumnProps } from "../../hooks/text-search.hook";

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
  const search = useTextSearch<IClass>();
  const internalNameProps = useColumnProps(search, 'internalName');

  useEffect(() => {
    setLoading(true);
    axios.get<IGetCLasses>("/classes")
      .then((response) => {
        setClasses(response.data.classes);
      })
      .finally(() => setLoading(false));
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
        message.success("Displayed name updated successfully");
      })
      .catch((error) => {
        console.error(error);
        message.error("Displayed name update failed");
      })
      .finally(() => setLoading(false));
  };
  const displayedNameProps = useColumnProps(search, 'displayedName', (node, [text, record]) => (
    <Input
      defaultValue={text}
      onBlur={(e) =>
        handleUpdateDisplayedName(record.internalName, e.target.value)
      }
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
      <h1>Classes Management</h1>
      <hr />
      <div className="class-management-body">
        <Table
          dataSource={classes}
          columns={columns}
          loading={loading}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default ClassManagement;
