console.log(supabase)

const {createClient} = supabase

const supabaseUrl = "https://gtjrkeeisnagtisumrwn.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0anJrZWVpc25hZ3Rpc3VtcnduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MTQwOTcsImV4cCI6MjA1MzI5MDA5N30.t9FsyASsHKUMiP7_2Ak_cwOPtQHSoiksz4YlrkPUUQQ"
const supabaseclient = createClient(supabaseUrl, supabaseKey)

window.supabase= supabaseclient

console.log(supabaseclient)