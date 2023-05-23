import { TagsOutlined, SwapOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Progress, Row, Statistic } from 'antd';
import './statistics.scss';

const StatisticsPage = () => {
    const PercentCard = (percent: number, label: string) => (
        <Col xl={4} md={8} xs={12} span={6}>
            <Card >
                <div className='percentage'>
                    <span className='percentage-label'>{label}</span>
                    <Progress percent={percent} type='dashboard' strokeColor='green' trailColor='red' />
                </div>
            </Card>
        </Col>
    )

    const resTime = 121.87;

    return (
        <div className='stats'>
            <h1>Statistics</h1>
            <Divider />
            <Row gutter={[16, 16]} className='cards' wrap>
                <Col className='statcard' xl={4} md={8} xs={12} span={6}>
                    <Card>
                        <Statistic prefix={<TagsOutlined />} value={`${16} Classes`} />
                        <span className='desc'>Different supported categories</span>
                    </Card>
                </Col>
                <Col className='statcard' xl={4} md={8} xs={12} span={6}>
                    <Card>
                        <Statistic prefix={<SwapOutlined />} value={`${resTime.toFixed(2)}ms`} />
                        <span className='desc'>Average Response Time</span>
                    </Card>
                </Col>
                <Col className='statcard' xl={4} md={8} xs={12} span={6}>
                    <Card >
                        <div className='percentage'>
                            <span className='percentage-label'>Recall</span>
                            <Progress percent={93} type='dashboard' strokeColor='green' trailColor='red' />
                        </div>
                    </Card>
                </Col>
                <Col className='statcard' xl={4} md={8} xs={12} span={6}>
                    <Card >
                        <div className='percentage'>
                            <span className='percentage-label'>Precision</span>
                            <Progress percent={60} type='dashboard' strokeColor='green' trailColor='red' />
                        </div>
                    </Card>
                </Col>
                <Col className='statcard' xl={4} md={8} xs={12} span={6}>
                    <Card >
                        <div className='percentage'>
                            <span className='percentage-label'>Accuracy</span>
                            <Progress percent={46} type='dashboard' strokeColor='green' trailColor='red' />
                        </div>
                    </Card>
                </Col>
                <Col className='statcard' xl={4} md={8} xs={12} span={6}>
                    <Card >
                        <div className='percentage'>
                            <span className='percentage-label'>F1-Score</span>
                            <Progress percent={70} type='dashboard' strokeColor='green' trailColor='red' />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default StatisticsPage;
