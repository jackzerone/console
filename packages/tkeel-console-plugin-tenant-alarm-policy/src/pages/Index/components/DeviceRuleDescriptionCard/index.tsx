import { Box, Flex, HStack, RadioGroup, Text } from '@chakra-ui/react';
import {
  Control,
  Controller,
  Path,
  UseFieldArrayReturn,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';

import { FormControl, FormField, Radio } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { AddFilledIcon, TrashFilledIcon } from '@tkeel/console-icons';
import { useDeviceDetailQuery } from '@tkeel/console-request-hooks';

import {
  calculateOptions,
  durationOptions,
  enumOperatorOptions,
  numberOperatorOptions,
} from '@/tkeel-console-plugin-tenant-alarm-policy/constants';

const { TextField, SelectField } = FormField;

export interface DeviceCondition {
  attribute: string | null;
  duration?: 0 | 1 | 3 | 5 | null; // minute
  calculate?: 'avg' | 'max' | 'min' | null;
  numberOperator?: string | null;
  enumOperator?: string | null;
  enumItem?: string | null;
  booleanOperator?: string | null;
  booleanItem?: string | null;
  numberValue?: string | null;
}

export const defaultDeviceCondition: DeviceCondition = {
  attribute: null,
  duration: 1,
  calculate: 'avg',
  numberOperator: 'gt',
  numberValue: null,
};

interface Props<FormValues> {
  deviceId: string;
  register: UseFormRegister<FormValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FormValues, any>;
  append: () => void;
  fieldArrayReturn: UseFieldArrayReturn<FormValues>;
}

export default function DeviceRuleDescriptionCard<FormValues>({
  deviceId,
  register,
  control,
  append,
  fieldArrayReturn,
}: Props<FormValues>) {
  const { deviceObject } = useDeviceDetailQuery({ id: deviceId });
  const telemetryFields =
    deviceObject?.configs?.telemetry?.define?.fields || {};
  const telemetryOptions = Object.entries(telemetryFields).map(
    ([key, value]) => ({
      label: value.name,
      value: key,
    })
  );

  const { fields, remove } = fieldArrayReturn;

  const output = useWatch({
    name: 'deviceConditions' as Path<FormValues>,
    control,
  });

  const primaryColor = useColor('primary');

  const selectProps = {
    control,
    formControlStyle: { marginBottom: '0' },
  };

  const getFieldId = (i: number, id: string) => {
    return `deviceConditions.${i}.${id}` as Path<FormValues>;
  };

  return (
    <Flex flex="1" flexDirection="column">
      <Flex justifyContent="space-between">
        <Flex alignItems="center" color="gray.700" fontSize="14px">
          <Text>满足</Text>
          <FormControl
            id="conditionsOperator"
            formControlStyle={{ marginBottom: '0', width: 'auto' }}
          >
            <Controller
              name={'conditionsOperator' as Path<FormValues>}
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  padding="0 10px"
                  onChange={onChange}
                  value={value as string}
                >
                  <Radio value="or">
                    <Text color="gray.700">or</Text>
                  </Radio>
                  <Radio marginLeft="20px" value="and">
                    <Text color="gray.700">and</Text>
                  </Radio>
                </RadioGroup>
              )}
            />
          </FormControl>
          <Text>条件时，触发告警。</Text>
        </Flex>
        <Flex
          alignItems="center"
          cursor="pointer"
          _hover={{
            svg: {
              fill: `${primaryColor} !important`,
            },
            p: {
              color: primaryColor,
            },
          }}
          onClick={() => append()}
        >
          <AddFilledIcon color="grayAlternatives.300" />
          <Text color="grayAlternatives.300" fontSize="12px" fontWeight="500">
            添加规则
          </Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column" marginTop="20px">
        {fields.map((item, i) => {
          /* eslint-disable @typescript-eslint/no-unsafe-member-access */
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { attribute, duration } = output[i] || {};
          /* eslint-enable */
          const { type, define } = telemetryFields[attribute as string] || {};
          const typeIsNumber = ['int', 'float', 'double'].includes(
            type as string
          );
          const attributeIsNumber = !attribute || typeIsNumber;

          // TODO: 遥测属性暂时不支持添加枚举类型值，支持后需要做处理
          const attributeIsEnum = false;
          const attributeIsBoolean = type === 'bool';

          const booleanAttributeOptions = Object.entries(define || {})
            .map(([key, value]) => ({
              label: value as string,
              value: key,
            }))
            .filter(({ value }) => value !== 'ext');

          const attributeId =
            `deviceConditions.${i}.attribute` as Path<FormValues>;
          return (
            <HStack
              key={item.id}
              alignItems="center"
              spacing="8px"
              _notLast={{ marginBottom: '8px' }}
              padding="0 16px"
              height="64px"
              borderRadius="4px"
              backgroundColor="white"
              _hover={{
                '> div:last-child > svg': {
                  display: 'block !important',
                },
              }}
            >
              <Text
                marginRight="10px"
                color="gray.700"
                fontSize="14px"
                fontWeight="500"
              >
                if
              </Text>
              <SelectField<FormValues>
                id={attributeId}
                name={attributeId}
                placeholder="请选择"
                options={telemetryOptions}
                control={control}
                formControlStyle={{
                  marginBottom: '0',
                  flexShrink: 0,
                  width: '156px',
                }}
              />
              {attributeIsNumber && (
                <>
                  <SelectField<FormValues>
                    id={getFieldId(i, 'duration')}
                    name={getFieldId(i, 'duration')}
                    placeholder="请选择"
                    options={durationOptions}
                    {...selectProps}
                  />
                  {duration !== 0 && (
                    <SelectField<FormValues>
                      id={getFieldId(i, 'calculate')}
                      name={getFieldId(i, 'calculate')}
                      placeholder="请选择"
                      options={calculateOptions}
                      {...selectProps}
                    />
                  )}
                </>
              )}
              {attributeIsNumber && (
                <SelectField<FormValues>
                  id={getFieldId(i, 'numberOperator')}
                  name={getFieldId(i, 'numberOperator')}
                  placeholder="运算符"
                  options={numberOperatorOptions}
                  {...selectProps}
                />
              )}
              {attributeIsEnum && (
                <>
                  <SelectField<FormValues>
                    id={getFieldId(i, 'enumOperator')}
                    name={getFieldId(i, 'enumOperator')}
                    placeholder="运算符"
                    options={enumOperatorOptions}
                    {...selectProps}
                  />
                  <SelectField<FormValues>
                    id={getFieldId(i, 'enumItem')}
                    name={getFieldId(i, 'enumItem')}
                    placeholder="请选择"
                    options={[
                      {
                        label: 'enum1',
                        value: '枚举项1',
                      },
                      {
                        label: 'enum2',
                        value: '枚举项3',
                      },
                    ]}
                    {...selectProps}
                  />
                </>
              )}
              {attributeIsBoolean && (
                <>
                  <SelectField<FormValues>
                    id={getFieldId(i, 'booleanOperator')}
                    name={getFieldId(i, 'booleanOperator')}
                    placeholder="运算符"
                    options={enumOperatorOptions}
                    {...selectProps}
                  />
                  <SelectField<FormValues>
                    id={getFieldId(i, 'booleanItem')}
                    name={getFieldId(i, 'booleanItem')}
                    placeholder="请选择"
                    options={booleanAttributeOptions}
                    {...selectProps}
                  />
                </>
              )}
              {attributeIsNumber && (
                <TextField
                  id={getFieldId(i, 'numberValue')}
                  registerReturn={register(getFieldId(i, 'numberValue'))}
                  type="number"
                  formControlStyle={{ marginBottom: '0' }}
                />
              )}
              <Box width="16px" flexShrink={0}>
                {fields.length > 1 && (
                  <TrashFilledIcon
                    color="grayAlternatives.300"
                    style={{
                      display: 'none',
                      flexShrink: 0,
                      cursor: 'pointer',
                    }}
                    onClick={() => remove(i)}
                  />
                )}
              </Box>
            </HStack>
          );
        })}
      </Flex>
    </Flex>
  );
}