import { useEffect, useRef, useState } from 'react';
import './results-table.scss'
import { Table, Modal, Tag, InputRef } from "antd"
import { ColumnsType, TableProps } from "antd/es/table";
import { FilterValue } from 'antd/es/table/interface';
import * as Responses from '../../types/responses';
import { IAbstract } from '../../types/shared';
import useTextSearch from './text-search.hook';

const mock: Responses.IResults = { abstracts: [{ "title": "The Effect of Climate Change on Biodiversity", "author": "John Smith", "abstract": "Climate change is one of the most pressing issues facing the world today. It is affecting many aspects of our lives, including biodiversity. In this paper, we examine the effect of climate change on biodiversity, and discuss what can be done to mitigate its impact.", "labels": ["math"] }, { "title": "Artificial Intelligence and its Impact on Employment", "author": "Jane Doe", "abstract": "Artificial Intelligence (AI) is a rapidly advancing field that has the potential to revolutionize the way we work. However, there are concerns that it will also lead to job displacement and unemployment. In this paper, we explore the impact of AI on employment and discuss strategies to address these challenges.", "labels": ["cs"] }, { "title": "The Role of Education in Economic Development", "author": "Mark Johnson", "abstract": "Education is widely recognized as a key driver of economic development. In this paper, we examine the relationship between education and economic development, and discuss the importance of investing in education to promote sustainable growth.", "labels": ["math", "cs"] }, { "title": "The Ethics of Animal Testing in Medical Research", "author": "Lisa Wong", "abstract": "Animal testing is a controversial topic in medical research. While it has contributed to many important advances in medicine, there are ethical concerns about the use of animals in research. In this paper, we explore the ethics of animal testing and discuss alternative approaches that could be used to advance medical research.", "labels": ["astro-physics"] }, { "title": "The Impact of Social Media on Mental Health", "author": "David Lee", "abstract": "Social media is a ubiquitous part of modern life, but there are concerns that it may be contributing to poor mental health outcomes. In this paper, we examine the impact of social media on mental health and discuss strategies to promote positive mental health in the digital age.", "labels": ["astro-physics"] }, { "title": "test", "author": "John Smith", "abstract": "test", "labels": ["math"] },] }

interface IProps {
    data?: IAbstract[];
}

type State = { abstracts: IAbstract[], authors: Set<string>, labels: Set<string> };
const ResultsTable = (props: IProps) => {
    const defaulted = props?.data?.length ? props.data : mock.abstracts;
    const [filters, setFilters] = useState<Record<"labels" | "author", FilterValue | null>>({ author: [], labels: [] });
    const [data, setData] = useState<State>({ abstracts: defaulted, authors: new Set(), labels: new Set() });
    const titleSearchInput = useRef<InputRef>(null);
    const abstractSearchInput = useRef<InputRef>(null);
    useEffect(() => {
        setData({
            abstracts: defaulted,
            labels: new Set(defaulted.map(e => e.labels).flat()),
            authors: new Set(defaulted.map(e => e.author)),
        }); // TODO: fetch from API
    }, []);
    const { getColumnSearchProps, searchText } = useTextSearch<IAbstract>();

    const filterSet = new Set(filters.labels);
    const handleTagClick = (tag: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            labels: prevFilters.labels?.includes(tag) ?
                prevFilters.labels.filter(label => label !== tag) :
                [...Array.from(prevFilters?.labels ?? []), tag],
        }));
    };

    const handleChange: TableProps<IAbstract>['onChange'] = (pagination, filters) => {
        setFilters(filters);
    };

    const columns: ColumnsType<IAbstract> = [
        {
            title: 'Title',
            dataIndex: 'title',
            filteredValue: searchText['title'] ? [searchText['title']] : null,
            ...getColumnSearchProps('title', titleSearchInput),
        },
        {
            title: 'Author',
            dataIndex: 'author',
            filterMode: 'tree',
            filterSearch: true,
            filters: Array.from(data.authors).map(author => ({ text: author, value: author })),
            onFilter: (value, { author }) => author === value,
            filteredValue: filters.author || null
        },
        {
            title: 'Abstract',
            dataIndex: 'abstract',
            ellipsis: true,
            filteredValue: searchText['abstract'] ? [searchText['abstract']] : null,
            ...getColumnSearchProps('abstract', abstractSearchInput),
        },
        {
            title: 'Labels',
            dataIndex: 'labels',
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (_, record) => {
                const labels = new Set(record.labels);
                return filters.labels?.every(label => labels.has(String(label))) ?? false
            },
            filteredValue: filters.labels || null,
            filters: Array.from(data.labels).map(label => ({ text: label, value: label })),
            render: (_, abstract) => abstract.labels.map(
                label => <Tag
                    className='label-tag'
                    color={filterSet.has(label) ? 'green' : undefined}
                    key={label}
                    onClick={() => handleTagClick(label)}
                >{label}</Tag>
            ),
        },
    ];


    return (
        <Table
            size='small'
            onChange={handleChange}
            className="results-table"
            dataSource={data.abstracts.map((e, index) => ({ ...e, key: String(index) }))}
            columns={columns}
        />
    )
}

export default ResultsTable;