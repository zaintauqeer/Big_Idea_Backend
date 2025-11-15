import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const MongooseOptions = {
      dbName: "BigIdea",
      connectTimeoutMS: 30000, 
      socketTimeoutMS: 45000  
    };
    await mongoose.connect(process.env.MONGO_URI, MongooseOptions);
    console.log('MongoDB connection with BigIdea successful!');
  } catch (err) {
    console.error('MongoDB connection failed!', err.message);
    console.error(err); 
  }
};

export default connectDB; 