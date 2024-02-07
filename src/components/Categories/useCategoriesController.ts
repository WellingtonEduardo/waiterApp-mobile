import { useState } from 'react';


interface useCategoriesControllerProps {
  onSelectCategory: (categoryId: string | null) => void;
}



export function useCategoriesController({onSelectCategory}: useCategoriesControllerProps) {
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);


  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? null : categoryId;
    onSelectCategory(category);
    setSelectedCategory(category);
  }

  return {
    selectedCategory,
    handleSelectCategory
  };
}
