'use client';

import PageHeader from '@base/components/PageHeader';
import ArticlesForm from '@modules/articles/components/ArticlesForm';
import { ArticlesHooks } from '@modules/articles/lib/hooks';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Form, Skeleton, message } from 'antd';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const EditArticlePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();

  const articleQuery = ArticlesHooks.useFindById({
    id,
    config: {
      queryKey: [],
      enabled: !!id,
    },
  });

  const articleUpdateFn = ArticlesHooks.useUpdate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        formInstance.resetFields();
        messageApi.success(res.message);
        router.push('/admin/articles/list');
      },
    },
  });

  useEffect(() => {
    if (articleQuery.data?.data) {
      formInstance.setFieldsValue({
        ...articleQuery.data.data,
        date: articleQuery.data.data.date ? dayjs(articleQuery.data.data.date) : null,
      });
    }
  }, [articleQuery.data?.data, formInstance]);

  return (
    <React.Fragment>
      {messageHolder}
      <PageHeader
        title={`Edit Article - ${articleQuery.data?.data?.title || 'Loading...'}`}
        onBack={() => router.push('/admin/articles/list')}
      />
      <div className="bg-white dark:bg-[#141414] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        {articleQuery.isLoading ? (
          <Skeleton active />
        ) : (
          <ArticlesForm
            formType="update"
            form={formInstance}
            initialValues={{
              ...articleQuery.data?.data,
              isActive: articleQuery.data?.data?.isActive,
            }}
            isLoading={articleUpdateFn.isPending}
            onFinish={(values) =>
              articleUpdateFn.mutate({
                id,
                data: values,
              })
            }
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default WithAuthorization(EditArticlePage, { allowedAccess: ['articles:update'] });
