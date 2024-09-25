import { prisma } from "../prisma";
import { TData } from "../types/TData";

export const createProduct = async (data: TData) => {
  if(data.name.length > 90){
    throw new Error('Name exceed the character limit')
  }

  return await prisma.product.create({data})
};

export const getProducts = async () => {
  return await prisma.product.findMany()
}