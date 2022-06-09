import { Skeleton } from '@chakra-ui/react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Tooltip, useAxisProps } from '@tkeel/console-charts';
import { useColor } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp, numeral } from '@tkeel/console-utils';

import usePrometheusTKMeterQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterQuery';
import { fillDataLast7Days } from '@/tkeel-console-plugin-admin-usage-statistics/utils/data';
import { getQueryParamsLast7Days } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

const params = getQueryParamsLast7Days();

export default function Chart() {
  const fill = useColor('green.300');

  const { isLoading, item } = usePrometheusTKMeterQuery({
    params: { ...params, meter: 'core_msg_days' },
  });
  const data = item?.result[0]?.values ?? [];

  const newData = fillDataLast7Days({ data });
  const defaultAxisProps = useAxisProps();

  if (isLoading) {
    return <Skeleton height="100%" />;
  }

  return (
    <ResponsiveContainer>
      <BarChart
        data={newData}
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        barCategoryGap="80%"
      >
        <XAxis
          {...defaultAxisProps}
          dataKey="timestamp"
          tickLine={false}
          tickFormatter={(value) =>
            formatDateTimeByTimestamp({
              timestamp: value as number,
              template: 'MM-DD',
            })
          }
        />
        <YAxis
          {...defaultAxisProps}
          dataKey="value"
          tickLine={false}
          tickFormatter={(value) => numeral.format({ input: value as number })}
        />
        <Bar dataKey="value" fill={fill} />
        <Tooltip
          label="消息量 (条)"
          labelFormatter={(label: number) =>
            formatDateTimeByTimestamp({
              timestamp: label,
              template: 'YYYY-MM-DD',
            })
          }
          formatter={(value: number) => {
            const res = numeral.format({
              input: value,
            });
            return [`${res} 条`, '消息量'];
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
