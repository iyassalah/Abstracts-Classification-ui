import { Table, Modal } from "antd"
import { ColumnsType } from "antd/es/table";

type Abstract = {
    key: React.Key;
    abstract_title: string;
    author: string;
    abstract: string;
    classification_result: string;
}

const mock: Abstract[] = [{
    "key": 1, "abstract_title": "The Effect of Climate Change on Biodiversity", "author": "John Smith", "abstract": "Climate change is one of the most pressing issues facing the world today. It is affecting many aspects of our lives, including biodiversity. In this paper, we examine the effect of climate change on biodiversity, and discuss what can be done to mitigate its impact.", "classification_result": "Positive"
}, { "key": 2, "abstract_title": "Artificial Intelligence and its Impact on Employment", "author": "Jane Doe", "abstract": "Artificial Intelligence (AI) is a rapidly advancing field that has the potential to revolutionize the way we work. However, there are concerns that it will also lead to job displacement and unemployment. In this paper, we explore the impact of AI on employment and discuss strategies to address these challenges.", "classification_result": "Neutral" }, { "key": 3, "abstract_title": "The Role of Education in Economic Development", "author": "Mark Johnson", "abstract": "Education is widely recognized as a key driver of economic development. In this paper, we examine the relationship between education and economic development, and discuss the importance of investing in education to promote sustainable growth.", "classification_result": "Positive" }, { "key": 4, "abstract_title": "The Ethics of Animal Testing in Medical Research", "author": "Lisa Wong", "abstract": "Animal testing is a controversial topic in medical research. While it has contributed to many important advances in medicine, there are ethical concerns about the use of animals in research. In this paper, we explore the ethics of animal testing and discuss alternative approaches that could be used to advance medical research.", "classification_result": "Negative" }, { "key": 5, "abstract_title": "The Impact of Social Media on Mental Health", "author": "David Lee", "abstract": "Social media is a ubiquitous part of modern life, but there are concerns that it may be contributing to poor mental health outcomes. In this paper, we examine the impact of social media on mental health and discuss strategies to promote positive mental health in the digital age.", "classification_result": "Negative" }]


const columns: ColumnsType<Abstract> = [
    {
        title: 'Abstract Title',
        dataIndex: 'abstract_title',
    },
    {
        title: 'Author',
        dataIndex: 'author',
        filterMode: 'tree',
        filters: Array
            .from(new Set(mock.map(e => e.author)))
            .map(author => ({ text: author, value: author }))
    },
    {
        title: 'Abstract',
        dataIndex: 'abstract',
        render: (text, record) => (
            <a
                onClick={() =>
                    Modal.info({
                        title: record.abstract_title,
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
        title: 'Classification Result',
        dataIndex: 'classification_result',
        filterMode: 'tree',
        filters: [
            {
                text: 'Positive',
                value: 'Positive',
            },
            {
                text: 'Neutral',
                value: 'Neutral',
            },
            {
                text: 'Negative',
                value: 'Negative',
            },
        ],
        // onFilter: (value, record) => record.classification_result.startsWith(value),
    },
];


const ResultsTable = () => {
    return <Table dataSource={mock} columns={columns} />
}

export default ResultsTable;