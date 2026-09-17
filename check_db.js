const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://redtuedpnhbqziqmyyjc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZHR1ZWRwbmhicXppcW15eWpjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODU5MTIzOCwiZXhwIjoyMTA0MTY3MjM4fQ.DpX6m7h1TEI8P6P7EnEAJTNFdZwYZf_pjr-uHWtg9BE"
);

async function main() {
  const { data, error } = await supabase.from('profiles').select('*').limit(1);
  if (error) {
    console.error("ERREUR:", error.message);
  } else {
    console.log("SUCCES, Table existe:", data);
  }
}

main();
