import { prisma } from "../prisma";
import { TData } from "../types/TData";

export const createProduct = async (data: TData, userId: string) => {
  if(data.name.length > 90){
    throw new Error('Name exceed the character limit')
  }

  return await prisma.product.create({
    data: {
      ...data,
      userId
    }
  })
};

export const getProducts = async () => {
  return await prisma.product.findMany()
}
export const updateProduct = async (id: string, data: TData) => {  
  if (data.name.length > 90) {    
    throw new Error('O nome excede o limite de caracteres');  
  }  
  return await prisma.product.update({    
    where: { id },    
    data,  
  }); 
};


export const deleteProduct = async (id: string) => {  
  return await prisma.product.delete({    
    where: { id },  
  });
};
