import FloatInput from '@base/antd/components/FloatInput';
import InfiniteScrollSelect from '@base/components/InfiniteScrollSelect';
import { cn, Toolbox } from '@lib/utils';
import { CategoriesHooks } from '@modules/categories/lib/hooks';
import { ICategory } from '@modules/categories/lib/interfaces';
import { Button, Col, Form, FormInstance, Radio, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { ISubCategoryCreate } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<ISubCategoryCreate>;
  onFinish: (values: ISubCategoryCreate) => void;
}

const SubCategoriesForm: React.FC<IProps> = ({ isLoading, form, formType = 'create', initialValues, onFinish }) => {
  const [activeLang, setActiveLang] = useState<'en' | 'bn'>('en');
  const [categorySearchTerm, setCategorySearchTerm] = useState(null);
  const formValues = Form.useWatch([], form);

  const categoryQuery = CategoriesHooks.useFindById({
    id: formValues?.categoryId,
    config: {
      queryKey: [],
      enabled: !!formValues?.categoryId,
    },
  });

  const categoriesQuery = CategoriesHooks.useFindInfinite({
    options: {
      limit: 20,
      searchTerm: categorySearchTerm,
      isActive: 'true',
    },
  });

  useEffect(() => {
    form.resetFields();
  }, [form, initialValues]);

  return (
    <React.Fragment>
      <Space className="mb-8">
        <Button size="large" type={activeLang === 'en' ? 'primary' : 'default'} onClick={() => setActiveLang('en')}>
          English
        </Button>
        <Button size="large" type={activeLang === 'bn' ? 'primary' : 'default'} onClick={() => setActiveLang('bn')}>
          বাংলা
        </Button>
      </Space>
      <Form
        autoComplete="off"
        size="large"
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Form.Item
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: 'Category is required!',
                },
              ]}
              className="!mb-0"
            >
              <InfiniteScrollSelect<ICategory>
                isFloat
                allowClear
                showSearch
                virtual={false}
                placeholder="Category"
                initialOptions={categoryQuery.data?.data?.id ? [categoryQuery.data?.data] : []}
                option={({ item: category }) => ({
                  key: category?.id,
                  label: category?.title,
                  value: category?.id,
                })}
                onChangeSearchTerm={(searchTerm) => setCategorySearchTerm(searchTerm)}
                query={categoriesQuery}
              />
            </Form.Item>
          </Col>
          <Col xs={24} className={cn({ '!hidden': activeLang !== 'en' })}>
            <Form.Item name="title" rules={[{ required: true, message: 'Title is required!' }]} className="!mb-0">
              <FloatInput
                placeholder="Title"
                onKeyUp={(e) =>
                  form.setFieldValue('slug', Toolbox.generateSlug((e.target as HTMLInputElement).value, '-', false))
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} className={cn({ '!hidden': activeLang !== 'en' })}>
            <Form.Item name="slug" className="!mb-0">
              <FloatInput placeholder="Slug" />
            </Form.Item>
          </Col>
          <Col xs={24} className={cn({ '!hidden': activeLang !== 'bn' })}>
            <Form.Item name="titleBn" rules={[{ required: true, message: 'Title is required!' }]} className="!mb-0">
              <FloatInput
                placeholder="Title"
                onKeyUp={(e) =>
                  form.setFieldValue('slugBn', Toolbox.generateSlug((e.target as HTMLInputElement).value, '-', false))
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} className={cn({ '!hidden': activeLang !== 'bn' })}>
            <Form.Item name="slugBn" className="!mb-0">
              <FloatInput placeholder="Slug" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="position" rules={[{ required: false }]} className="!mb-0">
              <FloatInput placeholder="Position" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="isActive" className="!mb-0">
              <Radio.Group buttonStyle="solid" className="w-full text-center">
                <Radio.Button className="w-1/2" value={true}>
                  Active
                </Radio.Button>
                <Radio.Button className="w-1/2" value={false}>
                  Inactive
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item className="text-right !mb-0">
              <Button loading={isLoading} type="primary" htmlType="submit">
                {formType === 'create' ? 'Submit' : 'Update'}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default SubCategoriesForm;
