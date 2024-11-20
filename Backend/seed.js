const mongoose = require('mongoose');
const Job = require('./models/jobModel');

// Replace with your MongoDB URI
mongoose.connect('mongodb://localhost:27017/jobPortal');

const jobs = [
  { title: 'Software Engineer', company: 'Google', description: 'Develop software', location: 'San Francisco', photo : 'https://www.thedailyupside.com/wp-content/uploads/2021/04/iStock-1154834209.jpg' },
  { title: 'Product Manager', company: 'Amazon', description: 'Manage product lifecycle', location: 'Seattle', photo: 'https://images.moneycontrol.com/static-mcnews/2023/03/amazon-shut-down-featured--580x435.png?impolicy=website&width=770&height=431' },
  { title: 'Data Analyst', company: 'Facebook', description: 'Analyze data', location: 'Menlo Park', photo:'https://t4.ftcdn.net/jpg/04/82/38/55/360_F_482385584_Dv6qBsdFeUvVZoZSzCCUm09pZv4cnkw4.jpg' },
  { title: 'UI/UX Designer', company: 'Apple', description: 'Design user interfaces', location: 'Cupertino', photo:'https://static01.nyt.com/images/2019/05/31/us/31applehq-01alt/31applehq-01alt-articleLarge.jpg?quality=75&auto=webp&disable=upscale' },
  { title: 'DevOps Engineer', company: 'Microsoft', description: 'Maintain infrastructure', location: 'Redmond', photo:'https://www.shutterstock.com/shutterstock/photos/2161001273/display_1500/stock-photo-logo-of-microsoft-company-headquarters-office-building-american-multinational-technology-2161001273.jpg' },
  { title: 'Marketing Specialist', company: 'Tesla', description: 'Develop marketing strategies', location: 'Palo Alto', photo:'https://etimg.etb2bimg.com/photo/98165986.cms' },
  { title: 'Sales Representative', company: 'Netflix', description: 'Handle client sales', location: 'Los Angeles', photo:'https://www.shutterstock.com/shutterstock/photos/2062987472/display_1500/stock-photo-los-angeles-october-netflix-building-signage-in-hollywood-2062987472.jpg' },
  { title: 'Web Developer', company: 'Spotify', description: 'Develop websites', location: 'New York', photo:'https://c8.alamy.com/comp/2J8XGM9/stockholm-sweden-may-2-2022-editorial-use-only-3d-cgi-spotify-signage-logo-on-top-of-glass-building-workplace-multinational-streaming-and-media-2J8XGM9.jpg' },
  { title: 'HR Manager', company: 'IBM', description: 'Handle employee relations', location: 'Armonk', photo:'https://media.istockphoto.com/id/1319657811/photo/exterior-view-of-the-french-headquarters-of-ibm-bois-colombes-france.jpg?s=612x612&w=0&k=20&c=-Nav8ryjF-RdEmGdC2arPttYTfemEy7XNpKfrmYaI_w=' },
  { title: 'Cybersecurity Expert', company: 'Oracle', description: 'Ensure cybersecurity', location: 'Austin', photo:'https://media.licdn.com/dms/image/v2/D4D12AQHC3Z3FeGe0QQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1671611709226?e=2147483647&v=beta&t=TxZZ_herbbfKduqD5YwJSGXz54PNdXzfhDdZ8Wn0PsM' },
];

const seedJobs = async () => {
  try {
    await Job.deleteMany();  // Clear existing jobs
    await Job.insertMany(jobs);  // Insert new job listings
    console.log('Job listings added!');
  } catch (err) {
    console.error('Error seeding jobs:', err);
  } finally {
    mongoose.connection.close();  // Close the connection
  }
};

seedJobs();
