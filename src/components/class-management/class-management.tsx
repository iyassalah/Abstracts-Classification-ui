import { useContext, useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { AuthContext } from "../../state/reducer";

interface IClass {
  internalName: string;
  displayedName: string;
}

function ClassManagement() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios.get("/classes").then((response) => {
      setClasses(response.data.classes);
    });
  }, []);

  const handleUpdateDisplayedName = (
    internalName: string,
    displayedName: string,
  ) => {
    axios
      .put(`/classes/${internalName}`, { displayedName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        message.success("Displayed name updated successfully");
      })
      .catch((error) => {
        console.error(error);
        message.error("Displayed name update failed");
      });
  };
  

  return (
    <div className="class-management">
      <h1>Classes Management</h1>
      <hr />
      <div className="class-management-body">
        {classes.map((c) => (
          <div key={c.internalName} className="class-management-item">
            <Form layout="inline">
              <Form.Item label="Internal Name">{c.internalName}</Form.Item>
              <Form.Item label="Displayed Name">
                <Input
                  defaultValue={c.displayedName}
                  onBlur={(e) =>
                    handleUpdateDisplayedName(c.internalName, e.target.value)
                  }
                />
              </Form.Item>
            </Form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassManagement;
