// Vercel serverless function — fetches Google Sheet CSV server-side
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSVCP-637de_cJhSv4UsrkljerNZCAUbp8atHT2Zb64VO3PCMxupK_GSQ_hTbR-0G6qU5lEcHk7qACz/pub?gid=0&single=true&output=csv";
  
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) throw new Error(`Upstream ${response.status}`);
    const csv = await response.text();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate'); // cache 5 min on Vercel edge
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
