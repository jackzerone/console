import { Stack, Text } from '@chakra-ui/react';
import { map } from 'lodash';
import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  Checkbox,
  CheckboxGroup,
  DeprecatedSelect,
  FormControl,
  FormField,
  TreeSelect,
} from '@tkeel/console-components';

import {
  ConnectInfoType,
  ConnectOption,
  DeviceFormFields,
  GroupOptions,
  ModalMode,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

const { TextField, TextareaField } = FormField;

interface Props {
  formHandler: UseFormReturn<DeviceFormFields, object>;
  watchFields: DeviceFormFields;
  type: ModalType;
  mode: ModalMode;
  groupOptions: GroupOptions[];
  handleSelectTemplate?: (selected: boolean) => void;
  templateOptions: Array<{ label: string; id: string }>;
}
export default function BasicInfoPart({
  type,
  mode,
  formHandler,
  watchFields,
  groupOptions,
  // handleSelectTemplate,
  templateOptions,
}: Props) {
  const { register, formState, setValue, clearErrors } = formHandler;
  const { errors } = formState;
  return (
    <>
      <TextField
        id="name"
        label={type === ModalType.DEVICE ? '设备名称' : '设备组名称'}
        registerReturn={register('name', {
          required: { value: true, message: '请填写设备名称' },
        })}
        error={errors.name}
      />
      <FormControl
        id="parentId"
        label={type === ModalType.DEVICE ? '设备分组' : '父设备组'}
      >
        <TreeSelect
          id="parentId"
          allowClear={!!watchFields.parentId}
          placeholder="请选择设备分组"
          extras={{ hideTreeIcon: true }}
          style={{ width: '100%' }}
          styles={{
            treeTitle: 'font-size:14px;height:32px;line-height:32px;',
          }}
          treeData={groupOptions}
          defaultValue={watchFields.parentId}
          notFoundContent="暂无选项"
          onChange={(value: string, label: ReactNode[]) => {
            setValue('parentId', value);
            setValue('parentName', label[0] as string);
          }}
        />
      </FormControl>

      {type === ModalType.DEVICE && (
        <>
          <FormControl id="connectOption" label="设备连接方式">
            <DeprecatedSelect
              placeholder="请选择设备连接方式"
              id="directConnection"
              value={watchFields.connectType}
              style={{ width: '100%' }}
              {...register('connectType', {
                required: { value: true, message: '请选择设备连接方式' },
              })}
              disabled={mode === ModalMode.EDIT}
              onChange={(value: string) => {
                if (value) {
                  setValue('connectType', value);
                  clearErrors('connectType');
                  if (value === ConnectOption.INDIRECT) {
                    setValue('connectInfo', [ConnectInfoType.useTemplate]);
                  }
                }
              }}
            >
              {map(ConnectOption, (value) => {
                return { label: value, value };
              }).map((item) => (
                <DeprecatedSelect.Option key={item.value} value={item.value}>
                  {item.label}
                </DeprecatedSelect.Option>
              ))}
            </DeprecatedSelect>
            {errors.connectType && (
              <Text color="red.500" fontSize="sm" mt="8px">
                请选择连接方式
              </Text>
            )}
          </FormControl>
          {watchFields.connectType && (
            <FormControl id="connectInfo">
              <CheckboxGroup
                onChange={(value: ConnectInfoType[]) => {
                  setValue('connectInfo', value);
                }}
                value={watchFields.connectInfo}
              >
                <Stack spacing="16px" direction="column">
                  <Checkbox
                    colorScheme="brand"
                    id="useTemplate"
                    value={ConnectInfoType.useTemplate}
                    isDisabled={
                      watchFields.connectType !== ConnectOption.DIRECT ||
                      mode === ModalMode.EDIT
                    }
                  >
                    <Text color="gray.600" fontSize="14px">
                      使用设备模板
                    </Text>
                  </Checkbox>
                  {(watchFields.connectInfo || []).includes(
                    ConnectInfoType.useTemplate
                  ) && (
                    <>
                      <DeprecatedSelect
                        placeholder="请选择设备模版"
                        id="templateId"
                        value={watchFields.templateId}
                        style={{ width: '100%' }}
                        allowClear={!!watchFields.templateId}
                        disabled={mode === ModalMode.EDIT}
                        {...register('templateId')}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(value: string) => {
                          setValue('templateId', value);
                          setValue(
                            'templateName',
                            templateOptions.find((v) => v.id === value)
                              ?.label ?? ''
                          );
                          if (value) {
                            clearErrors('templateId');
                          }
                        }}
                      >
                        {templateOptions.map((val) => (
                          <DeprecatedSelect.Option value={val.id} key={val.id}>
                            {val.label}
                          </DeprecatedSelect.Option>
                        ))}
                      </DeprecatedSelect>
                      {errors.templateId && (
                        <Text color="red.500" fontSize="sm">
                          请选择设备模版
                        </Text>
                      )}
                    </>
                  )}

                  <Checkbox
                    colorScheme="brand"
                    id="selfLearn"
                    value={ConnectInfoType.selfLearn}
                    isDisabled={
                      watchFields.connectType !== ConnectOption.DIRECT
                    }
                  >
                    <Text color="gray.600" fontSize="14px">
                      自学习模式
                    </Text>
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
          )}
        </>
      )}
      <TextareaField
        id="description"
        label="描述"
        placeholder="请输入"
        type="text"
        registerReturn={register('description')}
        error={errors.description}
      />
    </>
  );
}
