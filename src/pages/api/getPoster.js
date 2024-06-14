import puppeteer from 'puppeteer';

// Function to fetch the poster image URL from a given webpage
async function getPosterUrl(pageUrl) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(pageUrl, { waitUntil: 'networkidle0' });

    // Extract the poster image URL from the page content
    const posterUrl = await page.evaluate(() => {
      const imgElement = document.querySelector('.vds-poster');
      return imgElement ? imgElement.src : null;
    });

    await browser.close();

    if (!posterUrl) {
      throw new Error('Failed to find poster image URL');
    }

    return posterUrl;
  } catch (error) {
    console.error('Error in getPosterUrl:', error);
    throw error;
  }
}

// New API route handler for fetching the poster URL
export default async (req, res) => {
  const { url } = req.query;

  if (!url) {
    console.error('Missing URL');
    res.status(400).json({ error: 'Missing URL' });
    return;
  }

  try {
    console.log('Fetching poster URL...');
    const posterUrl = await getPosterUrl(url);
    console.log(`Fetched poster URL: ${posterUrl}`);

    res.status(200).json({ posterUrl });
  } catch (error) {
    console.error('Error in API handler:', error);
    res.status(500).json({ error: error.message });
  }
};
