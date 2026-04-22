import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';

export interface ICategoriesFilter extends IBaseFilter {}

export interface ICategory extends IBaseEntity {
  title: string;
  titleBn: string;
  slug: string;
  slugBn: string;
}

export interface ICategoriesResponse extends IBaseResponse {
  data: ICategory[];
}

export interface ICategoryCreate {
  title: string;
  titleBn: string;
  slug: string;
  slugBn: string;
  isActive: boolean;
}
