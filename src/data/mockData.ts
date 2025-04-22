
import { Tenant, Category, Product, OptionGroup, Option, TableQR } from '../types/models';

// Mock Tenants
export const tenants: Tenant[] = [
  {
    id: '1',
    name: 'Pizzaria do João',
    slug: 'pizzaria-do-joao',
    logo: '/placeholder.svg',
    primaryColor: '#C1292E',
    secondaryColor: '#FF6B35',
    description: 'A melhor pizzaria da cidade!',
    phone: '(11) 99999-9999',
    address: 'Rua das Pizzas, 123 - São Paulo, SP',
    createdAt: new Date(),
    updatedAt: new Date(),
    planType: 'pro'
  },
  {
    id: '2',
    name: 'Cantina Italiana',
    slug: 'cantina-italiana',
    logo: '/placeholder.svg',
    primaryColor: '#8D1F1F',
    secondaryColor: '#6E3B23',
    description: 'Comida italiana autêntica',
    phone: '(11) 88888-8888',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    createdAt: new Date(),
    updatedAt: new Date(),
    planType: 'premium'
  },
  {
    id: '3',
    name: 'Lanchonete Bom Sabor',
    slug: 'bom-sabor',
    logo: '/placeholder.svg',
    primaryColor: '#FF6B35',
    secondaryColor: '#6E3B23',
    description: 'Lanches rápidos e saborosos',
    phone: '(11) 77777-7777',
    address: 'Rua Augusta, 500 - São Paulo, SP',
    createdAt: new Date(),
    updatedAt: new Date(),
    planType: 'free'
  }
];

// Mock Categories for Pizzaria do João (tenant ID 1)
export const categories: Category[] = [
  {
    id: '1',
    tenantId: '1',
    name: 'Pizzas Tradicionais',
    description: 'Nossas pizzas tradicionais feitas com ingredientes selecionados',
    displayOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    tenantId: '1',
    name: 'Pizzas Especiais',
    description: 'Pizzas com ingredientes premium e sabores exclusivos',
    displayOrder: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    tenantId: '1',
    name: 'Bebidas',
    description: 'Refrigerantes, sucos e cervejas',
    displayOrder: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    tenantId: '1',
    name: 'Sobremesas',
    description: 'Deliciosas sobremesas para finalizar sua refeição',
    displayOrder: 4,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock Products for Pizzaria do João (tenant ID 1)
export const products: Product[] = [
  {
    id: '1',
    tenantId: '1',
    categoryId: '1',
    name: 'Margherita',
    description: 'Molho de tomate, mussarela, manjericão fresco e azeite de oliva',
    price: 45.9,
    imageUrl: '/placeholder.svg',
    isActive: true,
    hasOptions: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    tenantId: '1',
    categoryId: '1',
    name: 'Calabresa',
    description: 'Molho de tomate, mussarela, calabresa fatiada, cebola e orégano',
    price: 49.9,
    imageUrl: '/placeholder.svg',
    isActive: true,
    hasOptions: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    tenantId: '1',
    categoryId: '1',
    name: 'Quatro Queijos',
    description: 'Molho de tomate, mussarela, provolone, gorgonzola e parmesão',
    price: 55.9,
    imageUrl: '/placeholder.svg',
    isActive: true,
    hasOptions: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    tenantId: '1',
    categoryId: '2',
    name: 'Pizza Especial da Casa',
    description: 'Molho de tomate, mussarela, presunto, champignon, palmito, ervilha e ovos',
    price: 65.9,
    imageUrl: '/placeholder.svg',
    isActive: true,
    hasOptions: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    tenantId: '1',
    categoryId: '2',
    name: 'Vegetariana Premium',
    description: 'Molho de tomate, mussarela, berinjela, abobrinha, pimentão, cogumelos e tomate cereja',
    price: 59.9,
    imageUrl: '/placeholder.svg',
    isActive: true,
    hasOptions: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    tenantId: '1',
    categoryId: '3',
    name: 'Refrigerante - Lata',
    description: 'Coca-Cola, Guaraná, Sprite (350ml)',
    price: 6.9,
    imageUrl: '/placeholder.svg',
    isActive: true,
    hasOptions: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    tenantId: '1',
    categoryId: '3',
    name: 'Suco Natural',
    description: 'Laranja, abacaxi ou maracujá (500ml)',
    price: 10.9,
    imageUrl: '/placeholder.svg',
    isActive: true,
    hasOptions: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    tenantId: '1',
    categoryId: '4',
    name: 'Petit Gateau',
    description: 'Bolo de chocolate com centro cremoso, servido com sorvete de creme',
    price: 19.9,
    imageUrl: '/placeholder.svg',
    isActive: true,
    hasOptions: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock Option Groups for Pizzaria do João (tenant ID 1)
export const optionGroups: OptionGroup[] = [
  {
    id: '1',
    tenantId: '1',
    name: 'Tipo de borda',
    description: 'Escolha o tipo de borda para sua pizza',
    minSelection: 1,
    maxSelection: 1,
    isRequired: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    tenantId: '1',
    name: 'Adicionais',
    description: 'Escolha ingredientes adicionais para sua pizza',
    minSelection: 0,
    maxSelection: 5,
    isRequired: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock Options for Pizzaria do João (tenant ID 1)
export const options: Option[] = [
  {
    id: '1',
    optionGroupId: '1',
    name: 'Borda tradicional',
    description: 'Borda tradicional crocante',
    additionalPrice: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    optionGroupId: '1',
    name: 'Borda recheada com catupiry',
    description: 'Borda recheada com delicioso catupiry',
    additionalPrice: 8.9,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    optionGroupId: '1',
    name: 'Borda recheada com cheddar',
    description: 'Borda recheada com cheddar cremoso',
    additionalPrice: 8.9,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    optionGroupId: '2',
    name: 'Mussarela extra',
    description: 'Porção extra de mussarela',
    additionalPrice: 5.9,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    optionGroupId: '2',
    name: 'Bacon',
    description: 'Bacon em cubos',
    additionalPrice: 7.9,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    optionGroupId: '2',
    name: 'Tomate seco',
    description: 'Tomate seco em fatias',
    additionalPrice: 6.9,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock Table QR Codes for Pizzaria do João (tenant ID 1)
export const tableQRs: TableQR[] = [
  {
    id: '1',
    tenantId: '1',
    tableNumber: '01',
    qrCodeUrl: '/placeholder.svg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    tenantId: '1',
    tableNumber: '02',
    qrCodeUrl: '/placeholder.svg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    tenantId: '1',
    tableNumber: '03',
    qrCodeUrl: '/placeholder.svg',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Get products by tenant ID and category ID
export const getProductsByTenantAndCategory = (tenantId: string, categoryId: string): Product[] => {
  return products.filter(product => product.tenantId === tenantId && product.categoryId === categoryId && product.isActive);
};

// Get categories by tenant ID
export const getCategoriesByTenant = (tenantId: string): Category[] => {
  return categories
    .filter(category => category.tenantId === tenantId && category.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
};

// Get tenant by slug
export const getTenantBySlug = (slug: string): Tenant | undefined => {
  return tenants.find(tenant => tenant.slug === slug);
};

// Get tenant by ID
export const getTenantById = (id: string): Tenant | undefined => {
  return tenants.find(tenant => tenant.id === id);
};
