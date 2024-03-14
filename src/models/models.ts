interface Category {
  name: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface Campaign {
  budget: number;
  businessId: number;
  name: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface ExternalSystem {
  name: string;
  provider: string,
  baseUrl: string,
  id: number;
  createdAt: string;
  updatedAt: string;
}



export default interface Business {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  name: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  campaigns: Campaign[];
  externalSystems: ExternalSystem []
}
