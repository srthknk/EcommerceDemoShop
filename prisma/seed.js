const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with demo data...');

  // Clear existing data (optional - comment out if you want to keep existing data)
  await prisma.orderItem.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.user.deleteMany();

  // Create demo users
  const user1 = await prisma.user.create({
    data: {
      id: 'user_demo_buyer_001',
      name: 'John Doe',
      email: 'buyer@example.com',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 'user_demo_seller_001',
      name: 'Sarah Store',
      email: 'seller@example.com',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      id: 'user_demo_seller_002',
      name: 'Mike Electronics',
      email: 'mike@example.com',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
  });

  console.log('✅ Created 3 demo users');

  // Create demo stores
  const store1 = await prisma.store.create({
    data: {
      userId: user2.id,
      name: 'Fashion Hub',
      username: 'fashion_hub',
      description: 'Premium fashion and clothing store',
      address: '123 Fashion Street, NY, USA',
      email: 'fashionhub@store.com',
      contact: '+1-234-567-8900',
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=fashionhub',
      isActive: true,
      status: 'approved',
    },
  });

  const store2 = await prisma.store.create({
    data: {
      userId: user3.id,
      name: 'Tech World',
      username: 'tech_world',
      description: 'Latest electronics and gadgets',
      address: '456 Tech Avenue, CA, USA',
      email: 'techworld@store.com',
      contact: '+1-234-567-8901',
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=techworld',
      isActive: true,
      status: 'approved',
    },
  });

  console.log('✅ Created 2 demo stores');

  // Create demo products for store1 (Fashion Hub)
  const product1 = await prisma.product.create({
    data: {
      name: 'Premium Cotton T-Shirt',
      description: 'High quality 100% cotton t-shirt, perfect for everyday wear. Breathable, durable, and comfortable.',
      mrp: 1999,
      price: 999,
      category: 'Clothing',
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        'https://images.unsplash.com/photo-1517466895681-c0e59a88d4c5?w=500'
      ],
      inStock: true,
      storeId: store1.id,
      isClothing: true,
      totalUnits: 120,
    },
  });

  // Add sizes for T-Shirt
  await prisma.productSize.createMany({
    data: [
      { productId: product1.id, size: 'XS', totalUnits: 15, availableUnits: 14 },
      { productId: product1.id, size: 'S', totalUnits: 25, availableUnits: 23 },
      { productId: product1.id, size: 'M', totalUnits: 35, availableUnits: 35 },
      { productId: product1.id, size: 'L', totalUnits: 30, availableUnits: 28 },
      { productId: product1.id, size: 'XL', totalUnits: 15, availableUnits: 15 },
      { productId: product1.id, size: 'XXL', totalUnits: 10, availableUnits: 10 },
      { productId: product1.id, size: 'XXXL', totalUnits: 5, availableUnits: 5 },
    ],
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Blue Denim Jeans',
      description: 'Classic blue denim jeans with perfect fit and dark wash. Premium fabric that lasts.',
      mrp: 3999,
      price: 2499,
      category: 'Clothing',
      images: [
        'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500',
        'https://images.unsplash.com/photo-1473966675286-c55c30d89f42?w=500'
      ],
      inStock: true,
      storeId: store1.id,
      isClothing: true,
      totalUnits: 85,
    },
  });

  // Add sizes for Jeans
  await prisma.productSize.createMany({
    data: [
      { productId: product2.id, size: 'XS', totalUnits: 8, availableUnits: 8 },
      { productId: product2.id, size: 'S', totalUnits: 15, availableUnits: 14 },
      { productId: product2.id, size: 'M', totalUnits: 25, availableUnits: 25 },
      { productId: product2.id, size: 'L', totalUnits: 22, availableUnits: 22 },
      { productId: product2.id, size: 'XL', totalUnits: 12, availableUnits: 11 },
      { productId: product2.id, size: 'XXL', totalUnits: 8, availableUnits: 8 },
      { productId: product2.id, size: 'XXXL', totalUnits: 5, availableUnits: 5 },
    ],
  });

  const product5 = await prisma.product.create({
    data: {
      name: 'Summer Floral Dress',
      description: 'Beautiful summer floral dress perfect for warm days. Light, breathable, and stylish.',
      mrp: 2499,
      price: 1599,
      category: 'Clothing',
      images: [
        'https://images.unsplash.com/photo-1572804419446-35e6ed8e8c9f?w=500',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500'
      ],
      inStock: true,
      storeId: store1.id,
      isClothing: true,
      totalUnits: 60,
    },
  });

  // Add sizes for Dress
  await prisma.productSize.createMany({
    data: [
      { productId: product5.id, size: 'XS', totalUnits: 8, availableUnits: 8 },
      { productId: product5.id, size: 'S', totalUnits: 12, availableUnits: 12 },
      { productId: product5.id, size: 'M', totalUnits: 18, availableUnits: 18 },
      { productId: product5.id, size: 'L', totalUnits: 15, availableUnits: 14 },
      { productId: product5.id, size: 'XL', totalUnits: 7, availableUnits: 7 },
    ],
  });

  const product6 = await prisma.product.create({
    data: {
      name: 'Classic Leather Jacket',
      description: 'Premium quality leather jacket that never goes out of style. Perfect for any season.',
      mrp: 8999,
      price: 5999,
      category: 'Clothing',
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500',
        'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500'
      ],
      inStock: true,
      storeId: store1.id,
      isClothing: true,
      totalUnits: 40,
    },
  });

  // Add sizes for Jacket
  await prisma.productSize.createMany({
    data: [
      { productId: product6.id, size: 'XS', totalUnits: 3, availableUnits: 3 },
      { productId: product6.id, size: 'S', totalUnits: 8, availableUnits: 8 },
      { productId: product6.id, size: 'M', totalUnits: 12, availableUnits: 12 },
      { productId: product6.id, size: 'L', totalUnits: 10, availableUnits: 9 },
      { productId: product6.id, size: 'XL', totalUnits: 7, availableUnits: 7 },
    ],
  });

  console.log('✅ Created 5 demo clothing products with size variants');

  // Create demo products for store2 (Tech World)
  const product3 = await prisma.product.create({
    data: {
      name: 'Wireless Bluetooth Headphones',
      description: '30-hour battery life, active noise cancellation, premium sound quality. Perfect for music lovers.',
      mrp: 9999,
      price: 5999,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
      ],
      inStock: true,
      storeId: store2.id,
      isClothing: false,
      totalUnits: 50,
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: 'USB-C Fast Charger',
      description: '65W fast charging for all devices. Compatible with laptops, phones, and tablets.',
      mrp: 2999,
      price: 1499,
      category: 'Electronics',
      images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500'],
      inStock: true,
      storeId: store2.id,
      isClothing: false,
      totalUnits: 150,
    },
  });

  const product7 = await prisma.product.create({
    data: {
      name: '4K USB Webcam',
      description: 'Crystal clear 4K resolution with auto-focus. Perfect for streaming and video calls.',
      mrp: 7999,
      price: 4499,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
        'https://images.unsplash.com/photo-1545389336-cf633d7314e6?w=500'
      ],
      inStock: true,
      storeId: store2.id,
      isClothing: false,
      totalUnits: 35,
    },
  });

  const product8 = await prisma.product.create({
    data: {
      name: 'Mechanical Gaming Keyboard',
      description: 'RGB backlit mechanical keyboard with Cherry MX switches. Durable and responsive.',
      mrp: 5999,
      price: 3499,
      category: 'Electronics',
      images: ['https://images.unsplash.com/photo-1587829191301-b281e6cebda3?w=500'],
      inStock: true,
      storeId: store2.id,
      isClothing: false,
      totalUnits: 45,
    },
  });

  const product9 = await prisma.product.create({
    data: {
      name: 'Wireless Gaming Mouse',
      description: 'High precision sensor with 8000 Hz polling rate. Perfect for competitive gaming.',
      mrp: 3999,
      price: 2299,
      category: 'Electronics',
      images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'],
      inStock: true,
      storeId: store2.id,
      isClothing: false,
      totalUnits: 80,
    },
  });

  const product10 = await prisma.product.create({
    data: {
      name: 'Portable SSD 1TB',
      description: '1TB external solid state drive with lightning-fast transfer speeds. USB 3.2 Gen 2.',
      mrp: 8999,
      price: 5999,
      category: 'Electronics',
      images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500'],
      inStock: true,
      storeId: store2.id,
      isClothing: false,
      totalUnits: 60,
    },
  });

  console.log('✅ Created 6 demo electronics products');

  // Create demo address for buyer
  const address1 = await prisma.address.create({
    data: {
      userId: user1.id,
      name: 'John Doe',
      email: 'buyer@example.com',
      street: '789 Main Street, Apt 101',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
      phone: '+1-555-123-4567',
    },
  });

  console.log('✅ Created demo address');

  // Create demo orders
  const order1 = await prisma.order.create({
    data: {
      total: 5497,
      status: 'DELIVERED',
      userId: user1.id,
      storeId: store1.id,
      addressId: address1.id,
      isPaid: true,
      paymentMethod: 'RAZORPAY_CARD',
      isCouponUsed: false,
      coupon: {},
      orderItems: {
        create: [
          {
            productId: product1.id,
            quantity: 2,
            price: 999,
            selectedSize: 'M',
          },
          {
            productId: product2.id,
            quantity: 1,
            price: 2499,
            selectedSize: 'L',
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      total: 4499,
      status: 'SHIPPED',
      userId: user1.id,
      storeId: store2.id,
      addressId: address1.id,
      isPaid: true,
      paymentMethod: 'RAZORPAY_UPI',
      isCouponUsed: false,
      coupon: {},
      orderItems: {
        create: [
          {
            productId: product7.id,
            quantity: 1,
            price: 4499,
          },
        ],
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      total: 3499,
      status: 'PROCESSING',
      userId: user1.id,
      storeId: store2.id,
      addressId: address1.id,
      isPaid: false,
      paymentMethod: 'COD',
      isCouponUsed: false,
      coupon: {},
      orderItems: {
        create: [
          {
            productId: product8.id,
            quantity: 1,
            price: 3499,
          },
        ],
      },
    },
  });

  console.log('✅ Created 3 demo orders with items');

  // Create demo ratings
  const rating1 = await prisma.rating.create({
    data: {
      rating: 5,
      review: 'Amazing quality! Highly recommend this product.',
      userId: user1.id,
      productId: product1.id,
      orderId: order1.id,
    },
  });

  const rating2 = await prisma.rating.create({
    data: {
      rating: 4,
      review: 'Great fit and comfortable to wear.',
      userId: user1.id,
      productId: product2.id,
      orderId: order1.id,
    },
  });

  console.log('✅ Created demo ratings');

  // Create demo coupons
  const coupon1 = await prisma.coupon.create({
    data: {
      code: 'WELCOME10',
      description: '10% off for new users',
      discount: 10,
      forNewUser: true,
      forMember: false,
      isPublic: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });

  const coupon2 = await prisma.coupon.create({
    data: {
      code: 'MEMBER20',
      description: '20% off for members',
      discount: 20,
      forNewUser: false,
      forMember: true,
      isPublic: true,
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    },
  });

  console.log('✅ Created demo coupons');

  console.log('\n✨ Database seeded successfully!\n');
  console.log('📊 Demo Data Summary:');
  console.log(`   • Users: 3`);
  console.log(`   • Stores: 2`);
  console.log(`   • Products: 11 (5 clothing, 6 electronics)`);
  console.log(`   • Product Sizes: 35 (for clothing items)`);
  console.log(`   • Orders: 3`);
  console.log(`   • Order Items: 4`);
  console.log(`   • Ratings: 2`);
  console.log(`   • Coupons: 2`);
  console.log('\n🔐 Demo Credentials:');
  console.log(`   • Buyer Email: ${user1.email}`);
  console.log(`   • Seller 1 Email: ${user2.email}`);
  console.log(`   • Seller 2 Email: ${user3.email}`);
  console.log('\n💡 Use Clerk to login with these emails (no password needed)\n');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
