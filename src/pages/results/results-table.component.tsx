import './results-table.scss'
import { Table, Modal, Tag } from "antd"
import { ColumnsType, TableProps } from "antd/es/table";
import { FilterValue } from 'antd/es/table/interface';
import { useState } from 'react';

type Abstract = {
    key: React.Key;
    title: string;
    author: string;
    abstract: string;
    labels: string[];
}

const mock: Abstract[] = [{ "key": 1, "title": "The Effect of Climate Change on Biodiversity", "author": "John Smith", "abstract": "Climate change is one of the most pressing issues facing the world today. It is affecting many aspects of our lives, including biodiversity. In this paper, we examine the effect of climate change on biodiversity, and discuss what can be done to mitigate its impact.", "labels": ["math"] }, { "key": 2, "title": "Artificial Intelligence and its Impact on Employment", "author": "Jane Doe", "abstract": "Artificial Intelligence (AI) is a rapidly advancing field that has the potential to revolutionize the way we work. However, there are concerns that it will also lead to job displacement and unemployment. In this paper, we explore the impact of AI on employment and discuss strategies to address these challenges.", "labels": ["cs"] }, { "key": 3, "title": "The Role of Education in Economic Development", "author": "Mark Johnson", "abstract": "Education is widely recognized as a key driver of economic development. In this paper, we examine the relationship between education and economic development, and discuss the importance of investing in education to promote sustainable growth.", "labels": ["math", "cs"] }, { "key": 4, "title": "The Ethics of Animal Testing in Medical Research", "author": "Lisa Wong", "abstract": "Animal testing is a controversial topic in medical research. While it has contributed to many important advances in medicine, there are ethical concerns about the use of animals in research. In this paper, we explore the ethics of animal testing and discuss alternative approaches that could be used to advance medical research.", "labels": ["astro-physics"] }, { "key": 5, "title": "The Impact of Social Media on Mental Health", "author": "David Lee", "abstract": "Social media is a ubiquitous part of modern life, but there are concerns that it may be contributing to poor mental health outcomes. In this paper, we examine the impact of social media on mental health and discuss strategies to promote positive mental health in the digital age.", "labels": ["astro-physics"] }, { "key": 10, "title": "test", "author": "John Smith", "abstract": "test", "labels": ["math"] },]



const ResultsTable = () => {
    const [filters, setFilters] = useState<Record<"labels" | "author", FilterValue | null>>({ author: [], labels: [] })

    const handleTagClick = (tag: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            labels: prevFilters.labels?.includes(tag) ?
                prevFilters.labels.filter(label => label !== tag) :
                [...Array.from(prevFilters?.labels ?? []), tag],
        }));
    };

    const handleChange: TableProps<Abstract>['onChange'] = (pagination, filters, sorter) => {
        setFilters(filters);
    };

    const columns: ColumnsType<Abstract> = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            filterMode: 'tree',
            filterSearch: true,
            filters: Array
                .from(new Set(mock.map(e => e.author)))
                .map(author => ({ text: author, value: author })),
            onFilter: (value, { author }) => author === value,
            filteredValue: filters.author || null
        },
        {
            title: 'Abstract',
            dataIndex: 'abstract',
            render: (text, record) => (
                <a
                    onClick={() =>
                        Modal.info({
                            title: record.title,
                            content: <p>{record.abstract}</p>,
                            centered: true,
                            maskClosable: true,
                        })
                    }
                >
                    {record.abstract.substring(0, 50) + '...'}
                </a>
            ),
        },
        {
            title: 'Labels',
            dataIndex: 'labels',
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => typeof value === 'string' && record.labels.includes(value),
            filteredValue: filters.labels || null,
            filters: Array
                .from(new Set(mock.map(e => e.labels).flat()))
                .map(label => ({ text: label, value: label })),
            render: (value, abstract) => abstract.labels.map(
                label => <Tag
                    className='label-tag'
                    color={filters.labels?.includes(label) ? 'green' : undefined}
                    key={label}
                    onClick={() => handleTagClick(label)}
                >{label}</Tag>
            ),
        },
    ];


    return <Table onChange={handleChange} className="results-table" dataSource={mock} columns={columns} />
}

export default ResultsTable;