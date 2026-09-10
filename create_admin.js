const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://redtuedpnhbqziqmyyjc.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZHR1ZWRwbmhicXppcW15eWpjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODU5MTIzOCwiZXhwIjoyMTA0MTY3MjM4fQ.DpX6m7h1TEI8P6P7EnEAJTNFdZwYZf_pjr-uHWtg9BE';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createUser() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'remyagaguy@gmail.com',
    password: 'CultisoAdmin2026!',
    email_confirm: true,
  });

  if (error) {
    console.error('Error creating user:', error);
  } else {
    console.log('User created successfully:', data.user.id);
  }
}

createUser();
