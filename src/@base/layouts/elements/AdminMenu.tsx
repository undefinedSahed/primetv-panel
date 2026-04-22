import CustomLink from '@base/components/CustomLink';
import { Paths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import { getContentAccess } from '@modules/auth/lib/utils/client';
import { Menu } from 'antd';
import { FaTools, FaUserEdit, FaUsers, FaUserShield, FaUserTag, FaUserTie } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import {
  MdBusiness,
  MdCategory,
  MdDashboard,
  MdInsertDriveFile,
  MdMenu,
  MdOutlineAdsClick,
  MdOutlinePriceChange,
  MdPoll,
} from 'react-icons/md';
import { RiArticleLine, RiLayout2Fill, RiUserStarFill } from 'react-icons/ri';

interface IProps {
  className?: string;
  selectedKeys: string[];
  openKeys: string[];
  onOpenChange: (openKeys: string[]) => void;
}

const AdminMenu: React.FC<IProps> = ({ className, selectedKeys, openKeys, onOpenChange }) => {
  return (
    <Menu
      className={className}
      mode="inline"
      theme="light"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={[
        {
          key: Paths.admin.root,
          icon: <MdDashboard />,
          label: <CustomLink href={Paths.admin.root}>Dashboard</CustomLink>,
        },
        getContentAccess({
          content: {
            key: Paths.admin.users.list,
            icon: <FaUsers />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.users.list)}>Users</CustomLink>,
          },
          allowedAccess: ['users:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.roleManager.root,
            icon: <FaUserShield />,
            label: 'Role Manager',
            children: [
              getContentAccess({
                content: {
                  key: Paths.admin.roleManager.permissionTypes.list,
                  icon: <RiUserStarFill />,
                  label: (
                    <CustomLink href={Toolbox.appendPagination(Paths.admin.roleManager.permissionTypes.list)}>
                      Permission Types
                    </CustomLink>
                  ),
                },
                allowedAccess: ['role-manager-permission-types:read'],
              }),
              getContentAccess({
                content: {
                  key: Paths.admin.roleManager.permissions.list,
                  icon: <FaUserTag />,
                  label: (
                    <CustomLink href={Toolbox.appendPagination(Paths.admin.roleManager.permissions.list)}>
                      Permissions
                    </CustomLink>
                  ),
                },
                allowedAccess: ['role-manager-permissions:read'],
              }),
              getContentAccess({
                content: {
                  key: Paths.admin.roleManager.roles.list,
                  icon: <GrUserAdmin />,
                  label: (
                    <CustomLink href={Toolbox.appendPagination(Paths.admin.roleManager.roles.list)}>Roles</CustomLink>
                  ),
                },
                allowedAccess: ['role-manager-roles:read'],
              }),
            ],
          },
          allowedAccess: [
            'role-manager-permission-types:read',
            'role-manager-permissions:read',
            'role-manager-roles:read',
          ],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.categories.list,
            icon: <MdCategory />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.categories.list)}>Categories</CustomLink>,
          },
          allowedAccess: ['categories:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.subCategories.list,
            icon: <MdCategory />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.subCategories.list)}>Sub Categories</CustomLink>,
          },
          allowedAccess: ['sub-categories:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.authors.list,
            icon: <FaUserEdit />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.authors.list)}>Authors</CustomLink>,
          },
          allowedAccess: ['authors:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.articles.root,
            icon: <RiArticleLine />,
            label: 'Articles',
            children: [
              getContentAccess({
                content: {
                  key: Paths.admin.articles.create,
                  label: <CustomLink href={Paths.admin.articles.create}>Create</CustomLink>,
                },
                allowedAccess: ['articles:write'],
              }),
              getContentAccess({
                content: {
                  key: Paths.admin.articles.list,
                  label: <CustomLink href={Toolbox.appendPagination(Paths.admin.articles.list)}>List</CustomLink>,
                },
                allowedAccess: ['articles:read'],
              }),
            ],
          },
          allowedAccess: ['articles:read', 'articles:write'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.polls.list,
            icon: <MdPoll />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.polls.list)}>Polls</CustomLink>,
          },
          allowedAccess: ['polls:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.ads.list,
            icon: <MdOutlineAdsClick />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.ads.list)}>Ads</CustomLink>,
          },
          allowedAccess: ['ads:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.marketPrice.list,
            icon: <MdOutlinePriceChange />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.marketPrice.list)}>Market Price</CustomLink>,
          },
          allowedAccess: ['market-prices:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.entrepreneurs.list,
            icon: <FaUserTie />,
            label: (
              <CustomLink href={Toolbox.appendPagination(Paths.admin.entrepreneurs.list)}>Entrepreneurs</CustomLink>
            ),
          },
          allowedAccess: ['entrepreneurs:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.startups.list,
            icon: <MdBusiness />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.startups.list)}>Startups</CustomLink>,
          },
          allowedAccess: ['startups:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.cms.root,
            icon: <FaUserShield />,
            label: 'CMS',
            children: [
              getContentAccess({
                content: {
                  key: Paths.admin.cms.menus.list,
                  icon: <MdMenu />,
                  label: <CustomLink href={Toolbox.appendPagination(Paths.admin.cms.menus.list)}>Menus</CustomLink>,
                },
                allowedAccess: ['cms-menus:read'],
              }),
              getContentAccess({
                content: {
                  key: Paths.admin.cms.pages.list,
                  icon: <MdInsertDriveFile />,
                  label: <CustomLink href={Toolbox.appendPagination(Paths.admin.cms.pages.list)}>Pages</CustomLink>,
                },
                allowedAccess: ['cms-pages:read'],
              }),
              getContentAccess({
                content: {
                  key: Paths.admin.cms.layout.root,
                  icon: <RiLayout2Fill />,
                  label: <CustomLink href={Toolbox.appendPagination(Paths.admin.cms.layout.root)}>Layout</CustomLink>,
                },
                allowedAccess: ['cms-layout:read'],
              }),
            ],
          },
          allowedAccess: ['cms-layout:read', 'cms-menus:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.settings.root,
            icon: <FaTools />,
            label: <CustomLink href={Paths.admin.settings.root}>Settings</CustomLink>,
          },
          allowedAccess: ['settings:read'],
        }),
      ]}
    />
  );
};

export default AdminMenu;
