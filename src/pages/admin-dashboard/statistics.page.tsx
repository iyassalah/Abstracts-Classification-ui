import { TagsOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Progress, Row, Statistic } from 'antd';
import './statistics.scss';

const StatisticsPage = () => {
    return (
        <div className='stats'>
            <h1>Statistics</h1>
            <Divider />
            <Row gutter={[16, 16]} className='cards' wrap>
                <Col xl={4} md={8} xs={12} span={6}>
                    <Card>
                        <Statistic prefix={<TagsOutlined />} value={`${16} Classes`} />
                    </Card>
                </Col>
                <Col xl={4} md={8} xs={12} span={6}>
                    <Card >
                        <div className='recall'>
                            <span className='recall-facet'>Recall</span>
                            <Progress percent={93} type='dashboard' strokeColor='green' trailColor='red'/>
                        </div>
                    </Card>
                </Col>
                <Col xl={4} md={8} xs={12} span={6}>
                    <Card>
                        asodjfsapofj[pioasjd]
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default StatisticsPage;
