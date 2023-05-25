export interface ActivityViewModel {
  id: number;
  title: string;
  category: ActivityCategoryViewModel;
  description: string;
  ageRange: string;
  location: string;
  cost: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface ActivityBriefViewModel {
  id: number;
  title: string;
  category: string;
  location: string;
  dateStart: Date;
}

export interface KidBriefViewModel {
  id: number;
  fullname: string;
  age: string;
}

export interface ActivityCategoryViewModel {
  id: number;
  name: string;
  description: string;
}

export interface CategoryViewModel {
  name: string;
}
