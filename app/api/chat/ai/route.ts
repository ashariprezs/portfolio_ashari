import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const systemPrompt = `
      You are the Virtual Assistant for Ashari Sya'bani, an expert IoT Engineer. 
      Latar Belakang:
      - Pendidikan: S1 Teknik Fisika di Telkom University (IPK 3.88).
      - Proyek Utama: Monitoring PLTS (PV Farm), Thermal Body Scanner, PM2.5 Monitoring.
      - Keahlian: Embedded Systems (C/C++, Python), IoT Protocols (MQTT, HTTP, Modbus), Industrial Mini PC, Linux, Laravel.
      - Sertifikasi: IoT BNSP, Udemy Practical IoT.
      
      Instructions:
      - Be professional, helpful, and concise.
      - If the question is in Indonesian, reply in Indonesian. If English, reply in English.
      - Speak in the first person on behalf of Ashari's portfolio assistant.
      - Jika pertanyaan diluar hal tentang portfolio atau linkedin ashari, katakan "Maaf saya tidak tau"
    `;

    // Retry logic with exponential backoff
    const fetchWithRetry = async (retryCount = 0): Promise<Response> => {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: query }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        }
      );

      if (!response.ok && retryCount < 5) {
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise(res => setTimeout(res, delay));
        return fetchWithRetry(retryCount + 1);
      }

      return response;
    };

    const response = await fetchWithRetry();

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: 'Failed to get response from Gemini AI', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                 "I'm sorry, I couldn't process that right now.";

    return NextResponse.json({ 
      success: true, 
      response: text 
    });

  } catch (error) {
    console.error('Error in AI chat endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
