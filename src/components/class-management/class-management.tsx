import { useContext, useEffect, useState } from "react";
import { Input, message, Table } from "antd";
import axios from "axios";
import { AuthContext } from "../../state/reducer";
import { IGetCLasses } from '../../types/responses';
import "./class-management.scss";

interface IClass {
  internalName: string;
  displayedName: string;
}

function ClassManagement() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios.get<IGetCLasses>("/classes")
    .then((response) => {
        console.log(response.data.classes)
        setClasses(response.data.classes);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateDisplayedName = (
    internalName: string,
    displayedName: string,
    token: string
  ) => {
    setLoading(true);
    axios
      .put(`/classes/${encodeURIComponent(internalName)}`, null, {
        params: {
          displayed_name: displayedName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
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

  const columns = [
    {
      title: "Internal Name",
      dataIndex: "internalName",
      key: "internalName",
    },
    {
      title: "Displayed Name",
      dataIndex: "displayedName",
      key: "displayedName",
      render: (text: string, record: IClass) => (
        <Input
          defaultValue={text}
          onBlur={(e) =>
            handleUpdateDisplayedName(record.internalName, e.target.value, token)
          }
        />
      ),
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
