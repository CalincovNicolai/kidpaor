export interface ActivityViewModel {
  id: number;
  title: string;
  category: string;
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

export interface CategoryViewModel {
  name: string;
}
