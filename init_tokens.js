const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://redtuedpnhbqziqmyyjc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZHR1ZWRwbmhicXppcW15eWpjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODU5MTIzOCwiZXhwIjoyMTA0MTY3MjM4fQ.DpX6m7h1TEI8P6P7EnEAJTNFdZwYZf_pjr-uHWtg9BE"
);

async function main() {
  // Get all users
  const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
  
  if (usersError) {
    console.error("Erreur lister users:", usersError);
    return;
  }
  
  for (const user of usersData.users) {
    const { error } = await supabase.auth.admin.updateUserById(user.id, {
      app_metadata: { ...user.app_metadata, tokens_balance: 100000 }
    });
    if (error) {
      console.error(`Erreur update user ${user.email}:`, error);
    } else {
      console.log(`Mis a jour ${user.email} avec 100,000 tokens.`);
    }
  }
}
main();
