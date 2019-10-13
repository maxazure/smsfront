import { Col, Icon, Row, Tooltip } from 'antd';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading, visitData }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Total SMS Usage"
        action={
          <Tooltip title="Total SMS Usage">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={<span>123</span>}
        footer={<Field label="Daily Usage" value={`${numeral(12).format('0,0')}`} />}
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Total Appointments"
        action={
          <Tooltip title="Introduce">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        footer={<Field label="Daily Sending" value={numeral(1234).format('0,0')} />}
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Members"
        action={
          <Tooltip title="Introduce">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={6}
        footer={<Field label="Left Position" value="4" />}
        contentHeight={46}
      >
        <MiniBar data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="Plan Usage"
        action={
          <Tooltip title="Introduce">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total="78%"
        footer={
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            <Trend
              flag="up"
              style={{
                marginRight: 16,
              }}
            >
              Usage Change
              <span className={styles.trendText}>12%</span>
            </Trend>

          </div>
        }
        contentHeight={46}
      >
        <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
