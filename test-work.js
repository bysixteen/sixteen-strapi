const API_BASE = 'http://localhost:1337/api';

async function createTestWork() {
  try {
    const response = await fetch(`${API_BASE}/works`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          Client: "Careem",
          Slug: "careem",
          Title: "Careem Project",
          Description: "A test project for Careem",
          publishedAt: new Date().toISOString()
        }
      }),
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Created test work:', result.data);
      return result.data;
    } else {
      console.error('❌ Failed to create work:', await response.text());
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createTestWork(); 