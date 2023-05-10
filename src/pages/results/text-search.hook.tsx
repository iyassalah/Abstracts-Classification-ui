import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Modal, Space } from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

function useTextSearch<T extends { title?: string }>() {
  type DataIndex = keyof T;
  const [searchText, setSearchText] = useState<
    Partial<Record<DataIndex, string>>
  >({});

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText((search) => ({ ...search, [dataIndex]: selectedKeys[0] }));
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText({});
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
    ref: React.RefObject<InputRef>,
    // render?: ColumnType<T>['render']
  ): ColumnType<T> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={ref}
          placeholder={`Search ${String(dataIndex)}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys.map(String), confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys.map(String), confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((search) => ({
                ...search,
                [dataIndex]: (selectedKeys as string[])[0],
              }));
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      String(record[dataIndex])
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => ref.current?.select(), 100);
      }
    },
    render: (text, record) => (
      <a
        className="abstract"
        onClick={() =>
          Modal.info({
            title: record?.title ?? 'title',
            content: <p>{text}</p>,
            centered: true,
            maskClosable: true,
          })
        }
      >
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText[dataIndex] ?? ""]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      </a>
    ),
  });
  return { getColumnSearchProps, searchText };
}

export default useTextSearch;
