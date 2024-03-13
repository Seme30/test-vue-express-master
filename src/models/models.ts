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

export default interface Business {
  name: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  campaigns: Campaign [];
}
