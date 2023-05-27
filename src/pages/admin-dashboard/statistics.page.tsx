import { SwapOutlined, TagsOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Progress, Row, Statistic } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IGetStats } from '../../types/responses';
import './statistics.scss';

interface IProps {
    token: string;
}

const StatisticsPage = (props: IProps) => {
    const PercentCard = (props: { percent: number, label: string }) => (
        <Col xl={4} md={8} xs={12} span={6}>
            <Card className='statcard'>
                <div className='percentage'>
                    <span className='percentage-label'>{props.label}</span>
                    <Progress size='default' percent={props.percent} type='dashboard' strokeColor='green' trailColor='red' />
                </div>
            </Card>
        </Col>
    )
    const [Stats, setStats] = useState<IGetStats>({ fn: NaN, fp: NaN, tn: NaN, tp: NaN })

    const { fn, fp, tn, tp } = Stats!;
    useEffect(() => {
        axios.get<IGetStats>('/admin/stats', { headers: { Authorization: `Bearer ${props.token}` } })
            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    }, [])

    const resTime = 121.87;


    const recall = +(100.0 * tp / (tp + fn)).toPrecision(3);
    const precision = +(100.0 * tp / (tp + fp)).toPrecision(3);
    const accuracy = +((100.0 * (tp + tn)) / (tp + tn + fp + fn)).toPrecision(3);
    const f1Score = +(100.0 * tp / (tp + 0.5 * (fp + fn))).toPrecision(3);

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
                <PercentCard
                    percent={recall}
                    label='Recall'
                />
                <PercentCard
                    percent={precision}
                    label='Precision'
                />
                <PercentCard
                    percent={accuracy}
                    label='Accuracy'
                />
                <PercentCard
                    percent={f1Score}
                    label='F1-Score'
                />
            </Row>
        </div>
    )
}

export default StatisticsPage;
