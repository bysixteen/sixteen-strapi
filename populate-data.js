const API_BASE = 'http://localhost:1337/api';

// Helper function to create content
async function createContent(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Created ${endpoint}:`, result.data?.attributes?.name || result.data?.attributes?.Client || 'Unknown');
      return result.data;
    } else {
      console.error(`❌ Failed to create ${endpoint}:`, await response.text());
    }
  } catch (error) {
    console.error(`❌ Error creating ${endpoint}:`, error.message);
  }
}

// Sample data for quick population
const agencies = [
  { name: 'Sixteen' },
  { name: 'Freelance' },
  { name: 'Previous Agency' }
];

const positions = [
  { name: 'Creative Director' },
  { name: 'Art Director' },
  { name: 'Senior Designer' },
  { name: 'Designer' },
  { name: 'Motion Designer' }
];

const services = [
  { name: 'Brand Identity' },
  { name: 'Digital Design' },
  { name: 'Motion Graphics' },
  { name: 'Web Design' },
  { name: 'Print Design' },
  { name: '3D Design' }
];

const works = [
  {
    Client: 'Careem',
    Subtitle: 'Ride-hailing app redesign',
    Slug: 'careem',
    Year: '2023',
    Industry: 'Transportation',
    Overview: 'Complete redesign of the Careem ride-hailing application focusing on user experience and brand consistency.',
    liveUrl: 'https://careem.com'
  },
  {
    Client: 'DAZN',
    Subtitle: 'Sports streaming platform',
    Slug: 'dazn',
    Year: '2023',
    Industry: 'Entertainment',
    Overview: 'Brand refresh and digital design for the global sports streaming platform.',
    liveUrl: 'https://dazn.com'
  },
  {
    Client: 'Trek',
    Subtitle: 'Bicycle manufacturer campaign',
    Slug: 'trek',
    Year: '2022',
    Industry: 'Sports',
    Overview: 'Marketing campaign and digital assets for Trek Bicycle Corporation.',
    liveUrl: 'https://trek.com'
  },
  {
    Client: 'Valmont',
    Subtitle: 'Luxury skincare branding',
    Slug: 'valmont',
    Year: '2022',
    Industry: 'Beauty',
    Overview: 'Brand identity and packaging design for luxury skincare brand Valmont.',
    liveUrl: 'https://valmont.com'
  },
  {
    Client: 'Wacoal',
    Subtitle: 'Intimate apparel campaign',
    Slug: 'wacoal',
    Year: '2021',
    Industry: 'Fashion',
    Overview: 'Digital campaign and e-commerce design for Wacoal intimate apparel.',
    liveUrl: 'https://wacoal.com'
  },
  {
    Client: 'Forevermark',
    Subtitle: 'Diamond jewelry branding',
    Slug: 'forevermark',
    Year: '2021',
    Industry: 'Luxury',
    Overview: 'Brand identity and marketing materials for Forevermark diamond jewelry.',
    liveUrl: 'https://forevermark.com'
  }
];

// Main population function
async function populateData() {
  console.log('🚀 Starting data population...\n');

  // Create agencies
  console.log('📝 Creating agencies...');
  const createdAgencies = [];
  for (const agency of agencies) {
    const created = await createContent('agencies', agency);
    if (created) createdAgencies.push(created);
  }

  // Create positions
  console.log('\n📝 Creating positions...');
  const createdPositions = [];
  for (const position of positions) {
    const created = await createContent('positions', position);
    if (created) createdPositions.push(created);
  }

  // Create services
  console.log('\n📝 Creating services...');
  const createdServices = [];
  for (const service of services) {
    const created = await createContent('services', service);
    if (created) createdServices.push(created);
  }

  // Create works with relationships
  console.log('\n📝 Creating works...');
  for (const work of works) {
    const workData = {
      ...work,
      Agency: createdAgencies[0]?.id || null,
      Positions: createdPositions.slice(0, 2).map(p => p.id),
      Services: createdServices.slice(0, 3).map(s => s.id)
    };
    await createContent('works', workData);
  }

  console.log('\n🎉 Data population complete!');
  console.log(`Created ${createdAgencies.length} agencies`);
  console.log(`Created ${createdPositions.length} positions`);
  console.log(`Created ${createdServices.length} services`);
  console.log(`Created ${works.length} works`);
}

// Run the population
populateData().catch(console.error); 