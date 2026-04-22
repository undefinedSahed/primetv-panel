import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import CustomSwitch from '@base/components/CustomSwitch';
import { getAccess } from '@modules/auth/lib/utils/client';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Form, Table, Tag, message, Dropdown, Image } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { AiFillEdit, AiOutlineEye } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { ENUM_ARTICLES_STATUS_TYPES } from '../lib/enums';
import { ArticlesHooks } from '../lib/hooks';
import { IArticle } from '../lib/interfaces';
import ArticlesStatusForm from './ArticlesStatusForm';
import { useRouter } from 'next/navigation';

interface ArticlePreviewProps {
  article?: IArticle | null;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  if (!article) return null;

  return (
    <div className="w-full">
      {/* Print header */}
      <div className="hidden print:flex print-header items-center justify-between border-b-2 border-red-600 pb-2 mb-3">
        <div className="flex items-center">
          <img
            width={200}
            height={200}
            src="/images/logo.png"
            alt="Prime TV"
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="text-right text-xs text-gray-500 flex flex-col justify-center">
          <p>{new Date(article.date).toLocaleDateString('bn-BD')}</p>
          <p>{article.category.title}</p>
        </div>
      </div>

      <div id="article-content" className="px-4 py-8 bg-background rounded-md">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6">
          {article.title}
        </h1>

        <div className="flex flex-col gap-2 border-b border-gray-100 pb-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
            <span className="font-semibold text-primary">
              {article.author.name}
            </span>
            <span>|</span>
            <span>{article.category.title}</span>
          </div>
          <div className="text-gray-500 text-sm">
            {new Date(article.date).toLocaleDateString('bn-BD', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            ,{' '}
            {new Date(article.date).toLocaleTimeString('bn-BD', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>

        <div className="relative w-full aspect-video object-cover rounded-lg overflow-hidden mb-4 print:max-h-87.5">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full object-cover"
          />
        </div>
        <p className="text-sm text-gray-500 mb-6">
          {article.category.title} | {article.author.name}
        </p>

        <article
          className="prose article-body text-lg prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.details }}
        />

        {article.medias && article.medias.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Media Gallery</h3>
            <div className="space-y-4">
              {article.medias.map((media, index) => (
                <div key={index} className="space-y-2">
                  {media.mimetype?.startsWith('image') ? (
                    <img
                      src={media.url}
                      alt={media.caption}
                      className="rounded-md w-full aspect-video object-cover"
                    />
                  ) : media.mimetype?.startsWith('video') ? (
                    <video
                      src={media.url}
                      controls
                      className="rounded-md w-full aspect-video object-cover"
                    />
                  ) : null}
                  {media.caption && (
                    <h4 className="text-sm md:text-base lg:text-lg font-semibold">
                      {media.caption}
                    </h4>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface IProps {
  isLoading: boolean;
  data: IArticle[];
  pagination: PaginationProps;
}

const ArticlesList: React.FC<IProps> = ({ isLoading, data, pagination }) => {
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const router = useRouter();
  const [updateStatusItem, setUpdateStatusItem] = useState<IArticle>(null);
  const [previewItem, setPreviewItem] = useState<IArticle>(null);

  const articleUpdateFn = ArticlesHooks.useUpdate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setUpdateStatusItem(null);
        messageApi.success(res.message);
      },
    },
  });

  const dataSource = data?.map((elem) => ({
    key: elem?.id,
    id: elem?.id,
    coverImage: elem?.coverImage,
    title: elem?.title,
    code: elem?.code,
    category: elem?.category,
    modified: {
      author: elem?.author?.name,
      createdBy: elem?.createdBy?.fullName,
      updatedBy: elem?.updatedBy?.fullName,
      publishedBy: elem?.publishedBy?.fullName,
    },
    status: elem?.status,
    date: elem?.date,
    isActive: elem?.isActive,
    createdAt: elem?.createdAt,
    updatedAt: elem?.updatedAt,
  }));

  const columns: TableColumnsType<(typeof dataSource)[number]> = [
    {
      key: 'coverImage',
      dataIndex: 'coverImage',
      title: 'Cover Image',
      width: 80,
      render: (coverImage) => (
        <Image
          src={coverImage}
          alt="Cover"
          width={100}
          height={60}
          preview
          style={{ objectFit: 'contain', borderRadius: '4px' }}
        />
      ),
    },
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Title',
      width: 300,
    },
    {
      key: 'code',
      dataIndex: 'code',
      title: 'Code',
    },
    {
      key: 'category',
      dataIndex: 'category',
      title: 'Category',
      render: (category) => (
        <div className="flex flex-col gap-1">
          <span>{category?.title}</span>
          <span>{category?.titleBn}</span>
        </div>
      ),
    },
    {
      key: 'Modified',
      dataIndex: 'modified',
      title: 'Modified',
      render: (modified) => (
        <div className="flex flex-col gap-1">
          <span>A: <b>{modified?.author}</b></span>
          <span>C: <b>{modified?.createdBy}</b></span>
          <span>P: <b>{modified?.publishedBy}</b></span>
        </div>
      )
    },
    {
      key: 'date',
      dataIndex: 'date',
      title: 'Date',
      render: (date) => (
        <div className="flex flex-col gap-1">
          <span>{dayjs(date).format('DD.MM.YYYY')}</span>
          <span>{dayjs(date).format('HH:mm a')}</span>
        </div>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Status',
      render: (status) => {
        const statusColorMap = {
          [ENUM_ARTICLES_STATUS_TYPES.Published]: 'success',
          [ENUM_ARTICLES_STATUS_TYPES.Drafted]: 'default',
          [ENUM_ARTICLES_STATUS_TYPES.Archived]: 'processing',
        };

        const color = statusColorMap[status] || 'default';

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      key: 'isActive',
      dataIndex: 'isActive',
      title: 'Active',
      render: (isActive, record) => {
        return (
          <CustomSwitch
            checked={isActive}
            onChange={(checked) => {
              getAccess(['articles:update'], () => {
                articleUpdateFn.mutate({
                  id: record?.id,
                  data: {
                    isActive: checked,
                  },
                });
              });
            }}
          />
        );
      },
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: 'Action',
      align: 'center',
      width: 100,
      render: (id) => {
        const item = data?.find((item) => item.id === id);

        const menuItems = [
          {
            key: 'edit',
            label: 'Edit',
            icon: <AiFillEdit />,
            onClick: () => {
              getAccess(['articles:update'], () => {
                router.push(`/admin/articles/edit/${item.id}`);
              });
            },
          },
          {
            key: 'preview',
            label: 'Preview',
            icon: <AiOutlineEye />,
            onClick: () => {
              setPreviewItem(item);
            },
          },
          {
            key: 'status',
            label: 'Change Status',
            onClick: () => {
              getAccess(['articles:change-status'], () => {
                setUpdateStatusItem(item);
              });
            },
          },
        ];

        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button type="text" icon={<BiDotsVerticalRounded className="text-lg" />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      {messageHolder}
      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        scroll={{ x: true }}
      />
      <BaseModalWithoutClicker
        width={640}
        title={`Update ${updateStatusItem?.title}`}
        open={!!updateStatusItem?.id}
        onCancel={() => setUpdateStatusItem(null)}
        footer={null}
      >
        <ArticlesStatusForm
          form={formInstance}
          initialValues={{
            status: updateStatusItem?.status,
            date: updateStatusItem?.date,
          }}
          isLoading={articleUpdateFn.isPending}
          onFinish={(values) =>
            articleUpdateFn.mutate({
              id: updateStatusItem?.id,
              data: values,
            })
          }
        />
      </BaseModalWithoutClicker>
      <BaseModalWithoutClicker
        width={900}
        title={`Preview - ${previewItem?.title}`}
        open={!!previewItem?.id}
        onCancel={() => setPreviewItem(null)}
        footer={null}
      >
        <ArticlePreview article={previewItem} />
      </BaseModalWithoutClicker>
    </React.Fragment>
  );
};

export default ArticlesList;
