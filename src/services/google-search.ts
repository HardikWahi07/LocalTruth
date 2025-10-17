// A simple service to call the Google Custom Search API
import { config } from 'dotenv';
config({ path: '.env.local' });


type SearchResult = {
    title: string;
    link: string;
    snippet: string;
};
  
export async function searchGoogle(query: string): Promise<SearchResult[]> {
    const apiKey = "AIzaSyDlyjo5djwPRxjIPzvIZY6NJTlH6NVmO14";
    const cx = "16a8e762315ba45d0";

    /*if (!apiKey || apiKey ===  || !cx || cx === ) {
        console.error("Google Search API key or CX not configured. Please check your .env.local file.");
        // Return an empty array to prevent crashes, but indicate failure.
        return [];
    }*/

    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(
        query
    )}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Google Search API request failed with status ${response.status}: ${errorBody}`);
            throw new Error(`Google Search API request failed with status ${response.status}`);
        }
        const data = await response.json();
        
        if (!data.items) {
            return [];
        }

        return data.items.map((item: any) => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet,
        }));

    } catch (error) {
        console.error("Error fetching Google Search results:", error);
        throw error;
    }
}
