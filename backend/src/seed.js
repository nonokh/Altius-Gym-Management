import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import MembershipPlan from './models/MembershipPlan.js';
import { connectDB } from './config/database.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await MembershipPlan.deleteMany();

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@altius.gym',
      password: 'admin123',
      role: 'admin',
    });

    console.log('✅ Admin user created:', admin.email);

    // Create staff user
    const staff = await User.create({
      name: 'Staff User',
      email: 'staff@altius.gym',
      password: 'staff123',
      role: 'staff',
    });

    console.log('✅ Staff user created:', staff.email);

    // Create membership plans
    const plans = await MembershipPlan.insertMany([
      {
        name: 'Monthly Basic',
        description: 'Access to gym facilities for 1 month',
        duration: 1,
        durationType: 'months',
        price: 999,
        features: [
          'Gym access during operating hours',
          'Basic equipment usage',
          'Locker facility',
        ],
        isActive: true,
      },
      {
        name: 'Quarterly Premium',
        description: 'Access to gym facilities for 3 months with additional benefits',
        duration: 3,
        durationType: 'months',
        price: 2499,
        features: [
          'Gym access during operating hours',
          'All equipment usage',
          'Personal locker',
          'Free fitness assessment',
          '1 personal training session',
        ],
        isActive: true,
      },
      {
        name: 'Annual Elite',
        description: 'Full year access with premium benefits',
        duration: 1,
        durationType: 'years',
        price: 7999,
        features: [
          '24/7 gym access',
          'All equipment usage',
          'Personal locker',
          'Monthly fitness assessment',
          '4 personal training sessions per month',
          'Nutrition consultation',
          'Guest passes (2 per month)',
        ],
        isActive: true,
      },
      {
        name: 'Day Pass',
        description: 'Single day access to gym facilities',
        duration: 1,
        durationType: 'days',
        price: 99,
        features: [
          'Single day gym access',
          'Basic equipment usage',
        ],
        isActive: true,
      },
    ]);

    console.log('✅ Membership plans created:', plans.length);

    console.log('\n🎉 Seed data created successfully!');
    console.log('\n📝 Login credentials:');
    console.log('Admin - Email: admin@altius.gym, Password: admin123');
    console.log('Staff - Email: staff@altius.gym, Password: staff123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
