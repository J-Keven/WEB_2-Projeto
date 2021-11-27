export default interface IPoster {
  id: string,
  title: string,
  description: string,
  price: Number,
  userId: string,
  status: string,
  imageUrl?: string;
  created_at: Date,
  updated_at: Date,
  categories: [
    {
      id: string,
      name: string,
    }
  ]
}