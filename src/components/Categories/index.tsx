import { FlatList } from 'react-native';
import { Text } from '../Text';
import { CategoryContainer, Icon } from './styles';
import { Category } from '../../app/types/Category';
import { useCategoriesController } from './useCategoriesController';


interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryId: string | null) => void;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {

  const {
    selectedCategory,
    handleSelectCategory
  } = useCategoriesController({onSelectCategory});


  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={category => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;

        return (
          <CategoryContainer onPress={() => handleSelectCategory(category._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>
                {category.icon}
              </Text>
            </Icon>
            <Text size={14} weight='Semibold' opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </Text>
          </CategoryContainer>
        );
      }}
    />

  );
}
