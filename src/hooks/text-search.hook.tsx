import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space } from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
/**
 * Returns a function that returns the props to be passed to a column to give it text search
 */
function useTextSearch<T>() {
  type DataIndex = keyof T;
  type RenderFuntion = Exclude<ColumnType<T>['render'], undefined>;

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

  /**
   * 
   * IMPORTANT: return  undefined here instead of an empty array, if you use an empty array,
   * this crashes, it attempts to access the array and a mismatch will happen causing an error,
   * using undefined makes it skip using this  
   * @param dataIndex 
   */
  const handleReset = (dataIndex: DataIndex) => {
    setSearchText((search) => ({ ...search, [dataIndex]: undefined }));
  };

  /**
   * 
   * @param dataIndex Name of the column to title
   * @param ref an input ref for the search box
   * @param renderCallback a function to render the text 
   * @returns props to be passed to the table
   */
  const getColumnSearchProps = (
    dataIndex: DataIndex,
    ref: React.RefObject<InputRef>,
    renderCallback: (node: React.ReactNode, renderParams: Parameters<RenderFuntion>) => React.ReactNode = e => e
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
            onClick={() => clearFilters && handleReset(dataIndex)}
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
    render: (text, record, index) => renderCallback(
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchText[dataIndex] ?? ""]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
      , [text, record, index]),
  });
  return { getColumnSearchProps, searchedText: searchText };
}

export type TGetColumnSearchProps<T> = ReturnType<typeof useTextSearch<T>>['getColumnSearchProps']

export function useColumnProps<T>(
  textSearch: ReturnType<typeof useTextSearch<T>>,
  column: Parameters<TGetColumnSearchProps<T>>[0],
  render?: Parameters<TGetColumnSearchProps<T>>[2]): ColumnType<T> {
  const searchInputRef = useRef<InputRef>(null);
  const query = textSearch.searchedText[column];
  return {
    ...textSearch.getColumnSearchProps(column, searchInputRef, render),
    filteredValue: query ? [query] : null,
  }
}

export default useTextSearch;
